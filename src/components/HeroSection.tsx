import { Link } from "react-router-dom";
import "./HeroSection.css";

const HeroSection = () => {
  return (
    <section className="hero">
      <div className="container-narrow hero__inner">
        <div className="hero__copy">
          <span className="eyebrow">CYBERSECURITY · IAM · CLOUD</span>
          <h1 className="hero__title">
            Identity &amp; access security,{" "}
            <span className="hero__title-accent">delivered.</span>
          </h1>
          <p className="hero__lede">
            I'm <strong>David Ansa</strong> — a senior cybersecurity engineer
            specialising in Identity &amp; Access Management. I help commercial
            and government organisations modernise their identity stack,
            integrate acquisitions, and meet SOC 2 / FedRAMP requirements
            without breaking the user experience.
          </p>
          <div className="hero__cta">
            <Link to="/clients" className="btn btn-primary btn-lg">
              View my client work
            </Link>
            <Link to="/engage" className="btn btn-outline-primary btn-lg">
              Book a call
            </Link>
          </div>
          <div className="hero__stats">
            <div className="hero__stat">
              <span className="hero__stat-value">10+</span>
              <span className="hero__stat-label">clients delivered</span>
            </div>
            <div className="hero__stat">
              <span className="hero__stat-value">8,000+</span>
              <span className="hero__stat-label">users managed (Convatec)</span>
            </div>
            <div className="hero__stat">
              <span className="hero__stat-value">SOC 2 + FedRAMP</span>
              <span className="hero__stat-label">control programmes</span>
            </div>
          </div>
        </div>

        <div className="hero__visual" aria-hidden="true">
          <div className="hero__terminal surface-card">
            <div className="hero__terminal-bar">
              <span className="hero__dot" style={{ background: "#FB7185" }} />
              <span className="hero__dot" style={{ background: "#FBBF24" }} />
              <span className="hero__dot" style={{ background: "#4ADE80" }} />
              <span className="hero__terminal-title">~/davidansa/identity</span>
            </div>
            <pre className="hero__terminal-body">
{`$ whoami
david.ansa@cybersecurity ~ % iam.profile

  role       : Senior IAM Engineer
  focus      : Okta · Entra · SailPoint
  compliance : SOC 2 Type II · FedRAMP
  speciality : M&A IAM integration
  open_to    : commercial + government work

$ _`}
            </pre>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
