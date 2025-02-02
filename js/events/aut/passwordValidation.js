export function setupPasswordValidation() {
  const passwordInput = document.getElementById("password");
  const confirmPasswordInput = document.getElementById("confirm-password");
  const passwordError = document.getElementById("password-error");
  const confirmPasswordError = document.getElementById(
    "confirm-password-error"
  );

  function validatePassword() {
    if (passwordInput.value.length < 8) {
      passwordError.classList.remove("hidden");
    } else {
      passwordError.classList.add("hidden");
    }
  }

  function validateConfirmPassword() {
    if (passwordInput.value !== confirmPasswordInput.value) {
      confirmPasswordError.classList.remove("hidden");
    } else {
      confirmPasswordError.classList.add("hidden");
    }
  }

  if (
    passwordInput &&
    confirmPasswordInput &&
    passwordError &&
    confirmPasswordError
  ) {
    passwordInput.addEventListener("input", validatePassword);
    confirmPasswordInput.addEventListener("input", validateConfirmPassword);

    const form = document.querySelector("form");
    if (form) {
      form.addEventListener("submit", (event) => {
        validatePassword();
        validateConfirmPassword();
        if (
          passwordError.classList.contains("hidden") &&
          confirmPasswordError.classList.contains("hidden")
        ) {
          // Form is valid
        } else {
          event.preventDefault();
        }
      });
    }
  }
}
