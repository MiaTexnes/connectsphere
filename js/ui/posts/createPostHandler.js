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

  const title = formData.get("title");
  const body = formData.get("content");

  const post = {
    title,
    body,
  };

  const imageUrl = formData.get("imageUrl");
  let imageAlt = formData.get("imageAlt");

  if (imageUrl.trim() !== "") {
    if (imageAlt.trim() === "") {
      imageAlt = title;
    }

    post.media = {
      url: imageUrl,
      alt: imageAlt,
    };
  }

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
