// Simple, dependency-free validation helpers for the inquiry form.

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validateField(name, value) {
  const trimmed = typeof value === "string" ? value.trim() : value;

  switch (name) {
    case "fullName":
      if (!trimmed) return "Enter your full name.";
      if (trimmed.length < 2) return "Enter your full name.";
      return "";

    case "email":
      if (!trimmed) return "Enter your email address.";
      if (!EMAIL_PATTERN.test(trimmed)) return "Enter a valid email address.";
      return "";

    case "phone": {
      if (!trimmed) return "Enter your phone number.";
      const digits = String(trimmed).replace(/\D/g, "");
      if (digits.length !== 10) return "Enter a 10-digit phone number.";
      return "";
    }

    case "fitnessGoal":
      if (!trimmed) return "Select your primary fitness goal.";
      return "";

    case "trainingType":
      if (!trimmed) return "Select a preferred training type.";
      return "";

    case "message":
      if (!trimmed) return "Add a short message for Rob.";
      if (trimmed.length < 10) return "Add a bit more detail (at least 10 characters).";
      return "";

    default:
      return "";
  }
}

export function validateAll(values) {
  const errors = {};
  Object.keys(values).forEach((name) => {
    const error = validateField(name, values[name]);
    if (error) errors[name] = error;
  });
  return errors;
}
