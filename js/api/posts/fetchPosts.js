import { BASE_URL } from "../../constants/api.js";
import { sortPosts, searchPosts } from "./sort.js";

const options = {
  headers: {
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoibWlhdGV4bmVzIiwiZW1haWwiOiJtaWF0ZXhuZXNAbm9yb2ZmLm5vIiwiaWF0IjoxNzM4NTA1NTQzfQ.ii_i4vNlxW_OozOjJnUl4LIs3W1pD-457LPi22OOzY4",
    "X-Noroff-API-Key": "a8dac234-069e-437e-8cdd-e189118afca5",
  },
};

export async function fetchPosts() {
  const url = `${BASE_URL}social/posts`;

  const response = await fetch(url, options);
  const json = await response.json();

  if (!response.ok) {
    throw new Error(json.errors?.[0]?.message || "Fetching posts failed");
  }

  return json;
}

export async function fetchPostById(postId) {
  const url = `${BASE_URL}social/posts/${postId}`;

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
  const modal = document.createElement("div");
  modal.className =
    "fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50 transition-opacity duration-200";
  modal.innerHTML = `
    <div class="bg-white p-6 rounded-lg shadow-xl max-w-2xl w-full mx-4 relative transform transition-all duration-200">
      <div class="space-y-4">
        <h2 class="text-2xl font-bold text-gray-800">${post.title}</h2>
        <p class="text-gray-700 leading-relaxed">${post.body}</p>
        <div class="text-sm text-gray-600 space-y-1">
          <p class="flex items-center">
            <span class="font-semibold mr-2">Created:</span>
            ${new Date(post.created).toLocaleString()}
          </p>
          <p class="flex items-center">
            <span class="font-semibold mr-2">Updated:</span>
            ${new Date(post.updated).toLocaleString()}
          </p>
        </div>
        <button
          class="close-modal-btn mt-6 w-full md:w-auto px-6 py-2 bg-gray-500 hover:bg-gray-700 text-white font-bold rounded transition duration-200 ease-in-out transform hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-50"
        >
          Close
        </button>
      </div>
    </div>
  `;

  const closeBtn = modal.querySelector(".close-modal-btn");
  closeBtn.addEventListener("click", () => {
    modal.classList.add("opacity-0");
    setTimeout(() => modal.remove(), 200);
  });

  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      modal.classList.add("opacity-0");
      setTimeout(() => modal.remove(), 200);
    }
  });

  // Add keyboard support for closing modal
  document.addEventListener("keydown", function closeOnEscape(e) {
    if (e.key === "Escape") {
      modal.classList.add("opacity-0");
      setTimeout(() => {
        modal.remove();
        document.removeEventListener("keydown", closeOnEscape);
      }, 200);
    }
  });

  document.body.appendChild(modal);
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
    const postElement = document.createElement("div");
    postElement.className =
      "post bg-white p-4 rounded shadow-md mb-4 hover:shadow-lg transition-shadow duration-200";
    postElement.innerHTML = `
      <h2 class="text-xl font-bold mb-2 text-gray-800">${post.title}</h2>
      <p class="text-gray-700 mb-3">${post.body}</p>
      <div class="text-sm text-gray-600 mb-3">
        <p>Created: ${new Date(post.created).toLocaleString()}</p>
        <p>Updated: ${new Date(post.updated).toLocaleString()}</p>
      </div>
      <button
        class="view-post-btn bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-200 ease-in-out transform hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50"
        data-post-id="${post.id}"
      >
        View Details
      </button>
    `;

    const viewButton = postElement.querySelector(".view-post-btn");
    viewButton.addEventListener("click", () => viewPost(post.id));

    postsContainer.appendChild(postElement);
  });
}
