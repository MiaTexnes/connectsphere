// Import required functions for fetching, filtering, and displaying posts
import { fetchPosts } from "../../api/posts/postsApi.js";
import { sortPosts, searchPosts } from "../../api/posts/sortSearch.js";
import filterPostsHandler from "../../events/posts/filterPostsHandler.js";
import { viewPostDetails } from "./postDetailModal.js";
import { isUsersPost } from "../../events/aut/auth.js";
import { deletePost } from "../../api/posts/deletePost.js";
import { displayMessage } from "../common/displayMessage.js";

// Store all posts and current page in module-level variables
let allPosts = [];
let currentPage = 0;
const postsPerPage = 12;

/**
 * Initializes the feed page with posts, sorting and filtering as needed
 * @param {string} sortCriteria - How to sort posts ("newToOld", "oldToNew", "aToÅ")
 * @param {string} searchTerm - Optional search term to filter posts
 * @returns {Promise<void>}
 */
export async function initializeFeedPage(
  sortCriteria = "newToOld",
  searchTerm = ""
) {
  try {
    // Reset pagination on initialization
    currentPage = 0;

    // Fetch all posts from the API
    const posts = await fetchPosts();

    // Store all posts for sorting and filtering
    allPosts = posts.data;

    // Apply sorting based on the provided criteria
    let sortedPosts = allPosts;
    if (sortCriteria) {
      sortedPosts = sortPosts(allPosts, sortCriteria);
    }

    // Apply search filtering if provided
    let filteredPosts = sortedPosts;
    if (searchTerm) {
      filteredPosts = searchPosts(sortedPosts, searchTerm);
    }

    // Display the processed posts
    const postsForDisplay = { data: filteredPosts };
    displayPosts(postsForDisplay, true);

    // Set up filter by author functionality
    filterPostsHandler(filteredPosts);
  } catch (error) {
    console.error("Error initializing feed page:", error);
  }
}

/**
 * Displays posts with pagination support
 * @param {Object} posts - Object containing array of posts in data property
 * @param {boolean} reset - Whether to reset pagination or append to existing posts
 * @returns {void}
 */
export function displayPosts(posts, reset = false) {
  const postsContainer = document.getElementById("posts-container");

  // Clear posts container if resetting pagination
  if (reset) {
    postsContainer.innerHTML = "";
    // Remove any existing load more button
    const existingButton = document.getElementById("load-more-btn");
    if (existingButton) {
      existingButton.remove();
    }
  }

  // Validate posts data structure
  if (!posts || !Array.isArray(posts.data)) {
    return;
  }

  // Display message when no posts match the criteria
  if (posts.data.length === 0) {
    postsContainer.innerHTML = `
      <div class="text-center text-gray-500 py-4">
        No posts found matching your search criteria
      </div>
    `;
    return;
  }

  // Make container wider on larger screens while maintaining 3 columns
  postsContainer.className =
    "grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mx-auto max-w-7xl overflow-x-hidden px-4 lg:px-0";

  // Get the subset of posts for the current page
  const startIndex = currentPage * postsPerPage;
  const endIndex = Math.min(startIndex + postsPerPage, posts.data.length);
  const currentPagePosts = posts.data.slice(startIndex, endIndex);

  // Display the posts for the current page
  currentPagePosts.forEach((post) => {
    const { title, body, created, updated, author, media, id } = post;
    const { name: authorName } = author;

    // Set up image with fallbacks
    let imageUrl = "/assets/images/noImage.jpg";
    let imageAlt = title;

    if (media) {
      imageUrl = media.url;
      imageAlt = media.alt;
    }

    // Check if current user is the post author
    const isOwnPost = isUsersPost(authorName);

    // Create post element container
    const postElement = document.createElement("div");
    postElement.className =
      "post bg-white p-4 rounded shadow-md hover:shadow-lg transition-shadow duration-200 flex flex-col h-[600px] w-full";

    // Generate HTML structure for the post card with admin buttons for own posts
    postElement.innerHTML = `
    <div class="mb-4 flex items-start justify-between">
      <div class="flex items-start">
        <img
          src="${author?.avatar?.url || "../assets/images/2.png"}"
          alt="${author?.name || "Unknown"}'s avatar"
          class="w-12 h-12 rounded-full mr-4 flex-shrink-0"
        />
        <div class="flex-1 min-w-0">
          <h2 class="text-xl font-bold mb-1 text-gray-800 line-clamp-2">${title}</h2>
          <p class="text-sm text-gray-600 truncate">By ${authorName}</p>
        </div>
      </div>
      ${
        isOwnPost
          ? `
        <div class="flex space-x-1">
          <a href="/feed/edit.html?id=${id}"
             class="bg-blue-500 hover:bg-blue-700 text-white text-xs font-bold py-1 px-2 rounded transition duration-200">
            Edit
          </a>
          <button
             data-id="${id}"
             class="delete-post-btn bg-red-500 hover:bg-red-700 text-white text-xs font-bold py-1 px-2 rounded transition duration-200">
            Delete
          </button>
        </div>
      `
          : ""
      }
    </div>
    <div class="flex-1 overflow-hidden">
      <div class="h-[300px] mb-3">
        <img
          src="${imageUrl}"
          alt="${imageAlt}"
          class="w-full h-full object-contain rounded"
          onerror="this.src='/assets/images/noImage.jpg'"
        >
      </div>

      <div class="h-[100px] overflow-y-auto mb-3">
        <p class="text-gray-700">${body}</p>
      </div>
    </div>

    <div class="mt-auto">
      <div class="text-sm text-gray-600 mb-3">
        <p>Created: ${new Date(created).toLocaleString()}</p>
        <p>Updated: ${new Date(updated).toLocaleString()}</p>
      </div>
      <div class="flex space-x-2">
        <button
          class="view-post-btn bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-200 ease-in-out transform hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50 w-full"
          data-post-id="${id}"
        >
          View Details
        </button>
      </div>
    </div>
    `;

    // Add event listener for view details button
    const viewButton = postElement.querySelector(".view-post-btn");
    viewButton.addEventListener("click", () => viewPostDetails(id));

    // Add event listener for delete button if it exists
    const deleteButton = postElement.querySelector(".delete-post-btn");
    if (deleteButton) {
      deleteButton.addEventListener("click", async (event) => {
        event.stopPropagation();
        const postId = event.target.dataset.id;
        const shouldDelete = confirm(
          "Are you sure you want to delete this post?"
        );

        if (shouldDelete) {
          try {
            await deletePost(postId);
            displayMessage("#message", "success", "Post deleted successfully!");
            // Refresh posts after deletion
            setTimeout(() => {
              initializeFeedPage();
            }, 1000);
          } catch (error) {
            displayMessage(
              "#message",
              "error",
              `Failed to delete post: ${error.message}`
            );
          }
        }
      });
    }

    // Add the post card to the container
    postsContainer.appendChild(postElement);
  });

  // Add Load More button if there are more posts to load
  if (endIndex < posts.data.length) {
    // Remove existing load more button if it exists
    const existingButton = document.getElementById("load-more-btn");
    if (existingButton) {
      existingButton.remove();
    }

    // Create a container for the button to span all columns
    const buttonContainer = document.createElement("div");
    buttonContainer.className =
      "col-span-1 md:col-span-2 lg:col-span-3 flex justify-center mt-6 mb-8";

    // Create and configure the Load More button
    const loadMoreButton = document.createElement("button");
    loadMoreButton.id = "load-more-btn";
    loadMoreButton.className =
      "bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition duration-200 ease-in-out transform hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50 mx-auto";
    loadMoreButton.textContent = `Load More Posts (${
      posts.data.length - endIndex
    } remaining)`;

    // Set up event listener for pagination
    loadMoreButton.addEventListener("click", () => {
      currentPage++;
      displayPosts(posts); // No reset, append more posts
    });

    // Add button to container
    buttonContainer.appendChild(loadMoreButton);

    // Add the button container after the grid
    const postsSection = postsContainer.parentNode;
    postsSection.appendChild(buttonContainer);
  }
}
