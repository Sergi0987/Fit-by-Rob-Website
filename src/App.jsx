import { useEffect } from "react";
import { initScrollHighlight } from "./utils/scrollHighlight";
import Navbar from "./components/Navbar/Navbar";
import Popup from "./components/Popup/Popup";
import Hero from "./components/Hero/Hero";
import Stats from "./components/Stats/Stats";
import About from "./components/About/About";
import Services from "./components/Services/Services";
import Benefits from "./components/Benefits/Benefits";
import Testimonials from "./components/Testimonials/Testimonials";
import ContactForm from "./components/ContactForm/ContactForm";
import Footer from "./components/Footer/Footer";

export default function App() {
  // Fade sections in as they enter the viewport (skipped entirely for
  // prefers-reduced-motion via the .reveal base styles in global.css).
  useEffect(() => {
    const elements = document.querySelectorAll(".reveal");
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        }
      },
      { threshold: 0.15 }
    );

    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);

  // On touch devices, highlight whichever card is centered in the
  // viewport as the user scrolls, since :hover doesn't apply there.
  useEffect(() => {
    return initScrollHighlight(
      ".service-card, .testimonial-card, .transformation-card, .benefit-item"
    );
  }, []);

  return (
    <>
      <a href="#top" className="skip-link">
        Skip to main content
      </a>
      <Navbar />
      <Popup />
      <main>
        <Hero />
        <Stats />
        <About />
        <Services />
        <Benefits />
        <Testimonials />
        <ContactForm />
      </main>
      <Footer />
    </>
  );
}
