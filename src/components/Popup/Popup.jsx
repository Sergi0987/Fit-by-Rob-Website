import { useEffect, useState } from "react";
import { announcement } from "../../data/content";
import "./Popup.css";

// Re-shows automatically whenever Rob changes the heading/message in the
// CMS, but won't nag a visitor who already dismissed the current one.
function dismissalKey() {
  return `fbr-announcement-dismissed:${announcement.heading}:${announcement.message}`;
}

export default function Popup() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (!announcement.enabled) return;
    if (window.localStorage.getItem(dismissalKey())) return;

    const timer = setTimeout(() => setIsOpen(true), 600);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!isOpen) return undefined;
    const onKeyDown = (event) => {
      if (event.key === "Escape") close();
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [isOpen]);

  function close() {
    setIsOpen(false);
    window.localStorage.setItem(dismissalKey(), "true");
  }

  if (!announcement.enabled || !isOpen) return null;

  return (
    <div className="popup-overlay" onClick={close}>
      <div
        className="popup-card"
        role="dialog"
        aria-modal="true"
        aria-labelledby="popup-heading"
        onClick={(event) => event.stopPropagation()}
      >
        <button type="button" className="popup-close" onClick={close} aria-label="Close">
          &times;
        </button>
        <p className="eyebrow popup-eyebrow">Announcement</p>
        <h2 id="popup-heading" className="popup-heading">
          {announcement.heading}
        </h2>
        <p className="popup-message">{announcement.message}</p>
        {announcement.ctaLabel && announcement.ctaHref && (
          <a href={announcement.ctaHref} className="btn btn-primary popup-cta" onClick={close}>
            {announcement.ctaLabel}
          </a>
        )}
      </div>
    </div>
  );
}
