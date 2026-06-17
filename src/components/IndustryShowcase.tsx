import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { clients, type Client, type ClientSector } from "../data/clients";
import { useTheme } from "../theme/ThemeProvider";
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

const monogram = (name: string) =>
  name
    .split(/[^a-zA-Z0-9]+/)
    .filter(Boolean)
    .map((w) => w[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

interface TileProps {
  client: Client;
  state: "neutral" | "lit" | "dimmed";
  onActivate: () => void;
  onDeactivate: () => void;
}

const LogoTile = ({ client, state, onActivate, onDeactivate }: TileProps) => {
  const { theme } = useTheme();

  // Build an ordered list of candidate sources. In dark mode we try a
  // dark-variant first (explicit `logoDark`, or an auto-derived
  // "<name>-dark.svg"), then fall back to the regular logo, then to a
  // monogram. So dropping "<name>-dark.svg" into /public/logos is enough —
  // no code change — and a missing dark file simply falls back to the colour
  // logo rather than breaking.
  const sources = useMemo(() => {
    const list: string[] = [];
    if (client.logo) {
      if (theme === "dark") {
        list.push(client.logoDark ?? client.logo.replace(/\.svg$/i, "-dark.svg"));
      }
      list.push(client.logo);
    } else if (theme === "dark" && client.logoDark) {
      list.push(client.logoDark);
    }
    return list;
  }, [theme, client.logo, client.logoDark]);

  const [idx, setIdx] = useState(0);
  useEffect(() => {
    setIdx(0);
  }, [sources]);

  const src = sources[idx];
  const showImage = Boolean(src);

  return (
    <Link
      to={`/clients#${client.slug}`}
      className={`logo-tile ${state === "lit" ? "is-lit" : ""} ${state === "dimmed" ? "is-dimmed" : ""}`}
      style={{ ["--sector" as string]: sectorColor[client.sector] }}
      title={`${client.company} · ${client.sector}`}
      aria-label={`${client.company} — ${client.sector}. View case study.`}
      onMouseEnter={onActivate}
      onMouseLeave={onDeactivate}
      onFocus={onActivate}
      onBlur={onDeactivate}
    >
      {showImage ? (
        <img
          src={src}
          alt={`${client.company} logo`}
          className="logo-tile__img"
          loading="lazy"
          onError={() => setIdx((i) => i + 1)}
        />
      ) : (
        <span className="logo-tile__mono">{monogram(client.company)}</span>
      )}
    </Link>
  );
};

const IndustryShowcase = () => {
  const [active, setActive] = useState<ClientSector | null>(null);

  const sectors = SECTOR_ORDER.filter((s) =>
    clients.some((c) => c.sector === s),
  );
  const countFor = (s: ClientSector) =>
    clients.filter((c) => c.sector === s).length;

  return (
    <div className="ind">
      <div
        className="ind-industries"
        role="list"
        aria-label="Industries delivered in"
      >
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

      <div className="ind-wall">
        {clients.map((c) => {
          const state =
            active === null
              ? "neutral"
              : active === c.sector
                ? "lit"
                : "dimmed";
          return (
            <LogoTile
              key={c.slug}
              client={c}
              state={state}
              onActivate={() => setActive(c.sector)}
              onDeactivate={() => setActive(null)}
            />
          );
        })}
      </div>
    </div>
  );
};

export default IndustryShowcase;
