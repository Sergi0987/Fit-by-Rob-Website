// transformations import kept alongside the commented-out section below
import { testimonials, gallery /* , transformations */ } from "../../data/content";
import { publicUrl } from "../../utils/publicUrl";
import PlaceholderImage from "../shared/PlaceholderImage";
import "./Testimonials.css";

function Stars({ rating }) {
  return (
    <div className="testimonial-card__stars" aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, index) => (
        <span key={index} aria-hidden="true">
          {index < rating ? "★" : "☆"}
        </span>
      ))}
    </div>
  );
}

// Renders a real uploaded photo once Rob adds one via the CMS, and falls
// back to the placeholder graphic otherwise.
function Photo({ src, alt, label, aspect, className }) {
  if (!src) {
    return <PlaceholderImage label={label} aspect={aspect} className={className} />;
  }
  return (
    <img
      src={publicUrl(src)}
      alt={alt}
      className={className}
      style={{
        aspectRatio: aspect,
        objectFit: "cover",
        padding: 0,
        borderRadius: "var(--radius-sm)",
      }}
    />
  );
}

export default function Testimonials() {
  return (
    <section id="results" className="section testimonials reveal">
      <div className="container">
        <div className="testimonials__header">
          <p className="eyebrow testimonials__eyebrow">Training In Action</p>
          <h2 className="testimonials__heading">{gallery.heading}</h2>
          <p className="testimonials__subheading">{gallery.subheading}</p>
        </div>

        <ul className="gallery__grid">
          {gallery.items.map((item, index) => (
            <li className="gallery-card" key={index}>
              {!item.photo && <span className="testimonial-card__flag">Placeholder</span>}
              <figure className="gallery-card__figure">
                <div className="gallery-card__frame">
                  <Photo
                    src={item.photo}
                    alt={item.caption || "Rob training a client"}
                    label="Session Photo"
                    aspect="4 / 5"
                    className="gallery-card__photo"
                  />
                </div>
                {item.caption && (
                  <figcaption className="gallery-card__caption">{item.caption}</figcaption>
                )}
              </figure>
            </li>
          ))}
        </ul>

        {/* Before/After transformations section removed at client's request.
            To restore it: uncomment this block, re-enable the `transformations`
            import above, and re-enable its entry in public/admin/config.yml.

        <div className="transformations reveal">
          <h3 className="transformations__heading">{transformations.heading}</h3>
          <p className="transformations__subheading">{transformations.subheading}</p>

          <ul className="transformations__grid">
            {transformations.items.map((item, index) => (
              <li className="transformation-card" key={index}>
                {!item.beforePhoto && !item.afterPhoto && (
                  <span className="testimonial-card__flag">Placeholder</span>
                )}
                <div className="transformation-card__photos">
                  <Photo
                    src={item.beforePhoto}
                    alt={`${item.name} before`}
                    label="Before"
                    aspect="3 / 4"
                    className="transformation-card__photo"
                  />
                  <span className="transformation-card__arrow" aria-hidden="true">
                    →
                  </span>
                  <Photo
                    src={item.afterPhoto}
                    alt={`${item.name} after`}
                    label="After"
                    aspect="3 / 4"
                    className="transformation-card__photo"
                  />
                </div>
                <p className="transformation-card__name">{item.name}</p>
              </li>
            ))}
          </ul>
        </div>
        */}

        <div className="testimonials__sub">
          <h3 className="testimonials__sub-heading">{testimonials.heading}</h3>
          <p className="testimonials__sub-subheading">{testimonials.subheading}</p>
        </div>

        <ul className="testimonials__grid">
          {testimonials.items.map((item, index) => (
            <li className="testimonial-card" key={index}>
              {!item.photo && <span className="testimonial-card__flag">Placeholder</span>}
              <Photo
                src={item.photo}
                alt={`${item.name}`}
                label="Photo"
                aspect="1 / 1"
                className="testimonial-card__avatar"
              />
              <Stars rating={item.rating} />
              <p className="testimonial-card__quote">&ldquo;{item.quote}&rdquo;</p>
              <p className="testimonial-card__name">
                {item.name}, {item.age}
              </p>
              <p className="testimonial-card__detail">{item.detail}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
