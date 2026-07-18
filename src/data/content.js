/**
 * Centralized content for Rob's personal training website.
 *
 * This is the single place to update text, services, testimonials,
 * and contact details. Anything marked with a "Replace with
 * client-provided information" comment is placeholder text and
 * should be swapped out once Rob confirms the real details.
 */

export const siteMeta = {
  businessName: "Fit By Rob",
  tagline: "Personal training built around your goals",
};

export const nav = [
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Results", href: "#results" },
  { label: "Contact", href: "#contact" },
];

export const hero = {
  headline: "Get stronger. Move better. Stay consistent.",
  subheadline:
    "Rob helps you start or level up your fitness journey with personalized training, straightforward nutrition guidance, and a plan built around your real life.",
  ctaLabel: "Start Training Today",
  ctaTarget: "#contact",
  imageAlt: "Rob mid-training session, pushing a weighted sled in the gym",
};

// Replace with client-provided information: real Kahunas booking link
export const kahunas = {
  href: "#",
  label: "Book via Kahunas",
};

// Replace with client-confirmed numbers once available
export const stats = [
  { value: "100+", label: "Clients Trained" },
  { value: "5+", label: "Years Experience" },
  { value: "Customized", label: "Workout Plans" },
  { value: "Nutrition", label: "Support Included" },
];

export const about = {
  heading: "About Rob",
  // Replace with client-provided information: confirmed bio, years of experience, credentials
  bio: [
    "I know starting in the gym can be intimidating. Whether your goal is to lose weight, build muscle, improve endurance, or simply feel healthier, I'll meet you where you are. Together we'll build a plan that's realistic, sustainable, and designed around your lifestyle — not someone else's.",
    "Every program starts with where you are today: your goals, your schedule, your experience level, and anything that's held you back before. From there, we'll build something that adjusts as you progress, with an emphasis on proper technique, steady gains, and habits that actually stick.",
  ],
  focusAreas: [
    { label: "Weight training", detail: "Progressive programming for strength gains" },
    { label: "Endurance", detail: "Conditioning built to your current fitness level" },
    { label: "Nutrition", detail: "Practical guidance, not extreme restriction" },
    { label: "Personalization", detail: "Plans adjusted to your goals as you progress" },
  ],
  imageAlt: "Rob resting between sets in the gym",
};

export const services = [
  {
    id: "personal-training",
    label: "01",
    title: "Personal Training",
    description:
      "One-on-one coaching built around your goals, current fitness level, and schedule.",
  },
  {
    id: "strength-resistance",
    label: "02",
    title: "Strength & Resistance Training",
    description:
      "Progressive programming to build muscle, improve movement quality, and get stronger safely.",
  },
  {
    id: "endurance-conditioning",
    label: "03",
    title: "Endurance & Conditioning",
    description:
      "Cardiovascular and conditioning work designed to improve stamina at a sustainable pace.",
  },
  {
    id: "nutrition-guidance",
    label: "04",
    title: "Nutrition Guidance",
    description:
      "Straightforward, practical nutrition support that fits your goals and everyday routine.",
  },
  {
    id: "custom-programs",
    label: "05",
    title: "Customized Workout Programs",
    description:
      "A training plan built specifically for you, adjusted as your goals and progress change.",
  },
  {
    id: "remote-coaching",
    label: "06",
    title: "Online Coaching",
    // Replace with client-provided information: confirm whether remote/online coaching is offered
    description:
      "Remote coaching option for clients who want expert guidance outside the gym. Details to be confirmed.",
  },
];

export const benefits = {
  heading: "Why Train With Rob",
  items: [
    {
      title: "Personalized training plans",
      description: "Every program is built around your goals, not a generic template.",
    },
    {
      title: "Accountability & motivation",
      description: "Consistent check-ins and support to help you stay on track.",
    },
    {
      title: "Proper exercise technique",
      description: "Hands-on coaching to help you train safely and effectively.",
    },
    {
      title: "Sustainable habits",
      description: "Fitness and nutrition approaches designed to last, not burn you out.",
    },
    {
      title: "All experience levels",
      description: "Programs designed for both first-time gym-goers and experienced clients.",
    },
  ],
};

export const testimonials = {
  heading: "Results & Testimonials",
  subheading:
    "Placeholder testimonials shown below until real client testimonials are provided.",
  items: [
    {
      // Replace with client-provided information: real client testimonial, name, age, photo
      rating: 5,
      quote:
        "Placeholder testimonial text. Replace with a real quote from a client once available.",
      name: "First Name",
      age: "Age Placeholder",
      detail: "Training focus placeholder (e.g. strength training, 6 months)",
    },
    {
      rating: 5,
      quote:
        "Placeholder testimonial text. Replace with a real quote from a client once available.",
      name: "First Name",
      age: "Age Placeholder",
      detail: "Training focus placeholder (e.g. endurance coaching, 3 months)",
    },
    {
      rating: 5,
      quote:
        "Placeholder testimonial text. Replace with a real quote from a client once available.",
      name: "First Name",
      age: "Age Placeholder",
      detail: "Training focus placeholder (e.g. online coaching, 1 year)",
    },
  ],
};

// Replace with real before/after client photos once available
export const transformations = {
  heading: "Real Transformations",
  subheading: "Placeholder before/after pairs — swap in real client photos once available.",
  items: [
    { name: "Client Placeholder" },
    { name: "Client Placeholder" },
    { name: "Client Placeholder" },
  ],
};

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

export const contact = {
  heading: "Get In Touch",
  subheading: "Tell Rob about your goals and he'll follow up to schedule your first session.",
  // Replace with client-provided information: confirmed email and phone number
  email: "hello@example.com",
  phone: "(555) 555-5555",
};

export const footer = {
  businessName: "Fit By Rob",
  // Replace with client-provided information: social media handles/links
  social: [
    { label: "Instagram", href: "https://instagram.com/" },
    { label: "Facebook", href: "https://facebook.com/" },
    { label: "YouTube", href: "https://youtube.com/" },
  ],
};
