import type { Ref } from "vue";
import type { credentials } from "../types";

export const signUpData = async (credentials: credentials) => {
  try {
    const response = await fetch("/api/auth/sign-up", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        credentials,
      }),
    });

    if (!response.ok) {
      throw new Error("Failed to post data!");
    }

    const payload = await response.json();

    return payload;
  } catch (err) {
    console.error(err);
  }
};

export const validate = (credentials: credentials, errors: Ref<credentials>) => {
  let valid: boolean = true;

  const isValidEmail: RegExp = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  errors.value = { email: "", username: "", password: "" };

  if (!credentials.email) {
    errors.value.email = "E-post krävs";
    valid = false;
  } else if (!isValidEmail.test(credentials.email)) {
    errors.value.email = "Ogiltig e-postadress";
    valid = false;
  }

  if (!credentials.username) {
    errors.value.username = "Användarnamn krävs";
    valid = false;
  } else if (credentials.username.length < 2) {
    errors.value.username = "Minst 2 tecken";
    valid = false;
  }

  if (!credentials.password) {
    errors.value.password = "Lösenord krävs";
    valid = false;
  } else if (credentials.password.length < 6) {
    errors.value.password = "Minst 6 tecken";
    valid = false;
  }

  return valid;
};
