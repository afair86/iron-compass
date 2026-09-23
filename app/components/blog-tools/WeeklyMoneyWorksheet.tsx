"use client";

import { useId, useMemo, useState } from "react";
import EmailCaptureForm from "@/app/components/EmailCaptureForm";
import {
  downloadTextFile,
  formatMoney,
  monthlyToWeekly,
  parseMoney,
  printToolResult,
  weeklyToMonthly,
} from "@/lib/blogPracticalTools";

type Line = { id: string; label: string; amount: string; period: "weekly" | "monthly" };

function newLine(period: "weekly" | "monthly" = "weekly", id?: string): Line {
  return {
    id: id ?? `row-${Date.now().toString(36)}-${Math.floor(Math.random() * 1e6).toString(36)}`,
    label: "",
    amount: "",
    period,
  };
}

function toWeekly(line: Line): number | null {
  const n = parseMoney(line.amount);
  if (n === null) return null;
  return line.period === "weekly" ? n : monthlyToWeekly(n);
}

export default function WeeklyMoneyWorksheet() {
  const baseId = useId();
  const [income, setIncome] = useState<Line[]>(() => [newLine("weekly", "income-0")]);
  const [essentials, setEssentials] = useState<Line[]>(() => [
    newLine("monthly", "ess-0"),
    newLine("weekly", "ess-1"),
  ]);
  const [optional, setOptional] = useState<Line[]>(() => [newLine("weekly", "opt-0")]);
  const [upcomingBills, setUpcomingBills] = useState("");
  const [priority, setPriority] = useState("");
  const [nextAction, setNextAction] = useState("");
  const [error, setError] = useState("");
  const [ready, setReady] = useState(false);

  const totals = useMemo(() => {
    const sumWeekly = (rows: Line[]) =>
      rows.reduce((acc, row) => {
        const w = toWeekly(row);
        return w === null ? acc : acc + w;
      }, 0);

    const incomeW = sumWeekly(income);
    const essW = sumWeekly(essentials);
    const optW = sumWeekly(optional);
    const leftoverW = incomeW - essW - optW;
    return {
      incomeW,
      essW,
      optW,
      leftoverW,
      incomeM: weeklyToMonthly(incomeW),
      essM: weeklyToMonthly(essW),
      optM: weeklyToMonthly(optW),
      leftoverM: weeklyToMonthly(leftoverW),
    };
  }, [income, essentials, optional]);

  const updateRow = (
    rows: Line[],
    setRows: (rows: Line[]) => void,
    id: string,
    patch: Partial<Line>,
  ) => {
    setRows(rows.map((r) => (r.id === id ? { ...r, ...patch } : r)));
    setError("");
  };

  const validateAmounts = (rows: Line[], group: string) => {
    for (const row of rows) {
      if (!row.amount.trim() && !row.label.trim()) continue;
      if (row.amount.trim() && parseMoney(row.amount) === null) {
        return `Check ${group}: enter a valid amount (e.g. 120 or 120.50), or clear the field.`;
      }
    }
    return null;
  };

  const build = () => {
    const msg =
      validateAmounts(income, "income") ||
      validateAmounts(essentials, "essentials") ||
      validateAmounts(optional, "optional spending");
    if (msg) {
      setError(msg);
      setReady(false);
      return;
    }
    if (!nextAction.trim()) {
      setError("Add one achievable next action before generating your checklist.");
      setReady(false);
      return;
    }
    setError("");
    setReady(true);
  };

  const checklistText = () => {
    const lines = [
      "Iron Compass — Weekly money check",
      "",
      "Conversion used: monthly = weekly × 52 ÷ 12; weekly = monthly × 12 ÷ 52.",
      "Educational worksheet only — not personalised financial advice.",
      "",
      `Income (weekly equiv.): ${formatMoney(totals.incomeW)} · monthly equiv.: ${formatMoney(totals.incomeM)}`,
      `Essentials (weekly equiv.): ${formatMoney(totals.essW)} · monthly equiv.: ${formatMoney(totals.essM)}`,
      `Optional (weekly equiv.): ${formatMoney(totals.optW)} · monthly equiv.: ${formatMoney(totals.optM)}`,
      `Leftover (weekly equiv.): ${formatMoney(totals.leftoverW)} · monthly equiv.: ${formatMoney(totals.leftoverM)}`,
      "",
      `Upcoming bills / irregular costs: ${upcomingBills.trim() || "(none noted)"}`,
      `This week's financial priority: ${priority.trim() || "(none noted)"}`,
      `Next action: ${nextAction.trim()}`,
      "",
      "Entries stayed in this browser unless you download or print.",
    ];
    return lines.join("\n");
  };

  const renderRows = (
    rows: Line[],
    setRows: (rows: Line[]) => void,
    legend: string,
  ) => (
    <fieldset className="ic-routine__fieldset">
      <legend className="ic-routine__legend">{legend}</legend>
      <div className="space-y-3">
        {rows.map((row, index) => (
          <div key={row.id} className="ic-routine__grid">
            <label className="ic-routine__field" htmlFor={`${baseId}-${row.id}-label`}>
              <span>Label</span>
              <input
                id={`${baseId}-${row.id}-label`}
                type="text"
                value={row.label}
                placeholder={index === 0 ? "e.g. pay / rent" : ""}
                onChange={(e) => updateRow(rows, setRows, row.id, { label: e.target.value })}
              />
            </label>
            <label className="ic-routine__field" htmlFor={`${baseId}-${row.id}-amount`}>
              <span>Amount</span>
              <input
                id={`${baseId}-${row.id}-amount`}
                type="text"
                inputMode="decimal"
                value={row.amount}
                placeholder="e.g. 85"
                onChange={(e) => updateRow(rows, setRows, row.id, { amount: e.target.value })}
              />
            </label>
            <label className="ic-routine__field" htmlFor={`${baseId}-${row.id}-period`}>
              <span>Period</span>
              <select
                id={`${baseId}-${row.id}-period`}
                value={row.period}
                onChange={(e) =>
                  updateRow(rows, setRows, row.id, {
                    period: e.target.value as "weekly" | "monthly",
                  })
                }
              >
                <option value="weekly">Weekly</option>
                <option value="monthly">Monthly</option>
              </select>
            </label>
            <div className="ic-routine__actions">
              <button
                type="button"
                className="ic-btn-ghost text-[0.55rem]"
                onClick={() => {
                  setRows(rows.filter((r) => r.id !== row.id));
                  setError("");
                }}
                disabled={rows.length <= 1}
              >
                Clear row
              </button>
            </div>
          </div>
        ))}
        <button type="button" className="ic-btn-ghost text-[0.55rem]" onClick={() => setRows([...rows, newLine()])}>
          Add row
        </button>
      </div>
    </fieldset>
  );

  return (
    <section className="ic-routine" aria-labelledby={`${baseId}-title`}>
      <header className="ic-routine__header">
        <p className="ic-listen__label">Practical worksheet</p>
        <h2 id={`${baseId}-title`} className="ic-routine__title">
          Weekly money worksheet
        </h2>
        <p className="ic-routine__intro">
          Optional totals stay in this browser. Weekly and monthly figures use a clear conversion (×52÷12). This is
          educational — not personalised financial advice. Printed or downloaded copies may contain personal money
          details.
        </p>
      </header>

      <div className="ic-routine__panel space-y-5">
        {renderRows(income, setIncome, "Income (enter weekly or monthly)")}
        {renderRows(essentials, setEssentials, "Essential commitments")}
        {renderRows(optional, setOptional, "Optional spending")}

        <label className="ic-routine__field" htmlFor={`${baseId}-bills`}>
          <span>Upcoming bills / irregular costs (notes)</span>
          <textarea
            id={`${baseId}-bills`}
            rows={3}
            value={upcomingBills}
            onChange={(e) => {
              setUpcomingBills(e.target.value);
              setError("");
            }}
            placeholder="e.g. car rego due next month; irregular overtime pay"
          />
        </label>
        <label className="ic-routine__field" htmlFor={`${baseId}-priority`}>
          <span>One financial priority this week</span>
          <input
            id={`${baseId}-priority`}
            type="text"
            value={priority}
            onChange={(e) => {
              setPriority(e.target.value);
              setError("");
            }}
            placeholder="e.g. cover the buffer top-up"
          />
        </label>
        <label className="ic-routine__field" htmlFor={`${baseId}-next`}>
          <span>One achievable next action</span>
          <input
            id={`${baseId}-next`}
            type="text"
            value={nextAction}
            onChange={(e) => {
              setNextAction(e.target.value);
              setError("");
            }}
            placeholder="e.g. transfer $50 to bills account on Friday"
          />
        </label>

        {error ? (
          <p className="ic-routine__error" role="alert">
            {error}
          </p>
        ) : null}

        <button type="button" className="ic-btn-primary text-[0.62rem]" onClick={build}>
          Generate checklist
        </button>
      </div>

      {ready ? (
        <div className="space-y-5" style={{ marginTop: "1.25rem" }}>
          <article className="ic-routine__result" aria-label="Money checklist">
            <p className="ic-print-checklist-label">Iron Compass · Weekly money checklist</p>
            <h3 className="ic-routine__subheading">Your weekly check</h3>
            <p>
              <strong>Income</strong> — weekly equivalent {formatMoney(totals.incomeW)}; monthly equivalent{" "}
              {formatMoney(totals.incomeM)}.
            </p>
            <p>
              <strong>Essentials</strong> — weekly equivalent {formatMoney(totals.essW)}; monthly equivalent{" "}
              {formatMoney(totals.essM)}.
            </p>
            <p>
              <strong>Optional</strong> — weekly equivalent {formatMoney(totals.optW)}; monthly equivalent{" "}
              {formatMoney(totals.optM)}.
            </p>
            <p>
              <strong>Leftover</strong> — weekly equivalent {formatMoney(totals.leftoverW)}; monthly equivalent{" "}
              {formatMoney(totals.leftoverM)}.
            </p>
            <p>
              <strong>Upcoming / irregular:</strong> {upcomingBills.trim() || "None noted."}
            </p>
            <p>
              <strong>Priority:</strong> {priority.trim() || "None noted."}
            </p>
            <p>
              <strong>Next action:</strong> {nextAction.trim()}
            </p>
            <p className="ic-routine__note">
              Conversion: monthly = weekly × 52 ÷ 12. Empty amount rows are ignored. Nothing here is sent for analytics
              or marketing.
            </p>
          </article>
          <div className="ic-routine__actions ic-routine__actions--wrap">
            <button type="button" className="ic-btn-ghost text-[0.6rem]" onClick={() => setReady(false)}>
              Edit worksheet
            </button>
            <button type="button" className="ic-btn-ghost text-[0.6rem]" onClick={printToolResult}>
              Print checklist
            </button>
            <button
              type="button"
              className="ic-btn-primary text-[0.62rem]"
              onClick={() => downloadTextFile("iron-compass-weekly-money-check.txt", checklistText())}
            >
              Download checklist
            </button>
          </div>
          <div className="ic-routine__subscribe">
            <h3 className="ic-routine__subheading">Optional follow-up</h3>
            <p>Want more practical money habits later? Subscribe — the worksheet above does not require an account.</p>
            <EmailCaptureForm
              source="blog-weekly-money-check"
              buttonLabel="Subscribe"
              successMessage="You're on the list."
            />
          </div>
        </div>
      ) : null}
    </section>
  );
}
