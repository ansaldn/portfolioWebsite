import { Link } from "react-router-dom";
import HeroSection from "../components/HeroSection";
import CredentialsCarousel from "../components/CredentialsCarousel";
import IndustryShowcase from "../components/IndustryShowcase";
import SkillsStrip from "../components/SkillsStrip";
import { education } from "../data/credentials";
import "./HomePage.css";

const HomePage = () => {
  return (
    <main>
      <HeroSection />

      {/* 1. Proof first — where I've delivered */}
      <section className="section section--alt" id="clients">
        <div className="container-narrow">
          <div className="section-heading section-heading--row">
            <div>
              <span className="eyebrow">CLIENTS</span>
              <h2>Where I've delivered</h2>
              <p>
                Engagements across gaming, fintech, industry, healthcare,
                edtech, retail and SaaS. Hover an industry to spotlight the
                companies — or open the full page for the deep dives.
              </p>
            </div>
            <Link to="/clients" className="btn btn-outline-primary">
              View all clients →
            </Link>
          </div>

          <IndustryShowcase />
        </div>
      </section>

      {/* 2. What I do — capabilities */}
      <section className="section" id="skills">
        <div className="container-narrow">
          <div className="section-heading">
            <span className="eyebrow">CAPABILITIES</span>
            <h2>What I bring to the engagement</h2>
            <p>
              What commercial and government clients hire me for — identity,
              compliance, M&amp;A and endpoint security — and the tools I deliver
              them with.
            </p>
          </div>
          <SkillsStrip />
        </div>
      </section>

      {/* 3. Credentials that back it up */}
      <section className="section section--alt" id="credentials">
        <div className="container-narrow">
          <div className="section-heading">
            <span className="eyebrow">CREDENTIALS</span>
            <h2>Certifications &amp; education</h2>
            <p>
              The qualifications that back the work — Microsoft &amp; Okta
              certifications, plus a 1st-Class Computer Science degree from
              the University of Greenwich.
            </p>
          </div>

          <CredentialsCarousel />

          <div className="home__education">
            {education.map((e) => (
              <div key={e.qualification} className="home__education-item">
                <div className="home__education-degree">
                  {e.qualification}
                  {e.grade && (
                    <span className="home__education-grade"> — {e.grade}</span>
                  )}
                </div>
                <div className="home__education-meta">
                  {e.institution}  ·  {e.period}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Conversion */}
      <section className="section" id="contact">
        <div className="container-narrow home__cta-band surface-card">
          <div>
            <h2 className="home__cta-title">Need an IAM specialist for your next contract?</h2>
            <p className="home__cta-text">
              I'm open to new commercial and government engagements — IAM
              modernisation, M&amp;A integration, SOC 2 / FedRAMP programmes,
              and Okta/Entra deployments.
            </p>
          </div>
          <div className="home__cta-actions">
            <Link className="btn btn-primary btn-lg" to="/engage">
              Book a call
            </Link>
            <a
              className="btn btn-outline-primary btn-lg"
              href="https://linkedin.com/in/davidansa"
              target="_blank"
              rel="noopener noreferrer"
            >
              LinkedIn
            </a>
          </div>
        </div>
      </section>
    </main>
  );
};

export default HomePage;
