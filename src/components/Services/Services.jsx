import { services } from "../../data/content";
import "./Services.css";

export default function Services() {
  return (
    <section id="services" className="section services reveal">
      <div className="container">
        <div className="services__header">
          <p className="eyebrow services__eyebrow">What Rob Offers</p>
          <h2 className="services__heading">Services</h2>
        </div>

        <ul className="services__grid">
          {services.map((service, index) => (
            <li className="service-card" key={`${service.title}-${index}`}>
              <span className="service-card__label">{service.label}</span>
              <h3 className="service-card__title">{service.title}</h3>
              <p className="service-card__description">{service.description}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
