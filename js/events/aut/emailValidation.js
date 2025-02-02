export function setupEmailValidation() {
  const emailInput = document.getElementById("email");
  const emailError = document.getElementById("email-error");

  if (emailInput && emailError) {
    emailInput.addEventListener("input", () => {
      if (emailInput.validity.patternMismatch) {
        emailError.classList.remove("hidden");
      } else {
        emailError.classList.add("hidden");
      }
    });

    const form = document.querySelector("form");
    if (form) {
      form.addEventListener("submit", (event) => {
        if (emailInput.validity.patternMismatch) {
          emailError.classList.remove("hidden");
          event.preventDefault();
        }
      });
    }
  }
}
