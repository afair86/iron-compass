import assert from 'node:assert/strict';
import test from 'node:test';
import { readFileSync } from 'node:fs';
import { parseMoney, isCalculableMoney, weeklyToMonthly, monthlyToWeekly, formatMoney } from '../lib/blogPracticalTools.ts';

test('Money input rejects non-finite and unsafe minor-unit values without rejecting normal cents',()=>{
  for(const value of ['0','0.01','1.10','-0.07','1,150','$95.00'])assert.notEqual(parseMoney(value),null,value);
  for(const value of ['9'.repeat(307),'9007199254740992','12.345','Infinity','NaN','1e20'])assert.equal(parseMoney(value),null,value);
  for(const value of [Infinity,-Infinity,NaN,Number.MAX_VALUE,Number.MAX_SAFE_INTEGER])assert.equal(isCalculableMoney(value),false);
  assert(isCalculableMoney(weeklyToMonthly(1150)));
  assert(!isCalculableMoney(weeklyToMonthly(Number.MAX_SAFE_INTEGER/100)),'period conversion can exceed safe range even if input does not');
});

test('Published worked example agrees with worksheet using unrounded conversions',()=>{
  const essentials=monthlyToWeekly(2200)+180+70+monthlyToWeekly(260);
  const optional=95+monthlyToWeekly(45);
  const weekly=1150-essentials-optional;
  assert.equal(formatMoney(weekly),'$226.92');
  assert.equal(formatMoney(weeklyToMonthly(weekly)),'$983.33');
  const article=readFileSync('content/blog/weekly-money-check-20-minutes.mdx','utf8');
  assert(article.includes('$226.92')&&article.includes('$983.33'));
  assert(!article.includes('$226.93')&&!article.includes('$983.36'));
  assert(article.includes('unrounded conversions'));
  assert(article.includes('listenAudio: false'),'no new mismatched narration exposed');
});
