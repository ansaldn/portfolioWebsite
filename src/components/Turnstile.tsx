import { useEffect, useRef, useState } from "react";
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
    const waitForGlobal = () => {
      const start = Date.now();
      const tick = () => {
        if (window.turnstile) return resolve();
        if (Date.now() - start > 8000) {
          scriptPromise = null; // allow a later retry
          return reject(new Error("Turnstile load timeout"));
        }
        setTimeout(tick, 50);
      };
      tick();
    };

    if (existing) {
      existing.addEventListener("load", waitForGlobal);
      existing.addEventListener("error", () => {
        scriptPromise = null;
        reject(new Error("Turnstile failed to load"));
      });
      if (window.turnstile) waitForGlobal();
      return;
    }

    const s = document.createElement("script");
    s.src = SCRIPT_SRC;
    s.async = true;
    s.defer = true;
    s.addEventListener("load", waitForGlobal);
    s.addEventListener("error", () => {
      scriptPromise = null;
      reject(new Error("Turnstile failed to load"));
    });
    document.head.appendChild(s);
  });

  return scriptPromise;
}

type Status = "loading" | "ready" | "error";

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
  const [status, setStatus] = useState<Status>("loading");

  useEffect(() => {
    let cancelled = false;
    setStatus("loading");

    loadTurnstile()
      .then(() => {
        if (cancelled || !ref.current || !window.turnstile) return;
        if (widgetId.current) return; // guard against double-render
        try {
          widgetId.current = window.turnstile.render(ref.current, {
            sitekey: siteKey,
            theme: theme === "dark" ? "dark" : "light",
            callback: (token) => {
              setStatus("ready");
              onVerify(token);
            },
            "expired-callback": () => onExpire?.(),
            "error-callback": () => {
              setStatus("error");
              onError?.();
            },
          });
          setStatus("ready");
        } catch {
          setStatus("error");
          onError?.();
        }
      })
      .catch(() => {
        if (cancelled) return;
        setStatus("error");
        onError?.();
      });

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
    // Re-render the widget when the site key or theme changes.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [siteKey, theme]);

  return (
    <div className="turnstile">
      <div ref={ref} className="turnstile-widget" />
      {status === "loading" && (
        <p className="turnstile-msg">Loading verification…</p>
      )}
      {status === "error" && (
        <p className="turnstile-msg turnstile-msg--error">
          Couldn't load the verification check. Disable any ad/script blockers
          and reload. If this persists, the site key may be missing or this
          domain isn't allowed in Cloudflare Turnstile yet.
        </p>
      )}
    </div>
  );
};

export default Turnstile;
