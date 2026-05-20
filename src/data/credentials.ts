// Certifications + education — surfaced in the credentials carousel.

export type CredentialStatus = "active" | "expired" | "lifetime";

export interface Credential {
  id: string;
  name: string;
  issuer: string;
  issued: string;
  expires?: string;
  status: CredentialStatus;
  /** One-line context shown under the title. */
  blurb: string;
  /** Short tag(s) for the badge. */
  tags: string[];
}

export interface EducationItem {
  qualification: string;
  institution: string;
  period: string;
  grade?: string;
}

// Note: today's date is May 2026, so the Okta certs are now expired.
// They're kept on the carousel — track record matters — but flagged
// "expired" so the badge styling can render honestly.
export const credentials: Credential[] = [
  {
    id: "ms-iam-admin",
    name: "Identity and Access Administrator Associate",
    issuer: "Microsoft",
    issued: "Jan 2024",
    expires: "Jan 2026",
    status: "expired",
    blurb:
      "Microsoft Entra ID design, identity governance, conditional access, hybrid identity.",
    tags: ["Microsoft", "Entra", "IAM"],
  },
  {
    id: "okta-admin",
    name: "Okta Certified Administrator",
    issuer: "Okta",
    issued: "Oct 2023",
    expires: "Oct 2025",
    status: "expired",
    blurb:
      "Day-to-day administration of Okta — SSO, MFA, lifecycle, integrations.",
    tags: ["Okta", "IAM"],
  },
  {
    id: "okta-pro",
    name: "Okta Certified Professional",
    issuer: "Okta",
    issued: "Oct 2021",
    expires: "Oct 2025",
    status: "expired",
    blurb:
      "Core Okta product knowledge — identity foundations, end-user experience, troubleshooting.",
    tags: ["Okta"],
  },
  {
    id: "az-900",
    name: "Microsoft Certified: Azure Fundamentals",
    issuer: "Microsoft",
    issued: "Jan 2021",
    status: "lifetime",
    blurb:
      "Cloud fundamentals across Azure compute, networking, storage, identity, governance, and pricing.",
    tags: ["Microsoft", "Azure"],
  },
];

export const education: EducationItem[] = [
  {
    qualification: "BA (Hons) Computer Science",
    institution: "University of Greenwich",
    period: "2018 – 2021",
    grade: "1st Class",
  },
];
