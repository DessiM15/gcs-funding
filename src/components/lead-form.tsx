"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ArrowLeft, ArrowRight, Check, Loader2 } from "lucide-react";
import { LEAD_PATHS, type LeadPath } from "@/lib/lead-schema";
import { Button, buttonClass } from "@/components/ui/primitives";
import { cn } from "@/lib/utils";

/**
 * Three-step branching enquiry form.
 *
 * Step 1 segments the visitor, step 2 asks only the qualifiers that matter for
 * that segment, step 3 collects contact details. Splitting it this way keeps any
 * single screen short, which is what lifts completion rates over one long form,
 * and it means every lead that reaches the inbox is already qualified.
 */

type FieldOption = { name: string; label: string; options: string[] };

const PATH_FIELDS: Record<LeadPath, FieldOption[]> = {
  partner: [
    {
      name: "industry",
      label: "What kind of business do you run?",
      options: [
        "Pool builder / outdoor living",
        "HVAC",
        "Roofing",
        "Remodeling / home improvement",
        "Landscaping",
        "Medical / med spa",
        "Dental",
        "Auto sales or repair",
        "Retail",
        "Other",
      ],
    },
    {
      name: "averageTicket",
      label: "What is your average ticket?",
      options: [
        "Under $2,500",
        "$2,500 – $10,000",
        "$10,000 – $25,000",
        "$25,000 – $50,000",
        "$50,000+",
      ],
    },
  ],
  capital: [
    {
      name: "fundingAmount",
      label: "How much funding are you looking for?",
      options: [
        "Under $50,000",
        "$50,000 – $100,000",
        "$100,000 – $200,000",
        "$200,000 – $300,000",
        "Equipment or truck financing",
      ],
    },
    {
      name: "timeInBusiness",
      label: "How long have you been in business?",
      options: ["Under 6 months", "6 – 12 months", "1 – 3 years", "3+ years"],
    },
    {
      name: "annualRevenue",
      label: "Approximate annual revenue",
      options: [
        "Under $100,000",
        "$100,000 – $250,000",
        "$250,000 – $1M",
        "$1M+",
      ],
    },
  ],
  processing: [
    {
      name: "monthlyVolume",
      label: "Monthly credit card volume",
      options: [
        "Under $10,000",
        "$10,000 – $50,000",
        "$50,000 – $100,000",
        "$100,000+",
      ],
    },
    {
      name: "highRisk",
      label: "Have you been declined or dropped by a processor before?",
      options: ["Yes", "No", "Not sure"],
    },
  ],
};

type Values = Record<string, string | boolean>;

export function LeadForm({ defaultPath }: { defaultPath?: LeadPath }) {
  const router = useRouter();
  const reduced = useReducedMotion();

  const [step, setStep] = useState(defaultPath ? 1 : 0);
  const [values, setValues] = useState<Values>({ path: defaultPath ?? "" });
  const [errors, setErrors] = useState<Record<string, string[]>>({});
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  const path = values.path as LeadPath | "";
  const fields = path ? PATH_FIELDS[path] : [];

  const set = (name: string, value: string | boolean) => {
    setValues((current) => ({ ...current, [name]: value }));
    setErrors((current) => ({ ...current, [name]: [] }));
  };

  const choosePath = (next: LeadPath) => {
    set("path", next);
    setStep(1);
  };

  const qualifiersComplete = fields
    .slice(0, 2)
    .every((field) => Boolean(values[field.name]));

  async function onSubmit(event: React.FormEvent) {
    event.preventDefault();
    setSubmitting(true);
    setFormError(null);

    try {
      const response = await fetch("/api/lead", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(values),
      });

      const data = await response.json();

      if (!response.ok) {
        setErrors(data.issues ?? {});
        setFormError(data.error ?? "Something went wrong. Please try again.");
        // Send the visitor back to the step that actually holds the problem.
        if (data.issues && fields.some((f) => data.issues[f.name])) setStep(1);
        return;
      }

      router.push("/thank-you");
    } catch {
      setFormError(
        "We could not reach the server. Please try again, or email info@gcsfunding.com.",
      );
    } finally {
      setSubmitting(false);
    }
  }

  const transition = reduced
    ? { duration: 0 }
    : { duration: 0.32, ease: [0.16, 1, 0.3, 1] as const };

  return (
    <form onSubmit={onSubmit} className="w-full">
      <ProgressDots step={step} />

      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={step}
          initial={{ opacity: 0, x: reduced ? 0 : 16 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: reduced ? 0 : -16 }}
          transition={transition}
        >
          {step === 0 ? (
            <fieldset>
              <legend className="text-xl font-bold text-ink sm:text-2xl">
                First, what brings you here?
              </legend>
              <p className="mt-2 text-[0.95rem] text-ink-soft">
                This tells us which questions are worth your time.
              </p>

              <div className="mt-6 grid gap-3">
                {Object.values(LEAD_PATHS).map((option) => (
                  <button
                    key={option.id}
                    type="button"
                    onClick={() => choosePath(option.id)}
                    className="group flex items-center justify-between gap-4 border border-hairline bg-white p-5 text-left transition-all duration-200 hover:-translate-y-0.5 hover:border-accent hover:"
                  >
                    <span>
                      <span className="block font-semibold text-ink">
                        {option.label}
                      </span>
                      <span className="mt-1 block text-sm text-ink-soft">
                        {option.blurb}
                      </span>
                    </span>
                    <ArrowRight className="h-5 w-5 shrink-0 text-ink-soft transition-all group-hover:translate-x-1 group-hover:text-accent-ink" />
                  </button>
                ))}
              </div>
            </fieldset>
          ) : null}

          {step === 1 ? (
            <fieldset>
              <legend className="text-xl font-bold text-ink sm:text-2xl">
                Tell us about the business
              </legend>

              <div className="mt-6 space-y-6">
                {fields.map((field) => (
                  <div key={field.name}>
                    <p className="text-sm font-semibold text-ink">
                      {field.label}
                    </p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {field.options.map((option) => {
                        const active = values[field.name] === option;
                        return (
                          <button
                            key={option}
                            type="button"
                            aria-pressed={active}
                            onClick={() => set(field.name, option)}
                            className={cn(
                              "border px-4 py-2.5 text-sm font-medium transition-all duration-200",
                              active
                                ? "border-accent bg-accent text-void"
                                : "border-hairline bg-white text-ink-soft hover:border-ink-400 hover:text-ink",
                            )}
                          >
                            {option}
                          </button>
                        );
                      })}
                    </div>
                    <FieldError messages={errors[field.name]} />
                  </div>
                ))}
              </div>

              <div className="mt-8 flex items-center gap-3">
                <Button
                  type="button"
                  variant="bare"
                  onClick={() => setStep(0)}
                  className="px-4"
                >
                  <ArrowLeft className="h-4 w-4" /> Back
                </Button>
                <Button
                  type="button"
                  variant="accent"
                  onClick={() => setStep(2)}
                  disabled={!qualifiersComplete}
                  className="flex-1"
                >
                  Continue <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            </fieldset>
          ) : null}

          {step === 2 ? (
            <fieldset>
              <legend className="text-xl font-bold text-ink sm:text-2xl">
                Where should we send your options?
              </legend>

              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                <Field
                  name="name"
                  label="Your name"
                  value={values.name as string}
                  onChange={set}
                  errors={errors.name}
                  autoComplete="name"
                  required
                />
                <Field
                  name="business"
                  label="Business name"
                  value={values.business as string}
                  onChange={set}
                  errors={errors.business}
                  autoComplete="organization"
                  required
                />
                <Field
                  name="email"
                  label="Email address"
                  type="email"
                  value={values.email as string}
                  onChange={set}
                  errors={errors.email}
                  autoComplete="email"
                  required
                />
                <Field
                  name="phone"
                  label="Phone (optional)"
                  type="tel"
                  value={values.phone as string}
                  onChange={set}
                  errors={errors.phone}
                  autoComplete="tel"
                />
              </div>

              <div className="mt-4">
                <label
                  htmlFor="message"
                  className="text-sm font-semibold text-ink"
                >
                  Anything else we should know? (optional)
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={3}
                  value={(values.message as string) ?? ""}
                  onChange={(event) => set("message", event.target.value)}
                  className="mt-2 w-full border border-hairline bg-white px-4 py-3 text-[0.95rem] text-ink outline-none transition-colors placeholder:text-ink-soft focus:border-accent"
                />
              </div>

              {/* Honeypot: hidden from people, irresistible to bots. */}
              <div aria-hidden="true" className="absolute left-[-9999px]">
                <label htmlFor="company_website">Company website</label>
                <input
                  id="company_website"
                  name="company_website"
                  tabIndex={-1}
                  autoComplete="off"
                  onChange={(event) => set("company_website", event.target.value)}
                />
              </div>

              <label className="mt-6 flex cursor-pointer items-start gap-3 border border-hairline bg-bone p-4">
                <input
                  type="checkbox"
                  checked={Boolean(values.consent)}
                  onChange={(event) => set("consent", event.target.checked)}
                  className="mt-0.5 h-4 w-4 shrink-0 accent-[var(--color-accent-deep)]"
                />
                <span className="text-[0.8rem] leading-relaxed text-ink-soft">
                  I agree that GCS Funding may contact me about my enquiry using
                  the details above. I understand this is not an application for
                  credit and that all financing is subject to approval.
                </span>
              </label>
              <FieldError messages={errors.consent} />

              {formError ? (
                <p
                  role="alert"
                  className="mt-4 bg-red-50 px-4 py-3 text-sm font-medium text-red-700"
                >
                  {formError}
                </p>
              ) : null}

              <div className="mt-6 flex items-center gap-3">
                <Button
                  type="button"
                  variant="bare"
                  onClick={() => setStep(1)}
                  className="px-4"
                >
                  <ArrowLeft className="h-4 w-4" /> Back
                </Button>
                <button
                  type="submit"
                  disabled={submitting}
                  className={buttonClass({
                    variant: "accent",
                    size: "lg",
                    className: "flex-1",
                  })}
                >
                  {submitting ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" /> Sending
                    </>
                  ) : (
                    <>
                      Send my request <Check className="h-4 w-4" />
                    </>
                  )}
                </button>
              </div>

              <p className="mt-4 text-center text-xs text-ink-soft">
                We reply within one business day. No obligation, and checking
                options does not affect your credit.
              </p>
            </fieldset>
          ) : null}
        </motion.div>
      </AnimatePresence>
    </form>
  );
}

function ProgressDots({ step }: { step: number }) {
  return (
    <ol className="mb-7 flex items-center gap-2" aria-label="Progress">
      {["Your goal", "Your business", "Your details"].map((label, index) => (
        <li key={label} className="flex flex-1 flex-col gap-2">
          <span
            className={cn(
              "h-1 transition-colors duration-300",
              index <= step ? "bg-accent" : "bg-hairline",
            )}
          />
          <span
            className={cn(
              "text-[0.7rem] font-semibold uppercase tracking-[0.1em] transition-colors",
              index <= step ? "text-accent-ink" : "text-ink-soft",
            )}
          >
            {label}
          </span>
        </li>
      ))}
    </ol>
  );
}

function Field({
  name,
  label,
  value,
  onChange,
  errors,
  type = "text",
  required,
  autoComplete,
}: {
  name: string;
  label: string;
  value?: string;
  onChange: (name: string, value: string) => void;
  errors?: string[];
  type?: string;
  required?: boolean;
  autoComplete?: string;
}) {
  return (
    <div>
      <label htmlFor={name} className="text-sm font-semibold text-ink">
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        autoComplete={autoComplete}
        value={value ?? ""}
        aria-invalid={errors?.length ? true : undefined}
        onChange={(event) => onChange(name, event.target.value)}
        className="mt-2 w-full border border-hairline bg-white px-4 py-3 text-[0.95rem] text-ink outline-none transition-colors placeholder:text-ink-soft focus:border-accent aria-invalid:border-red-400"
      />
      <FieldError messages={errors} />
    </div>
  );
}

function FieldError({ messages }: { messages?: string[] }) {
  if (!messages?.length) return null;
  return (
    <p className="mt-2 text-xs font-medium text-red-600">{messages[0]}</p>
  );
}
