import { login } from "../../api/auth/login.js";
import { displayMessage } from "../../ui/common/displayMessage.js";
import { setAuthToken } from "../../events/aut/auth.js";

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
    setAuthToken(result); // Use the auth utility to store token
    window.location.href = "/profile/index.html"; // Redirect to profile page
  } catch (error) {
    console.error("Login failed:", error);
    displayMessage("#message", "error", `Login failed: ${error.message}`);
  }
}

// import { login } from "../../api/auth/login.js";
// import { displayMessage } from "../../ui/common/displayMessage.js";
// import { setAuthToken } from "../../events/aut/auth.js";

// export function loginHandler() {
//   const form = document.querySelector("#loginForm");
//   if (form) {
//     form.addEventListener("submit", submitForm);
//   }
// }

// async function submitForm(event) {
//   event.preventDefault();
//   const form = event.target;
//   const formData = new FormData(form);
//   const data = Object.fromEntries(formData);

//   try {
//     const result = await login(data);
//     setAuthToken(result); // Use the auth utility to store token
//     window.location.href = "/profile/index.html"; // Redirect to feed instead of profile
//   } catch (error) {
//     console.error("Login failed:", error);
//     displayMessage("#message", "error", `Login failed: ${error.message}`);
//   }
// }
