import { Link } from "react-router-dom";

const ErrorPage404 = () => {
  return (
    <main className="container-narrow" style={{ padding: "6rem 1.25rem", textAlign: "center" }}>
      <span className="eyebrow">404</span>
      <h1 style={{ marginTop: "1rem" }}>This page doesn't exist.</h1>
      <p style={{ color: "var(--fg-secondary)", maxWidth: "48ch", margin: "0 auto 2rem" }}>
        The page you tried to reach isn't here. Try the home page or jump
        straight to the client work.
      </p>
      <div style={{ display: "inline-flex", gap: "0.75rem", flexWrap: "wrap", justifyContent: "center" }}>
        <Link to="/" className="btn btn-primary">Back to home</Link>
        <Link to="/clients" className="btn btn-outline-primary">View clients</Link>
      </div>
    </main>
  );
};

export default ErrorPage404;
