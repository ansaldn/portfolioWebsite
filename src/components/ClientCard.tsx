import { useState } from "react";
import type { Client, ClientSector } from "../data/clients";
import ClientLogo from "./ClientLogo";
import "./ClientCard.css";

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

interface Props {
  client: Client;
  defaultOpen?: boolean;
}

const ClientCard = ({ client, defaultOpen = false }: Props) => {
  const [open, setOpen] = useState(defaultOpen);
  const c = client;
  const color = sectorColor[c.sector];

  const detailId = `client-${c.slug}-detail`;

  return (
    <article
      id={c.slug}
      className={`client-card surface-card ${open ? "is-open" : ""}`}
      style={{ ["--sector" as string]: color }}
    >
      <div className="client-card__stripe" aria-hidden="true" />

      <button
        type="button"
        className="client-card__head"
        aria-expanded={open}
        aria-controls={detailId}
        onClick={() => setOpen((o) => !o)}
      >
        <div className="client-card__monogram" aria-hidden="true">
          <ClientLogo client={c} size={56} />
        </div>

        <div className="client-card__head-text">
          <div className="client-card__meta">
            <span className="client-card__sector">{c.sector}</span>
            <span className="client-card__dates">
              {c.start} – {c.end}
            </span>
          </div>
          <h3 className="client-card__company">{c.company}</h3>
          <div className="client-card__role">{c.role} · {c.location}</div>
        </div>

        <span className="client-card__chevron" aria-hidden="true">
          {open ? "−" : "+"}
        </span>
      </button>

      <p className="client-card__headline">{c.headline}</p>

      {c.ribbons && c.ribbons.length > 0 && (
        <div className="client-card__ribbons">
          {c.ribbons.map((r) => (
            <span key={r} className="client-card__ribbon">{r}</span>
          ))}
        </div>
      )}

      <ul className="client-card__highlights">
        {c.highlights.map((h) => (
          <li key={h}>{h}</li>
        ))}
      </ul>

      <div className="client-card__tags">
        {c.stack.map((s) => (
          <span key={s} className="tag">{s}</span>
        ))}
      </div>

      <section
        id={detailId}
        className="client-card__detail"
        hidden={!open}
        aria-hidden={!open}
      >
        <hr className="client-card__divider" />
        {c.projects.map((p) => (
          <div key={p.title} className="client-card__project">
            <h4 className="client-card__project-title">{p.title}</h4>
            <ul className="client-card__project-list">
              {p.bullets.map((b) => (
                <li key={b}>{b}</li>
              ))}
            </ul>
          </div>
        ))}
      </section>
    </article>
  );
};

export default ClientCard;
