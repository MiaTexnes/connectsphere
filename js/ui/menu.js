import { setupLogoutHandlers } from "../events/aut/logout.js";

export function toggleMobileMenu() {
  const menuBtn = document.getElementById("menu-btn");
  const mobileMenu = document.getElementById("mobile-menu");

  if (menuBtn && mobileMenu) {
    menuBtn.addEventListener("click", () => {
      mobileMenu.classList.toggle("hidden");
    });
  }

  // Setup logout handlers whenever the menu is initialized
  setupLogoutHandlers();
}
