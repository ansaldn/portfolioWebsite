import { useState } from "react";
import type { Client, ClientSector } from "../data/clients";
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
 * Renders a client logo when `client.logo` resolves to a real file, otherwise
 * gracefully falls back to a sector-coloured monogram. We don't ship logo
 * files in the repo by default (see /public/logos/README.md) — if the file is
 * missing the onError handler swaps in the monogram, so the UI never breaks.
 */
const ClientLogo = ({ client, size = 56, variant = "card" }: Props) => {
  const [imgFailed, setImgFailed] = useState(false);
  const color = sectorColor[client.sector];
  const hasLogo = Boolean(client.logo) && !imgFailed;

  if (hasLogo) {
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
