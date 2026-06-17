import { useEffect, useMemo, useState } from "react";
import type { Client, ClientSector } from "../data/clients";
import { clientLogos } from "../data/logos";
import { useTheme } from "../theme/ThemeProvider";
import "./ClientLogo.css";

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

const monogram = (name: string) =>
  name
    .split(/[^a-zA-Z0-9]+/)
    .filter(Boolean)
    .map((w) => w[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

interface Props {
  client: Client;
  /** Pixel size of the rendered square. */
  size?: number;
  /** "card" = boxed with sector colour. "plain" = bare image, no border. */
  variant?: "card" | "plain";
}

/**
 * Client-page logo. Unlike the home logo wall (which uses the full logo), the
 * client page prefers a compact **icon / badge** variant when one exists.
 *
 * Lookup order (each tries SVG then PNG, advancing on load error):
 *   Light:  <name>-icon → <name>
 *   Dark:   <name>-icon-dark → <name>-icon → <name>-dark → <name>
 * If no file loads, falls back to the curated inline mark, then a monogram.
 */
const ClientLogo = ({ client, size = 56, variant = "card" }: Props) => {
  const { theme } = useTheme();
  const color = sectorColor[client.sector];
  const InlineLogo = clientLogos[client.slug];

  const candidates = useMemo(() => {
    if (!client.logo) return [];
    const base = client.logo.replace(/\.(svg|png)$/i, "");
    const list: string[] = [];
    if (theme === "dark") {
      list.push(
        `${base}-icon-dark.svg`,
        `${base}-icon-dark.png`,
        `${base}-icon.svg`,
        `${base}-icon.png`,
        `${base}-dark.svg`,
        `${base}-dark.png`,
        `${base}.svg`,
        `${base}.png`,
      );
    } else {
      list.push(
        `${base}-icon.svg`,
        `${base}-icon.png`,
        `${base}.svg`,
        `${base}.png`,
      );
    }
    return Array.from(new Set(list));
  }, [theme, client.logo]);

  const [idx, setIdx] = useState(0);
  useEffect(() => {
    setIdx(0);
  }, [candidates]);

  const src = candidates[idx];

  // Tier 1 — file-based logo (icon-preferred), cycling through candidates.
  if (src) {
    return (
      <span
        className={`client-logo client-logo--${variant} client-logo--img`}
        style={{ width: size, height: size, ["--sector" as string]: color }}
      >
        <img
          src={src}
          alt={`${client.company} logo`}
          width={size}
          height={size}
          loading="lazy"
          onError={() => setIdx((i) => i + 1)}
        />
      </span>
    );
  }

  // Tier 2 — curated inline React SVG mark (paints in the sector colour).
  if (InlineLogo) {
    return (
      <span
        className={`client-logo client-logo--${variant} client-logo--mark`}
        style={{
          width: size,
          height: size,
          color,
          borderColor: variant === "card" ? color : "transparent",
        }}
      >
        <InlineLogo width={Math.round(size * 0.6)} height={Math.round(size * 0.6)} />
      </span>
    );
  }

  // Tier 3 — sector-tinted monogram fallback.
  return (
    <span
      className={`client-logo client-logo--${variant} client-logo--mono`}
      style={{
        width: size,
        height: size,
        borderColor: variant === "card" ? color : "transparent",
        color: color,
      }}
      aria-label={`${client.company} (logo placeholder)`}
    >
      {monogram(client.company)}
    </span>
  );
};

export default ClientLogo;
