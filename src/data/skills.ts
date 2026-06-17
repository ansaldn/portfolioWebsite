// Key skills shown as a strip on the home page.

export interface SkillGroup {
  title: string;
  skills: string[];
}

export const skillGroups: SkillGroup[] = [
  {
    title: "Identity & Access",
    skills: [
      "Okta (Classic + OIE)",
      "Okta Identity Governance",
      "Okta Workflows",
      "Microsoft Entra ID",
      "SailPoint IdentityNow",
      "Azure AD",
      "Active Directory",
      "SSO",
      "SCIM",
      "MFA",
      "RBAC",
      "PAM",
    ],
  },
  {
    title: "Security & Compliance",
    skills: [
      "SOC 2 Type II",
      "FedRAMP",
      "NIST",
      "ISO 27001",
      "GRC",
      "Risk assessment",
      "Incident response",
      "DLP",
      "SIEM",
    ],
  },
  {
    title: "Endpoint & EDR",
    skills: [
      "CrowdStrike Falcon",
      "Microsoft Defender (EDR/XDR)",
      "Microsoft Sentinel",
      "Microsoft Purview",
      "Microsoft Intune",
      "Jamf",
      "simpleMDM",
      "SCEP",
    ],
  },
  {
    title: "Cloud, Automation & AI",
    skills: [
      "AWS",
      "Terraform",
      "Kubernetes",
      "Docker",
      "Jenkins",
      "Python",
      "Bash",
      "Slack APIs",
      "Enterprise AI (SSO/SCIM)",
    ],
  },
];

export const valueProps = [
  {
    headline: "Senior IAM expertise",
    detail:
      "A decade across Okta (Classic and OIE), Microsoft Entra and SailPoint IdentityNow — SSO, MFA, SCIM provisioning, joiner/mover/leaver automation and governance — delivered at organisations from 2,000 to 8,000+ users, including as the named Okta SME on global rollouts.",
  },
  {
    headline: "Government-ready",
    detail:
      "Hands-on SOC 2 Type II and FedRAMP delivery: policy authoring, control implementation across IAM, endpoint and data, continuous monitoring and audit prep — including the automated evidence pipelines that keep you compliant after the auditor leaves.",
  },
  {
    headline: "M&A IAM specialist",
    detail:
      "IAM integration on multiple acquisitions — Hitachi Rail twice (construction and defence-adjacent) and Depop into Etsy — covering pre-deal due diligence, application consolidation, vendor and technical reviews, and licensing rationalisation that takes cost out of the combined estate.",
  },
  {
    headline: "Endpoint, device & AI",
    detail:
      "Beyond identity: EDR rollouts (CrowdStrike Falcon, Microsoft Defender), MDM and SCEP across macOS and Windows, and SIEM onboarding — plus integrating enterprise AI tools securely via SSO/SCIM and scoping them to do something genuinely useful for the business.",
  },
];
