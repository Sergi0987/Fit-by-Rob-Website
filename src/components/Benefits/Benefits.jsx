import { benefits } from "../../data/content";
import "./Benefits.css";

export default function Benefits() {
  return (
    <section className="section benefits reveal">
      <div className="container">
        <div className="benefits__header">
          <p className="eyebrow benefits__eyebrow">The Difference</p>
          <h2 className="benefits__heading">{benefits.heading}</h2>
        </div>

        <ul className="benefits__list">
          {benefits.items.map((item) => (
            <li className="benefit-item" key={item.title}>
              <h3 className="benefit-item__title">{item.title}</h3>
              <p className="benefit-item__description">{item.description}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
