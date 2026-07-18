import { stats } from "../../data/content";
import "./Stats.css";

export default function Stats() {
  return (
    <section className="stats reveal" aria-label="Rob by the numbers">
      <div className="container stats__grid">
        {stats.map((stat) => (
          <div className="stat" key={stat.label}>
            <span className="stat__value">{stat.value}</span>
            <span className="stat__label">{stat.label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
