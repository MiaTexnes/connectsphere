import { create } from "../../api/posts/create.js";
import { displayMessage } from "../common/displayMessage.js";
import { fetchPosts } from "../../api/posts/fetchPosts.js";

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

    // Refresh posts list
    const posts = await fetchPosts();
    const postsContainer = document.getElementById("posts-container");
    postsContainer.innerHTML = ""; // Clear existing posts

    posts.data.forEach((post) => {
      const postElement = document.createElement("div");
      postElement.className = "post bg-white p-4 rounded shadow-md mb-4";
      postElement.innerHTML = `
        <h2 class="text-xl font-bold mb-2">${post.title}</h2>
        <p class="text-gray-700">${post.body}</p>
      `;
      postsContainer.appendChild(postElement);
    });
  } catch (error) {
    console.error("Creating post failed:", error);
    displayMessage(
      "#message",
      "error",
      `Creating post failed: ${error.message}`
    );
  }
}
