import { addFaviconsAndManifest } from "./components/favicon.js";
import { toggleMobileMenu } from "./ui/menu.js";
import { registerHandler } from "./events/aut/registerHandler.js";
import { initializeFeedPage } from "./api/posts/fetchPosts.js";
import { loginHandler } from "./events/aut/loginHandler.js";
import { createPostHandler } from "./ui/posts/createPostHandler.js";
import { setupSortHandler } from "./api/posts/sort.js";

// Function to handle routing based on the current pathname
function router() {
  const pathname = window.location.pathname;

  console.log("Pathname:", pathname);

  switch (pathname) {
    case "/":
    case "/index.html":
      console.log("Home page");
      loginHandler();
      break;
    case "/profile/index.html":
      initializeProfilePage();
      break;
    case "/register/index.html":
      registerHandler();
      break;
    case "/feed/index.html":
      initializeFeedPage();
      createPostHandler();
      setupSortHandler();
      break;
    default:
      console.log("Page not found");
      break;
  }
}

// Function to initialize the profile page
function initializeProfilePage() {
  const user = JSON.parse(localStorage.getItem("user"));
  if (user) {
    document.getElementById("user-email").textContent = `Email: ${user.email}`;
  }
}

// Initialize the application when the DOM content is loaded
document.addEventListener("DOMContentLoaded", () => {
  addFaviconsAndManifest();
  toggleMobileMenu();
  router();
});
