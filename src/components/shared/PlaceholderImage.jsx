// Replace with client-provided information: this component renders a styled
// placeholder until Rob's real photos are available. Once photos are
// provided, swap the usage of <PlaceholderImage /> for a real <img> tag.
import "./PlaceholderImage.css";

function PulseIcon() {
  return (
    <svg
      viewBox="0 0 64 64"
      aria-hidden="true"
      className="placeholder-image__icon"
    >
      <path
        d="M6 34h10l6-16 10 28 6-20 5 8h15"
        fill="none"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function PlaceholderImage({ label, aspect = "4 / 5", className = "" }) {
  return (
    <div
      className={`placeholder-image ${className}`.trim()}
      style={{ aspectRatio: aspect }}
      role="img"
      aria-label={label}
    >
      <PulseIcon />
      <span className="placeholder-image__label">{label}</span>
    </div>
  );
}
