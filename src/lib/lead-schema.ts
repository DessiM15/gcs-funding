import { z } from "zod";

/**
 * Three lead paths, each asking only the qualifying questions that matter for
 * that offer. Shared contact fields live in `baseFields`.
 */
export const LEAD_PATHS = {
  partner: {
    id: "partner",
    label: "I want to offer financing to my customers",
    blurb: "Partner program for contractors, practices, and retailers",
  },
  capital: {
    id: "capital",
    label: "I need capital for my business",
    blurb: "Lines of credit, equipment, and commercial trucks",
  },
  processing: {
    id: "processing",
    label: "I need card processing",
    blurb: "Compliant surcharge and high-risk merchant accounts",
  },
} as const;

export type LeadPath = keyof typeof LEAD_PATHS;

const baseFields = {
  path: z.enum(["partner", "capital", "processing"]),
  name: z.string().trim().min(2, "Please enter your name").max(120),
  business: z.string().trim().min(2, "Please enter your business name").max(160),
  email: z.string().trim().email("Please enter a valid email address").max(200),
  phone: z.string().trim().max(40).optional().or(z.literal("")),
  message: z.string().trim().max(2000).optional().or(z.literal("")),
  consent: z.literal(true, {
    message: "Please confirm you agree to be contacted",
  }),
  /**
   * Honeypot. Real users never see this field, so any value means a bot.
   * Named plausibly because scrapers skip fields called "honeypot".
   *
   * Intentionally permissive: the route checks it and returns a success response
   * so the bot never learns which field gave it away.
   */
  company_website: z.string().max(500).optional(),
};

export const leadSchema = z
  .object({
    ...baseFields,
    industry: z.string().trim().max(120).optional().or(z.literal("")),
    averageTicket: z.string().trim().max(60).optional().or(z.literal("")),
    monthlyVolume: z.string().trim().max(60).optional().or(z.literal("")),
    annualRevenue: z.string().trim().max(60).optional().or(z.literal("")),
    timeInBusiness: z.string().trim().max(60).optional().or(z.literal("")),
    fundingAmount: z.string().trim().max(60).optional().or(z.literal("")),
    highRisk: z.string().trim().max(60).optional().or(z.literal("")),
  })
  .superRefine((data, ctx) => {
    // Each path has its own required qualifier so no lead arrives unusable.
    const required: Record<LeadPath, [keyof typeof data, string][]> = {
      partner: [
        ["industry", "Please tell us your industry"],
        ["averageTicket", "Please select an average ticket range"],
      ],
      capital: [
        ["fundingAmount", "Please select how much you are looking for"],
        ["timeInBusiness", "Please select your time in business"],
      ],
      processing: [["monthlyVolume", "Please select your monthly card volume"]],
    };

    for (const [field, message] of required[data.path]) {
      if (!data[field]) {
        ctx.addIssue({ code: "custom", path: [field as string], message });
      }
    }
  });

export type LeadInput = z.infer<typeof leadSchema>;
