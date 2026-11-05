import assert from 'node:assert/strict';
import test from 'node:test';
import { extractFaqFromMarkdown } from '../lib/blog.ts';

test('heading FAQs retain complete answers and stop before the next section', () => {
  const markdown = 'Intro\n\n## FAQ\n\n### How long does it take?\n\nUse twenty minutes.\n\nUse five when needed.\n\n### Can I move the review?\n\nYes, choose a realistic slot.\n\n## Related reading\n\nNot part of an answer.';
  assert.deepEqual(extractFaqFromMarkdown(markdown), [
    { question: 'How long does it take?', answer: 'Use twenty minutes.\n\nUse five when needed.' },
    { question: 'Can I move the review?', answer: 'Yes, choose a realistic slot.' },
  ]);
});

test('heading FAQs work with Windows line endings and exclude old inline schema', () => {
  assert.deepEqual(extractFaqFromMarkdown('## FAQs\r\n\r\n### Can I start today?\r\n\r\nChoose one action.\r\n\r\n<script type="application/ld+json">old</script>'), [
    { question: 'Can I start today?', answer: 'Choose one action.' },
  ]);
});

test('existing bold FAQ forms still work and unrelated content yields none', () => {
  assert.deepEqual(extractFaqFromMarkdown('## FAQ\n\n**Can I use paper?**\nYes, use a notebook.\n\n**Does it cost anything?**\nThe checklist is free.'), [
    { question: 'Can I use paper?', answer: 'Yes, use a notebook.' },
    { question: 'Does it cost anything?', answer: 'The checklist is free.' },
  ]);
  assert.deepEqual(extractFaqFromMarkdown('## FAQ\n\n**Q: Can I start?**\nA: Choose one action.'), [
    { question: 'Can I start?', answer: 'Choose one action.' },
  ]);
  assert.deepEqual(extractFaqFromMarkdown('## Practical guide\n\n### What now?\n\nNo FAQ section.'), []);
});
