import { useState } from "react";
import { Link } from "react-router-dom";
import { services, engagementPhases, faq } from "../data/services";
import { clients } from "../data/clients";
import "./ServicesPage.css";

const ServicesPage = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <main className="services-page">
      {/* Hero */}
      <header className="services-hero">
        <div className="container-narrow">
          <span className="eyebrow">B2B ENGAGEMENTS · COMMERCIAL + GOVERNMENT</span>
          <h1 className="services-hero__title">
            Cybersecurity &amp; IAM consultancy,{" "}
            <span className="services-hero__title-accent">delivered end-to-end.</span>
          </h1>
          <p className="services-hero__lede">
            I work with security, identity, and platform teams to modernise
            their identity stack, integrate acquisitions, and stand up the
            compliance programmes that win contracts. Below is a menu of how I
            usually engage — pick the closest fit, or get in touch and we'll
            shape something around what you actually need.
          </p>
          <div className="services-hero__cta">
            <Link to="/contact" className="btn btn-primary btn-lg">
              Start a pre-boarding brief
            </Link>
            <a
              href="#engagement-model"
              className="btn btn-outline-primary btn-lg"
            >
              How I work
            </a>
          </div>
        </div>
      </header>

      {/* Service cards */}
      <section className="section" id="services">
        <div className="container-narrow">
          <div className="section-heading">
            <span className="eyebrow">WHAT I DO</span>
            <h2>Six ways I engage</h2>
            <p>
              Each card links to the receipts — the clients where I've actually
              delivered this work. The deliverables list shows what you walk
              away with, not what gets pitched on the call.
            </p>
          </div>

          <div className="services-grid">
            {services.map((s) => (
              <article
                key={s.slug}
                id={s.slug}
                className="service-card surface-card"
              >
                <div className="service-card__icon" aria-hidden="true">
                  <svg viewBox="0 0 24 24" width="28" height="28">
                    <path d={s.iconPath} fill="currentColor" />
                  </svg>
                </div>
                <h3 className="service-card__title">{s.title}</h3>
                <p className="service-card__tagline">{s.tagline}</p>
                <p className="service-card__description">{s.description}</p>

                <div className="service-card__section">
                  <span className="service-card__label">You walk away with</span>
                  <ul className="service-card__list">
                    {s.deliverables.map((d) => (
                      <li key={d}>{d}</li>
                    ))}
                  </ul>
                </div>

                <div className="service-card__section">
                  <span className="service-card__label">Typical stack</span>
                  <div className="service-card__tags">
                    {s.stack.map((t) => (
                      <span key={t} className="tag">{t}</span>
                    ))}
                  </div>
                </div>

                {s.proof.length > 0 && (
                  <div className="service-card__proof">
                    <span className="service-card__label">Receipts</span>
                    <div className="service-card__proof-list">
                      {s.proof.map((slug) => {
                        const c = clients.find((cc) => cc.slug === slug);
                        if (!c) return null;
                        return (
                          <Link
                            key={slug}
                            to={`/clients#${slug}`}
                            className="service-card__proof-link"
                          >
                            {c.company} ↗
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                )}

                <Link
                  to={`/contact?topic=${s.slug}`}
                  className="service-card__cta"
                >
                  Start a brief on this  →
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Engagement model */}
      <section className="section section--alt" id="engagement-model">
        <div className="container-narrow">
          <div className="section-heading">
            <span className="eyebrow">HOW I WORK</span>
            <h2>The engagement model</h2>
            <p>
              Every contract — from a 2-week PoC to a 12-month programme —
              follows the same four phases. The shape stays consistent; only
              the duration changes.
            </p>
          </div>

          <ol className="engagement">
            {engagementPhases.map((p) => (
              <li key={p.number} className="engagement__phase surface-card">
                <div className="engagement__head">
                  <span className="engagement__number">{p.number}</span>
                  <div>
                    <h3 className="engagement__title">{p.title}</h3>
                    <span className="engagement__duration">{p.duration}</span>
                  </div>
                </div>
                <p className="engagement__description">{p.description}</p>
                <ul className="engagement__outcomes">
                  {p.outcomes.map((o) => (
                    <li key={o}>{o}</li>
                  ))}
                </ul>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* FAQ */}
      <section className="section" id="faq">
        <div className="container-narrow">
          <div className="section-heading">
            <span className="eyebrow">FAQ</span>
            <h2>Common questions</h2>
            <p>
              If your question isn't here, the contact form below has a
              free-text field for it.
            </p>
          </div>

          <ul className="faq">
            {faq.map((item, i) => (
              <li
                key={item.q}
                className={`faq__item surface-card ${openFaq === i ? "is-open" : ""}`}
              >
                <button
                  type="button"
                  className="faq__toggle"
                  aria-expanded={openFaq === i}
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                >
                  <span className="faq__q">{item.q}</span>
                  <span className="faq__icon" aria-hidden="true">
                    {openFaq === i ? "−" : "+"}
                  </span>
                </button>
                <div className="faq__a" hidden={openFaq !== i}>
                  {item.a}
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* CTA band */}
      <section className="section">
        <div className="container-narrow services-cta surface-card">
          <div>
            <h2 className="services-cta__title">Ready to scope something?</h2>
            <p className="services-cta__text">
              The pre-boarding form takes about 90 seconds and gives me enough
              context to come back with a first call that's actually useful.
              Everything you send is treated as commercial-in-confidence.
            </p>
          </div>
          <div className="services-cta__actions">
            <Link to="/contact" className="btn btn-primary btn-lg">
              Start a pre-boarding brief
            </Link>
            <a
              className="btn btn-outline-primary btn-lg"
              href="mailto:davidansa00@gmail.com"
            >
              Or just email me
            </a>
          </div>
        </div>
      </section>
    </main>
  );
};

export default ServicesPage;
