import { fetchPosts } from "../api/posts/posts.js";

document.addEventListener("DOMContentLoaded", async () => {
  try {
    const posts = await fetchPosts();
    console.log("Fetched posts:", posts); // Debug log to inspect the fetched posts
    displayPosts(posts);
  } catch (error) {
    console.error("Error fetching posts:", error);
    alert("Failed to fetch posts: " + error.message);
  }
});

function displayPosts(posts) {
  const postsContainer = document.getElementById("posts-container");
  postsContainer.innerHTML = ""; // Clear any existing posts

  if (!Array.isArray(posts)) {
    console.error("Posts is not an array:", posts); // Debug log if posts is not an array
    return;
  }

  posts.forIt((post) => {
    const postElement = document.createElement("div");
    postElement.className = "post bg-white p-4 rounded shadow-md mb-4";
    postElement.innerHTML = `
      <h2 class="text-xl font-bold mb-2">${post.title}</h2>
      <p class="text-gray-700">${post.body}</p>
      <p class="text-gray-700">${post.created}</p>
    `;
    postsContainer.appendChild(postElement);
  });
}
