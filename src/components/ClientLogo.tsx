import { useState } from "react";
import type { Client, ClientSector } from "../data/clients";
import { clientLogos } from "../data/logos";
import "./ClientLogo.css";

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

const monogram = (name: string) =>
  name
    .split(/[^a-zA-Z]+/)
    .filter(Boolean)
    .map((w) => w[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

interface Props {
  client: Client;
  /** Pixel size of the rendered square. */
  size?: number;
  /** "card" = monogram-style with border + sector colour. "plain" = bare image, no border. */
  variant?: "card" | "plain";
}

/**
 * Three-tier render strategy:
 *   1. Look up a curated React SVG mark in `clientLogos` by slug. These are
 *      our hand-authored stylised silhouettes — they inherit `currentColor`
 *      so each card paints in its sector colour.
 *   2. If no curated mark, but `client.logo` is set, render a plain <img>.
 *      That's the escape hatch for ever dropping raster files into
 *      /public/logos/ later. The onError handler degrades gracefully.
 *   3. Fall back to a sector-tinted monogram (e.g. "EG").
 */
const ClientLogo = ({ client, size = 56, variant = "card" }: Props) => {
  const [imgFailed, setImgFailed] = useState(false);
  const color = sectorColor[client.sector];

  const InlineLogo = clientLogos[client.slug];

  // Tier 1 — inline React SVG (preferred)
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

  // Tier 2 — file-based logo
  if (client.logo && !imgFailed) {
    return (
      <span
        className={`client-logo client-logo--${variant} client-logo--img`}
        style={{
          width: size,
          height: size,
          ["--sector" as string]: color,
        }}
      >
        <img
          src={client.logo}
          alt={`${client.company} logo`}
          width={size}
          height={size}
          loading="lazy"
          onError={() => setImgFailed(true)}
        />
      </span>
    );
  }

  // Tier 3 — monogram fallback
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
