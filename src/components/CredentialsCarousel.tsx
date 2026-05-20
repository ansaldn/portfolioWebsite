import { useEffect, useRef, useState } from "react";
import { credentials } from "../data/credentials";
import "./CredentialsCarousel.css";

const ROTATE_MS = 5000;

const CredentialsCarousel = () => {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const total = credentials.length;
  const timerRef = useRef<number | null>(null);

  useEffect(() => {
    if (paused) return;
    timerRef.current = window.setTimeout(() => {
      setIndex((i) => (i + 1) % total);
    }, ROTATE_MS);
    return () => {
      if (timerRef.current) window.clearTimeout(timerRef.current);
    };
  }, [index, paused, total]);

  const go = (i: number) => setIndex(((i % total) + total) % total);

  return (
    <div
      className="creds"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      <div className="creds__viewport" aria-live="polite">
        {credentials.map((c, i) => (
          <article
            key={c.id}
            className={`creds__slide surface-card ${i === index ? "is-active" : ""}`}
            aria-hidden={i !== index}
          >
            <div className="creds__badge" aria-hidden="true">
              <svg viewBox="0 0 64 64" width="56" height="56">
                <defs>
                  <linearGradient id={`g-${c.id}`} x1="0" x2="1" y1="0" y2="1">
                    <stop offset="0%" stopColor="var(--accent-cyan)" />
                    <stop offset="100%" stopColor="var(--accent-green)" />
                  </linearGradient>
                </defs>
                <path
                  d="M32 4l24 8v18c0 14-10 24-24 30C18 54 8 44 8 30V12l24-8z"
                  fill="rgba(34,211,238,0.08)"
                  stroke={`url(#g-${c.id})`}
                  strokeWidth="2"
                />
                <path
                  d="M22 33l7 7 13-16"
                  fill="none"
                  stroke="var(--accent-green)"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>

            <div className="creds__content">
              <div className="creds__meta">
                <span className="creds__issuer">{c.issuer}</span>
                <span className={`creds__status creds__status--${c.status}`}>
                  {c.status === "active" && "Active"}
                  {c.status === "expired" && "Expired — renewing"}
                  {c.status === "lifetime" && "Lifetime"}
                </span>
              </div>
              <h3 className="creds__name">{c.name}</h3>
              <p className="creds__blurb">{c.blurb}</p>
              <div className="creds__dates">
                <span>
                  <span className="creds__date-label">Issued</span>
                  <span className="creds__date-value">{c.issued}</span>
                </span>
                {c.expires && (
                  <span>
                    <span className="creds__date-label">Expires</span>
                    <span className="creds__date-value">{c.expires}</span>
                  </span>
                )}
              </div>
              <div className="creds__tags">
                {c.tags.map((t) => (
                  <span key={t} className="tag">{t}</span>
                ))}
              </div>
            </div>
          </article>
        ))}
      </div>

      <div className="creds__controls">
        <button
          type="button"
          className="creds__arrow"
          aria-label="Previous credential"
          onClick={() => go(index - 1)}
        >
          ‹
        </button>
        <div className="creds__dots" role="tablist">
          {credentials.map((c, i) => (
            <button
              key={c.id}
              type="button"
              role="tab"
              aria-selected={i === index}
              aria-label={`Go to ${c.name}`}
              className={`creds__dot ${i === index ? "is-active" : ""}`}
              onClick={() => go(i)}
            />
          ))}
        </div>
        <button
          type="button"
          className="creds__arrow"
          aria-label="Next credential"
          onClick={() => go(index + 1)}
        >
          ›
        </button>
      </div>
    </div>
  );
};

export default CredentialsCarousel;
