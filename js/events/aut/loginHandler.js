import { login } from "../../api/auth/login.js";
import { displayMessage } from "../../ui/common/displayMessage.js";

export function loginHandler() {
  const form = document.querySelector("#loginForm");
  if (form) {
    form.addEventListener("submit", submitForm);
  }
}

async function submitForm(event) {
  event.preventDefault();
  const form = event.target;
  const formData = new FormData(form);
  const data = Object.fromEntries(formData);

  try {
    const result = await login(data);
    localStorage.setItem("user", JSON.stringify(result));
    window.location.href = "/profile/index.html";
  } catch (error) {
    console.error("Login failed:", error);
    displayMessage("#loginForm", "danger", `Login failed: ${error.message}`);
  }
}
