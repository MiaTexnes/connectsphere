import { BASE_URL } from "../../constants/api.js";
import { sortPosts, searchPosts } from "./sort.js";
import { isUsersPost } from "../../events/aut/auth.js";
import { deletePostHandler } from "../../events/posts/deletePostHandler.js";

const options = {
  headers: {
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoibWlhdGV4bmVzIiwiZW1haWwiOiJtaWF0ZXhuZXNAbm9yb2ZmLm5vIiwiaWF0IjoxNzM4NTA1NTQzfQ.ii_i4vNlxW_OozOjJnUl4LIs3W1pD-457LPi22OOzY4",
    "X-Noroff-API-Key": "a8dac234-069e-437e-8cdd-e189118afca5",
  },
};

export async function fetchPosts() {
  const url = `${BASE_URL}social/posts?_author=true`;

  const response = await fetch(url, options);
  const json = await response.json();

  if (!response.ok) {
    throw new Error(json.errors?.[0]?.message || "Fetching posts failed");
  }

  return json;
}

export async function fetchPostById(postId) {
  const url = `${BASE_URL}social/posts/${postId}?_author=true`;

  const response = await fetch(url, options);
  const json = await response.json();

  if (!response.ok) {
    throw new Error(json.errors?.[0]?.message || "Fetching post failed");
  }

  return json;
}

async function viewPost(postId) {
  try {
    const post = await fetchPostById(postId);
    displayPostDetails(post);
  } catch (error) {
    console.error("Error fetching post:", error);
    alert("Failed to fetch post details: " + error.message);
  }
}

function displayPostDetails(post) {
  const { title, body, created, updated, id, author } = post.data,
    imageUrl = post.data.media?.url || "/assets/images/noImage.jpg",
    imageAlt = post.data.media?.alt || title;

  const { name: authorName } = author;

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
      src="${author?.avatar.url || "../assets/images/2.png"}"
      alt="${author?.name || "Unknown"}'s avatar"
      class="w-16 h-16 rounded-full mr-4"
    />
    <div class="flex-1">
          <h2 class="text-xl font-bold mb-1 text-gray-800 truncate whitespace-nowrap overflow-hidden">${title}</h2>
          <p class="text-sm text-gray-600">By ${authorName}</p>
        </div>
        <div class="flex-1 overflow-hidden">
    <div class="h-[300px] mb-3">
          <img
            src="${imageUrl}"
            alt="${imageAlt}"
            class="w-full h-full object-fit bg-gray-100"
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
        <div class="flex justify-end space-x-2">
          ${adminFunctionality}
          <button
            class="close-modal-btn px-6 py-2 bg-gray-500 hover:bg-gray-700 text-white font-bold rounded transition duration-200 ease-in-out transform hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-50"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  `;

  const closeBtn = modal.querySelector(".close-modal-btn");
  // const editBtn = modal.querySelector(".edit-modal-btn");

  closeBtn.addEventListener("click", () => {
    modal.classList.add("opacity-0");
    setTimeout(() => modal.remove(), 200);
  });

  // editBtn.addEventListener("click", () => {
  //   modal.classList.add("opacity-0");
  //   setTimeout(() => {
  //     modal.remove();
  //     window.openEditModal({ id, title, body });
  //   }, 200);
  // });

  document.body.appendChild(modal);
  deletePostHandler();
}

export async function initializeFeedPage(
  sortCriteria = "newToOld",
  searchTerm = ""
) {
  try {
    const posts = await fetchPosts();
    if (posts && posts.data) {
      let filteredPosts = searchPosts(posts.data, searchTerm);
      const sortedPosts = sortPosts(filteredPosts, sortCriteria);
      displayPosts({ data: sortedPosts });
    }
  } catch (error) {
    console.error("Error fetching posts:", error);
    alert("Failed to fetch posts: " + error.message);
  }
}

export function displayPosts(posts) {
  const postsContainer = document.getElementById("posts-container");
  postsContainer.innerHTML = "";

  if (!posts || !Array.isArray(posts.data)) {
    console.error("Invalid posts data:", posts);
    return;
  }

  if (posts.data.length === 0) {
    postsContainer.innerHTML = `
      <div class="text-center text-gray-500 py-4">
        No posts found matching your search criteria
      </div>
    `;
    return;
  }

  posts.data.forEach((post) => {
    const { title, body, created, updated, author, media } = post;
    const { name: authorName } = author;

    let imageUrl = "/assets/images/noImage.jpg";
    let imageAlt = title;

    if (media) {
      imageUrl = media.url;
      imageAlt = media.alt;
    }

    const postElement = document.createElement("div");
    postElement.className =
      "post bg-white p-4 rounded shadow-md hover:shadow-lg transition-shadow duration-200 flex flex-col h-[600px]";
    postElement.innerHTML = `
    <div class="mb-4 flex items-start">
    <img
      src="${author?.avatar.url || "../assets/images/2.png"}"
      alt="${author?.name || "Unknown"}'s avatar"
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
            class="w-full h-full object-fit rounded bg-gray-100"
            onerror="this.src='/assets/images/noImage.jpg'"
          >
        </div>

        <div class="h-[100px] overflow-y-auto mb-3">
          <p class="text-gray-700">${body}</p>
        </div>
      </div>

    <div class="mt-auto"> <!-- Push to bottom -->
        <div class="text-sm text-gray-600 mb-3">
          <p>Created: ${new Date(created).toLocaleString()}</p>
          <p>Updated: ${new Date(updated).toLocaleString()}</p>
        </div>
        <div class="flex space-x-2">
          <button
            class="view-post-btn bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-200 ease-in-out transform hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50 w-full"
            data-post-id="${post.id}"
          >
            View Details
          </button>
    </div>
  `;

    const viewButton = postElement.querySelector(".view-post-btn");
    viewButton.addEventListener("click", () => viewPost(post.id));

    postsContainer.appendChild(postElement);
  });
}
