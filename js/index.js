/**
 * @fileoverview Main entry point for the ConnectSphere application
 * Handles routing and initialization of page-specific functionality
 * @module index
 */

// Import component and feature modules
import { addFaviconsAndManifest } from "./components/favicon.js";
import { toggleMobileMenu } from "./ui/menu.js";
import { registerHandler } from "./events/aut/registerHandler.js";
import { initializeFeedPage } from "./ui/posts/postsDisplay.js";
import { loginHandler } from "./events/aut/loginHandler.js";
import { createPostHandler } from "./ui/posts/createPostHandler.js";
import { setupSortHandler } from "./api/posts/sortSearch.js";
import { initializeProfilePage } from "./ui/profile/profile.js";
import { editPostHandler } from "./events/posts/editPostHandler.js";
import { setupLogoutHandlers } from "./events/aut/logout.js";

/**
 * Routes to appropriate page initialization functions based on URL
 * Handles different page setups for the SPA architecture
 * @function router
 * @returns {void}
 */
function router() {
  const pathname = window.location.pathname;

  // Always set up logout handlers, regardless of page
  setupLogoutHandlers();

  // Initialize different features based on current page
  switch (pathname) {
    case "/":
    case "/index.html":
      // Login page initialization
      loginHandler();
      break;
    case "/profile/":
    case "/profile/index.html":
      // Profile page initialization
      initializeProfilePage();
      break;
    case "/register/":
    case "/register/index.html":
      // Registration page initialization
      registerHandler();
      break;
    case "/feed/":
    case "/feed/index.html":
      // Feed page initialization with posts, creation, and sorting features
      initializeFeedPage();
      createPostHandler();
      setupSortHandler();
      break;
    case "/feed/edit.html":
      // Post editing page initialization
      editPostHandler();
      break;
    default:
      // Handle unknown paths
      break;
  }
}

/**
 * Application initialization function
 * Sets up global components and routes to page-specific initialization
 * @function init
 * @listens Document#DOMContentLoaded
 */
document.addEventListener("DOMContentLoaded", () => {
  // Set up global UI components
  addFaviconsAndManifest();
  toggleMobileMenu();

  // Initialize page-specific functionality
  router();
});
