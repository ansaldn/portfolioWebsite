import { Link } from "react-router-dom";
import "./Footer.css";

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <div className="container-narrow site-footer__inner">
        <div className="site-footer__brand">
          <div className="site-footer__name">David Ansa</div>
          <div className="site-footer__role">
            Senior IAM / Cybersecurity Engineer · London, UK
          </div>
        </div>

        <nav className="site-footer__nav" aria-label="Footer">
          <Link to="/">Home</Link>
          <Link to="/clients">Clients</Link>
          <Link to="/services">Services</Link>
          <Link to="/business">For business</Link>
          <Link to="/engage">Book a call</Link>
          <Link to="/contact">Contact</Link>
          <a
            href="https://linkedin.com/in/davidansa"
            target="_blank"
            rel="noopener noreferrer"
          >
            LinkedIn ↗
          </a>
        </nav>

        <div className="site-footer__legal">
          © {year} David Ansa. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
