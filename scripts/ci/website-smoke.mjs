import assert from 'node:assert/strict';
import { spawn } from 'node:child_process';
import { once } from 'node:events';
import { readFile } from 'node:fs/promises';
import { createServer } from 'node:http';
import { setTimeout as delay } from 'node:timers/promises';
import { pathToFileURL } from 'node:url';

const origin = 'http://127.0.0.1:3100';
const upstreamOrigin = 'http://127.0.0.1:4311';
const publicOrigin = 'https://ironcompassai.com';

export function attributes(tag) {
  return Object.fromEntries([...tag.matchAll(/([\w:-]+)\s*=\s*(["'])(.*?)\2/gs)].map((m) => [m[1].toLowerCase(), m[3]]));
}

export function sitemapPaths(xml) {
  const urls = [...xml.matchAll(/<loc>(.*?)<\/loc>/gs)].map((m) => new URL(m[1].trim().replaceAll('&amp;', '&')));
  assert(urls.length > 0 && urls.length <= 500, 'Sitemap must have 1-500 URLs');
  for (const url of urls) assert.equal(url.origin, publicOrigin, 'External sitemap host forbidden');
  const paths = urls.map((url) => url.pathname + url.search);
  assert.equal(new Set(paths).size, paths.length, 'Duplicate sitemap URLs');
  return paths;
}

export function checkPage(html, path) {
  assert.equal((html.match(/<h1(?:\s|>)/gi) || []).length, 1, `${path}: expected one H1`);
  assert.match(html, /<title>[^<]+<\/title>/i, `${path}: missing title`);
  const metas = [...html.matchAll(/<meta\b[^>]*>/gi)].map((m) => attributes(m[0]));
  assert(metas.some((m) => m.name === 'description' && m.content?.trim()), `${path}: missing description`);
  assert(!metas.some((m) => m.name === 'robots' && /\bnoindex\b/i.test(m.content || '')), `${path}: unexpected noindex`);
  const links = [...html.matchAll(/<link\b[^>]*>/gi)].map((m) => attributes(m[0]));
  const canonical = links.find((link) => link.rel === 'canonical');
  assert(canonical?.href, `${path}: missing canonical`);
  assert.equal(new URL(canonical.href).origin, publicOrigin, `${path}: canonical host changed`);
  for (const script of html.matchAll(/<script\b([^>]*)>([\s\S]*?)<\/script>/gi)) {
    if (attributes(script[1]).type === 'application/ld+json') JSON.parse(script[2]);
  }
}

export function checkUpstream(manifest) {
  const rewrites = Array.isArray(manifest.rewrites) ? manifest.rewrites : Object.values(manifest.rewrites || {}).flat();
  const appRules = rewrites.filter((rule) => /^\/app(?:\/|$)/.test(rule.source));
  assert.equal(appRules.length, 2, 'Expected two app rewrites');
  for (const rule of appRules) assert.equal(new URL(rule.destination).origin, upstreamOrigin, 'Only synthetic local app upstream allowed');
}

export async function main() {
  const manifest = JSON.parse(await readFile('.next/routes-manifest.json', 'utf8'));
  checkUpstream(manifest);
  const upstream = createServer((req, res) => {
    res.writeHead(200, { 'content-type': 'application/json' });
    res.end(JSON.stringify({ synthetic: true, path: req.url }));
  });
  const ready = once(upstream, 'listening');
  upstream.listen(4311, '127.0.0.1');
  await ready;
  let server;
  let startupError;
  let serverLog = '';
  let checks = 0;
  const get = async (path) => {
    const url = new URL(path, origin);
    assert.equal(url.origin, origin, 'Only local GET requests are permitted');
    const response = await fetch(url, { redirect: 'manual', signal: AbortSignal.timeout(10000) });
    const body = await response.text();
    checks++;
    return { response, body };
  };
  try {
    server = spawn(process.execPath, ['node_modules/next/dist/bin/next', 'start', '--hostname', '127.0.0.1', '--port', '3100'], {
      stdio: ['ignore', 'pipe', 'pipe'],
      env: { ...process.env, PRODUCT_APP_UPSTREAM_URL: upstreamOrigin, NEXT_TELEMETRY_DISABLED: '1' },
    });
    server.on('error', (error) => { startupError = error; });
    server.stdout.on('data', (chunk) => { serverLog = (serverLog + chunk).slice(-12000); });
    server.stderr.on('data', (chunk) => { serverLog = (serverLog + chunk).slice(-12000); });
    let started = false;
    for (let attempt = 0; attempt < 60; attempt++) {
      if (startupError) throw startupError;
      if (server.exitCode !== null) throw new Error(`Local Next server exited: ${serverLog}`);
      try {
        if ((await get('/')).response.status === 200) { started = true; break; }
      } catch { /* The local server may still be starting. */ }
      await delay(500);
    }
    assert(started, `Local server did not start: ${serverLog}`);
    const pages = new Map();
    for (const path of ['/', '/about', '/pricing', '/download', '/domains', '/domains/discipline', '/blog']) {
      const { response, body } = await get(path);
      assert.equal(response.status, 200, `${path}: HTTP ${response.status}`);
      checkPage(body, path);
      pages.set(path, body);
    }
    const download = pages.get('/download');
    assert.equal((download.match(/<dialog\b/gi) || []).length, 4, 'Four screenshot dialogs must remain');
    for (const id of ['app-today', 'app-habits', 'app-journal', 'app-strategy']) {
      assert(download.includes(`id="${id}"`), `Missing app feature anchor ${id}`);
      assert(pages.get('/').includes(`/download#${id}`), `Missing homepage feature link ${id}`);
    }
    const assetPaths = new Set([...([...pages.values()].join('\n')).matchAll(/(?:src|href)="([^"<>]+)"/g)]
      .map((m) => m[1].replaceAll('&amp;', '&')).filter((path) => path.startsWith('/_next/static/')));
    assert(assetPaths.size > 0, 'No built CSS/JavaScript assets discovered');
    for (const path of assetPaths) assert.equal((await get(path)).response.status, 200, `Asset ${path}`);
    assert.equal((await get('/robots.txt')).response.status, 200, 'robots.txt');
    const sitemap = await get('/sitemap.xml');
    assert.equal(sitemap.response.status, 200, 'sitemap.xml');
    const paths = sitemapPaths(sitemap.body);
    for (let i = 0; i < paths.length; i += 4) {
      await Promise.all(paths.slice(i, i + 4).map(async (path) => {
        assert.equal((await get(path)).response.status, 200, `Sitemap route ${path}`);
      }));
    }
    const redirects = (manifest.redirects || []).filter((r) => !r.internal && !r.has?.length && !r.missing?.length && !/[:*()?]/.test(r.source));
    for (const rule of redirects) {
      const { response } = await get(rule.source);
      assert.equal(response.status, rule.statusCode || (rule.permanent ? 308 : 307), `Redirect ${rule.source}`);
      assert.equal(new URL(response.headers.get('location'), origin).href, new URL(rule.destination, origin).href, `Redirect target ${rule.source}`);
    }
    for (const path of ['/app', '/app/auth', '/app/pricing?plan=core&source=ci']) {
      const { response, body } = await get(path);
      assert.equal(response.status, 200, `App proxy ${path}`);
      assert.deepEqual(JSON.parse(body), { synthetic: true, path }, `App proxy path/query ${path}`);
    }
    assert.equal((await get('/__iron_compass_missing_ci_route__')).response.status, 404, 'Unknown route must remain 404');
    const version = await get('/source-version.json');
    assert.equal(version.response.status, 200, 'Source artifact');
    const source = JSON.parse(version.body);
    if (process.env.SOURCE_STATUS_COMMIT) assert.equal(source.sourceCommit, process.env.SOURCE_STATUS_COMMIT, 'Built source identity');
    assert.equal(source.metadataConflict, false, 'Conflicting build metadata');
    console.log(JSON.stringify({ result: 'PASS', pageChecks: pages.size, sitemapUrls: paths.length, redirects: redirects.length, assets: assetPaths.size, localRequests: checks, sourceCommit: source.sourceCommit, exactCommitBuild: source.exactCommitBuild, limits: 'Local HTTP/HTML checks only; no browser interactions, real account, billing, or live backend tests.' }, null, 2));
  } finally {
    if (server?.pid && server.exitCode === null && server.signalCode === null) {
      const stopped = once(server, 'exit');
      server.kill('SIGTERM');
      const timer = setTimeout(() => server.kill('SIGKILL'), 5000);
      timer.unref();
      await stopped;
      clearTimeout(timer);
    }
    upstream.closeAllConnections();
    await new Promise((resolve) => upstream.close(resolve));
  }
}

if (process.argv[1] && pathToFileURL(process.argv[1]).href === import.meta.url) {
  main().catch((error) => { console.error(error); process.exitCode = 1; });
}
