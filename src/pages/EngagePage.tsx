import { useState, type FormEvent } from "react";
import Turnstile from "../components/Turnstile";
import { validateWorkEmail } from "../lib/email";
import "./EngagePage.css";

// -----------------------------------------------------------------------------
// Configuration (set in .env — see .env.example)
// -----------------------------------------------------------------------------
const FORMSPREE_ENDPOINT = import.meta.env.VITE_FORMSPREE_ENDPOINT as
  | string
  | undefined;

// Google Calendar appointment-schedule embed URL, e.g.
// https://calendar.google.com/calendar/appointments/schedules/AcZ...?gv=true
const GCAL_EMBED_URL = import.meta.env.VITE_GCAL_EMBED_URL as string | undefined;

// Cloudflare Turnstile site key. Falls back to Cloudflare's official
// "always passes" test key so the flow is demoable before you add your own.
// Replace with your real key in production.
const TEST_SITE_KEY = "1x00000000000000000000AA";
const TURNSTILE_SITE_KEY =
  (import.meta.env.VITE_TURNSTILE_SITE_KEY as string | undefined) ||
  TEST_SITE_KEY;
const USING_TEST_KEY = TURNSTILE_SITE_KEY === TEST_SITE_KEY;

const projectTypes = [
  "IAM modernisation (Okta / Entra)",
  "M&A IAM integration",
  "SOC 2 Type II / FedRAMP programme",
  "Okta deployment / administration",
  "CIAM (Auth0 / Cognito)",
  "Endpoint & EDR",
  "Advisory / not sure yet",
];

interface FormState {
  name: string;
  email: string;
  company: string;
  role: string;
  projectType: string;
  message: string;
  website: string; // honeypot — must stay empty
  consent: boolean;
}

const initialState: FormState = {
  name: "",
  email: "",
  company: "",
  role: "",
  projectType: "",
  message: "",
  website: "",
  consent: false,
};

type Status = "idle" | "submitting" | "error" | "verified";

const EngagePage = () => {
  const [form, setForm] = useState<FormState>(initialState);
  const [token, setToken] = useState<string>("");
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState<string>("");

  const update = <K extends keyof FormState>(key: K, value: FormState[K]) =>
    setForm((f) => ({ ...f, [key]: value }));

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMsg("");

    // Honeypot: a real user never fills this. Silently stop.
    if (form.website.trim().length > 0) {
      setStatus("verified");
      return;
    }
    if (!form.consent) {
      setStatus("error");
      setErrorMsg("Please confirm you're happy for me to hold your details to arrange the call.");
      return;
    }
    const emailError = validateWorkEmail(form.email);
    if (emailError) {
      setStatus("error");
      setErrorMsg(emailError);
      return;
    }
    if (!token) {
      setStatus("error");
      setErrorMsg("Please complete the human-verification check before continuing.");
      return;
    }

    setStatus("submitting");

    const payload = {
      name: form.name,
      email: form.email,
      company: form.company,
      role: form.role,
      projectType: form.projectType,
      message: form.message,
      "cf-turnstile-response": token,
      _subject: `Call request — ${form.company || form.name}`,
      _replyto: form.email,
    };

    // If Formspree isn't configured we still let verified humans through to
    // the calendar — the booking itself captures their details.
    if (!FORMSPREE_ENDPOINT) {
      setStatus("verified");
      return;
    }

    try {
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data?.errors?.[0]?.message ?? `Submission failed (${res.status}).`);
      }
      setStatus("verified");
    } catch (err) {
      setStatus("error");
      setErrorMsg(
        err instanceof Error
          ? err.message
          : "Something went wrong. Please email me directly using the link below.",
      );
    }
  };

  // ---------------------------------------------------------------------------
  // Verified → show the calendar
  // ---------------------------------------------------------------------------
  if (status === "verified") {
    return (
      <main className="engage-page">
        <section className="container-narrow engage-booking">
          <span className="eyebrow">VERIFIED · PICK A TIME</span>
          <h1 className="engage-booking__title">
            Thanks {form.name ? form.name.split(" ")[0] : ""} — grab a slot
          </h1>
          <p className="engage-booking__lede">
            Pick whatever suits you below and you'll get a calendar invite
            straight away. I'll have your note in front of me before we talk.
          </p>

          {GCAL_EMBED_URL ? (
            <div className="engage-calendar surface-card">
              <iframe
                src={GCAL_EMBED_URL}
                title="Book a call with David Ansa"
                className="engage-calendar__frame"
                loading="lazy"
              />
            </div>
          ) : (
            <div className="engage-calendar-fallback surface-card">
              <h2>Calendar not connected yet</h2>
              <p>
                The booking calendar isn't wired up on this build yet. Add your
                Google Calendar appointment-schedule URL as{" "}
                <code>VITE_GCAL_EMBED_URL</code> in <code>.env</code> and it will
                appear here automatically.
              </p>
              <p>
                In the meantime, you can{" "}
                <a
                  href="https://linkedin.com/in/davidansa"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  message me on LinkedIn
                </a>{" "}
                and we'll find a time.
              </p>
            </div>
          )}
        </section>
      </main>
    );
  }

  // ---------------------------------------------------------------------------
  // Form
  // ---------------------------------------------------------------------------
  return (
    <main className="engage-page">
      <header className="engage-header container-narrow">
        <span className="eyebrow">BOOK A CALL · 60 SECONDS</span>
        <h1 className="engage-title">Let's find time to talk</h1>
        <p className="engage-lede">
          A couple of real details and a quick human check, then you can book
          straight into my calendar. Everything you share is
          commercial-in-confidence and used only to prepare for our call —
          there's no marketing list.
        </p>
      </header>

      <form className="engage-form container-narrow" onSubmit={onSubmit} noValidate>
        {/* honeypot */}
        <div className="engage-honeypot" aria-hidden="true">
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

        <fieldset className="engage-fieldset surface-card">
          <legend className="engage-legend">Your details</legend>

          <div className="engage-row">
            <label className="engage-field">
              <span className="engage-label">
                Full name <span className="engage-required">*</span>
              </span>
              <input
                type="text"
                required
                autoComplete="name"
                value={form.name}
                onChange={(e) => update("name", e.target.value)}
              />
            </label>
            <label className="engage-field">
              <span className="engage-label">
                Work email <span className="engage-required">*</span>
              </span>
              <input
                type="email"
                required
                autoComplete="email"
                placeholder="you@company.com"
                value={form.email}
                onChange={(e) => update("email", e.target.value)}
              />
              <span className="engage-hint">
                Your company address, please — personal inboxes (Gmail, Outlook,
                etc.) aren't accepted.
              </span>
            </label>
          </div>

          <div className="engage-row">
            <label className="engage-field">
              <span className="engage-label">
                Company <span className="engage-required">*</span>
              </span>
              <input
                type="text"
                required
                autoComplete="organization"
                value={form.company}
                onChange={(e) => update("company", e.target.value)}
              />
            </label>
            <label className="engage-field">
              <span className="engage-label">Your role</span>
              <input
                type="text"
                autoComplete="organization-title"
                placeholder="e.g. Head of Security"
                value={form.role}
                onChange={(e) => update("role", e.target.value)}
              />
            </label>
          </div>

          <label className="engage-field">
            <span className="engage-label">What's this about?</span>
            <select
              value={form.projectType}
              onChange={(e) => update("projectType", e.target.value)}
            >
              <option value="">Choose the closest fit…</option>
              {projectTypes.map((p) => (
                <option key={p} value={p}>{p}</option>
              ))}
            </select>
          </label>

          <label className="engage-field">
            <span className="engage-label">
              A line or two of context <span className="engage-required">*</span>
            </span>
            <textarea
              required
              rows={4}
              value={form.message}
              onChange={(e) => update("message", e.target.value)}
              placeholder="What are you trying to achieve, and what's the rough timeline?"
            />
          </label>
        </fieldset>

        <div className="engage-verify surface-card">
          <span className="engage-label">Verify you're human</span>
          <Turnstile
            siteKey={TURNSTILE_SITE_KEY}
            onVerify={(t) => {
              setToken(t);
              if (status === "error") {
                setStatus("idle");
                setErrorMsg("");
              }
            }}
            onExpire={() => setToken("")}
            onError={() => setToken("")}
          />
          {USING_TEST_KEY && (
            <p className="engage-test-note">
              Verification is in <strong>test mode</strong>. Add your real
              Cloudflare Turnstile site key as <code>VITE_TURNSTILE_SITE_KEY</code>{" "}
              in <code>.env</code> to enable live protection.
            </p>
          )}
        </div>

        <label className="engage-consent">
          <input
            type="checkbox"
            required
            checked={form.consent}
            onChange={(e) => update("consent", e.target.checked)}
          />
          <span>
            I'm happy for David to hold these details to arrange and prepare for
            our call. No marketing list is created.
          </span>
        </label>

        {status === "error" && (
          <div className="engage-error" role="alert">
            {errorMsg}
          </div>
        )}

        {!FORMSPREE_ENDPOINT && (
          <p className="engage-fallback-note">
            Note: form delivery isn't configured (<code>VITE_FORMSPREE_ENDPOINT</code>{" "}
            unset), so your details won't be emailed ahead — but once you pass
            the human check you can still book directly below.
          </p>
        )}

        <div className="engage-submit-row">
          <button
            type="submit"
            className="btn btn-primary btn-lg"
            disabled={status === "submitting"}
          >
            {status === "submitting" ? "Checking…" : "Continue to my calendar →"}
          </button>
        </div>
      </form>
    </main>
  );
};

export default EngagePage;
