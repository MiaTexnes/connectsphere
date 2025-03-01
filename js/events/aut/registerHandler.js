import { register } from "../../api/auth/register.js";
import { displayMessage } from "../../ui/common/displayMessage.js";
import { login } from "../../api/auth/login.js";
import { setAuthToken } from "../../events/aut/auth.js";

// Function to handle the registration process
export function registerHandler() {
  console.log("registerHandler");

  // Get the registration form element by its ID
  const form = document.querySelector("#registerForm");
  if (form) {
    // Add a submit event listener to the form
    form.addEventListener("submit", submitForm);
  }
}

// Function to handle form submission
async function submitForm(event) {
  event.preventDefault(); // Prevent the default form submission behavior
  const form = event.target; // Get the form element that triggered the event
  const formData = new FormData(form); // Create a FormData object from the form
  const data = Object.fromEntries(formData); // Convert the FormData object to a plain JavaScript object

  // Remove the bio field if it is empty
  if (data.bio && data.bio.trim() === "") {
    delete data.bio;
  }

  // Remove the avatarUrl field if it is empty, otherwise create an avatar object
  if (data.avatarUrl && data.avatarUrl.trim() === "") {
    delete data.avatarUrl;
  } else if (data.avatarUrl) {
    data.avatar = {
      url: data.avatarUrl,
      alt: `${data.name}'s avatar`,
    };
    delete data.avatarUrl;
  }

  console.log(data); // Log the form data for debugging

  try {
    // Make the API call to register the user
    const response = await register(data);
    console.log("User registered successfully:", response);

    // Auto-login after successful registration
    try {
      const loginData = {
        email: data.email,
        password: data.password,
      };
      const loginResult = await login(loginData);
      setAuthToken(loginResult);

      // Redirect to profile page
      window.location.href = "/profile/index.html";
    } catch (loginError) {
      console.error("Auto-login failed:", loginError);
      displayMessage(
        "#message",
        "success",
        'Registration successful! Please <a href="/index.html">login</a> to continue.'
      );
    }
  } catch (error) {
    console.error("Error registering user:", error);
    // Show an error message to the user
    displayMessage(
      "#message",
      "error",
      `Registration failed: ${error.message}`
    );
  }
}
