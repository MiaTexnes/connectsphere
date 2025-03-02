// Import logout functionality to enable user sign-out from menu
import { setupLogoutHandlers } from "../events/aut/logout.js";

/**
 * Sets up mobile menu toggling functionality and logout handlers
 * Handles the responsive mobile navigation menu display
 * @returns {void}
 */
export function toggleMobileMenu() {
  // Get references to the menu button and mobile menu elements
  const menuBtn = document.getElementById("menu-btn");
  const mobileMenu = document.getElementById("mobile-menu");

  // Only set up event listener if both elements exist in the DOM
  if (menuBtn && mobileMenu) {
    // Toggle the 'hidden' class to show/hide the mobile menu when button is clicked
    menuBtn.addEventListener("click", () => {
      mobileMenu.classList.toggle("hidden");
    });
  }

  // Setup logout handlers whenever the menu is initialized
  // This enables logout functionality across the application
  setupLogoutHandlers();
}
