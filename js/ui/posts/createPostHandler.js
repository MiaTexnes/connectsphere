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
  const post = {
    title: formData.get("title"),
    body: formData.get("content"),
  };

  try {
    await create(post);
    displayMessage("#message", "success", "Post created successfully!");
    form.reset();
    // Refresh the posts list after creating a new post
    await initializeFeedPage();
  } catch (error) {
    console.error("Creating post failed:", error);
    displayMessage(
      "#message",
      "error",
      `Creating post failed: ${error.message}`
    );
  }
}
