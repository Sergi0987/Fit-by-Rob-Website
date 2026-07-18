import { useEffect } from "react";
import Navbar from "./components/Navbar/Navbar";
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

  return (
    <>
      <a href="#top" className="skip-link">
        Skip to main content
      </a>
      <Navbar />
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
