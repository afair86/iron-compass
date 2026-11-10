import assert from 'node:assert/strict';
import test from 'node:test';
import { readSubscribeRequest, validateSubscribeBody, MAX_SUBSCRIBE_BYTES } from '../lib/subscribeRequest.ts';
import { subscribeEmail, SubscribeError } from '../lib/subscribe.ts';

test('signup body rejects null, arrays and wrong field types without a server exception', () => {
  for (const value of [null, [], false, 12, 'email', {}, { email: 12 }, { email: 'x@y.z', source: false }, { email: 'x@y.z', source: null }, { email: 'a'.repeat(255) }, { email: 'x@y.z', source: 'x'.repeat(81) }]) {
    assert.throws(() => validateSubscribeBody(value), e => e.status === 400);
  }
  assert.deepEqual(validateSubscribeBody({ email: ' X@y.z ', source: ' home ' }), { email: 'X@y.z', source: 'home' });
  assert.equal(validateSubscribeBody({ email: 'x@y.z', source: '' }).source, 'website');
});

test('request media type, malformed JSON, and exact byte boundaries are enforced', async () => {
  const request = (body, type = 'application/json') => new Request('http://localhost/api/subscribe', { method: 'POST', headers: { 'content-type': type }, body });
  await assert.rejects(readSubscribeRequest(request('{}', 'text/plain')), e => e.status === 415);
  await assert.rejects(readSubscribeRequest(request('{')), e => e.status === 400);
  await assert.rejects(readSubscribeRequest(request('null')), e => e.status === 400);
  const valid = JSON.stringify({ email: 'x@y.z' });
  assert.equal((await readSubscribeRequest(request(valid.padEnd(MAX_SUBSCRIBE_BYTES, ' '), 'application/json; charset=utf-8'))).email, 'x@y.z');
  await assert.rejects(readSubscribeRequest(request(valid.padEnd(MAX_SUBSCRIBE_BYTES + 1, ' '))), e => e.status === 413);
  await assert.rejects(readSubscribeRequest(request(JSON.stringify({ email: 'é'.repeat(3000) }))), e => e.status === 413);
});

test('chunked and understated-length payloads cannot bypass body limit', async () => {
  const stream = new ReadableStream({ start(c) { c.enqueue(new Uint8Array(2048)); c.enqueue(new Uint8Array(2049)); c.close(); } });
  await assert.rejects(readSubscribeRequest(new Request('http://localhost', { method: 'POST', headers: { 'content-type': 'application/json', 'content-length': '1' }, body: stream, duplex: 'half' })), e => e.status === 413);
  await assert.rejects(readSubscribeRequest(new Request('http://localhost', { method: 'POST', headers: { 'content-type': 'application/json', 'content-length': '5000' }, body: '{}' })), e => e.status === 413);
});

test('provider normalization, success, failure, timeout and duplicate semantics use fixtures only', async t => {
  const saved = Object.fromEntries(['SUBSCRIBE_WEBHOOK_URL', 'RESEND_API_KEY', 'RESEND_AUDIENCE_ID'].map(k => [k, process.env[k]]));
  t.after(() => { for (const [k,v] of Object.entries(saved)) { if (v === undefined) delete process.env[k]; else process.env[k] = v; } });
  process.env.SUBSCRIBE_WEBHOOK_URL = 'https://example.invalid/signup';
  delete process.env.RESEND_API_KEY; delete process.env.RESEND_AUDIENCE_ID;
  let calls = 0;
  const mocked = t.mock.method(globalThis, 'fetch', async (url, options) => {
    calls++;
    assert.equal(url, 'https://example.invalid/signup');
    assert.equal(options.redirect, 'error');
    assert(options.signal instanceof AbortSignal);
    assert.equal(JSON.parse(options.body).email, 'x@example.invalid');
    return new Response('', { status: 200 });
  });
  assert.deepEqual(await subscribeEmail(' X@EXAMPLE.INVALID '), { ok: true, provider: 'webhook' });
  await assert.rejects(subscribeEmail('invalid'), e => e.status === 400);
  assert.equal(calls, 1, 'invalid addresses never contact provider');
  mocked.mock.mockImplementation(async () => new Response('', { status: 500 }));
  await assert.rejects(subscribeEmail('x@example.invalid'), e => e.status === 502);
  mocked.mock.mockImplementation(async () => { throw new Error('fixture network failure'); });
  await assert.rejects(subscribeEmail('x@example.invalid'), e => e instanceof SubscribeError && e.status === 502);
  const timeout = t.mock.method(AbortSignal, 'timeout', () => AbortSignal.abort(new DOMException('fixture', 'TimeoutError')));
  await assert.rejects(subscribeEmail('x@example.invalid'), e => e.status === 504);
  timeout.mock.restore();
  mocked.mock.mockImplementation(async () => new Response('', { status: 409 }));
  await assert.rejects(subscribeEmail('x@example.invalid'), e => e.status === 502, 'webhook conflict is not silently accepted');
  delete process.env.SUBSCRIBE_WEBHOOK_URL;
  await assert.rejects(subscribeEmail('x@example.invalid'), e => e.status === 503);
  process.env.RESEND_API_KEY = 'fixture-not-a-key'; process.env.RESEND_AUDIENCE_ID = 'fixture';
  assert.deepEqual(await subscribeEmail('x@example.invalid'), { ok: true, provider: 'resend' });
});
