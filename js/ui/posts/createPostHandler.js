import { create } from "../../api/posts/create.js";
import { displayMessage } from "../common/displayMessage.js";
import { initializeFeedPage } from "../../api/posts/fetchPosts.js";

export function createPostHandler() {
  const form = document.querySelector("#createPostForm");

  if (form) {
    form.addEventListener("submit", submitForm);
  }
}

async function submitForm(event) {
  event.preventDefault();

  const form = event.target;
  const formData = new FormData(form);

  const imageUrl = formData.get("imageUrl").trim();
  const imageAlt = formData.get("imageAlt").trim();

  const post = {
    title: formData.get("title"),
    body: formData.get("content"),
  };

  // Check if URL is provided and is valid
  if (imageUrl) {
    // Check if URL ends with common image/gif extensions
    const validExtensions = [".jpg", ".jpeg", ".png", ".gif", ".webp"];
    const isValidImageUrl = validExtensions.some(
      (ext) =>
        imageUrl.toLowerCase().endsWith(ext) ||
        imageUrl.toLowerCase().includes("giphy.com") ||
        imageUrl.toLowerCase().includes("tenor.com")
    );

    if (isValidImageUrl) {
      post.media = {
        url: imageUrl,
        alt: imageAlt || post.title, // Use title as fallback if no alt text
      };
    } else {
      displayMessage(
        "#message",
        "warning",
        "Please provide a valid image/GIF URL"
      );
      return;
    }
  }

  try {
    await create(post);
    displayMessage("#message", "success", "Post created successfully!");
    form.reset();
    await initializeFeedPage(); // Refresh the posts list
  } catch (error) {
    console.error("Creating post failed:", error);
    displayMessage(
      "#message",
      "error",
      `Creating post failed: ${error.message}`
    );
  }
}
