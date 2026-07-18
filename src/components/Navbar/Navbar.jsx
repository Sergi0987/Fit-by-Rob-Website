import { useEffect, useState } from "react";
import { nav, siteMeta } from "../../data/content";
import logo from "../../assets/images/logo.png";
import "./Navbar.css";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the mobile menu whenever a link is chosen
  const handleLinkClick = () => setIsOpen(false);

  return (
    <header className={`navbar ${isScrolled ? "navbar--scrolled" : ""}`}>
      <div className="navbar__inner container">
        <a href="#top" className="navbar__brand">
          <img src={logo} alt="" className="navbar__logo" width="64" height="64" />
          <span className="visually-hidden">{siteMeta.businessName} — Home</span>
        </a>

        <button
          type="button"
          className="navbar__toggle"
          aria-expanded={isOpen}
          aria-controls="primary-navigation"
          onClick={() => setIsOpen((open) => !open)}
        >
          <span className="visually-hidden">
            {isOpen ? "Close menu" : "Open menu"}
          </span>
          <span className={`navbar__burger ${isOpen ? "navbar__burger--open" : ""}`} aria-hidden="true" />
        </button>

        <nav
          id="primary-navigation"
          className={`navbar__nav ${isOpen ? "navbar__nav--open" : ""}`}
          aria-label="Primary"
        >
          <ul className="navbar__list">
            {nav.map((item) => (
              <li key={item.href}>
                <a href={item.href} className="navbar__link" onClick={handleLinkClick}>
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
          <a
            href="#contact"
            className="btn btn-primary navbar__cta"
            onClick={handleLinkClick}
          >
            Book Now
          </a>
        </nav>
      </div>
    </header>
  );
}
