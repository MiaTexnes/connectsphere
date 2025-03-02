// Import required functions for post creation and UI updates
import { create } from "../../api/posts/create.js";
import { displayMessage } from "../common/displayMessage.js";
import { initializeFeedPage } from "../../api/posts/fetchPosts.js";

/**
 * Sets up the create post form handler
 * Initializes submit event listener on the post creation form
 */
export function createPostHandler() {
  // Find the create post form in the DOM
  const form = document.querySelector("#createPostForm");

  // Only attach event handler if the form exists on the current page
  if (form) {
    form.addEventListener("submit", submitForm);
  }
}

/**
 * Handles form submission for creating a new post
 * Extracts form data, creates post object, and sends to API
 * @param {Event} event - The form submission event
 */
async function submitForm(event) {
  // Prevent default form submission behavior
  event.preventDefault();

  // Access the submitted form and its data
  const form = event.target;
  const formData = new FormData(form);

  // Extract required post fields from form data
  const title = formData.get("title");
  const body = formData.get("content");

  // Create base post object with required fields
  const post = {
    title,
    body,
  };

  // Extract optional media fields from form data
  const imageUrl = formData.get("imageUrl");
  let imageAlt = formData.get("imageAlt");

  // Only include media if URL is provided
  if (imageUrl.trim() !== "") {
    // Use post title as alt text fallback if none provided
    if (imageAlt.trim() === "") {
      imageAlt = title;
    }

    // Add media object to post data
    post.media = {
      url: imageUrl,
      alt: imageAlt,
    };
  }

  try {
    // Send post data to API
    await create(post);
    // Show success message to user
    displayMessage("#message", "success", "Post created successfully!");
    // Clear form fields for next entry
    form.reset();
    // Refresh the posts list after creating a new post
    await initializeFeedPage();
  } catch (error) {
    // Display error message if post creation fails
    displayMessage(
      "#message",
      "error",
      `Creating post failed: ${error.message}`
    );
  }
}
