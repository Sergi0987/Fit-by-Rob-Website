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

// The form uses Netlify Forms: submissions are captured by Netlify (see the
// hidden detection form in index.html) and can be emailed to Rob / viewed in
// the Netlify dashboard. Netlify Forms only works on the deployed Netlify
// site, not in local `vite dev`. Submitting posts url-encoded data to "/".
const FORM_NAME = "contact";

const encode = (data) =>
  Object.keys(data)
    .map((key) => encodeURIComponent(key) + "=" + encodeURIComponent(data[key]))
    .join("&");

// Progressively formats a US phone number as the user types: strips
// non-digits, caps at 10, and inserts dashes (e.g. "4445556666" -> "444-555-6666").
function formatPhone(input) {
  const digits = input.replace(/\D/g, "").slice(0, 10);
  const parts = [digits.slice(0, 3), digits.slice(3, 6), digits.slice(6, 10)];
  return parts.filter(Boolean).join("-");
}

export default function ContactForm() {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [status, setStatus] = useState("idle"); // idle | submitting | success | error
  const [statusMessage, setStatusMessage] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;
    const nextValue = name === "phone" ? formatPhone(value) : value;
    setValues((prev) => ({ ...prev, [name]: nextValue }));
    if (touched[name]) {
      setErrors((prev) => ({ ...prev, [name]: validateField(name, nextValue) }));
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

    setStatus("submitting");
    setStatusMessage("");

    // Netlify uses a field named "subject" as the notification email's subject
    // line. Compose a descriptive one so Rob can triage inquiries at a glance.
    // Keep it ASCII-only — Netlify puts this straight into the email Subject
    // header without MIME encoding, so non-ASCII (e.g. an em dash) renders as
    // a broken character. A plain hyphen is safe.
    const subject = values.fitnessGoal
      ? `New inquiry from ${values.fullName} - ${values.fitnessGoal}`
      : `New inquiry from ${values.fullName}`;

    try {
      const response = await fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: encode({ "form-name": FORM_NAME, "bot-field": "", subject, ...values }),
      });

      if (!response.ok) {
        throw new Error("Submission failed");
      }

      setStatus("success");
      setStatusMessage("Thanks for reaching out! Rob will get back to you soon.");
      setValues(initialValues);
      setTouched({});
      setErrors({});
    } catch {
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

          {/* Direct email/phone intentionally omitted so the inquiry form is
              the single intake path. Rob's details still live in
              contact.json if they ever need to be surfaced again. */}
        </div>

        <form
          className="contact-form"
          name={FORM_NAME}
          method="POST"
          data-netlify="true"
          netlify-honeypot="bot-field"
          noValidate
          onSubmit={handleSubmit}
        >
          {/* Netlify needs form-name in the POST body; honeypot catches bots */}
          <input type="hidden" name="form-name" value={FORM_NAME} />
          <p className="visually-hidden" aria-hidden="true">
            <label>
              Don&apos;t fill this out if you&apos;re human: <input name="bot-field" tabIndex={-1} autoComplete="off" />
            </label>
          </p>

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
                inputMode="numeric"
                autoComplete="tel"
                maxLength={12}
                placeholder="555-555-5555"
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
