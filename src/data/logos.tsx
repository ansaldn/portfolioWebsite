import type { FC, SVGProps } from "react";

/**
 * Stylised, single-colour client marks. Rendered inline so they inherit
 * `currentColor` from the parent — that's how each card gets tinted with its
 * sector colour without us shipping ten differently-coloured assets.
 *
 * These are NOT exact reproductions of the clients' trademarked logos. Each
 * is a stylised silhouette that evokes the brand or the sector David worked
 * in, designed as a coherent set so the home grid reads as "one designer".
 *
 * If you ever want to substitute a real CC0 or licensed brand mark, replace
 * the function body — the surrounding `<svg>` shell stays the same.
 */

type IconProps = SVGProps<SVGSVGElement> & { title?: string };

const Frame: FC<IconProps> = ({ title, children, ...rest }) => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    role="img"
    aria-label={title}
    xmlns="http://www.w3.org/2000/svg"
    {...rest}
  >
    {title ? <title>{title}</title> : null}
    {children}
  </svg>
);

/* ============================================================== *
 * 1. Apple — bitten apple silhouette + leaf                       *
 * ============================================================== */
const Apple: FC<IconProps> = (props) => (
  <Frame title="Apple" {...props}>
    <path d="M16.5 12.4c-.02-2.75 2.25-4.07 2.35-4.13-1.29-1.88-3.29-2.14-4-2.17-1.7-.17-3.32 1-4.18 1-.87 0-2.2-.98-3.62-.95-1.87.03-3.58 1.08-4.54 2.76-1.93 3.36-.5 8.32 1.4 11.05.92 1.34 2.02 2.84 3.46 2.79 1.4-.06 1.92-.9 3.6-.9s2.16.9 3.63.87c1.5-.03 2.45-1.37 3.37-2.71 1.06-1.55 1.5-3.05 1.52-3.13-.03-.01-2.92-1.12-2.95-4.47z" />
    <path d="M13.9 4.6c.78-.94 1.3-2.25 1.15-3.55-1.12.05-2.46.74-3.27 1.68-.72.84-1.36 2.17-1.19 3.44 1.25.1 2.53-.64 3.31-1.57z" />
  </Frame>
);

/* ============================================================== *
 * 2. Epic Games — geometric "E" with stepped right edge           *
 * ============================================================== */
const EpicGames: FC<IconProps> = (props) => (
  <Frame title="Epic Games" {...props}>
    <path d="M4 3h17l-2.5 3H8v4h9l-1.5 3H8v5h12l-2.5 3H4V3z" />
  </Frame>
);

/* ============================================================== *
 * 3. Hitachi Rail — locomotive silhouette with wheels             *
 * ============================================================== */
const HitachiRail: FC<IconProps> = (props) => (
  <Frame title="Hitachi Rail" {...props}>
    {/* Body with carved-out windows */}
    <path
      fillRule="evenodd"
      d="M5 4h14a2 2 0 0 1 2 2v11H3V6a2 2 0 0 1 2-2zm0 4v3h4V8H5zm6 0v3h4V8h-4zm6 0v3h2V8h-2z"
      clipRule="evenodd"
    />
    {/* Track */}
    <rect x="2" y="18" width="20" height="1.2" rx="0.6" />
    {/* Wheels */}
    <circle cx="7" cy="20.5" r="1.5" />
    <circle cx="12" cy="20.5" r="1.5" />
    <circle cx="17" cy="20.5" r="1.5" />
  </Frame>
);

/* ============================================================== *
 * 4. Babbel — chunky speech bubble                                *
 * ============================================================== */
const Babbel: FC<IconProps> = (props) => (
  <Frame title="Babbel" {...props}>
    <path d="M4 3h16a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-7.59l-4.7 4.7A1 1 0 0 1 6 21v-4H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2zm3 5v2h10V8H7zm0 4v2h7v-2H7z" />
  </Frame>
);

/* ============================================================== *
 * 5. Ki Insurance — shield with horizontal split                  *
 * ============================================================== */
const Ki: FC<IconProps> = (props) => (
  <Frame title="Ki Insurance" {...props}>
    <path d="M12 1.5L3 5v6.5c0 5.5 3.84 10.45 9 11.5 5.16-1.05 9-6 9-11.5V5l-9-3.5zM5 11.5V6.4l7-2.7 7 2.7v5.1H5z" />
  </Frame>
);

/* ============================================================== *
 * 6. Lifebit — DNA double-helix with rungs                        *
 * ============================================================== */
const Lifebit: FC<IconProps> = (props) => (
  <Frame title="Lifebit" {...props}>
    <path
      d="M7 2c0 3.5 10 5.5 10 10s-10 6.5-10 10"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
    />
    <path
      d="M17 2c0 3.5-10 5.5-10 10s10 6.5 10 10"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
    />
    <path
      d="M8.5 6h7M7.8 9.5h8.4M7.8 14.5h8.4M8.5 18h7"
      stroke="currentColor"
      strokeWidth="1.2"
      strokeLinecap="round"
    />
  </Frame>
);

/* ============================================================== *
 * 7. Depop — shopping bag with cut-out handles                    *
 * ============================================================== */
const Depop: FC<IconProps> = (props) => (
  <Frame title="Depop" {...props}>
    <path
      fillRule="evenodd"
      d="M8 6V5a4 4 0 0 1 8 0v1h3.5l-1 14.5h-13L4.5 6H8zm2 0V5a2 2 0 0 1 4 0v1h-4zm-3.4 4l.5 7h9.8l.5-7H6.6z"
      clipRule="evenodd"
    />
  </Frame>
);

/* ============================================================== *
 * 8. Convatec — medical cross with soft rounded corners           *
 * ============================================================== */
const Convatec: FC<IconProps> = (props) => (
  <Frame title="Convatec" {...props}>
    <path d="M10 2.5h4a1.5 1.5 0 0 1 1.5 1.5v5.5H21a1.5 1.5 0 0 1 1.5 1.5v3a1.5 1.5 0 0 1-1.5 1.5h-5.5V21a1.5 1.5 0 0 1-1.5 1.5h-4A1.5 1.5 0 0 1 8.5 21v-5.5H3A1.5 1.5 0 0 1 1.5 14v-3A1.5 1.5 0 0 1 3 9.5h5.5V4A1.5 1.5 0 0 1 10 2.5z" />
  </Frame>
);

/* ============================================================== *
 * 9. Paddle — ping-pong / canoe paddle silhouette                 *
 * ============================================================== */
const Paddle: FC<IconProps> = (props) => (
  <Frame title="Paddle" {...props}>
    <ellipse cx="12" cy="8" rx="6.5" ry="7" />
    <path d="M10.5 15h3l1 7.5h-5l1-7.5z" />
  </Frame>
);

/* ============================================================== *
 * 10. Memrise — twin-lobe brain silhouette                        *
 * ============================================================== */
const Memrise: FC<IconProps> = (props) => (
  <Frame title="Memrise" {...props}>
    <path d="M9 3a3.5 3.5 0 0 0-3.4 2.66 3 3 0 0 0-1.5 5.2A3 3 0 0 0 4.5 14a3 3 0 0 0 1.7 2.72A3.5 3.5 0 0 0 9.5 20a3 3 0 0 0 2.5-1.4 3 3 0 0 0 2.5 1.4 3.5 3.5 0 0 0 3.3-3.28A3 3 0 0 0 19.5 14a3 3 0 0 0-.4-3.14 3 3 0 0 0-1.5-5.2A3.5 3.5 0 0 0 14.2 3 3 3 0 0 0 12 4.1 3 3 0 0 0 9 3zm3 3.7v10.6" stroke="currentColor" strokeWidth="0.6" strokeLinejoin="round" />
  </Frame>
);

export type LogoComponent = FC<IconProps>;

/** Lookup table keyed by `client.slug`. Slugs without a mark fall back to the monogram. */
export const clientLogos: Record<string, LogoComponent> = {
  apple: Apple,
  "epic-games": EpicGames,
  "hitachi-rail": HitachiRail,
  babbel: Babbel,
  "ki-insurance": Ki,
  lifebit: Lifebit,
  depop: Depop,
  convatec: Convatec,
  paddle: Paddle,
  memrise: Memrise,
};
