import { useRef } from "react";
import { Link } from "react-router-dom";
import { clients, type ClientSector } from "../data/clients";
import "./ClientsCarousel.css";

const sectorColor: Record<ClientSector, string> = {
  Gaming: "var(--sector-gaming)",
  Industry: "var(--sector-industry)",
  EdTech: "var(--sector-edtech)",
  FinTech: "var(--sector-fintech)",
  HealthTech: "var(--sector-health)",
  Retail: "var(--sector-retail)",
  Medical: "var(--sector-medical)",
  SaaS: "var(--sector-saas)",
  Consumer: "var(--sector-consumer)",
};

/** Two-character monogram from a company name (e.g. "Epic Games" -> "EG"). */
const monogram = (name: string) =>
  name
    .split(/[^a-zA-Z]+/)
    .filter(Boolean)
    .map((w) => w[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

const ClientsCarousel = () => {
  const trackRef = useRef<HTMLDivElement | null>(null);

  const scrollBy = (dir: 1 | -1) => {
    const el = trackRef.current;
    if (!el) return;
    const card = el.querySelector<HTMLElement>(".clients-carousel__card");
    const distance = card ? card.offsetWidth + 24 : el.offsetWidth * 0.8;
    el.scrollBy({ left: distance * dir, behavior: "smooth" });
  };

  return (
    <div className="clients-carousel">
      <div className="clients-carousel__track" ref={trackRef}>
        {clients.map((c) => (
          <Link
            key={c.slug}
            to={`/clients#${c.slug}`}
            className="clients-carousel__card surface-card"
            aria-label={`${c.company} — ${c.role}`}
          >
            <div
              className="clients-carousel__stripe"
              style={{ background: sectorColor[c.sector] }}
              aria-hidden="true"
            />
            <div className="clients-carousel__head">
              <div
                className="clients-carousel__monogram"
                style={{ borderColor: sectorColor[c.sector], color: sectorColor[c.sector] }}
                aria-hidden="true"
              >
                {monogram(c.company)}
              </div>
              <div>
                <div className="clients-carousel__sector">{c.sector}</div>
                <div className="clients-carousel__company">{c.company}</div>
              </div>
            </div>
            <div className="clients-carousel__role">{c.role}</div>
            <div className="clients-carousel__dates">
              {c.start} – {c.end}  ·  {c.location}
            </div>
            <p className="clients-carousel__headline">{c.headline}</p>
            <div className="clients-carousel__tags">
              {c.stack.slice(0, 4).map((s) => (
                <span key={s} className="tag">{s}</span>
              ))}
              {c.stack.length > 4 && (
                <span className="tag tag--accent">+{c.stack.length - 4}</span>
              )}
            </div>
          </Link>
        ))}
      </div>

      <div className="clients-carousel__controls">
        <button
          type="button"
          className="creds__arrow"
          aria-label="Scroll clients left"
          onClick={() => scrollBy(-1)}
        >
          ‹
        </button>
        <button
          type="button"
          className="creds__arrow"
          aria-label="Scroll clients right"
          onClick={() => scrollBy(1)}
        >
          ›
        </button>
      </div>
    </div>
  );
};

export default ClientsCarousel;
