import { nav, footer, contact, kahunas } from "../../data/content";
import logo from "../../assets/images/rr-logo.png";
import "./Footer.css";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <div className="container site-footer__inner">
        <div className="site-footer__brand">
          <img src={logo} alt="" className="site-footer__logo" width="400" height="257" />
          <div>
            <p className="site-footer__name">{footer.businessName}</p>
            <p className="site-footer__tagline">Strength. Endurance. Results.</p>
          </div>
        </div>

        <nav className="site-footer__nav" aria-label="Footer">
          <ul>
            {nav.map((item) => (
              <li key={item.href}>
                <a href={item.href}>{item.label}</a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="site-footer__contact">
          <a href={`mailto:${contact.email}`}>{contact.email}</a>
          <a href={`tel:${contact.phone.replace(/[^\d+]/g, "")}`}>{contact.phone}</a>
          <a href={kahunas.href} target="_blank" rel="noreferrer noopener">
            {kahunas.label}
          </a>
        </div>

        <ul className="site-footer__social">
          {footer.social.map((link) => (
            <li key={link.label}>
              <a href={link.href} target="_blank" rel="noreferrer noopener">
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </div>

      <div className="container site-footer__legal">
        <p>
          © {year} {footer.businessName}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
