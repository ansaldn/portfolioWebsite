import React from "react";
import ReactDOM from "react-dom/client";
//import { createRoot } from "react-dom/client"; # With line 8
import App from "./App.tsx";
import "./index.css";
import { Auth0Provider } from "@auth0/auth0-react";

//const root = createRoot(document.getElementById("root")); #Goes with line 3

/* root.render(
  <Auth0Provider
    domain="dev-ljarqqxtl07wecwz.us.auth0.com"
    clientId="yaMlPbWX7bAzrL6zTZflnBNklk4i4uKk"
    authorizationParams={{ redirect_uri: window.location.origin }}
  >
    <App />
  </Auth0Provider>
); */

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Auth0Provider
      domain="dev-ljarqqxtl07wecwz.us.auth0.com"
      clientId="yaMlPbWX7bAzrL6zTZflnBNklk4i4uKk"
      authorizationParams={{ redirect_uri: window.location.origin }}
    >
      <App />
    </Auth0Provider>
  </React.StrictMode>
);
