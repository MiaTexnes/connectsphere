import { initializeFeedPage } from "../../ui/posts/postsDisplay.js";

/**
 * Sort an array of posts based on specified criteria
 * @param {Array} posts - Array of post objects
 * @param {string} criteria - Sorting criteria ('newToOld', 'oldToNew', 'aToÅ')
 * @returns {Array} - Sorted array of posts
 */
export function sortPosts(posts, criteria) {
  if (!Array.isArray(posts)) {
    console.error("sortPosts received invalid posts data:", posts);
    return [];
  }

  const sortedPosts = [...posts]; // Create a copy to avoid mutating the original array

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
  if (!Array.isArray(posts)) {
    console.error("searchPosts received invalid posts data:", posts);
    return [];
  }

  if (!searchTerm || searchTerm.trim() === "") return posts;

  searchTerm = searchTerm.toLowerCase().trim();

  return posts.filter((post) => {
    if (!post) return false;

    // Add null checks for title, body, and author
    const title = post.title?.toLowerCase() || "";
    const body = post.body?.toLowerCase() || "";
    const authorName = post.author?.name?.toLowerCase() || "";
    const tags = Array.isArray(post.tags)
      ? post.tags.join(" ").toLowerCase()
      : "";

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
  const sortSelect = document.getElementById("sortCriteria");
  const searchInput = document.getElementById("searchInput");
  const searchButton = document.getElementById("searchButton");

  // Exit if required elements aren't found
  if (!sortSelect || !searchInput) {
    console.warn("Sort or search elements not found in the document");
    return;
  }

  // Function to perform search and sort
  const performSearchAndSort = () => {
    const searchTerm = searchInput.value.trim();
    const sortCriteria = sortSelect.value;
    initializeFeedPage(sortCriteria, searchTerm);
  };

  // Create a debounced version of the search
  const debouncedSearch = debounce(performSearchAndSort, 300);

  // Set up event listeners
  sortSelect.addEventListener("change", performSearchAndSort);
  searchInput.addEventListener("input", debouncedSearch);

  if (searchButton) {
    searchButton.addEventListener("click", performSearchAndSort);
  }

  searchInput.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
      event.preventDefault(); // Prevent form submission
      performSearchAndSort();
    }
  });
}

// import { initializeFeedPage } from "../../ui/posts/postsDisplay.js";

// // Function to sort posts
// export function sortPosts(posts, criteria) {
//   switch (criteria) {
//     case "oldToNew":
//       return posts.sort((a, b) => new Date(a.created) - new Date(b.created));
//     case "newToOld":
//       return posts.sort((a, b) => new Date(b.created) - new Date(a.created));
//     case "aToÅ":
//       return posts.sort((a, b) =>
//         a.title.localeCompare(b.title, "sv", { sensitivity: "base" })
//       );
//     default:
//       return posts;
//   }
// }

// // Enhanced search function to include author name
// export function searchPosts(posts, searchTerm) {
//   if (!searchTerm) return posts;

//   searchTerm = searchTerm.toLowerCase();
//   return posts.filter((post) => {
//     // Add null checks for title, body, and author
//     const title = post.title?.toLowerCase() || "";
//     const body = post.body?.toLowerCase() || "";
//     const authorName = post.author?.name?.toLowerCase() || "";

//     return (
//       title.includes(searchTerm) ||
//       body.includes(searchTerm) ||
//       authorName.includes(searchTerm)
//     );
//   });
// }

// // Set up real-time search and sorting
// export function setupSortHandler() {
//   const sortSelect = document.getElementById("sortCriteria");
//   const searchInput = document.getElementById("searchInput");
//   const searchButton = document.getElementById("searchButton");

//   if (sortSelect) {
//     sortSelect.addEventListener("change", (event) => {
//       const sortCriteria = event.target.value;
//       const searchTerm = searchInput.value;
//       initializeFeedPage(sortCriteria, searchTerm);
//     });
//   }

//   // Add input event for live/dynamic search
//   if (searchInput) {
//     // Debounce function to avoid too many requests
//     function debounce(func, timeout = 300) {
//       let timer;
//       return (...args) => {
//         clearTimeout(timer);
//         timer = setTimeout(() => {
//           func.apply(this, args);
//         }, timeout);
//       };
//     }

//     // Create a debounced version of the search
//     const debouncedSearch = debounce(() => {
//       const searchTerm = searchInput.value;
//       const sortCriteria = sortSelect.value;
//       initializeFeedPage(sortCriteria, searchTerm);
//     }, 300);

//     // Add input event for realtime search results
//     searchInput.addEventListener("input", debouncedSearch);
//   }

//   // Keep the button click handler
//   if (searchButton) {
//     searchButton.addEventListener("click", () => {
//       const searchTerm = searchInput.value;
//       const sortCriteria = sortSelect.value;
//       initializeFeedPage(sortCriteria, searchTerm);
//     });
//   }

//   // Keep the enter key functionality
//   if (searchInput) {
//     searchInput.addEventListener("keypress", (event) => {
//       if (event.key === "Enter") {
//         event.preventDefault(); // Prevent form submission
//         const searchTerm = searchInput.value;
//         const sortCriteria = sortSelect.value;
//         initializeFeedPage(sortCriteria, searchTerm);
//       }
//     });
//   }
// }
