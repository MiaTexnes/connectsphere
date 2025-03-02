/**
 * Initializes the profile page with user data from local storage
 * Populates user information and implements redirect for unauthenticated users
 * @returns {void}
 */
export function initializeProfilePage() {
  // Retrieve user data from local storage
  const user = JSON.parse(localStorage.getItem("user"));

  if (user) {
    // Update email display with user's email address
    const emailElement = document.getElementById("user-email");
    if (emailElement) {
      emailElement.textContent = `Email: ${user.data.email}`;
    }

    // Update name - select all elements that should display the user's name
    const nameElements = [
      document.querySelector("h1"), // The main profile name
      document.querySelector(".profile-name"), // The name in the profile section
    ];

    // Set each name element with the user's name
    nameElements.forEach((element) => {
      if (element) {
        element.textContent = user.data.name;
      }
    });
  } else {
    // Redirect to login page if no user data exists in local storage
    window.location.href = "/index.html";
  }
}
