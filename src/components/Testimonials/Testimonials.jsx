import { testimonials, transformations } from "../../data/content";
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

export default function Testimonials() {
  return (
    <section id="results" className="section testimonials reveal">
      <div className="container">
        <div className="testimonials__header">
          <p className="eyebrow testimonials__eyebrow">Client Results</p>
          <h2 className="testimonials__heading">{testimonials.heading}</h2>
          <p className="testimonials__subheading">{testimonials.subheading}</p>
        </div>

        <div className="transformations reveal">
          <h3 className="transformations__heading">{transformations.heading}</h3>
          <p className="transformations__subheading">{transformations.subheading}</p>

          <ul className="transformations__grid">
            {transformations.items.map((item, index) => (
              <li className="transformation-card" key={index}>
                <span className="testimonial-card__flag">Placeholder</span>
                <div className="transformation-card__photos">
                  <PlaceholderImage
                    label="Before"
                    aspect="3 / 4"
                    className="transformation-card__photo"
                  />
                  <span className="transformation-card__arrow" aria-hidden="true">
                    →
                  </span>
                  <PlaceholderImage
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

        <ul className="testimonials__grid">
          {testimonials.items.map((item, index) => (
            <li className="testimonial-card" key={index}>
              <span className="testimonial-card__flag">Placeholder</span>
              <PlaceholderImage
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
