import { logout } from "../../events/aut/auth.js";

export function setupLogoutHandlers() {
  // Get all logout links
  const logoutLinks = document.querySelectorAll(".logout-link");

  // Add click event listener to each link
  logoutLinks.forEach((link) => {
    link.addEventListener("click", (event) => {
      event.preventDefault();
      logout(); // This uses the existing logout function in auth.js
    });
  });
}
