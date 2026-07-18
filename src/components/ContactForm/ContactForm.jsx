import { useState } from "react";
import { contact, fitnessGoals, trainingTypes } from "../../data/content";
import { validateField, validateAll } from "./validation";
import "./ContactForm.css";

const initialValues = {
  fullName: "",
  email: "",
  phone: "",
  fitnessGoal: "",
  trainingType: "",
  message: "",
};

// The form submits to Formspree (https://formspree.io) by default. The
// endpoint is read from an environment variable so no keys live in source
// control. See README.md for setup instructions, including alternatives
// such as Web3Forms or EmailJS.
const FORM_ENDPOINT = import.meta.env.VITE_FORM_ENDPOINT;

export default function ContactForm() {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [status, setStatus] = useState("idle"); // idle | submitting | success | error
  const [statusMessage, setStatusMessage] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;
    setValues((prev) => ({ ...prev, [name]: value }));
    if (touched[name]) {
      setErrors((prev) => ({ ...prev, [name]: validateField(name, value) }));
    }
  };

  const handleBlur = (event) => {
    const { name, value } = event.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    setErrors((prev) => ({ ...prev, [name]: validateField(name, value) }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const allErrors = validateAll(values);
    setErrors(allErrors);
    setTouched(
      Object.keys(values).reduce((acc, key) => ({ ...acc, [key]: true }), {})
    );

    if (Object.keys(allErrors).length > 0) {
      setStatus("error");
      setStatusMessage("Please fix the highlighted fields and try again.");
      return;
    }

    if (!FORM_ENDPOINT) {
      setStatus("error");
      setStatusMessage(
        "This form isn't connected to a submission service yet. See README.md to configure VITE_FORM_ENDPOINT."
      );
      return;
    }

    setStatus("submitting");
    setStatusMessage("");

    try {
      const response = await fetch(FORM_ENDPOINT, {
        method: "POST",
        headers: { Accept: "application/json", "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        throw new Error("Submission failed");
      }

      setStatus("success");
      setStatusMessage("Thanks for reaching out! Rob will get back to you soon.");
      setValues(initialValues);
      setTouched({});
      setErrors({});
    } catch (error) {
      setStatus("error");
      setStatusMessage(
        "Something went wrong sending your message. Please try again, or email directly below."
      );
    }
  };

  const fieldError = (name) => (touched[name] && errors[name] ? errors[name] : "");

  return (
    <section id="contact" className="section contact reveal">
      <div className="container contact__inner">
        <div className="contact__intro">
          <p className="eyebrow contact__eyebrow">Let's Get Started</p>
          <h2 className="contact__heading">{contact.heading}</h2>
          <p className="contact__subheading">{contact.subheading}</p>

          <dl className="contact__details">
            <div>
              <dt>Email</dt>
              <dd>
                <a href={`mailto:${contact.email}`}>{contact.email}</a>
              </dd>
            </div>
            <div>
              <dt>Phone</dt>
              <dd>
                <a href={`tel:${contact.phone.replace(/[^\d+]/g, "")}`}>{contact.phone}</a>
              </dd>
            </div>
          </dl>
        </div>

        <form className="contact-form" noValidate onSubmit={handleSubmit}>
          <div className="contact-form__row">
            <label htmlFor="fullName">Full name</label>
            <input
              id="fullName"
              name="fullName"
              type="text"
              autoComplete="name"
              value={values.fullName}
              onChange={handleChange}
              onBlur={handleBlur}
              aria-invalid={Boolean(fieldError("fullName"))}
              aria-describedby={fieldError("fullName") ? "fullName-error" : undefined}
            />
            {fieldError("fullName") && (
              <p className="contact-form__error" id="fullName-error" role="alert">
                {fieldError("fullName")}
              </p>
            )}
          </div>

          <div className="contact-form__row contact-form__row--split">
            <div>
              <label htmlFor="email">Email</label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
                aria-invalid={Boolean(fieldError("email"))}
                aria-describedby={fieldError("email") ? "email-error" : undefined}
              />
              {fieldError("email") && (
                <p className="contact-form__error" id="email-error" role="alert">
                  {fieldError("email")}
                </p>
              )}
            </div>

            <div>
              <label htmlFor="phone">Phone number</label>
              <input
                id="phone"
                name="phone"
                type="tel"
                autoComplete="tel"
                value={values.phone}
                onChange={handleChange}
                onBlur={handleBlur}
                aria-invalid={Boolean(fieldError("phone"))}
                aria-describedby={fieldError("phone") ? "phone-error" : undefined}
              />
              {fieldError("phone") && (
                <p className="contact-form__error" id="phone-error" role="alert">
                  {fieldError("phone")}
                </p>
              )}
            </div>
          </div>

          <div className="contact-form__row contact-form__row--split">
            <div>
              <label htmlFor="fitnessGoal">Primary fitness goal</label>
              <select
                id="fitnessGoal"
                name="fitnessGoal"
                value={values.fitnessGoal}
                onChange={handleChange}
                onBlur={handleBlur}
                aria-invalid={Boolean(fieldError("fitnessGoal"))}
                aria-describedby={fieldError("fitnessGoal") ? "fitnessGoal-error" : undefined}
              >
                <option value="">Select a goal</option>
                {fitnessGoals.map((goal) => (
                  <option key={goal} value={goal}>
                    {goal}
                  </option>
                ))}
              </select>
              {fieldError("fitnessGoal") && (
                <p className="contact-form__error" id="fitnessGoal-error" role="alert">
                  {fieldError("fitnessGoal")}
                </p>
              )}
            </div>

            <div>
              <label htmlFor="trainingType">Preferred training type</label>
              <select
                id="trainingType"
                name="trainingType"
                value={values.trainingType}
                onChange={handleChange}
                onBlur={handleBlur}
                aria-invalid={Boolean(fieldError("trainingType"))}
                aria-describedby={fieldError("trainingType") ? "trainingType-error" : undefined}
              >
                <option value="">Select a type</option>
                {trainingTypes.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
              {fieldError("trainingType") && (
                <p className="contact-form__error" id="trainingType-error" role="alert">
                  {fieldError("trainingType")}
                </p>
              )}
            </div>
          </div>

          <div className="contact-form__row">
            <label htmlFor="message">Message</label>
            <textarea
              id="message"
              name="message"
              rows={5}
              value={values.message}
              onChange={handleChange}
              onBlur={handleBlur}
              aria-invalid={Boolean(fieldError("message"))}
              aria-describedby={fieldError("message") ? "message-error" : undefined}
            />
            {fieldError("message") && (
              <p className="contact-form__error" id="message-error" role="alert">
                {fieldError("message")}
              </p>
            )}
          </div>

          <button type="submit" className="btn btn-primary contact-form__submit" disabled={status === "submitting"}>
            {status === "submitting" ? "Sending..." : "Send inquiry"}
          </button>

          {statusMessage && (
            <p
              className={`contact-form__status contact-form__status--${status}`}
              role="status"
              aria-live="polite"
            >
              {statusMessage}
            </p>
          )}
        </form>
      </div>
    </section>
  );
}
