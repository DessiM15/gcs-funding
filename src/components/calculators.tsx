"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { buttonClass } from "@/components/ui/primitives";
import { formatCurrency } from "@/lib/utils";

/** Shared slider control. */
function Slider({
  label,
  value,
  min,
  max,
  step,
  onChange,
  format,
  hint,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  onChange: (value: number) => void;
  format: (value: number) => string;
  hint?: string;
}) {
  return (
    <div>
      <div className="flex items-baseline justify-between gap-4">
        <label className="text-sm font-semibold text-ink-800">{label}</label>
        <span className="font-display text-lg font-bold text-ink-900">
          {format(value)}
        </span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(event) => onChange(Number(event.target.value))}
        aria-label={label}
        className="mt-3 h-1.5 w-full cursor-pointer appearance-none rounded-full bg-ink-100 accent-[var(--color-brand-500)]"
      />
      {hint ? <p className="mt-2 text-xs text-ink-400">{hint}</p> : null}
    </div>
  );
}

function ResultCard({
  headline,
  value,
  caption,
}: {
  headline: string;
  value: string;
  caption: string;
}) {
  return (
    <div className="rounded-3xl border border-ink-100 bg-gradient-to-br from-brand-50 to-azure-50 p-8 text-center">
      <p className="text-[0.7rem] font-bold uppercase tracking-[0.14em] text-brand-700">
        {headline}
      </p>
      <p className="mt-3 font-display text-4xl font-extrabold tracking-tight text-ink-900 sm:text-5xl">
        {value}
      </p>
      <p className="mt-3 text-sm leading-relaxed text-ink-500">{caption}</p>
    </div>
  );
}

/**
 * Surcharge savings.
 *
 * Models what a merchant currently pays in processing versus a compliant
 * surcharge program where the cardholder covers the fee. Uses the 3.5% program
 * fee GCS actually runs, and assumes a share of volume is credit rather than
 * debit, since debit is not surchargeable.
 */
export function SurchargeCalculator() {
  const [volume, setVolume] = useState(45_000);
  const [rate, setRate] = useState(3.1);
  const [creditShare, setCreditShare] = useState(70);

  const { monthly, annual } = useMemo(() => {
    const currentMonthlyCost = volume * (rate / 100);
    // Only the credit-card portion of volume can carry a surcharge.
    const recovered = volume * (creditShare / 100) * (rate / 100);
    const monthly = Math.max(0, Math.min(currentMonthlyCost, recovered));
    return { monthly, annual: monthly * 12 };
  }, [volume, rate, creditShare]);

  return (
    <div className="grid gap-8 lg:grid-cols-[1.1fr_1fr]">
      <div className="space-y-8 rounded-3xl border border-ink-100 bg-white p-8">
        <Slider
          label="Monthly card volume"
          value={volume}
          min={5_000}
          max={200_000}
          step={1_000}
          onChange={setVolume}
          format={formatCurrency}
          hint="Total credit and debit processed each month."
        />
        <Slider
          label="Current effective rate"
          value={rate}
          min={1.5}
          max={4.5}
          step={0.05}
          onChange={setRate}
          format={(value) => `${value.toFixed(2)}%`}
          hint="Total fees divided by total volume on your statement, not the quoted rate."
        />
        <Slider
          label="Share of volume paid by credit card"
          value={creditShare}
          min={30}
          max={100}
          step={5}
          onChange={setCreditShare}
          format={(value) => `${value}%`}
          hint="Debit transactions cannot be surcharged, so only credit volume counts."
        />
      </div>

      <div className="space-y-4">
        <ResultCard
          headline="Estimated annual recovery"
          value={formatCurrency(annual)}
          caption={`About ${formatCurrency(monthly)} a month in processing cost moved off your P&L and onto the cardholder who chose to pay by credit.`}
        />

        <div className="rounded-3xl border border-ink-100 bg-white p-7">
          <p className="text-sm leading-relaxed text-ink-500">
            This is an estimate, not a quote. Actual recovery depends on your card
            mix, ticket sizes, interchange, and the surcharge rules that apply in
            your state. Under our program the cardholder pays a 3.5% program fee
            and you receive 100% of the sale.
          </p>
          <Link
            href="/contact"
            className={buttonClass({
              variant: "brand",
              size: "md",
              className: "mt-6 w-full",
            })}
          >
            Get a real statement review <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}

/**
 * Financing impact.
 *
 * Two effects drive the result: financing closes deals that price would have
 * killed, and it raises the average ticket because buyers evaluate a monthly
 * payment rather than a lump sum. Both uplifts are user-adjustable and default
 * to deliberately conservative values.
 */
export function FinancingImpactCalculator() {
  const [quotes, setQuotes] = useState(30);
  const [ticket, setTicket] = useState(12_000);
  const [closeRate, setCloseRate] = useState(30);
  const [closeUplift, setCloseUplift] = useState(8);
  const [ticketUplift, setTicketUplift] = useState(15);

  const { current, projected, gain } = useMemo(() => {
    const current = quotes * (closeRate / 100) * ticket;
    const newCloseRate = Math.min(100, closeRate + closeUplift);
    const newTicket = ticket * (1 + ticketUplift / 100);
    const projected = quotes * (newCloseRate / 100) * newTicket;
    return { current, projected, gain: projected - current };
  }, [quotes, ticket, closeRate, closeUplift, ticketUplift]);

  return (
    <div className="grid gap-8 lg:grid-cols-[1.1fr_1fr]">
      <div className="space-y-8 rounded-3xl border border-ink-100 bg-white p-8">
        <Slider
          label="Quotes or estimates per month"
          value={quotes}
          min={5}
          max={200}
          step={5}
          onChange={setQuotes}
          format={(value) => String(value)}
        />
        <Slider
          label="Average ticket"
          value={ticket}
          min={1_000}
          max={100_000}
          step={500}
          onChange={setTicket}
          format={formatCurrency}
        />
        <Slider
          label="Current close rate"
          value={closeRate}
          min={5}
          max={80}
          step={1}
          onChange={setCloseRate}
          format={(value) => `${value}%`}
        />
        <Slider
          label="Close rate lift from offering financing"
          value={closeUplift}
          min={0}
          max={25}
          step={1}
          onChange={setCloseUplift}
          format={(value) => `+${value} pts`}
          hint="Deals lost purely to price that a monthly payment recovers."
        />
        <Slider
          label="Average ticket lift"
          value={ticketUplift}
          min={0}
          max={50}
          step={1}
          onChange={setTicketUplift}
          format={(value) => `+${value}%`}
          hint="Buyers evaluating a payment tend to keep the upgrades in scope."
        />
      </div>

      <div className="space-y-4">
        <ResultCard
          headline="Additional annual revenue"
          value={formatCurrency(gain * 12)}
          caption={`${formatCurrency(current)} a month today, ${formatCurrency(projected)} with financing offered at the point of sale.`}
        />

        <div className="rounded-3xl border border-ink-100 bg-white p-7">
          <p className="text-sm leading-relaxed text-ink-500">
            The uplift figures are yours to set, and the defaults are intentionally
            conservative. The mechanics behind them are not theoretical: approvals
            run down to a 500 FICO, offers come back in about ten seconds on a soft
            pull, and your business is paid within 24 hours.
          </p>
          <Link
            href="/contact"
            className={buttonClass({
              variant: "brand",
              size: "md",
              className: "mt-6 w-full",
            })}
          >
            Set up your program <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
