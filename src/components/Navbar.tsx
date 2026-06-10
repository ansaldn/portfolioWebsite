import { useEffect, useState } from "react";
import { NavLink, Link } from "react-router-dom";
import ThemeToggle from "./ThemeToggle";
import "./NavBar.css";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`site-nav ${scrolled ? "is-scrolled" : ""}`}
      id="NavigationBar"
      aria-label="Primary"
    >
      <div className="site-nav__inner container-narrow">
        <Link to="/" className="site-nav__brand" onClick={() => setOpen(false)}>
          <img
            src="/assets/images/Memoji.png"
            alt=""
            aria-hidden="true"
            width={36}
            height={36}
            className="site-nav__brand-img"
          />
          <span className="site-nav__brand-text">
            <span className="site-nav__brand-name">David Ansa</span>
            <span className="site-nav__brand-tag">cyber · iam · cloud</span>
          </span>
        </Link>

        <button
          type="button"
          className="site-nav__toggler"
          aria-expanded={open}
          aria-controls="site-nav-menu"
          aria-label="Toggle navigation"
          onClick={() => setOpen((o) => !o)}
        >
          <span /><span /><span />
        </button>

        <div
          id="site-nav-menu"
          className={`site-nav__menu ${open ? "is-open" : ""}`}
        >
          <ul className="site-nav__links">
            <li>
              <NavLink to="/" end onClick={() => setOpen(false)}>
                Home
              </NavLink>
            </li>
            <li>
              <NavLink to="/clients" onClick={() => setOpen(false)}>
                Clients
              </NavLink>
            </li>
            <li>
              <NavLink to="/services" onClick={() => setOpen(false)}>
                Services
              </NavLink>
            </li>
            <li>
              <NavLink to="/business" onClick={() => setOpen(false)}>
                For business
              </NavLink>
            </li>
            <li>
              <a
                href="https://linkedin.com/in/davidansa"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setOpen(false)}
              >
                LinkedIn ↗
              </a>
            </li>
          </ul>

          <div className="site-nav__actions">
            <ThemeToggle />
            <NavLink
              to="/engage"
              className="btn btn-primary site-nav__cta"
              onClick={() => setOpen(false)}
            >
              Book a call
            </NavLink>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
