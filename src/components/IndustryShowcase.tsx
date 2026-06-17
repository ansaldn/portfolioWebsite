import { useState } from "react";
import { Link } from "react-router-dom";
import { clients, type ClientSector } from "../data/clients";
import ClientLogo from "./ClientLogo";
import "./IndustryShowcase.css";

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

// Preferred display order for the industry chips.
const SECTOR_ORDER: ClientSector[] = [
  "Gaming",
  "FinTech",
  "Industry",
  "Medical",
  "HealthTech",
  "EdTech",
  "Retail",
  "SaaS",
  "Consumer",
];

// Seeded sizes + vertical offsets to give the cloud an organic, "zoomed-out"
// scatter without random layout shifts on every render.
const SIZES = [96, 64, 80, 108, 60, 88, 72, 100, 68, 92, 76];
const OFFSETS = [0, 26, 10, 32, 4, 20, 8, 28, 14, 2, 18];

const IndustryShowcase = () => {
  const [active, setActive] = useState<ClientSector | null>(null);

  const sectors = SECTOR_ORDER.filter((s) =>
    clients.some((c) => c.sector === s),
  );
  const countFor = (s: ClientSector) =>
    clients.filter((c) => c.sector === s).length;

  return (
    <div className="ind">
      <div className="ind-industries" role="list" aria-label="Industries delivered in">
        {sectors.map((s) => (
          <button
            key={s}
            type="button"
            role="listitem"
            className={`ind-chip ${active === s ? "is-active" : ""}`}
            style={{ ["--sector" as string]: sectorColor[s] }}
            onMouseEnter={() => setActive(s)}
            onMouseLeave={() => setActive(null)}
            onFocus={() => setActive(s)}
            onBlur={() => setActive(null)}
            onClick={() => setActive((a) => (a === s ? null : s))}
            aria-pressed={active === s}
          >
            {s}
            <span className="ind-chip__count">{countFor(s)}</span>
          </button>
        ))}
      </div>

      <div
        className={`ind-cloud ${active ? "is-focusing" : ""}`}
        aria-hidden="false"
      >
        {clients.map((c, i) => {
          const lit = active === c.sector;
          const dimmed = active !== null && active !== c.sector;
          const size = SIZES[i % SIZES.length];
          return (
            <Link
              key={c.slug}
              to={`/clients#${c.slug}`}
              className={`ind-bubble ${lit ? "is-lit" : ""} ${dimmed ? "is-dimmed" : ""}`}
              style={{
                width: size,
                height: size,
                marginTop: OFFSETS[i % OFFSETS.length],
                ["--sector" as string]: sectorColor[c.sector],
              }}
              title={`${c.company} · ${c.sector}`}
              aria-label={`${c.company} — ${c.sector}. View case study.`}
              onMouseEnter={() => setActive(c.sector)}
              onMouseLeave={() => setActive(null)}
              onFocus={() => setActive(c.sector)}
              onBlur={() => setActive(null)}
            >
              <ClientLogo client={c} size={Math.round(size * 0.62)} variant="plain" />
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default IndustryShowcase;
