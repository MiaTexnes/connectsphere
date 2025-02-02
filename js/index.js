import { addFaviconsAndManifest } from "./components/favicon.js";
import { toggleMobileMenu } from "./ui/menu.js";
import { registerHandler } from "./events/aut/registerHandler.js";
import { fetchPosts } from "./api/posts/posts.js";
import { login } from "./api/auth/login.js";
import { loginHandler } from "./events/aut/loginHandler.js";

// Function to handle routing based on the current pathname
function router() {
  const pathname = window.location.pathname;

  switch (pathname) {
    case "/":
      initializeLoginPage();
      console.log("Home page");
      loginHandler();
      break;
    case "/profile/index.html":
      initializeProfilePage();
      break;
    case "/register/index.html":
      registerHandler();
      break;
    case "/feed/index.html":
      initializeFeedPage();
      break;
    default:
      console.log("Page not found");
      break;
  }
}

// Function to initialize the login page
function initializeLoginPage() {
  const loginForm = document.getElementById("loginForm");
  if (loginForm) {
    loginForm.addEventListener("submit", async (event) => {
      event.preventDefault();
      const email = document.getElementById("email").value;
      const password = document.getElementById("password").value;

      try {
        await login({ email, password });
        window.location.href = "/profile/index.html";
      } catch (error) {
        console.error("Login failed:", error);
        alert("Login failed: " + error.message);
      }
    });
  }
}

// Function to initialize the profile page
function initializeProfilePage() {
  const user = JSON.parse(localStorage.getItem("user"));
  if (user) {
    document.getElementById("user-email").textContent = `Email: ${user.email}`;
    // Add more fields as needed
  }
}

// Function to initialize the feed page
async function initializeFeedPage() {
  try {
    const posts = await fetchPosts();
    displayPosts(posts);
  } catch (error) {
    console.error("Error fetching posts:", error);
    alert("Failed to fetch posts: " + error.message);
  }
}

// Function to display posts on the feed page
function displayPosts(posts) {
  const postsContainer = document.getElementById("posts-container");
  postsContainer.innerHTML = ""; // Clear any existing posts

  // Check if posts exists and has a data property
  if (!posts || !Array.isArray(posts.data)) {
    console.error("Invalid posts data:", posts);
    return;
  }

  // Use posts.data instead of posts directly
  posts.data.forEach((post) => {
    const postElement = document.createElement("div");
    postElement.className = "post bg-white p-4 rounded shadow-md mb-4";
    postElement.innerHTML = `
      <h2 class="text-xl font-bold mb-2">${post.title}</h2>
      <p class="text-gray-700">${post.body}</p>
    `;
    postsContainer.appendChild(postElement);
  });
}

// Initialize the application when the DOM content is loaded
document.addEventListener("DOMContentLoaded", () => {
  addFaviconsAndManifest();
  toggleMobileMenu();
  router();
});
