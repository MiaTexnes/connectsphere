// Import necessary functions from other modules
import { register } from "../../api/auth/register.js";
import { setupEmailValidation } from "./emailValidation.js";
import { setupPasswordValidation } from "./passwordValidation.js";
import { displayMessage } from "../../ui/common/displayMessage.js";

// Function to handle the registration process
export function registerHandler() {
  console.log("registerHandler");

  // Get the registration form element by its ID
  const form = document.querySelector("#registerForm");
  if (form) {
    // Add a submit event listener to the form
    form.addEventListener("submit", submitForm);
  }

  // Set up email validation
  setupEmailValidation();
  // Set up password validation
  setupPasswordValidation();
  displayMessage();
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
    // Redirect to the profile page or show a success message
    window.location.href = "/profile/index.html";
  } catch (error) {
    console.error("Error registering user:", error);
    // Show an error message to the user
    alert("Registration failed: " + error.message);
  }
}
