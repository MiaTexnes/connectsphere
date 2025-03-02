import { login } from "../../api/auth/login.js";
import { displayMessage } from "../../ui/common/displayMessage.js";
import { setAuthToken } from "../../events/aut/auth.js";

/**
 * Sets up event handler for login form submission
 * Initializes form validation and submission handling
 */
export function loginHandler() {
  const form = document.querySelector("#loginForm");
  if (form) {
    form.addEventListener("submit", submitForm);
  }
}

/**
 * Handles the login form submission
 * @param {Event} event - The form submission event
 * @returns {Promise<void>}
 */
async function submitForm(event) {
  event.preventDefault();
  const form = event.target;
  const formData = new FormData(form);
  const data = Object.fromEntries(formData);

  try {
    // Attempt to log in with provided credentials
    const result = await login(data);
    // Store authentication token
    setAuthToken(result);
    // Redirect to profile page on successful login
    window.location.href = "/profile/index.html";
  } catch (error) {
    // Display error message if login fails
    displayMessage("#message", "error", `Login failed: ${error.message}`);
  }
}
