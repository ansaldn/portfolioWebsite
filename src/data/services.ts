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
  /** Optional badge, e.g. "New". */
  badge?: string;
}

export const services: Service[] = [
  {
    slug: "greenfield-iam",
    title: "Greenfield IAM implementation",
    tagline:
      "Stand up a modern identity platform from nothing — built to scale, documented to last.",
    description:
      "For start-ups and teams without the right identity infrastructure, the strongest way to engage is to build the platform from the ground up. That means choosing the right identity provider for where the business is heading, proving it against your real applications and edge cases before committing, wiring your HRIS in as the single source of truth, and codifying the joiner/mover/leaver rules so the platform largely runs itself. Crucially, it ships with the documentation and runbooks an internal IT or service-desk team needs to own it confidently after handover — not a black box only the consultant understands.",
    deliverables: [
      "Vendor selection and management — IdP evaluation, scoring and PoC against your real use cases",
      "HRIS integration as the authoritative source of identity (Workday / HiBob / BambooHR → IdP)",
      "Joiner/Mover/Leaver rules and lifecycle automation built from scratch",
      "SSO + SCIM onboarding pipeline for your application estate",
      "RBAC model and access policies designed around how the business actually works",
      "Full documentation and 1st / 2nd / 3rd-line runbooks so your IT team can own it",
    ],
    stack: ["Okta", "Microsoft Entra", "SSO", "SCIM", "HRIS integration", "Lifecycle automation", "RBAC"],
    proof: ["paddle", "hitachi-rail", "babbel"],
    iconPath:
      "M3 3h7v7H3V3zm11 0h7v7h-7V3zM3 14h7v7H3v-7zm11 0h7v7h-7v-7z",
  },

  {
    slug: "iam-modernisation",
    title: "IAM modernisation",
    tagline:
      "Move off legacy identity to a modern, federated, audit-ready stack.",
    description:
      "When the identity estate already exists but is holding the business back — fragmented logins, manual joiner/mover/leaver work, ageing MFA — modernisation replaces it with a unified, federated platform and the automation to keep it healthy. In practice that has meant upgrades like Okta Classic to OIE, rolling out a company-wide RBAC standard through lifecycle management, and migrating application integrations onto a single secure authentication surface. Every change runs through a phased plan with rollback gates, so production users never feel the migration happening underneath them.",
    deliverables: [
      "Current-state assessment with gap analysis",
      "Target architecture (SSO, MFA, lifecycle, SCIM)",
      "Phased migration plan with rollback gates",
      "Automated JML workflows in Okta / Entra / SailPoint",
      "Company-wide RBAC standard via lifecycle management",
      "Runbooks and 1st / 2nd / 3rd line documentation",
    ],
    stack: ["Okta (Classic → OIE)", "Microsoft Entra", "SailPoint IdentityNow", "SSO", "SCIM", "MFA", "RBAC"],
    proof: ["epic-games", "babbel", "ki-insurance", "convatec"],
    iconPath:
      "M12 2l8 4v6c0 5-3.5 8.5-8 10-4.5-1.5-8-5-8-10V6l8-4zm-1 13l5-5-1.4-1.4L11 12.2 8.4 9.6 7 11l4 4z",
  },

  {
    slug: "iam-iga-ownership",
    title: "IAM & IGA platform ownership",
    tagline:
      "Day-2 ownership of the identity estate — from access reviews to the licensing bill.",
    description:
      "Plenty of teams can stand a tool up; far fewer can own and run it well. This is the day-2 work: running access-review and certification campaigns, keeping governance and approval workflows healthy, tightening privileged access against audit requirements, and operating joiner/mover/leaver at scale — all while managing the stakeholders that come with it, translating fluently between risk, compliance, finance and engineering. It's grounded in actually having owned these platforms at 3,000–8,000-user scale, including the unglamorous parts like licensing rationalisation and keeping the cost base honest.",
    deliverables: [
      "Access-review and certification campaigns (SailPoint IdentityNow, Entra)",
      "Governance and approval workflows kept audit-ready",
      "Privileged Access Management operations aligned to audit",
      "JML run-operations and SLA management (90%+ adherence track record)",
      "Licensing rationalisation and ongoing cost control",
      "Stakeholder reporting that lands with risk, compliance and finance",
    ],
    stack: ["SailPoint IdentityNow", "Okta Identity Governance", "Microsoft Entra", "PAM", "Access certification", "RBAC"],
    proof: ["epic-games", "convatec", "depop", "lifebit"],
    iconPath:
      "M12 2a10 10 0 100 20 10 10 0 000-20zm0 4a6 6 0 110 12 6 6 0 010-12zm0 3a3 3 0 100 6 3 3 0 000-6z",
  },

  {
    slug: "ma-integration",
    title: "M&A IAM integration",
    tagline:
      "Day-1 access without the day-1 chaos — for both sides of an acquisition.",
    description:
      "Acquisitions live or die on whether people can safely access what they need on day one. The work starts before the deal closes, with cybersecurity and risk assessments across on-premise and SaaS applications as part of due diligence, then moves into integration: approving applications with business owners and vendors, consolidating duplicated tooling, and rationalising licences so the combined estate costs less, not more. For applications without native cloud authentication, Okta Identity Governance keeps them in scope and visible. Delivered across construction, defence-adjacent, and consumer acquisitions, including bringing acquired brands into a parent company's identity estate.",
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
      "End-to-end programme delivery for SOC 2 Type II and FedRAMP, owned from policy authoring through to the automated evidence-gathering that keeps you compliant after the audit ships. That covers writing and maintaining the policy library, running recurring risk assessments, implementing controls across IAM, endpoint and data, and standing up an incident-response plan that has actually been exercised. On the FedRAMP side it extends to baseline control implementation and the continuous monitoring that government and government-adjacent work demands — including endpoint enrolment specifically to satisfy those requirements.",
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
    slug: "ciam",
    title: "CIAM (Customer Identity)",
    tagline:
      "Sign-up, sign-in, MFA, and social login for end users — without rebuilding it.",
    description:
      "Customer-facing identity using Auth0 (or Amazon Cognito) — PKCE-based SPA flows, social and passwordless login, MFA, and branded universal login pages, plus the back-end protections that keep real users in and abuse out: bot detection, breached-password checks, and brute-force throttling. The focus is getting the security right without making customers fight the front door, and giving your API teams a clean, validated token pattern to build against rather than reinventing auth per service.",
    deliverables: [
      "Auth0 / Cognito tenant configuration and hardening",
      "Social login, MFA, and passwordless flows",
      "Branded universal login + email/SMS templates",
      "Bot detection, breached-password, brute-force protections",
      "Token validation pattern for your APIs",
      "Migration plan from a legacy auth provider",
    ],
    stack: ["Auth0", "Amazon Cognito", "OIDC", "OAuth 2.0 (PKCE)", "MFA", "JWT"],
    proof: ["traxent"],
    iconPath:
      "M12 4a4 4 0 014 4v2h1a2 2 0 012 2v8a2 2 0 01-2 2H7a2 2 0 01-2-2v-8a2 2 0 012-2h1V8a4 4 0 014-4zm0 2a2 2 0 00-2 2v2h4V8a2 2 0 00-2-2zm0 8a2 2 0 100 4 2 2 0 000-4z",
  },

  {
    slug: "endpoint-edr",
    title: "Endpoint & EDR",
    tagline:
      "Deploy and tune the detection that catches things before they spread.",
    description:
      "Endpoint Detection & Response done properly: rolling out CrowdStrike Falcon or Microsoft Defender (EDR/XDR) across mixed macOS and Windows estates, then doing the work most rollouts skip — writing custom detection rules tuned to your environment and dialling down the false positives that make analysts ignore alerts. It finishes with SIEM onboarding across the tools that matter (Okta, EDR, Google Workspace, Slack) so alerts actually land somewhere, and an on-call triage runbook so the team knows exactly what to do when one fires.",
    deliverables: [
      "EDR rollout across macOS + Windows",
      "Custom detection rules tuned to your environment",
      "False-positive reduction and policy tuning",
      "SIEM onboarding for Okta, EDR, Workspace, Slack",
      "Threat-graph and dashboard monitoring",
      "On-call alert triage runbook",
    ],
    stack: ["CrowdStrike Falcon", "Microsoft Defender (EDR/XDR)", "Microsoft Sentinel", "SIEM", "Detection engineering"],
    proof: ["babbel", "depop", "convatec"],
    iconPath:
      "M12 5C6.5 5 2.7 9 1 12c1.7 3 5.5 7 11 7s9.3-4 11-7c-1.7-3-5.5-7-11-7zm0 3a4 4 0 110 8 4 4 0 010-8zm0 2.2a1.8 1.8 0 100 3.6 1.8 1.8 0 000-3.6z",
  },

  {
    slug: "hardware-mdm",
    title: "Hardware & device management",
    tagline:
      "Every device enrolled, encrypted, certificate-trusted and accounted for.",
    description:
      "The physical fleet and the MDM that governs it. That means zero-touch / no-touch enrolment so new hires are productive on day one, configuration and hardening baselines applied consistently across the estate, and SCEP certificate distribution so devices are trusted for Wi-Fi, VPN and MFA rather than relying on passwords. It extends to data-loss-prevention and retention policy at the endpoint, and the asset hygiene that keeps the hardware list matching reality. Delivered across Intune, Jamf and simpleMDM on mixed macOS + Windows fleets.",
    deliverables: [
      "MDM rollout across macOS + Windows (Intune / Jamf / simpleMDM)",
      "Zero-touch / no-touch deployment for new devices",
      "SCEP certificate distribution for Wi-Fi, VPN and MFA trust",
      "Device configuration and hardening baselines",
      "DLP and data-retention policies at the endpoint",
      "Hardware lifecycle and asset hygiene",
    ],
    stack: ["Microsoft Intune", "Jamf", "simpleMDM", "SCEP", "Okta Adaptive MFA", "DLP"],
    proof: ["babbel", "convatec", "paddle"],
    iconPath:
      "M3 4h18a1 1 0 011 1v11a1 1 0 01-1 1H3a1 1 0 01-1-1V5a1 1 0 011-1zm1 2v9h16V6H4zm4 13h8v2H8v-2z",
  },

  {
    slug: "ai-integration",
    title: "AI integration support",
    tagline:
      "Bring an enterprise AI tool in securely — then make it genuinely useful.",
    description:
      "Two halves to this. First, onboard an enterprise AI platform the right way: SSO and SCIM provisioning, a least-privilege access model, and the data-governance and DLP guardrails that make it safe to roll out across the company rather than a shadow-IT risk. Second — and this is where most adoptions stall — scope the tool to what the business actually needs, shaping it into a chatbot or assistant grounded in your own systems and data so it solves real internal problems instead of being an expensive novelty.",
    deliverables: [
      "SSO + SCIM onboarding for the AI platform",
      "Least-privilege access model and usage guardrails",
      "Data-governance and DLP review for AI usage",
      "Use-case scoping workshops with the business",
      "A scoped internal chatbot / assistant grounded in your data",
      "Rollout guidance and adoption enablement",
    ],
    stack: ["SSO", "SCIM", "Okta / Entra", "Data governance", "DLP", "Enterprise AI platforms"],
    proof: [],
    iconPath:
      "M11 3l1.6 4.4L17 9l-4.4 1.6L11 15l-1.6-4.4L5 9l4.4-1.6L11 3zm7 9l.9 2.5 2.6.9-2.6.9-.9 2.7-.9-2.7-2.6-.9 2.6-.9.9-2.5z",
    badge: "New",
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
    a: "Day-rate contracting (inside or outside IR35 in the UK) for most engagements, fixed-price for well-scoped programmes, and ad-hoc advisory packages. Full pricing guidance is on the For business page — let's talk.",
  },
];
