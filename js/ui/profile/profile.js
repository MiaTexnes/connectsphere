
export function initializeProfilePage()
{
  const user = JSON.parse(localStorage.getItem("user"));

  if (user) {
    // Update email
    const emailElement = document.getElementById("user-email");
    if (emailElement) {
      emailElement.textContent = `Email: ${user.data.email}`;
    }

    // Update name - select all elements that should display the user's name
    const nameElements = [
      document.querySelector("h1"), // The main profile name
      document.querySelector(".profile-name"), // The name in the profile section
    ];

    nameElements.forEach((element) => {
      if (element) {
        element.textContent = user.data.name;
      }
    });
  } else {
    window.location.href = "/index.html";
  }
}

// import { getAuthToken } from "../../events/aut/auth.js";

// export function initializeProfilePage() {
//   const user = JSON.parse(localStorage.getItem("user"));

//   if (user) {
//     // Update email
//     const emailElement = document.getElementById("user-email");
//     if (emailElement) {
//       emailElement.textContent = `Email: ${user.email}`;
//     }

//     // Update name - select all elements that should display the user's name
//     const nameElements = [
//       document.querySelector("h1"), // The main profile name
//       document.querySelector(".profile-name"), // The name in the profile section
//     ];

//     nameElements.forEach((element) => {
//       if (element) {
//         element.textContent = user.name;
//       }
//     });
//   } else {
//     window.location.href = "/index.html";
//   }
// }

// // Function to initialize the profile page
// export function initializeProfilePage() {
//   const user = JSON.parse(localStorage.getItem("user"));
//   if (user) {
//     document.getElementById("user-email").textContent = `Email: ${user.email}`;
//   }
// }
