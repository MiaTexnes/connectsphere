// Import required functions from other modules
import { displayPosts } from "../../ui/posts/postsDisplay.js";
import { searchPostsByQuery, fetchPosts } from "../../api/posts/postsApi.js";

/**
 * Sort an array of posts based on specified criteria
 * @param {Array} posts - Array of post objects
 * @param {string} criteria - Sorting criteria ('newToOld', 'oldToNew', 'aToÅ')
 * @returns {Array} - Sorted array of posts
 */
export function sortPosts(posts, criteria) {
  // Validate input is an array
  if (!Array.isArray(posts)) {
    console.error("sortPosts received invalid posts data:", posts);
    return [];
  }

  // Create a copy to avoid mutating the original array
  const sortedPosts = [...posts];

  // Sort posts based on criteria
  switch (criteria) {
    case "oldToNew":
      return sortedPosts.sort(
        (a, b) => new Date(a.created) - new Date(b.created)
      );
    case "newToOld":
      return sortedPosts.sort(
        (a, b) => new Date(b.created) - new Date(a.created)
      );
    case "aToÅ":
      return sortedPosts.sort((a, b) => {
        // Handle null or undefined titles
        const titleA = a.title || "";
        const titleB = b.title || "";
        return titleA.localeCompare(titleB, "sv", { sensitivity: "base" });
      });
    default:
      return sortedPosts;
  }
}

/**
 * Filter posts based on search term
 * @param {Array} posts - Array of post objects
 * @param {string} searchTerm - Term to search for
 * @returns {Array} - Filtered array of posts
 */
export function searchPosts(posts, searchTerm) {
  // Validate input is an array
  if (!Array.isArray(posts)) {
    console.error("searchPosts received invalid posts data:", posts);
    return [];
  }

  // Return all posts if no search term
  if (!searchTerm || searchTerm.trim() === "") return posts;

  // Normalize search term
  searchTerm = searchTerm.toLowerCase().trim();

  // Filter posts based on search term
  return posts.filter((post) => {
    if (!post) return false;

    // Extract searchable content with null checks
    const title = post.title?.toLowerCase() || "";
    const body = post.body?.toLowerCase() || "";
    const authorName = post.author?.name?.toLowerCase() || "";
    const tags = Array.isArray(post.tags)
      ? post.tags.join(" ").toLowerCase()
      : "";

    // Return true if search term is found in any field
    return (
      title.includes(searchTerm) ||
      body.includes(searchTerm) ||
      authorName.includes(searchTerm) ||
      tags.includes(searchTerm)
    );
  });
}

/**
 * Creates a debounced function that delays invoking func until after wait milliseconds
 * @param {Function} func - Function to debounce
 * @param {number} wait - Milliseconds to delay
 * @returns {Function} - Debounced function
 */
function debounce(func, wait = 300) {
  let timeout;

  // Return wrapped function with debounce logic
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };

    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

/**
 * Set up event handlers for sorting and searching
 */
export function setupSortHandler() {
  // Get search input element
  const searchInput = document.getElementById("searchInput");

  // Exit if required elements aren't found
  if (!searchInput) {
    console.warn("Sort or search elements not found in the document");
    return;
  }

  // Function to handle search functionality
  const performSearch = async () => {
    const searchTerm = searchInput.value.trim();
    let posts;

    // Fetch posts based on search term
    if (searchTerm !== "") {
      posts = await searchPostsByQuery(searchTerm);
    } else {
      posts = await fetchPosts(searchTerm);
    }

    // Display the filtered posts
    displayPosts(posts, true);
  };

  // Create a debounced version of the search
  const debouncedSearch = debounce(performSearch, 300);

  // Add input event listener with debounced search
  searchInput.addEventListener("input", debouncedSearch);
}
