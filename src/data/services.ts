// Services / B2B engagements — what David Ansa offers commercial and
// government clients. Each service ties back to client work on the /clients
// page via the `proof` slugs.

export interface Service {
  slug: string;
  /** Short, scannable name shown on the card title. */
  title: string;
  /** Headline for the elevator pitch. */
  tagline: string;
  /** Longer description. */
  description: string;
  /** Concrete deliverables — what the client walks away with. */
  deliverables: string[];
  /** Tools / platforms commonly used to deliver this service. */
  stack: string[];
  /** slugs from clients.ts where this work has been delivered. */
  proof: string[];
  /** Icon as a tiny inline SVG path (24x24, single colour, currentColor). */
  iconPath: string;
}

export const services: Service[] = [
  {
    slug: "iam-modernisation",
    title: "IAM modernisation",
    tagline:
      "Move off legacy identity to a modern, federated, audit-ready stack.",
    description:
      "Replace fragmented logins, manual joiner/mover/leaver processes, and outdated MFA with a unified identity platform — Okta or Microsoft Entra — and the automation to keep it healthy.",
    deliverables: [
      "Current-state assessment with gap analysis",
      "Target architecture (SSO, MFA, lifecycle, SCIM)",
      "Phased migration plan with rollback gates",
      "Automated JML workflows in Okta / Entra / SailPoint",
      "RBAC standard rolled out across the company",
      "Runbooks and 1st / 2nd / 3rd line documentation",
    ],
    stack: ["Okta (Classic → OIE)", "Microsoft Entra", "SailPoint IdentityNow", "SSO", "SCIM", "MFA", "RBAC"],
    proof: ["epic-games", "babbel", "ki-insurance", "convatec"],
    iconPath:
      "M12 2l8 4v6c0 5-3.5 8.5-8 10-4.5-1.5-8-5-8-10V6l8-4zm-1 13l5-5-1.4-1.4L11 12.2 8.4 9.6 7 11l4 4z",
  },

  {
    slug: "ma-integration",
    title: "M&A IAM integration",
    tagline:
      "Day-1 access without the day-1 chaos — for both sides of an acquisition.",
    description:
      "Cybersecurity and risk assessments during M&A due diligence, followed by application migration, consolidation, and licensing rationalisation. I've integrated identity for construction, defence, and consumer acquisitions — and helped Depop onboard into Etsy's identity estate.",
    deliverables: [
      "Pre-deal due-diligence: tooling overlap, risk, license cost",
      "Identity integration plan with cutover dates",
      "Vendor and technical reviews for every app on both sides",
      "Application consolidation to remove duplication",
      "OIG-based onboarding for apps without native cloud auth",
      "Stakeholder comms templates for affected users",
    ],
    stack: ["Okta", "Okta Identity Governance (OIG)", "Microsoft Entra", "M&A due diligence", "Vendor management"],
    proof: ["hitachi-rail", "depop"],
    iconPath:
      "M3 11h7V3H3v8zm0 10h7v-8H3v8zm11 0h7v-8h-7v8zm0-18v8h7V3h-7z",
  },

  {
    slug: "soc2-fedramp",
    title: "SOC 2 Type II & FedRAMP",
    tagline:
      "Stand up the controls, the evidence, and the continuous monitoring auditors expect.",
    description:
      "End-to-end programme delivery for SOC 2 Type II and FedRAMP. Policy authoring, control implementation, audit prep, and the automated evidence-gathering that keeps you compliant after the audit ships.",
    deliverables: [
      "Policy library aligned to the chosen framework",
      "Risk assessments and ongoing risk register",
      "Control implementation across IAM, endpoint, and data",
      "Automated audit and review pipelines",
      "Incident-response plan and tabletop exercise",
      "FedRAMP baseline controls + continuous monitoring",
    ],
    stack: ["SOC 2 Type II", "FedRAMP", "NIST", "ISO 27001", "GRC", "MDM", "EDR"],
    proof: ["lifebit"],
    iconPath:
      "M12 2l8 4v6c0 5-3.5 8.5-8 10-4.5-1.5-8-5-8-10V6l8-4zm0 4a3 3 0 100 6 3 3 0 000-6zm0 8c-2.7 0-5 1.3-5 3v1h10v-1c0-1.7-2.3-3-5-3z",
  },

  {
    slug: "okta-deployment",
    title: "Okta deployment & administration",
    tagline:
      "Okta SME — from greenfield rollouts to multi-region acquisitions.",
    description:
      "Okta deployment, day-2 administration, and SME escalation for organisations from a few hundred to 8,000+ users. Comfortable across Workforce Identity, OIG, Adaptive MFA, Workflows, and the Okta API.",
    deliverables: [
      "Multi-region tenant rollout",
      "Application onboarding pipeline (SAML / OIDC / SCIM)",
      "Custom Okta Workflows for lifecycle and automation",
      "Adaptive MFA + SCEP certificate distribution",
      "Roles, permissions, and admin-tier hardening",
      "1st / 2nd / 3rd line operational playbooks",
    ],
    stack: ["Okta Workforce Identity", "Okta Identity Governance", "Okta Workflows", "Adaptive MFA", "SCIM", "SCEP"],
    proof: ["hitachi-rail", "babbel", "depop", "convatec"],
    iconPath:
      "M12 2a10 10 0 100 20 10 10 0 000-20zm0 4a6 6 0 110 12 6 6 0 010-12zm0 3a3 3 0 100 6 3 3 0 000-6z",
  },

  {
    slug: "ciam",
    title: "CIAM (Customer Identity)",
    tagline:
      "Sign-up, sign-in, MFA, and social login for end users — without rebuilding it.",
    description:
      "Customer-facing identity using Auth0 (or Cognito) — PKCE-based SPA flows, social login, MFA, branded login pages, and the back-end protections (bot detection, breached-password checks, rate limits) that keep your real users in and the abuse out.",
    deliverables: [
      "Auth0 / Cognito tenant configuration and hardening",
      "Social login, MFA, and passwordless flows",
      "Branded universal login + email/SMS templates",
      "Bot detection, breached-password, brute-force protections",
      "Token validation pattern for your APIs",
      "Migration plan from a legacy auth provider",
    ],
    stack: ["Auth0", "Amazon Cognito", "OIDC", "OAuth 2.0 (PKCE)", "MFA", "JWT"],
    proof: [],
    iconPath:
      "M12 4a4 4 0 014 4v2h1a2 2 0 012 2v8a2 2 0 01-2 2H7a2 2 0 01-2-2v-8a2 2 0 012-2h1V8a4 4 0 014-4zm0 2a2 2 0 00-2 2v2h4V8a2 2 0 00-2-2zm0 8a2 2 0 100 4 2 2 0 000-4z",
  },

  {
    slug: "endpoint-edr",
    title: "Endpoint & EDR",
    tagline:
      "Deploy and tune the detection that catches things before they spread.",
    description:
      "Endpoint Detection & Response rollouts (CrowdStrike Falcon, Microsoft Defender) across mixed macOS + Windows estates via Intune, Jamf, or simpleMDM. Custom detection rules, policy tuning to drop false positives, and SIEM onboarding so alerts actually go somewhere.",
    deliverables: [
      "EDR rollout across macOS + Windows",
      "Custom detection rules tuned to your environment",
      "MDM + SCEP certificate distribution",
      "DLP policies and data-retention standards",
      "SIEM onboarding for Okta, EDR, Workspace, Slack",
      "On-call alert triage runbook",
    ],
    stack: ["CrowdStrike Falcon", "Microsoft Defender (EDR/XDR)", "Microsoft Sentinel", "Intune", "Jamf", "simpleMDM", "DLP", "SIEM"],
    proof: ["babbel", "ki-insurance", "depop", "convatec"],
    iconPath:
      "M4 4h16v4H4V4zm0 6h16v4H4v-4zm0 6h16v4H4v-4zm3-9h2v1H7V7zm0 6h2v1H7v-1zm0 6h2v1H7v-1z",
  },
];

// ------------------------------------------------------------
// Engagement model — how a typical contract unfolds
// ------------------------------------------------------------

export interface EngagementPhase {
  number: string;          // "01", "02", ...
  title: string;
  duration: string;
  description: string;
  outcomes: string[];
}

export const engagementPhases: EngagementPhase[] = [
  {
    number: "01",
    title: "Discovery",
    duration: "Week 1",
    description:
      "Kickoff with your team, stakeholder interviews, current-state walkthrough, access to relevant tooling. The objective is shared context — no work happens before everyone is aligned on scope.",
    outcomes: [
      "Signed SOW or contract amendment",
      "Stakeholder map + RACI",
      "Confirmed scope, success criteria, and rollback plan",
    ],
  },
  {
    number: "02",
    title: "Assessment & design",
    duration: "Weeks 1 – 3",
    description:
      "Document the current identity / security estate. Identify gaps against your target framework (SOC 2, FedRAMP, internal policy). Produce a target architecture and phased migration roadmap.",
    outcomes: [
      "Current-state assessment + risk register",
      "Target architecture document",
      "Phased delivery roadmap with rollback gates",
    ],
  },
  {
    number: "03",
    title: "Deliver",
    duration: "Bulk of engagement",
    description:
      "Execution — application onboarding, automation, control implementation, policy rollouts. Weekly demos, async written updates, and visible progress against the roadmap. Production changes go through your change-management process.",
    outcomes: [
      "Implementation against the agreed roadmap",
      "Automation (Workflows, scripts, Terraform) where it pays back",
      "Weekly demos + written status",
    ],
  },
  {
    number: "04",
    title: "Handover",
    duration: "Final 1 – 2 weeks",
    description:
      "Documentation handover, runbook authoring, and knowledge-transfer sessions with your internal team or service desk. The goal is for your team to own what was delivered without me as a dependency.",
    outcomes: [
      "1st / 2nd / 3rd line operational playbooks",
      "Architecture and decisions documented in your wiki",
      "Two knowledge-transfer sessions per workstream",
      "30-day support window for follow-up questions",
    ],
  },
];

// ------------------------------------------------------------
// FAQ
// ------------------------------------------------------------

export interface FaqItem {
  q: string;
  a: string;
}

export const faq: FaqItem[] = [
  {
    q: "What's a typical engagement length?",
    a: "Anywhere from a 2-week scoping engagement to a 12-month programme. Most IAM modernisation work lands at 3–6 months, M&A integrations at 2–4 months, and SOC 2 / FedRAMP programmes at 6–9 months. I'll be honest about scope and timeline before you sign anything.",
  },
  {
    q: "Do you take both commercial and government work?",
    a: "Yes. Commercial work spans gaming, fintech, edtech, retail and medical. Government and government-adjacent work has been delivered through FedRAMP and SOC 2 Type II programmes — happy to discuss UK / EU / US contracting structures.",
  },
  {
    q: "Can you work with our existing identity stack?",
    a: "Almost always. I work daily with Okta (Workforce + OIG), Microsoft Entra ID, SailPoint IdentityNow, Auth0, Azure AD, and Active Directory. If you're on something different, drop me a line and I'll tell you honestly whether I'm the right fit.",
  },
  {
    q: "Do you build proofs of concept?",
    a: "Yes — short PoCs (1–2 weeks) are often the right way to start. They reduce the risk of committing to a larger engagement before the architecture is proven against your environment.",
  },
  {
    q: "How do you handle confidentiality?",
    a: "I sign your NDA before any commercially sensitive material changes hands. For more sensitive engagements (government, defence-adjacent, M&A pre-deal), I can also work through your preferred contracting body.",
  },
  {
    q: "What does the commercial structure look like?",
    a: "Day-rate contracting (inside or outside IR35 in the UK) for most engagements, fixed-price for well-scoped programmes, and ad-hoc advisory packages. Pricing depends on scope and length — let's talk.",
  },
];
