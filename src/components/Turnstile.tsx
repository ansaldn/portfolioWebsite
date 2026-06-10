import { useEffect, useRef } from "react";
import { useTheme } from "../theme/ThemeProvider";

// Minimal typing for the Turnstile global injected by the Cloudflare script.
declare global {
  interface Window {
    turnstile?: {
      render: (
        el: HTMLElement,
        opts: {
          sitekey: string;
          theme?: "light" | "dark" | "auto";
          callback?: (token: string) => void;
          "expired-callback"?: () => void;
          "error-callback"?: () => void;
        },
      ) => string;
      reset: (widgetId?: string) => void;
      remove: (widgetId?: string) => void;
    };
  }
}

const SCRIPT_SRC =
  "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";

let scriptPromise: Promise<void> | null = null;

/** Inject the Turnstile script once and resolve when window.turnstile exists. */
function loadTurnstile(): Promise<void> {
  if (window.turnstile) return Promise.resolve();
  if (scriptPromise) return scriptPromise;

  scriptPromise = new Promise<void>((resolve, reject) => {
    const existing = document.querySelector<HTMLScriptElement>(
      `script[src^="https://challenges.cloudflare.com/turnstile"]`,
    );
    const onReady = () => {
      // Script may resolve slightly before the global is attached.
      const start = Date.now();
      const tick = () => {
        if (window.turnstile) return resolve();
        if (Date.now() - start > 5000) return reject(new Error("Turnstile load timeout"));
        setTimeout(tick, 50);
      };
      tick();
    };

    if (existing) {
      existing.addEventListener("load", onReady);
      existing.addEventListener("error", () => reject(new Error("Turnstile failed to load")));
      if (window.turnstile) onReady();
      return;
    }

    const s = document.createElement("script");
    s.src = SCRIPT_SRC;
    s.async = true;
    s.defer = true;
    s.addEventListener("load", onReady);
    s.addEventListener("error", () => reject(new Error("Turnstile failed to load")));
    document.head.appendChild(s);
  });

  return scriptPromise;
}

interface TurnstileProps {
  siteKey: string;
  onVerify: (token: string) => void;
  onExpire?: () => void;
  onError?: () => void;
}

const Turnstile = ({ siteKey, onVerify, onExpire, onError }: TurnstileProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const widgetId = useRef<string | null>(null);
  const { theme } = useTheme();

  useEffect(() => {
    let cancelled = false;

    loadTurnstile()
      .then(() => {
        if (cancelled || !ref.current || !window.turnstile) return;
        // Avoid double-render in React StrictMode.
        if (widgetId.current) return;
        widgetId.current = window.turnstile.render(ref.current, {
          sitekey: siteKey,
          theme: theme === "dark" ? "dark" : "light",
          callback: onVerify,
          "expired-callback": () => onExpire?.(),
          "error-callback": () => onError?.(),
        });
      })
      .catch(() => onError?.());

    return () => {
      cancelled = true;
      if (widgetId.current && window.turnstile) {
        try {
          window.turnstile.remove(widgetId.current);
        } catch {
          /* ignore */
        }
        widgetId.current = null;
      }
    };
    // Re-render the widget when the theme changes so it matches the page.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [siteKey, theme]);

  return <div ref={ref} className="turnstile-widget" />;
};

export default Turnstile;
