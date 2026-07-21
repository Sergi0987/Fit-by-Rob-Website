/**
 * Centralized content for Rob's personal training website.
 *
 * The section content below is loaded from JSON files in ./content/ so
 * Rob can edit it himself through the CMS at /admin without touching
 * code. Navigation structure and form option lists stay here directly
 * since editing those would require matching changes elsewhere in the app.
 */
import heroData from "./content/hero.json";
import kahunasData from "./content/kahunas.json";
import statsData from "./content/stats.json";
import aboutData from "./content/about.json";
import servicesData from "./content/services.json";
import benefitsData from "./content/benefits.json";
import testimonialsData from "./content/testimonials.json";
import galleryData from "./content/gallery.json";
import transformationsData from "./content/transformations.json";
import contactData from "./content/contact.json";
import footerData from "./content/footer.json";
import announcementData from "./content/announcement.json";

export const siteMeta = {
  businessName: "Fit By Rob",
  tagline: "Personal training built around your goals",
};

// Order mirrors the section order on the page.
export const nav = [
  { label: "Services", href: "#services" },
  { label: "About", href: "#about" },
  { label: "Gallery", href: "#results" },
  { label: "Contact", href: "#contact" },
];

export const hero = heroData;
export const kahunas = kahunasData;
export const stats = statsData.items;
export const about = aboutData;
export const services = servicesData.items;
export const benefits = benefitsData;
export const testimonials = testimonialsData;
export const gallery = galleryData;
export const transformations = transformationsData;
export const contact = contactData;
export const footer = footerData;
export const announcement = announcementData;

export const fitnessGoals = [
  "Build strength",
  "Improve endurance",
  "Lose weight",
  "Improve nutrition habits",
  "General fitness",
  "Other",
];

export const trainingTypes = [
  "In-person training",
  "Online / remote coaching",
  "Not sure yet",
];
