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

// Function to handle routing based on the current pathname
function router() {
  const pathname = window.location.pathname;

  console.log("Pathname:", pathname);

  // Always set up logout handlers, regardless of page
  setupLogoutHandlers();

  switch (pathname) {
    case "/":
    case "/index.html":
      console.log("Home page");
      loginHandler();
      break;
    case "/profile/":
    case "/profile/index.html":
      initializeProfilePage();
      break;
    case "/register/":
    case "/register/index.html":
      registerHandler();
      break;
    case "/feed/":
    case "/feed/index.html":
      initializeFeedPage();
      createPostHandler();
      setupSortHandler();
      break;
    case "/feed/edit.html":
      editPostHandler();
      break;
    default:
      console.log("Page not found");
      break;
  }
}

// Initialize the application when the DOM content is loaded
document.addEventListener("DOMContentLoaded", () => {
  addFaviconsAndManifest();
  toggleMobileMenu();
  router();
});
