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
  Healthcare: "var(--sector-health)",
  Retail: "var(--sector-retail)",
  SaaS: "var(--sector-saas)",
  Consumer: "var(--sector-consumer)",
};

// Preferred display order for the industry chips.
const SECTOR_ORDER: ClientSector[] = [
  "Gaming",
  "FinTech",
  "Industry",
  "Healthcare",
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

  // Build an ordered list of candidate sources, trying each until one loads
  // (then falling back to a monogram). For each slot we try SVG first, then
  // PNG — so a logo that only has a PNG still works. In dark mode we try the
  // dark variant ("<name>-dark.svg/.png", or an explicit `logoDark`) first,
  // then the regular logo. Dropping files into /public/logos is all that's
  // needed — no code change — and any missing file simply advances to the
  // next candidate.
  const sources = useMemo(() => {
    const list: string[] = [];
    if (client.logo) {
      const base = client.logo.replace(/\.(svg|png)$/i, "");
      if (theme === "dark") {
        if (client.logoDark) list.push(client.logoDark);
        list.push(`${base}-dark.svg`, `${base}-dark.png`);
      }
      list.push(`${base}.svg`, `${base}.png`);
    } else if (theme === "dark" && client.logoDark) {
      list.push(client.logoDark);
    }
    return Array.from(new Set(list));
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
