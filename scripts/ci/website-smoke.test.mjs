import assert from 'node:assert/strict';
import test from 'node:test';
import { attributes, checkPage, checkUpstream, sitemapPaths, checkLaunchedApp } from './website-smoke.mjs';

const html = '<html><head><title>Iron Compass</title><meta content="Useful guidance" name="description"><link href="https://ironcompassai.com/" rel="canonical"><script type="application/ld+json">{"@type":"WebPage"}</script></head><body><h1>One clear heading</h1></body></html>';
test('HTML attributes support both quote styles', () => {
  assert.deepEqual(attributes('<link href="x" rel=\'canonical\'>'), { href: 'x', rel: 'canonical' });
});
test('Valid public HTML passes', () => assert.doesNotThrow(() => checkPage(html, '/')));
test('Missing or repeated H1 fails', () => {
  assert.throws(() => checkPage(html.replace('<h1>One clear heading</h1>', ''), '/'), /one H1/);
  assert.throws(() => checkPage(html.replace('</body>', '<h1>Duplicate</h1></body>'), '/'), /one H1/);
});
test('Incorrect canonical host or noindex fails', () => {
  assert.throws(() => checkPage(html.replace('https://ironcompassai.com/', 'https://example.com/'), '/'), /canonical host/);
  assert.throws(() => checkPage(html.replace('</head>', '<meta name="robots" content="noindex"></head>'), '/'), /noindex/);
});

test('Each page must canonicalise to its own path rather than merely the right host', () => {
  assert.throws(() => checkPage(html, '/pricing'), /canonical path/);
  const pricing = html.replace('https://ironcompassai.com/', 'https://ironcompassai.com/pricing');
  assert.doesNotThrow(() => checkPage(pricing, '/pricing'));
  assert.doesNotThrow(() => checkPage(pricing, '/pricing/?source=fixture'));
});

test('Root-domain and start destinations cannot silently resolve under /blog',()=>{
  for(const href of ['domains/purpose','domains/finance-provision','start','start#common-questions']){
    assert.throws(()=>checkPage(html.replace('</body>',`<a href="${href}">Guide</a></body>`),'/'),/incorrectly relative/);
  }
  assert.doesNotThrow(()=>checkPage(html.replace('</body>','<a href="/domains/purpose-direction">Guide</a><a href="/start">Start</a></body>'),'/'));
});
test('Malformed structured data fails', () => assert.throws(() => checkPage(html.replace('{"@type":"WebPage"}', '{invalid}'), '/')));
test('Sitemap returns local paths and rejects external, empty and duplicate entries', () => {
  assert.deepEqual(sitemapPaths('<loc>https://ironcompassai.com/a?x=1&amp;y=2</loc>'), ['/a?x=1&y=2']);
  assert.throws(() => sitemapPaths('<loc>https://example.com/</loc>'), /External/);
  assert.throws(() => sitemapPaths('<urlset/>'), /1-500/);
  assert.throws(() => sitemapPaths('<loc>https://ironcompassai.com/</loc><loc>https://ironcompassai.com/</loc>'), /Duplicate/);
});
test('App rewrite check accepts both manifest formats and rejects live upstreams', () => {
  const rules = ['/app', '/app/:path*'].map((source) => ({ source, destination: `http://127.0.0.1:4311${source}` }));
  assert.doesNotThrow(() => checkUpstream({ rewrites: rules }));
  assert.doesNotThrow(() => checkUpstream({ rewrites: { beforeFiles: [], afterFiles: rules, fallback: [] } }));
  assert.throws(() => checkUpstream({ rewrites: [] }), /two app rewrites/);
  assert.throws(() => checkUpstream({ rewrites: rules.map((rule) => ({ ...rule, destination: 'https://ironcompassai.com/app' })) }), /synthetic/);
});

test('launch acceptance checks real listing, platform, prices and stale messaging',()=>{
 const url='https://apps.apple.com/app/iron-compass-ai/id6822813707';
 const software={'@type':'SoftwareApplication',operatingSystem:['Web','iOS'],downloadUrl:url,offers:[
  {name:'Free',price:'0',priceCurrency:'AUD'}, {name:'Core monthly',price:'19.99',priceCurrency:'AUD'},
  {name:'Core yearly',price:'199',priceCurrency:'AUD'}, {name:'Elite monthly',price:'34.99',priceCurrency:'AUD'},
  {name:'Elite yearly',price:'349',priceCurrency:'AUD'}]};
 const rendered=`<a href="${url}" aria-label="Download Iron Compass AI on the App Store">Badge</a><script type="application/ld+json">${JSON.stringify({'@graph':[software]})}</script>`;
 assert.doesNotThrow(()=>checkLaunchedApp(rendered,'/download'));
 for(const [before,after] of [['id6822813707','id123'],['apps.apple.com','example.com'],['iOS','Android'],['19.99','12'],['34.99','29']])assert.throws(()=>checkLaunchedApp(rendered.replaceAll(before,after),'/download'));
 assert.throws(()=>checkLaunchedApp(rendered+'<p>Apple review pending</p>','/'));
 assert.throws(()=>checkLaunchedApp(rendered.replace(/<a.*?<\/a>/,''),'/download'));
 assert.throws(()=>checkLaunchedApp(rendered.replace(/<script.*?<\/script>/,''),'/download'));
});
