import assert from 'node:assert/strict';
import test from 'node:test';
import { brandedChecklistHtml } from '../lib/blogPracticalTools.ts';

test('saved copies preserve content within self-contained branded screen and print styles', () => {
  const html = brandedChecklistHtml('My weekly checklist\n\nPriority: finish the draft\nNext action: outline\n\nReview: Friday');
  assert(html.includes('<title>My weekly checklist</title>'));
  assert(html.includes('Priority: finish the draft\nNext action: outline'));
  assert(html.includes('Review: Friday'));
  assert(html.includes('IRON COMPASS'));
  assert(html.includes('@media print'));
  assert(!html.includes('<script'));
});

test('personal text cannot become executable markup in a saved copy', () => {
  const html = brandedChecklistHtml('<img src=x onerror=alert(1)>\n\n</section><script>alert(1)</script> & "quoted"');
  assert(!html.includes('<script>'));
  assert(!html.includes('<img src=x'));
  assert(html.includes('&lt;script&gt;'));
  assert(html.includes('&amp; &quot;quoted&quot;'));
});
