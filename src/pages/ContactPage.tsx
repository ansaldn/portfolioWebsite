import { useState, type FormEvent } from "react";
import { useSearchParams } from "react-router-dom";
import { services } from "../data/services";
import { validateWorkEmail } from "../lib/email";
import "./ContactPage.css";

// -----------------------------------------------------------------------------
// Form options
// -----------------------------------------------------------------------------
const companySizes = [
  "Just me / 1–10",
  "11–50",
  "51–200",
  "201–1,000",
  "1,001–5,000",
  "5,000+",
];

const industries = [
  "Gaming / Entertainment",
  "FinTech / Insurance",
  "EdTech",
  "HealthTech / Medical",
  "Industry / Manufacturing",
  "Retail / Consumer",
  "SaaS / Technology",
  "Government / Defence",
  "Non-profit",
  "Other",
];

const identityStackOptions = [
  "Okta",
  "Microsoft Entra ID",
  "Azure AD (legacy)",
  "Active Directory",
  "SailPoint",
  "Auth0",
  "Amazon Cognito",
  "Google Workspace",
  "Ping Identity",
  "Other / not sure",
];

const complianceOptions = [
  "SOC 2 Type II",
  "FedRAMP",
  "ISO 27001",
  "HIPAA",
  "PCI DSS",
  "GDPR-only",
  "None yet",
];

const timelines = [
  { value: "immediate", label: "Immediate (next 30 days)" },
  { value: "1-3", label: "1–3 months" },
  { value: "3-6", label: "3–6 months" },
  { value: "exploring", label: "Exploring / no firm date" },
];

// -----------------------------------------------------------------------------
// Formspree endpoint — set VITE_FORMSPREE_ENDPOINT in .env to enable.
// If not configured, the form shows a notice (no email address is exposed).
// -----------------------------------------------------------------------------
const FORMSPREE_ENDPOINT = import.meta.env.VITE_FORMSPREE_ENDPOINT as
  | string
  | undefined;

interface FormState {
  name: string;
  email: string;
  company: string;
  companySize: string;
  industry: string;
  engagementType: string;
  identityStack: string[];
  compliance: string[];
  timeline: string;
  description: string;
  // honeypot — must stay empty
  website: string;
  // consent
  consent: boolean;
}

const initialState: FormState = {
  name: "",
  email: "",
  company: "",
  companySize: "",
  industry: "",
  engagementType: "",
  identityStack: [],
  compliance: [],
  timeline: "",
  description: "",
  website: "",
  consent: false,
};

type Status = "idle" | "submitting" | "success" | "error";

const ContactPage = () => {
  const [params] = useSearchParams();
  const preselected = params.get("topic") ?? "";

  const [form, setForm] = useState<FormState>({
    ...initialState,
    engagementType: services.some((s) => s.slug === preselected) ? preselected : "",
  });
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState<string>("");

  const update = <K extends keyof FormState>(key: K, value: FormState[K]) => {
    setForm((f) => ({ ...f, [key]: value }));
  };

  const toggleInArray = (key: "identityStack" | "compliance", value: string) => {
    setForm((f) => {
      const set = new Set(f[key]);
      if (set.has(value)) set.delete(value);
      else set.add(value);
      return { ...f, [key]: Array.from(set) };
    });
  };

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // honeypot trap — silently succeed but don't actually send
    if (form.website.trim().length > 0) {
      setStatus("success");
      return;
    }

    if (!form.consent) {
      setErrorMsg("Please confirm that I can email you back about this enquiry.");
      setStatus("error");
      return;
    }

    const emailError = validateWorkEmail(form.email);
    if (emailError) {
      setErrorMsg(emailError);
      setStatus("error");
      return;
    }

    setStatus("submitting");
    setErrorMsg("");

    const payload = {
      name: form.name,
      email: form.email,
      company: form.company,
      companySize: form.companySize,
      industry: form.industry,
      engagementType: form.engagementType,
      identityStack: form.identityStack.join(", "),
      compliance: form.compliance.join(", "),
      timeline: form.timeline,
      description: form.description,
      // Formspree-specific helpers
      _subject: `Pre-boarding brief — ${form.company || form.name}`,
      _replyto: form.email,
    };

    // No Formspree endpoint configured — we deliberately don't expose an
    // email address, so surface a notice instead of opening a mail client.
    if (!FORMSPREE_ENDPOINT) {
      setStatus("error");
      setErrorMsg(
        "This form isn't connected yet. Please reach me on LinkedIn in the meantime.",
      );
      return;
    }

    try {
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(
          data?.errors?.[0]?.message ?? `Submission failed (${res.status}).`
        );
      }
      setStatus("success");
    } catch (err) {
      setStatus("error");
      setErrorMsg(
        err instanceof Error
          ? err.message
          : "Something went wrong. Please email me directly using the link below."
      );
    }
  };

  if (status === "success") {
    return (
      <main className="contact-page">
        <section className="contact-success container-narrow">
          <div className="surface-card contact-success__card">
            <svg
              viewBox="0 0 64 64"
              width="56"
              height="56"
              aria-hidden="true"
              className="contact-success__icon"
            >
              <circle cx="32" cy="32" r="28" fill="none" stroke="var(--accent-green)" strokeWidth="3" />
              <path
                d="M20 33l8 8 16-18"
                fill="none"
                stroke="var(--accent-green)"
                strokeWidth="3.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <h1>Brief received.</h1>
            <p className="contact-success__text">
              Thanks {form.name || "for getting in touch"}. I'll review what
              you've shared and come back to you at <code>{form.email}</code>{" "}
              within two working days — usually faster.
            </p>
            <p className="contact-success__text">
              If it's urgent, you can also message me on{" "}
              <a
                href="https://linkedin.com/in/davidansa"
                target="_blank"
                rel="noopener noreferrer"
              >
                LinkedIn
              </a>
              .
            </p>
          </div>
        </section>
      </main>
    );
  }

  return (
    <main className="contact-page">
      <header className="contact-header container-narrow">
        <span className="eyebrow">CONTACT · PRE-BOARDING BRIEF</span>
        <h1 className="contact-title">
          Tell me about the engagement
        </h1>
        <p className="contact-lede">
          About 90 seconds. Everything you share is treated as
          commercial-in-confidence — I'll sign your NDA before any sensitive
          material changes hands. Required fields are marked with{" "}
          <span className="contact-required-marker">*</span>.
        </p>
      </header>

      <form className="contact-form container-narrow" onSubmit={onSubmit} noValidate>
        {/* honeypot — hidden from humans, catches bots that fill every field */}
        <div className="contact-honeypot" aria-hidden="true">
          <label>
            Website
            <input
              type="text"
              name="website"
              tabIndex={-1}
              autoComplete="off"
              value={form.website}
              onChange={(e) => update("website", e.target.value)}
            />
          </label>
        </div>

        <fieldset className="contact-fieldset surface-card">
          <legend className="contact-legend">About you</legend>

          <div className="contact-row">
            <label className="contact-field">
              <span className="contact-label">
                Full name <span className="contact-required-marker">*</span>
              </span>
              <input
                type="text"
                required
                value={form.name}
                onChange={(e) => update("name", e.target.value)}
                autoComplete="name"
              />
            </label>

            <label className="contact-field">
              <span className="contact-label">
                Work email <span className="contact-required-marker">*</span>
              </span>
              <input
                type="email"
                required
                value={form.email}
                onChange={(e) => update("email", e.target.value)}
                autoComplete="email"
                placeholder="you@company.com"
              />
            </label>
          </div>

          <div className="contact-row">
            <label className="contact-field">
              <span className="contact-label">
                Company <span className="contact-required-marker">*</span>
              </span>
              <input
                type="text"
                required
                value={form.company}
                onChange={(e) => update("company", e.target.value)}
                autoComplete="organization"
              />
            </label>

            <label className="contact-field">
              <span className="contact-label">Company size</span>
              <select
                value={form.companySize}
                onChange={(e) => update("companySize", e.target.value)}
              >
                <option value="">Choose…</option>
                {companySizes.map((s) => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </label>
          </div>

          <label className="contact-field">
            <span className="contact-label">Industry</span>
            <select
              value={form.industry}
              onChange={(e) => update("industry", e.target.value)}
            >
              <option value="">Choose…</option>
              {industries.map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </label>
        </fieldset>

        <fieldset className="contact-fieldset surface-card">
          <legend className="contact-legend">The engagement</legend>

          <label className="contact-field">
            <span className="contact-label">
              Closest match <span className="contact-required-marker">*</span>
            </span>
            <select
              required
              value={form.engagementType}
              onChange={(e) => update("engagementType", e.target.value)}
            >
              <option value="">Choose the closest fit…</option>
              {services.map((s) => (
                <option key={s.slug} value={s.slug}>{s.title}</option>
              ))}
              <option value="advisory">Advisory / not sure yet</option>
            </select>
          </label>

          <div className="contact-field">
            <span className="contact-label">Current identity stack</span>
            <span className="contact-hint">Tick everything you currently use.</span>
            <div className="contact-checks">
              {identityStackOptions.map((opt) => (
                <label key={opt} className="contact-check">
                  <input
                    type="checkbox"
                    checked={form.identityStack.includes(opt)}
                    onChange={() => toggleInArray("identityStack", opt)}
                  />
                  <span>{opt}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="contact-field">
            <span className="contact-label">Compliance scope</span>
            <span className="contact-hint">Whatever applies — current or in-flight.</span>
            <div className="contact-checks">
              {complianceOptions.map((opt) => (
                <label key={opt} className="contact-check">
                  <input
                    type="checkbox"
                    checked={form.compliance.includes(opt)}
                    onChange={() => toggleInArray("compliance", opt)}
                  />
                  <span>{opt}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="contact-field">
            <span className="contact-label">Timeline</span>
            <div className="contact-radios">
              {timelines.map((t) => (
                <label key={t.value} className="contact-radio">
                  <input
                    type="radio"
                    name="timeline"
                    value={t.value}
                    checked={form.timeline === t.value}
                    onChange={() => update("timeline", t.value)}
                  />
                  <span>{t.label}</span>
                </label>
              ))}
            </div>
          </div>

          <label className="contact-field">
            <span className="contact-label">
              Project description{" "}
              <span className="contact-required-marker">*</span>
            </span>
            <span className="contact-hint">
              What are you trying to achieve? What's blocking you today?
              The more concrete you can be (current pain, target state, deadlines),
              the more useful my first reply will be.
            </span>
            <textarea
              required
              rows={6}
              value={form.description}
              onChange={(e) => update("description", e.target.value)}
              placeholder="Example: We're rolling out Okta across 1,200 staff after acquiring two smaller companies. Need help with M&A IAM integration and an SOC 2 Type II audit in Q3."
            />
          </label>
        </fieldset>

        <label className="contact-consent">
          <input
            type="checkbox"
            required
            checked={form.consent}
            onChange={(e) => update("consent", e.target.checked)}
          />
          <span>
            I'm happy for David to reply to me at the address above. I understand
            no marketing list is being created, and this information will only
            be used to scope this engagement.
          </span>
        </label>

        {status === "error" && (
          <div className="contact-error" role="alert">
            {errorMsg}
          </div>
        )}

        {!FORMSPREE_ENDPOINT && (
          <p className="contact-fallback-note">
            Note: this form isn't connected yet (Formspree endpoint not
            configured), so it can't send. Set{" "}
            <code>VITE_FORMSPREE_ENDPOINT</code> in <code>.env</code> to enable
            submissions.
          </p>
        )}

        <div className="contact-submit-row">
          <button
            type="submit"
            className="btn btn-primary btn-lg"
            disabled={status === "submitting"}
          >
            {status === "submitting" ? "Sending…" : "Send pre-boarding brief"}
          </button>
          <span className="contact-submit-aside">
            Or{" "}
            <a
              href="https://linkedin.com/in/davidansa"
              target="_blank"
              rel="noopener noreferrer"
            >
              message me on LinkedIn
            </a>
          </span>
        </div>
      </form>
    </main>
  );
};

export default ContactPage;
