import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { Auth0Provider } from "@auth0/auth0-react";

// Auth0 is wired up for an eventual CIAM / gated-content demo. It's optional:
// if the env vars are absent at build time, the site renders without it. This
// keeps the public-facing portfolio functional even when no Auth0 tenant is
// configured.
const domain = import.meta.env.VITE_AUTH0_DOMAIN;
const clientId = import.meta.env.VITE_AUTH0_CLIENT_ID;
const auth0Configured = Boolean(domain && clientId);

const tree = auth0Configured ? (
  <Auth0Provider
    domain={domain as string}
    clientId={clientId as string}
    authorizationParams={{ redirect_uri: window.location.origin }}
  >
    <App />
  </Auth0Provider>
) : (
  <App />
);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>{tree}</React.StrictMode>,
);
