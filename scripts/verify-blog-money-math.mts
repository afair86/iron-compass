import {
  monthlyToWeekly,
  weeklyToMonthly,
  parseMoney,
  formatMoney,
} from "../lib/blogPracticalTools.ts";

function assert(cond: unknown, msg: string): asserts cond {
  if (!cond) throw new Error(msg);
}

assert(parseMoney("1,150") === 1150, "comma");
assert(parseMoney("$95.00") === 95, "currency");
assert(parseMoney("") === null, "empty");
assert(parseMoney("12.345") === null, "too many decimals");
assert(parseMoney("abc") === null, "junk");

// Worked example from weekly money article
const incomeW = 1150;
const rentW = monthlyToWeekly(2200);
const groceriesW = 180;
const transportW = 70;
const loanW = monthlyToWeekly(260);
const takeawayW = 95;
const streamingW = monthlyToWeekly(45);
const essW = rentW + groceriesW + transportW + loanW;
const optW = takeawayW + streamingW;
const leftoverW = incomeW - essW - optW;
const leftoverM = weeklyToMonthly(leftoverW);

assert(Math.abs(rentW - 507.692307) < 0.01, `rentW ${rentW}`);
assert(Math.abs(loanW - 60) < 0.01, `loanW ${loanW}`);
assert(Math.abs(streamingW - 10.384615) < 0.01, `streamingW ${streamingW}`);
assert(Math.abs(essW - 817.692307) < 0.02, `essW ${essW}`);
assert(Math.abs(optW - 105.384615) < 0.02, `optW ${optW}`);
assert(Math.abs(leftoverW - 226.923076) < 0.05, `leftoverW ${leftoverW}`);
assert(Math.abs(leftoverM - 983.333) < 0.5, `leftoverM ${leftoverM}`);
assert(formatMoney(1150).includes("1,150"), "format");

console.log("MONEY_MATH_PASS", { essW, optW, leftoverW, leftoverM, sample: formatMoney(leftoverW) });
