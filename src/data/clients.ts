// Source: David Ansa CV (DavidAnsa_CV_Full.pdf).
// Cards on the Clients page render from this list; the home page
// carousel uses the same data with the summary fields only.

export type ClientSector =
  | "Gaming"
  | "Industry"
  | "EdTech"
  | "FinTech"
  | "HealthTech"
  | "Retail"
  | "Medical"
  | "SaaS"
  | "Consumer";

export interface ProjectGroup {
  title: string;
  bullets: string[];
}

export interface Client {
  slug: string;
  company: string;
  role: string;
  start: string;            // human readable, e.g. "Apr 2025"
  end: string;              // "Present" or "Apr 2026"
  location: string;
  sector: ClientSector;
  /** One-sentence elevator pitch shown on the home carousel and at the top of the card. */
  headline: string;
  /** Highest-impact outcomes — these are the bullets to lead with. */
  highlights: string[];
  /** Tools / platforms used. Surfaced as tags. */
  stack: string[];
  /** Grouped detail bullets shown when the card is expanded. */
  projects: ProjectGroup[];
  /** Optional pinned ribbon (e.g. "M&A", "FedRAMP", "Okta SME"). */
  ribbons?: string[];
  /**
   * Optional path to a logo file in /public/logos/, e.g. "/logos/epic-games.svg".
   * If absent, the UI falls back to a coloured monogram (e.g. "EG").
   * See /public/logos/README.md for guidance on sourcing brand-safe SVGs.
   */
  logo?: string;
  /**
   * Optional dark-theme logo variant, used only for monochrome marks that
   * would be illegible in dark mode (e.g. an all-black wordmark). When set and
   * the theme is dark, this is shown instead of `logo`. Full-colour logos
   * don't need this — a single `logo` works in both themes.
   */
  logoDark?: string;
}

export const clients: Client[] = [
  {
    slug: "epic-games",
    company: "Epic Games",
    role: "IAM Engineer",
    start: "Apr 2025",
    end: "Apr 2026",
    location: "USA (Remote, UK)",
    sector: "Gaming",
    headline:
      "Strengthened global identity governance, access controls, and authentication for Epic's 24/7 player and developer platforms.",
    highlights: [
      "Hit 90%+ SLA adherence on IAM tickets across non-US time zones",
      "Automated JML lifecycle workflows through Okta + SailPoint IdentityNow",
      "Led access-review campaigns in SailPoint IdentityNow and Azure AD for regulatory compliance",
    ],
    stack: ["Okta", "SailPoint IdentityNow", "Azure AD", "PAM", "SSO", "Governance"],
    ribbons: ["Okta SME", "Global IAM"],
    logo: "/logos/epic-games.svg",
    projects: [
      {
        title: "Lifecycle & governance",
        bullets: [
          "Designed and implemented governance workflows to streamline the Joiner/Mover/Leaver process",
          "Enhanced lifecycle management with automation across Okta and SailPoint IdentityNow",
          "Led recurring access-review campaigns through SailPoint IdentityNow and Azure AD",
        ],
      },
      {
        title: "Application security & SSO",
        bullets: [
          "Migrated and onboarded business applications to SSO, raising application security posture",
          "Handled escalated IAM requests and incidents to minimise business impact",
        ],
      },
      {
        title: "PAM & compliance",
        bullets: [
          "Drove continuous improvements in Privileged Access Management aligned with audit requirements",
          "Partnered with adjacent teams to keep IAM/PAM aligned with organisational governance and regulators",
        ],
      },
      {
        title: "Global operations",
        bullets: [
          "Provided out-of-hours support across non-US time zones, ensuring uninterrupted IAM services",
          "Achieved 90%+ SLA adherence on IAM tickets",
        ],
      },
    ],
  },

  {
    slug: "on-running",
    company: "On",
    role: "IAM & Security Engineer (Contract)",
    start: "Jan 2026",
    end: "Apr 2026",
    location: "Zurich, CH (Remote, UK)",
    sector: "Retail",
    headline:
      "IAM, endpoint and governance delivery for On — including an Okta Adaptive MFA rollout and Okta Verify deployment across the macOS and Windows fleet.",
    highlights: [
      "Rolled out Okta Adaptive MFA across the workforce",
      "Deployed Okta Verify to company devices on both macOS and Windows",
      "Delivered across identity, endpoint/EDR and compliance workstreams",
    ],
    stack: ["Okta", "Okta Adaptive MFA", "Okta Verify", "MFA", "EDR", "MDM", "GRC"],
    ribbons: ["Okta SME", "Adaptive MFA"],
    logo: "/logos/on-running.svg",
    projects: [
      {
        title: "Identity & MFA",
        bullets: [
          "Rolled out Okta Adaptive MFA across the workforce",
          "Deployed Okta Verify to company devices on both macOS and Windows",
          "Supported wider IAM / identity workstreams",
        ],
      },
      {
        title: "Endpoint & governance",
        bullets: [
          "Contributed to endpoint / EDR and device-management workstreams",
          "Supported compliance and governance controls",
        ],
      },
    ],
  },

  {
    slug: "miro",
    company: "Miro",
    role: "IAM Engineer (Contract)",
    start: "Jul 2024",
    end: "Nov 2024",
    location: "Remote, UK",
    sector: "SaaS",
    headline:
      "Identity & access management engineering for Miro, the visual-collaboration platform.",
    highlights: [
      "Delivered IAM / identity engineering across the workforce identity stack",
    ],
    stack: ["IAM", "SSO", "MFA", "SCIM", "Identity governance"],
    ribbons: ["IAM"],
    logo: "/logos/miro.svg",
    projects: [
      {
        title: "Identity & access",
        bullets: [
          "Delivered IAM / identity engineering across the workforce identity stack",
        ],
      },
    ],
  },

  {
    slug: "traxent",
    company: "Traxent",
    role: "CIAM Engineer (Contract)",
    start: "2025",
    end: "2025",
    location: "Remote, UK",
    sector: "SaaS",
    headline:
      "Built and integrated the customer identity layer (Auth0) for Traxent, a SaaS trading-education platform.",
    highlights: [
      "Stood up customer sign-up, sign-in and MFA on Auth0 from scratch",
      "Implemented branded Auth0 Universal Login for the platform's end users",
      "Configured secure, standards-based authentication (OIDC / OAuth 2.0)",
    ],
    stack: ["Auth0", "CIAM", "OIDC", "OAuth 2.0", "MFA", "Universal Login"],
    ribbons: ["CIAM", "Auth0"],
    logo: "/logos/traxent.svg",
    projects: [
      {
        title: "Customer identity build",
        bullets: [
          "Created and connected an Auth0 tenant to the platform for end-user authentication",
          "Implemented sign-up, sign-in and MFA with branded Universal Login",
          "Applied secure session handling and a standards-based token pattern for the app",
        ],
      },
    ],
  },

  {
    slug: "hitachi-rail",
    company: "Hitachi Rail Europe",
    role: "Okta Deployment Lead / Application Specialist",
    start: "Apr 2025",
    end: "Dec 2025",
    location: "EU (Remote, UK)",
    sector: "Industry",
    headline:
      "Led IAM integration on two large-scale M&A programmes — a construction-based and a defence-based acquisition.",
    highlights: [
      "Okta SME for the global rollout across multiple regions and time zones",
      "Used Okta Identity Governance (OIG) to onboard apps without native cloud auth",
      "Reduced licensing cost and risk by consolidating duplicate tooling across the acquired estate",
    ],
    stack: ["Okta", "Okta Identity Governance (OIG)", "SSO", "M&A Integration", "Vendor Mgmt"],
    ribbons: ["M&A", "Okta SME", "Defence-adjacent"],
    logo: "/logos/hitachi-rail.svg",
    projects: [
      {
        title: "Project 1 — Construction acquisition",
        bullets: [
          "Served as the Okta SME, leading the global rollout across multiple regions and time zones",
          "Liaised between internal business owners, vendors, and cybersecurity teams to approve apps for integration",
          "Built, configured and integrated approved SaaS applications into Okta for secure, seamless user access",
          "Authored global support documentation for 1st/2nd/3rd line service desks and acted as final escalation",
          "Defined and managed Okta roles and permissions to tighten access control",
          "Oversaw vendor management and ran technical reviews to ensure compliance & security",
        ],
      },
      {
        title: "Project 2 — Defence acquisition",
        bullets: [
          "Conducted cybersecurity and risk assessments for on-prem and SaaS apps during M&A due diligence",
          "Used Okta Identity Governance (OIG) to integrate apps without native cloud authentication, keeping visibility across systems",
          "Migrated, consolidated and rationalised apps with the project team — preventing duplication and reducing licensing cost",
          "Supported onboarding of greenfield application instances under Hitachi's security/access policies",
          "Managed vendor engagement end-to-end against project timelines and security requirements",
        ],
      },
    ],
  },

  {
    slug: "babbel",
    company: "Babbel",
    role: "Cybersecurity Consultant",
    start: "Jul 2024",
    end: "Jun 2025",
    location: "Berlin (Remote, UK)",
    sector: "EdTech",
    headline:
      "Hardened Babbel's security posture across IAM, endpoint, SIEM, and device management — including the Okta Classic → OIE upgrade.",
    highlights: [
      "Upgraded Okta from Classic to OIE, improving access control and user flows",
      "Deployed CrowdStrike EDR across macOS + Windows via multiple MDMs",
      "Onboarded SIEM integrations for Okta, CrowdStrike, Google Workspace, and Slack",
    ],
    stack: [
      "Okta (Classic → OIE)",
      "Okta Lifecycle Management",
      "CrowdStrike Falcon EDR",
      "SIEM",
      "MDM",
      "SCEP",
      "Adaptive MFA",
      "RBAC",
    ],
    ribbons: ["Okta SME", "Endpoint Security"],
    logo: "/logos/babbel.svg",
    projects: [
      {
        title: "Identity modernisation",
        bullets: [
          "Upgraded Okta from Classic to OIE, improving access control and user flows",
          "Introduced an RBAC standard company-wide via Okta Lifecycle Management",
          "Managed enterprise app integrations with Okta and introduced a streamlined onboarding pipeline",
          "Deployed device management via MDM + SCEP certificates and Okta Adaptive MFA on Mac and Windows",
        ],
      },
      {
        title: "Endpoint detection & response",
        bullets: [
          "Deployed CrowdStrike EDR to all endpoints (macOS + Windows) via multiple MDMs",
          "Created custom detection rules and tuned CrowdStrike policies to reduce false positives",
          "Monitored Falcon dashboards and threat graphs for real-time alert triage and incident response",
        ],
      },
      {
        title: "Security operations",
        bullets: [
          "Onboarded full SIEM integrations across Okta, CrowdStrike, Google Workspace, and Slack",
          "Conducted data analysis on key security tools to uncover gaps and optimise configurations",
          "Produced GAP analysis reports to define delivery roadmaps for multiple projects",
        ],
      },
    ],
  },

  {
    slug: "ki-insurance",
    company: "Ki Insurance",
    role: "IAM Engineer",
    start: "Jun 2024",
    end: "Feb 2025",
    location: "London, UK",
    sector: "FinTech",
    headline:
      "Led modern SSO adoption and supported the separation of identity infrastructure during a corporate restructure.",
    highlights: [
      "Migrated app integrations onto Microsoft Entra for a single, secure auth surface",
      "Stood up automated provisioning via SailPoint + Entra, cutting manual access work",
      "Reduced authentication-related support tickets through proactive IAM improvements",
    ],
    stack: ["Microsoft Entra", "SailPoint", "Windows Defender", "SSO", "SCIM"],
    ribbons: ["Corporate restructure"],
    logo: "/logos/ki-insurance.svg",
    projects: [
      {
        title: "Identity modernisation",
        bullets: [
          "Led IAM projects adopting modern SSO, ensuring seamless authentication and minimal downtime",
          "Managed enterprise application integrations with Microsoft Entra",
          "Orchestrated onboarding of critical applications into Entra, aligning with security policies",
          "Supported the separation of identity infrastructure during corporate restructuring",
        ],
      },
      {
        title: "Automation & governance",
        bullets: [
          "Developed automated provisioning via SailPoint and Entra to reduce manual access management",
          "Reduced authentication-related support tickets through proactive IAM improvements",
          "Collaborated cross-functionally and with vendors to integrate third-party apps without compromising security",
        ],
      },
      {
        title: "Endpoint",
        bullets: [
          "Supported management of Windows Defender across multiple endpoints and operating systems",
        ],
      },
    ],
  },

  {
    slug: "lifebit",
    company: "Lifebit",
    role: "Risk & Compliance Security Architect — IAM Specialist",
    start: "Nov 2023",
    end: "Apr 2024",
    location: "London, UK",
    sector: "HealthTech",
    headline:
      "Built SOC 2 Type II and FedRAMP-aligned controls across IAM, device, and incident-response programmes.",
    highlights: [
      "Owned SOC 2 Type II policy authoring, control implementation, and audit prep",
      "Implemented FedRAMP baseline controls and continuous monitoring",
      "Stood up automated audit + incident-response programmes across the company",
    ],
    stack: ["SOC 2 Type II", "FedRAMP", "MDM", "EDR", "Windows Defender (macOS)", "GRC"],
    ribbons: ["FedRAMP", "SOC 2 Type II", "Government-ready"],
    logo: "/logos/lifebit.svg",
    projects: [
      {
        title: "SOC 2 Type II",
        bullets: [
          "Developed and maintained policies and procedures aligned with SOC 2 Type II requirements",
          "Conducted regular risk assessments to identify vulnerabilities and threats to information security",
          "Created and maintained device and data policies, with EDR tools automated via MDM",
          "Implemented controls to mitigate identified risks and ensure SOC 2 compliance",
          "Monitored and enforced organisation-wide compliance with SOC 2 Type II requirements",
          "Conducted automated audits and reviews to assess adherence to policies and controls",
          "Communicated policies effectively across the organisation",
          "Developed and maintained an incident response plan for security breaches",
          "Coordinated investigation and remediation of incidents under SOC 2 guidelines",
          "Provided training and awareness programmes on SOC 2 compliance requirements",
        ],
      },
      {
        title: "FedRAMP",
        bullets: [
          "Implemented security controls and measures to meet FedRAMP security requirements",
          "Ensured systems and infrastructure comply with FedRAMP baseline security controls",
          "Established processes for continuous monitoring of security controls and system performance",
          "Coordinated enrolment of Windows Defender for macOS to satisfy FedRAMP requirements",
        ],
      },
    ],
  },

  {
    slug: "depop",
    company: "Depop",
    role: "Senior Systems Administrator",
    start: "Aug 2022",
    end: "Nov 2023",
    location: "London, UK",
    sector: "Retail",
    headline:
      "Managed identity for 3,000+ global staff and acted as Okta SME across all acquired brands after the Etsy acquisition.",
    highlights: [
      "Okta SME for all acquired brands following the Etsy acquisition",
      "Owned EDR/XDR via CrowdStrike Falcon, DLP, and data-retention policies",
      "Automated IAM processes in Python and Bash, raising operational efficiency",
    ],
    stack: [
      "Okta",
      "CrowdStrike Falcon (EDR/XDR)",
      "Google Workspace",
      "Slack Enterprise Grid",
      "Python",
      "Bash",
      "NIST",
      "ISO",
      "DLP",
    ],
    ribbons: ["M&A", "Okta SME", "Acquired by Etsy"],
    logo: "/logos/depop.svg",
    projects: [
      {
        title: "Identity & access",
        bullets: [
          "Orchestrated IAM projects across user provisioning, access control, SSO, MFA, and identity governance",
          "Led integration of IAM systems with enterprise applications and platforms",
          "Acted as Okta SME for all acquired brands within the Etsy acquisition",
          "Managed identity for a 3,000+ global employee workforce",
          "Cultivated strong working relationships with Etsy and other acquired brands",
        ],
      },
      {
        title: "Endpoint & data",
        bullets: [
          "Oversaw EDR & XDR via CrowdStrike Falcon",
          "Administered Google Workspace, automated user access, and built DLP alerts",
          "Managed Slack Enterprise Grid, third-party apps, and SaaS tools — including custom Slack apps",
          "Implemented data-retention policies and utilised DLP tools",
        ],
      },
      {
        title: "Automation & enablement",
        bullets: [
          "Automated IAM processes using Python and Bash scripting",
          "Created and distributed custom internal documentation for end users and internal teams",
          "Collaborated cross-functionally, providing IAM guidance and conducting training sessions",
          "Ensured compliance with risk frameworks (NIST, ISO) and led smooth IAM implementations",
          "Communicated complex concepts to technical and non-technical stakeholders; escalation point for BAU tickets",
        ],
      },
    ],
  },

  {
    slug: "convatec",
    company: "Convatec",
    role: "EUC Engineer — Okta SME",
    start: "Feb 2022",
    end: "Aug 2022",
    location: "London, UK",
    sector: "Medical",
    headline:
      "Okta SME for 8,000+ global users with deep endpoint, Microsoft, and AWS/Terraform tooling.",
    highlights: [
      "Managed Okta for 8,000+ global users",
      "Built a custom Slack ticketing app on AWS using Slack APIs + Terraform",
      "Maintained 99%+ SLAs across 2,000+ global users within ITIL",
    ],
    stack: [
      "Okta",
      "Microsoft Defender (EDR/XDR)",
      "Microsoft Intune",
      "Microsoft Sentinel",
      "Microsoft Purview",
      "Slack APIs",
      "AWS",
      "Terraform",
      "ECS",
      "EC2",
      "Azure AD",
      "Active Directory",
    ],
    ribbons: ["Okta SME", "AWS / Terraform"],
    logo: "/logos/convatec.svg",
    projects: [
      {
        title: "Identity & SSO",
        bullets: [
          "Managed Okta for 8,000+ global users, oversaw LDAP, and enabled SSO with third-party vendors",
          "Migrated and integrated applications behind Okta SSO",
          "Administered multi-organisational Okta, Google Workspace, and MS365 licensing — incl. SharePoint and OneDrive",
          "Provided escalated support for Azure AD and Active Directory",
          "Developed custom scripts for Okta Workflows and API utilisation",
        ],
      },
      {
        title: "Endpoint & data protection",
        bullets: [
          "Conducted endpoint management using Microsoft Defender (EDR/XDR)",
          "Endpoint management via Intune with Windows Defender and Microsoft Sentinel",
          "Implemented Microsoft Purview (formerly Azure Information Protection)",
        ],
      },
      {
        title: "Automation & platform",
        bullets: [
          "Built a custom Slack ticketing app via Slack APIs, AWS, and Terraform",
          "Implemented Terraform testing across ECS, EC2 Cluster, and instances",
          "Supported 2,000+ global users via Assyst & ServiceNow, consistently 99%+ SLA within the ITIL framework",
        ],
      },
    ],
  },

  {
    slug: "paddle",
    company: "Paddle",
    role: "IT Support Engineer",
    start: "Mar 2021",
    end: "Jan 2022",
    location: "London, UK",
    sector: "SaaS",
    headline:
      "Macros-to-pipelines IT — DevOps tooling (Kubernetes, Terraform, Jenkins, Docker), Okta SSO/SCIM, and zero-touch macOS deployment.",
    highlights: [
      "No-touch macOS deployment via simpleMDM",
      "Okta SSO + SCIM application provisioning",
      "Hands-on with Kubernetes, Jenkins, GitHub, Terraform, and Docker",
    ],
    stack: [
      "Okta (SSO, SCIM)",
      "Google Workspace",
      "simpleMDM",
      "Kubernetes",
      "Jenkins",
      "GitHub",
      "Terraform",
      "Docker",
      "Azure AD",
    ],
    ribbons: ["DevOps"],
    logo: "/logos/paddle.svg",
    projects: [
      {
        title: "IT operations",
        bullets: [
          "Delivered technical macOS support remotely",
          "Administered Okta (SSO and SCIM provisioning) and Google Workspace",
          "Implemented macOS MDM (simpleMDM) for efficient device management",
          "Optimised onboarding processes, including 'No-Touch Deployment' via simpleMDM",
          "Managed Azure Active Directory and resolved BAU tickets efficiently",
          "Authored instructional documents, including how-to guides for office tasks",
        ],
      },
      {
        title: "DevOps exposure",
        bullets: [
          "Applied active DevOps experience with Kubernetes, Jenkins, GitHub, Terraform, and Docker",
        ],
      },
    ],
  },

  {
    slug: "memrise",
    company: "Memrise",
    role: "Junior IT Support Engineer",
    start: "May 2019",
    end: "Sep 2019",
    location: "London, UK",
    sector: "EdTech",
    headline:
      "First IT role — Mac support, Google Workspace, Jamf zero-touch deployment, and office network buildout.",
    highlights: [
      "Implemented Jamf MDM with Zero-Touch Deployment",
      "Set up new office space network end-to-end (Ubiquiti)",
    ],
    stack: ["Jamf", "Google Workspace", "Ubiquiti", "Slack"],
    logo: "/logos/memrise.svg",
    projects: [
      {
        title: "Support & deployment",
        bullets: [
          "Provided macOS support to colleagues in the office",
          "Remote technical support via Slack",
          "Google Workspace administration",
          "Implementation of Jamf MDM with Zero-Touch Deployment",
        ],
      },
      {
        title: "Networking",
        bullets: [
          "Set up new office space for all types of equipment",
          "Network configuration using Ubiquiti APs, routers, and switches",
          "Wrote how-to guides for office tasks (e.g. printer configurations)",
        ],
      },
    ],
  },

  {
    slug: "apple",
    company: "Apple",
    role: "Technical Specialist",
    start: "Aug 2017",
    end: "Jan 2018",
    location: "London, UK",
    sector: "Consumer",
    headline:
      "Front-line technical support at the Apple Store — Genius Bar customer support across iOS, iPadOS, and macOS.",
    highlights: [
      "Genius Bar customer support",
      "Customer-facing iOS, iPadOS, and macOS troubleshooting",
    ],
    stack: ["iOS", "iPadOS", "macOS", "Customer support"],
    logo: "/logos/apple.svg",
    projects: [
      {
        title: "Customer support",
        bullets: [
          "Provided Genius Bar support",
          "Supported customers with iOS, iPadOS, and macOS",
        ],
      },
    ],
  },
];
