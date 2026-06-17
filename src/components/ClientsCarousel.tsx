import { useRef } from "react";
import { Link } from "react-router-dom";
import { clients, type ClientSector } from "../data/clients";
import ClientLogo from "./ClientLogo";
import "./ClientsCarousel.css";

const sectorColor: Record<ClientSector, string> = {
  Gaming: "var(--sector-gaming)",
  Industry: "var(--sector-industry)",
  EdTech: "var(--sector-edtech)",
  FinTech: "var(--sector-fintech)",
  Healthcare: "var(--sector-health)",
  Retail: "var(--sector-retail)",
  SaaS: "var(--sector-saas)",
  Consumer: "var(--sector-consumer)",
};

const ClientsCarousel = () => {
  const trackRef = useRef<HTMLDivElement | null>(null);

  const scrollBy = (dir: 1 | -1) => {
    const el = trackRef.current;
    if (!el) return;
    const card = el.querySelector<HTMLElement>(".client-tile");
    const distance = card ? card.offsetWidth + 24 : el.offsetWidth * 0.8;
    el.scrollBy({ left: distance * dir, behavior: "smooth" });
  };

  return (
    <div className="clients-carousel">
      <div className="clients-carousel__track" ref={trackRef}>
        {clients.map((c) => {
          const color = sectorColor[c.sector];
          return (
            <Link
              key={c.slug}
              to={`/clients#${c.slug}`}
              className="client-tile surface-card"
              style={{ ["--sector" as string]: color }}
              aria-label={`Open case study for ${c.company}`}
            >
              {/* Top stripe — always visible, sector colour */}
              <div className="client-tile__stripe" aria-hidden="true" />

              {/* FACE — what's visible by default */}
              <div className="client-tile__face">
                <ClientLogo client={c} size={72} />
                <div className="client-tile__face-text">
                  <div className="client-tile__sector">{c.sector}</div>
                  <div className="client-tile__company">{c.company}</div>
                </div>
                <div className="client-tile__hint" aria-hidden="true">
                  Hover for details
                </div>
              </div>

              {/* DETAILS — revealed on hover/focus (always visible on touch) */}
              <div className="client-tile__details">
                <div className="client-tile__details-head">
                  <div className="client-tile__role">{c.role}</div>
                  <div className="client-tile__dates">
                    {c.start} – {c.end}  ·  {c.location}
                  </div>
                </div>

                <p className="client-tile__headline">{c.headline}</p>

                {c.ribbons && c.ribbons.length > 0 && (
                  <div className="client-tile__ribbons">
                    {c.ribbons.slice(0, 2).map((r) => (
                      <span key={r} className="client-tile__ribbon">{r}</span>
                    ))}
                  </div>
                )}

                <div className="client-tile__tags">
                  {c.stack.slice(0, 4).map((s) => (
                    <span key={s} className="tag">{s}</span>
                  ))}
                  {c.stack.length > 4 && (
                    <span className="tag tag--accent">+{c.stack.length - 4}</span>
                  )}
                </div>

                <span className="client-tile__cta">
                  View case study  →
                </span>
              </div>
            </Link>
          );
        })}
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
