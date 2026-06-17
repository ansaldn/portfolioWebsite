// B2B / "For business" content — how David Ansa can be engaged commercially.
// Written in a neutral, third-person B2B voice (no personal pronouns) and
// includes indicative guide pricing. Prices are guidance only; final
// commercials depend on scope and length.

export interface EngagementModel {
  slug: string;
  title: string;
  /** Indicative guide price, already including the "+ VAT" / fees wording. */
  price: string;
  summary: string;
  bestFor: string;
  iconPath: string;
}

export const engagementModels: EngagementModel[] = [
  {
    slug: "b2b-day-rate",
    title: "B2B day rates",
    price: "From £600/day + VAT",
    summary:
      "Engagement through a registered UK limited company on a day rate, inside or outside IR35. Billing is a single, clean monthly invoice — no agency markup, no umbrella deductions. Best value sits on engagements of six months or more, and the rate is negotiable for longer commitments.",
    bestFor: "Embedded delivery and multi-month programmes (6 months+)",
    iconPath:
      "M4 7h16v12H4V7zm0-3h16v2H4V4zm3 7h2v6H7v-6zm4 0h2v6h-2v-6zm4 0h2v6h-2v-6z",
  },
  {
    slug: "fixed-price",
    title: "Fixed-price / scoped work",
    price: "From £75/hour + VAT",
    summary:
      "For well-defined work, a fixed scope billed by the hour. The deliverable is already known, so the cost simply covers time and expertise against clear acceptance criteria — useful when finance needs cost predictability up front.",
    bestFor: "PoCs, audits, migrations and defined build work",
    iconPath:
      "M12 2l9 4v6c0 5-3.5 8.5-9 10-5.5-1.5-9-5-9-10V6l9-4zm-1.2 13.2l5-5-1.4-1.4-3.6 3.6-1.6-1.6L7.8 12l3 3.2z",
  },
  {
    slug: "retained-advisory",
    title: "Retained advisory",
    price: "From £1,200/month + VAT",
    summary:
      "A set block of senior IAM time each month — architecture reviews, escalation cover, and decision support — so a lean security team has a senior voice on call without the cost of a full-time hire. Unused time rolls over one month. The most accessible way to start, and the easiest to scale up as needs grow.",
    bestFor: "Ongoing senior cover for lean teams (≈2 days / month)",
    iconPath:
      "M12 2a10 10 0 100 20 10 10 0 000-20zm1 5h-2v6l5 3 1-1.7-4-2.4V7z",
  },
  {
    slug: "via-your-supplier",
    title: "Via your preferred supplier",
    price: "From £600/day + supplier fees",
    summary:
      "Already have a preferred supplier, framework or approved vendor list? Delivery can run as a subcontractor through them — no new vendor onboarding, no disruption to existing contracts, and vendor management, paperwork and compliance all stay exactly where they are. The day rate applies, with the supplier's fees layered on top. The draw here is zero procurement friction, not the headline number.",
    bestFor: "Public sector, frameworks and established vendor lists",
    iconPath:
      "M3 7l9-4 9 4-9 4-9-4zm0 5l9 4 9-4-2.5-1.1L12 13.7 5.5 10.9 3 12zm0 5l9 4 9-4-2.5-1.1L12 18.7 5.5 15.9 3 17z",
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
      "Work is delivered through a registered UK limited company — not a sole trader — with professional indemnity and public liability cover available on request.",
  },
  {
    label: "Contracts & NDAs",
    detail:
      "Engagements run under the client's MSA, SOW and NDA. Paperwork is signed before any commercially sensitive material changes hands.",
  },
  {
    label: "IR35 flexible",
    detail:
      "Comfortable with inside- or outside-IR35 determinations and the SDS process. A fair, well-reasoned assessment won't be a sticking point.",
  },
  {
    label: "Clean invoicing",
    detail:
      "One clear monthly invoice on agreed payment terms, with VAT handled correctly — and no surprise agency fees layered on top.",
  },
  {
    label: "Right to work & references",
    detail:
      "UK right to work, verifiable client references, and cooperation with background checks for regulated or security-cleared environments.",
  },
  {
    label: "Data handling",
    detail:
      "GDPR-aware by default. Work stays inside the client's own tooling and access policies and follows least-privilege — fitting, given the nature of the work.",
  },
  {
    label: "Security clearance",
    detail:
      "BPSS cleared, with eligibility to obtain SC or DV clearance where a contract requires it.",
  },
  {
    label: "International & payments",
    detail:
      "Available to work with international companies and accept international payments — including US domestic (US-to-US) transactions — and able to travel internationally when an engagement calls for it.",
  },
];

export interface WorkingTerm {
  label: string;
  value: string;
}

export const workingTerms: WorkingTerm[] = [
  { label: "Base", value: "London, UK" },
  { label: "Delivery", value: "Remote-first · onsite UK/EU · international travel as needed" },
  { label: "Clearance", value: "BPSS — SC / DV eligible" },
  { label: "Payments", value: "International · incl. US-to-US" },
  { label: "Sectors", value: "Commercial + government / regulated" },
  { label: "Typical engagement", value: "2 weeks – 12 months" },
  { label: "Notice to start", value: "Usually within 2–4 weeks" },
  { label: "Contracting", value: "Inside/outside IR35 · SOW · subcontract" },
];
