/**
 * @module registerHandler
 * @description Handles user registration workflow including form submission and authentication
 */

import { register } from "../../api/auth/register.js";
import { displayMessage } from "../../ui/common/displayMessage.js";
import { login } from "../../api/auth/login.js";
import { setAuthToken } from "../../events/aut/auth.js";

/**
 * Sets up the registration form handler
 * @function registerHandler
 * @description Attaches submit event listener to the registration form
 * @returns {void}
 */
export function registerHandler() {
  // Get the registration form element by its ID
  const form = document.querySelector("#registerForm");
  if (form) {
    // Add a submit event listener to the form
    form.addEventListener("submit", submitForm);
  }
}

/**
 * Handles the registration form submission
 * @function submitForm
 * @async
 * @param {Event} event - The form submission event
 * @description Processes form data, registers user, and attempts auto-login
 * @returns {Promise<void>}
 */
async function submitForm(event) {
  event.preventDefault();
  const form = event.target;
  const formData = new FormData(form);
  const data = Object.fromEntries(formData);

  try {
    // Make the API call to register the user
    const response = await register(data);
    console.log("User registered successfully:", response);

    // Show success message immediately
    displayMessage(
      "#message",
      "success",
      "Registration successful! Redirecting to profile page..."
    );

    // Auto-login after successful registration
    try {
      const loginData = {
        email: data.email,
        password: data.password,
      };
      const loginResult = await login(loginData);
      setAuthToken(loginResult);

      // Delay redirect by 2 seconds to show the message
      setTimeout(() => {
        window.location.href = "/profile/index.html";
      }, 2000);
    } catch (loginError) {
      console.error("Auto-login failed:", loginError);
      displayMessage(
        "#message",
        "success",
        'Registration successful! Please <a href="/index.html">login</a> to continue.'
      );
    }
  } catch (error) {
    console.error("Error registering user:", error);
    // Show an error message to the user
    displayMessage(
      "#message",
      "error",
      `Registration failed: ${error.message}`
    );
  }
}
