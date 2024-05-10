import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { createRoot } from 'react-dom/client';
import { Auth0Provider } from '@auth0/auth0-react';
import 'bootstrap/dist/css/bootstrap.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)

const root = createRoot(document.getElementById('root'));

root.render(
<Auth0Provider
    domain="dev-ljarqqxtl07wecwz.us.auth0.com"
    clientId="yaMlPbWX7bAzrL6zTZflnBNklk4i4uKk"
    authorizationParams={{
      redirect_uri: window.location.origin
    }}
  >
    <App />
  </Auth0Provider>,
);