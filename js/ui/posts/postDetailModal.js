// Modal code
import { fetchPostById } from "../../api/posts/postsApi.js";
import { isUsersPost } from "../../events/aut/auth.js";
import { deletePostHandler } from "../../events/posts/deletePostHandler.js";

export async function viewPostDetails(postId) {
  try {
    const post = await fetchPostById(postId);
    displayPostDetails(post);
  } catch (error) {
    console.error("Error fetching post:", error);
    alert("Failed to fetch post details: " + error.message);
  }
}

function displayPostDetails(post) {
  if (!post?.data) {
    console.error("Invalid post data:", post);
    return;
  }

  const { title, body, created, updated, id, author, media } = post.data;

  // Handle possible missing author data
  if (!author) {
    console.error("Missing author data:", post);
    alert("Failed to load post details: Missing author data");
    return;
  }

  const imageUrl = media?.url || "/assets/images/noImage.jpg";
  const imageAlt = media?.alt || title;
  const authorName = author.name || "Unknown";

  const enableAdminButtons = isUsersPost(author.name);

  let adminFunctionality = "";

  if (enableAdminButtons) {
    adminFunctionality = `
      <div>
        <a href="/feed/edit.html?id=${id}" class="edit-post-link px-6 py-2 bg-blue-500 hover:bg-blue-700 text-white font-bold rounded transition duration-200 ease-in-out transform hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-50">Edit Post</a>
        <button class="delete-post-btn px-6 py-2 bg-red-500 hover:bg-red-700 text-white font-bold rounded transition duration-200 ease-in-out transform hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-50" data-id="${id}">Delete Post</button>
      </div>
    `;
  }

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

  const closeBtn = modal.querySelector(".close-modal-btn");

  closeBtn.addEventListener("click", () => {
    modal.classList.add("opacity-0");
    setTimeout(() => modal.remove(), 200);
  });

  document.body.appendChild(modal);
  deletePostHandler(modal);
}
