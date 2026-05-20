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
    title: "Cloud & Automation",
    skills: [
      "AWS",
      "Terraform",
      "Kubernetes",
      "Docker",
      "Jenkins",
      "Python",
      "Bash",
      "Slack APIs",
    ],
  },
];

export const valueProps = [
  {
    headline: "Senior IAM expertise",
    detail:
      "10+ years across Okta, Microsoft Entra, and SailPoint — including SSO, MFA, JML automation, and governance at organisations from 2,000 to 8,000+ users.",
  },
  {
    headline: "Government-ready",
    detail:
      "Hands-on FedRAMP and SOC 2 Type II programme delivery, including control implementation, continuous monitoring, and audit prep.",
  },
  {
    headline: "M&A IAM specialist",
    detail:
      "Led IAM integration on multiple acquisitions (Hitachi Rail × 2, Depop × Etsy) — application consolidation, vendor reviews, and licensing rationalisation.",
  },
];
