import { hero, kahunas } from "../../data/content";
import { publicUrl } from "../../utils/publicUrl";
import "./Hero.css";

// Signature element: a pulse trace that resolves into an upward-trending
// line, tying together strength, endurance, and measurable results.
function PulseTrace() {
  return (
    <svg
      className="hero__pulse"
      viewBox="0 0 800 160"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <path
        className="hero__pulse-path"
        d="M0 110 L120 110 L150 40 L180 140 L210 80 L240 110 L340 110 L400 90 L460 110 L560 110 L620 70 L700 45 L800 15"
        fill="none"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function Hero() {
  return (
    <section id="top" className="hero">
      <PulseTrace />
      <div className="container hero__inner">
        <div className="hero__copy">
          <p className="eyebrow hero__eyebrow">Personal Training</p>
          <h1 className="hero__headline">{hero.headline}</h1>
          <p className="hero__subheadline">{hero.subheadline}</p>
          <div className="hero__cta-group">
            <a href={hero.ctaTarget} className="btn btn-primary hero__cta">
              {hero.ctaLabel}
            </a>
            <a
              href={kahunas.href}
              className="btn btn-outline-dark hero__cta hero__cta--kahunas"
              target="_blank"
              rel="noreferrer noopener"
            >
              {kahunas.label}
            </a>
          </div>
        </div>
        <div className="hero__media">
          <div className="hero__image-frame">
            <img
              className="hero__image"
              src={publicUrl(hero.image)}
              alt={hero.imageAlt}
              width="1200"
              height="1500"
              fetchpriority="high"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
