// B2B / "For business" content — how David can be engaged commercially.
// The message: he is flexible on contracting structure and can work with a
// company's preferred procurement, payment and compliance processes.

export interface EngagementModel {
  slug: string;
  title: string;
  summary: string;
  bestFor: string;
  iconPath: string;
}

export const engagementModels: EngagementModel[] = [
  {
    slug: "ltd-day-rate",
    title: "Day-rate via my limited company",
    summary:
      "Contract through my UK limited company on a day rate, inside or outside IR35. You receive a single monthly invoice — no agency markup, no umbrella deductions on your side.",
    bestFor: "Ongoing delivery, embedded squads, multi-month programmes",
    iconPath:
      "M4 7h16v12H4V7zm0-3h16v2H4V4zm3 6v6m5-6v6m5-6v6",
  },
  {
    slug: "fixed-price",
    title: "Fixed-price statement of work",
    summary:
      "A scoped deliverable for a fixed fee against clear acceptance criteria. Useful when finance needs cost certainty up front and the outcome is well-defined.",
    bestFor: "PoCs, audits, migrations, defined build work",
    iconPath:
      "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z",
  },
  {
    slug: "retained-advisory",
    title: "Retained advisory",
    summary:
      "A set number of days each month for architecture reviews, escalation, and decision support — so your team has a senior IAM voice on call without a full-time hire.",
    bestFor: "Lean security teams that need senior cover",
    iconPath:
      "M12 8v4l3 2m6-2a9 9 0 11-18 0 9 9 0 0118 0z",
  },
  {
    slug: "via-your-supplier",
    title: "Through your preferred supplier",
    summary:
      "If procurement requires it, I can deliver as a subcontractor through your existing partner, framework or contracting body — including government and defence-adjacent routes.",
    bestFor: "Public sector, frameworks, established vendor lists",
    iconPath:
      "M3 7l9-4 9 4-9 4-9-4zm0 5l9 4 9-4m-18 5l9 4 9-4",
  },
];

export interface BusinessAssurance {
  label: string;
  detail: string;
}

export const assurances: BusinessAssurance[] = [
  {
    label: "Incorporated & insured",
    detail:
      "Engage a registered UK limited company, not a sole trader — with professional indemnity and public liability cover available on request.",
  },
  {
    label: "Contracts & NDAs",
    detail:
      "Happy to work under your MSA, SOW and NDA. I'll sign your paper before any commercially sensitive material changes hands.",
  },
  {
    label: "IR35 flexible",
    detail:
      "Comfortable with inside- or outside-IR35 determinations and SDS processes. I won't push back on a fair, well-reasoned assessment.",
  },
  {
    label: "Clean invoicing",
    detail:
      "One clear monthly invoice with agreed payment terms. VAT handled correctly. No surprise agency fees layered on top.",
  },
  {
    label: "Right to work & references",
    detail:
      "UK right to work, verifiable client references, and background-check cooperation for regulated or cleared environments.",
  },
  {
    label: "Data handling",
    detail:
      "GDPR-aware by default. I work within your tooling and access policies and follow least-privilege — fitting given the work I do.",
  },
];

export interface WorkingTerm {
  label: string;
  value: string;
}

export const workingTerms: WorkingTerm[] = [
  { label: "Base", value: "London, UK" },
  { label: "Delivery", value: "Remote-first · onsite UK/EU as needed" },
  { label: "Sectors", value: "Commercial + government / regulated" },
  { label: "Typical engagement", value: "2 weeks – 12 months" },
  { label: "Notice to start", value: "Usually within 2–4 weeks" },
  { label: "Contracting", value: "Inside/outside IR35 · SOW · subcontract" },
];
