import { about } from "../../data/content";
import aboutImage from "../../assets/images/rob-about.jpg";
import "./About.css";

export default function About() {
  return (
    <section id="about" className="section about reveal">
      <div className="container about__inner">
        <div className="about__media">
          <div className="about__image-frame">
            <img
              className="about__image"
              src={aboutImage}
              alt={about.imageAlt}
              width="1000"
              height="1000"
              loading="lazy"
            />
          </div>
        </div>

        <div className="about__content">
          <p className="eyebrow about__eyebrow">Meet Your Trainer</p>
          <h2 className="about__heading">{about.heading}</h2>

          {about.bio.map((paragraph, index) => (
            <p key={index} className="about__paragraph">
              {paragraph}
            </p>
          ))}

          <dl className="about__focus-list">
            {about.focusAreas.map((item) => (
              <div className="about__focus-item" key={item.label}>
                <dt className="about__focus-label">{item.label}</dt>
                <dd className="about__focus-detail">{item.detail}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
