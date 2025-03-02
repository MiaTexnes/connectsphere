import { logout } from "../../events/aut/auth.js";

/**
 * Sets up event handlers for all logout links in the application
 * Attaches click listeners to elements with the logout-link class
 * Prevents default link behavior and triggers the logout function
 */
export function setupLogoutHandlers() {
  // Get all elements with the logout-link class
  const logoutLinks = document.querySelectorAll(".logout-link");

  // Add click event listener to each logout link
  logoutLinks.forEach((link) => {
    link.addEventListener("click", (event) => {
      event.preventDefault();
      logout(); // Calls the logout function from auth.js
    });
  });
}
