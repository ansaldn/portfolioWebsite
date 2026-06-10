import { Link } from "react-router-dom";
import {
  engagementModels,
  assurances,
  workingTerms,
} from "../data/business";
import "./BusinessPage.css";

const BusinessPage = () => {
  return (
    <main className="business-page">
      {/* Hero */}
      <header className="business-hero">
        <div className="container-narrow">
          <span className="eyebrow">FOR BUSINESS · B2B ENGAGEMENTS</span>
          <h1 className="business-hero__title">
            Engage me as a business,{" "}
            <span className="business-hero__title-accent">on your terms.</span>
          </h1>
          <p className="business-hero__lede">
            I'm not just available for individual contracts — I work with
            companies as a registered supplier. Whether you procure through a
            day-rate contract, a fixed-price statement of work, a retained
            advisory arrangement, or via your existing supplier list, I'll fit
            the way your business already buys. The goal is to make working
            together easy for your procurement, finance and security teams
            alike.
          </p>
          <div className="business-hero__cta">
            <Link to="/engage" className="btn btn-primary btn-lg">
              Start an engagement
            </Link>
            <Link to="/services" className="btn btn-outline-primary btn-lg">
              See what I deliver
            </Link>
          </div>
        </div>
      </header>

      {/* Engagement models */}
      <section className="section section--alt" id="models">
        <div className="container-narrow">
          <div className="section-heading">
            <span className="eyebrow">WAYS TO CONTRACT</span>
            <h2>Four ways to bring me on</h2>
            <p>
              Same senior delivery either way — the structure flexes around how
              your organisation prefers to engage suppliers.
            </p>
          </div>

          <div className="business-models">
            {engagementModels.map((m) => (
              <article key={m.slug} className="business-model surface-card">
                <div className="business-model__icon" aria-hidden="true">
                  <svg viewBox="0 0 24 24" width="26" height="26" fill="none">
                    <path
                      d={m.iconPath}
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <h3 className="business-model__title">{m.title}</h3>
                <p className="business-model__summary">{m.summary}</p>
                <div className="business-model__best">
                  <span className="business-model__best-label">Best for</span>
                  <span>{m.bestFor}</span>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Assurances */}
      <section className="section" id="assurances">
        <div className="container-narrow">
          <div className="section-heading">
            <span className="eyebrow">PROCUREMENT-READY</span>
            <h2>The boxes your buying team needs ticked</h2>
            <p>
              The practical things that make signing off an external supplier
              straightforward — handled up front, not after the fact.
            </p>
          </div>

          <div className="business-assurances">
            {assurances.map((a) => (
              <div key={a.label} className="business-assurance">
                <div className="business-assurance__check" aria-hidden="true">
                  <svg viewBox="0 0 24 24" width="18" height="18" fill="none">
                    <path
                      d="M5 13l4 4L19 7"
                      stroke="currentColor"
                      strokeWidth="2.4"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <div>
                  <div className="business-assurance__label">{a.label}</div>
                  <p className="business-assurance__detail">{a.detail}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Working terms + CTA */}
      <section className="section section--alt" id="terms">
        <div className="container-narrow business-terms-wrap">
          <div className="business-terms surface-card">
            <h2 className="business-terms__title">At a glance</h2>
            <dl className="business-terms__grid">
              {workingTerms.map((t) => (
                <div key={t.label} className="business-terms__row">
                  <dt>{t.label}</dt>
                  <dd>{t.value}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="business-cta surface-card">
            <h2 className="business-cta__title">
              Ready to set something up?
            </h2>
            <p className="business-cta__text">
              Tell me a little about the company and the problem, verify you're
              human, and book a slot directly in my calendar. I'll come to the
              first call already briefed.
            </p>
            <div className="business-cta__actions">
              <Link to="/engage" className="btn btn-primary btn-lg">
                Book a call
              </Link>
              <Link to="/contact" className="btn btn-outline-primary btn-lg">
                Send a brief instead
              </Link>
            </div>
            <p className="business-cta__aside">
              Prefer LinkedIn?{" "}
              <a
                href="https://linkedin.com/in/davidansa"
                target="_blank"
                rel="noopener noreferrer"
              >
                Message me there
              </a>
            </p>
          </div>
        </div>
      </section>
    </main>
  );
};

export default BusinessPage;
