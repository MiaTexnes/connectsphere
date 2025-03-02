// Import required functions for fetching post data and handling actions
import { fetchPostById } from "../../api/posts/postsApi.js";
import { isUsersPost } from "../../events/aut/auth.js";
import { deletePostHandler } from "../../events/posts/deletePostHandler.js";

/**
 * Fetches a specific post by ID and displays it in a modal
 * @param {string} postId - The ID of the post to display
 * @returns {Promise<void>}
 */
export async function viewPostDetails(postId) {
  try {
    // Fetch the complete post data from API
    const post = await fetchPostById(postId);
    // Display the post in a modal
    displayPostDetails(post);
  } catch (error) {
    // Handle any errors during fetch
    alert("Failed to fetch post details: " + error.message);
  }
}

/**
 * Creates and displays a modal with post details
 * @param {Object} post - The post data to display
 * @returns {void}
 */
function displayPostDetails(post) {
  // Validate post data before proceeding
  if (!post?.data) {
    return;
  }

  // Destructure post properties for easier access
  const { title, body, created, updated, id, author, media } = post.data;

  // Handle possible missing author data
  if (!author) {
    alert("Failed to load post details: Missing author data");
    return;
  }

  // Setup image fallbacks and defaults
  const imageUrl = media?.url || "/assets/images/noImage.jpg";
  const imageAlt = media?.alt || title;
  const authorName = author.name || "Unknown";

  // Check if current user is the post author
  const enableAdminButtons = isUsersPost(author.name);

  // Conditionally add edit/delete buttons for post author
  let adminFunctionality = "";

  if (enableAdminButtons) {
    adminFunctionality = `
      <div>
        <a href="/feed/edit.html?id=${id}" class="edit-post-link px-6 py-2 bg-green-600 hover:bg-green-700 text-white font-bold rounded transition duration-200 ease-in-out transform hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-50">Edit Post</a>
        <button class="delete-post-btn px-6 py-2 bg-red-500 hover:bg-red-700 text-white font-bold rounded transition duration-200 ease-in-out transform hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-50" data-id="${id}">Delete Post</button>
      </div>
    `;
  }

  // Create modal element with post content
  const modal = document.createElement("div");
  modal.className =
    "fixed inset-0 overflow-hidden bg-gray-600 bg-opacity-50 flex justify-center items-center z-50 transition-opacity duration-200";
  modal.innerHTML = `
    <div class="bg-white p-6 rounded-lg shadow-xl max-w-2xl w-full mx-2 relative transform transition-all duration-200">
      <div class="mb-2 flex flex-col items-center">
        <img
          src="${author?.avatar?.url || "../assets/images/2.png"}"
          alt="${authorName}'s avatar"
          class="w-16 h-16 rounded-full mr-4"
        />
        <div class="flex-1">
          <h2 class="text-xl font-bold mb-1 text-gray-800 truncate whitespace-nowrap overflow-hidden">${title}</h2>
          <p class="text-sm text-gray-600">By ${authorName}</p>
        </div>
      </div>
      <div class="flex-1 overflow-hidden">
        <div class="h-[300px] mb-3">
          <img
            src="${imageUrl}"
            alt="${imageAlt}"
            class="w-full h-full object-contain"
            onerror="this.src='/assets/images/noImage.jpg'"
          >
        </div>
        <p class="text-gray-700 leading-relaxed">${body}</p>

        <div class="text-sm text-gray-600 space-y-1">
          <p class="flex items-center">
            <span class="font-semibold mr-2">Created:</span>
            ${new Date(created).toLocaleString()}
          </p>
          <p class="flex items-center">
            <span class="font-semibold mr-2">Updated:</span>
            ${new Date(updated).toLocaleString()}
          </p>
        </div>
        <div class="flex justify-end space-x-2 mt-4">
          ${adminFunctionality}
          <button
            class="close-modal-btn px-6 py-2 bg-gray-500 hover:bg-gray-700 text-white font-bold rounded transition duration-200 ease-in-out transform hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-50"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  `;

  // Set up close button functionality
  const closeBtn = modal.querySelector(".close-modal-btn");

  closeBtn.addEventListener("click", () => {
    // Add fade-out effect before removing
    modal.classList.add("opacity-0");
    setTimeout(() => modal.remove(), 200);
  });

  // Add modal to document and setup delete functionality
  document.body.appendChild(modal);
  deletePostHandler(modal);
}
