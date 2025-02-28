import { initializeFeedPage } from "../../ui/posts/postsDisplay.js";

// Function to sort posts
export function sortPosts(posts, criteria) {
  switch (criteria) {
    case "oldToNew":
      return posts.sort((a, b) => new Date(a.created) - new Date(b.created));
    case "newToOld":
      return posts.sort((a, b) => new Date(b.created) - new Date(a.created));
    case "aToÅ":
      return posts.sort((a, b) =>
        a.title.localeCompare(b.title, "sv", { sensitivity: "base" })
      );
    default:
      return posts;
  }
}

// Enhanced search function to include author name
export function searchPosts(posts, searchTerm) {
  if (!searchTerm) return posts;

  searchTerm = searchTerm.toLowerCase();
  return posts.filter((post) => {
    // Add null checks for title, body, and author
    const title = post.title?.toLowerCase() || "";
    const body = post.body?.toLowerCase() || "";
    const authorName = post.author?.name?.toLowerCase() || "";

    return (
      title.includes(searchTerm) ||
      body.includes(searchTerm) ||
      authorName.includes(searchTerm)
    );
  });
}

// Set up real-time search and sorting
export function setupSortHandler() {
  const sortSelect = document.getElementById("sortCriteria");
  const searchInput = document.getElementById("searchInput");
  const searchButton = document.getElementById("searchButton");

  if (sortSelect) {
    sortSelect.addEventListener("change", (event) => {
      const sortCriteria = event.target.value;
      const searchTerm = searchInput.value;
      initializeFeedPage(sortCriteria, searchTerm);
    });
  }

  // Add input event for live/dynamic search
  if (searchInput) {
    // Debounce function to avoid too many requests
    function debounce(func, timeout = 300) {
      let timer;
      return (...args) => {
        clearTimeout(timer);
        timer = setTimeout(() => {
          func.apply(this, args);
        }, timeout);
      };
    }

    // Create a debounced version of the search
    const debouncedSearch = debounce(() => {
      const searchTerm = searchInput.value;
      const sortCriteria = sortSelect.value;
      initializeFeedPage(sortCriteria, searchTerm);
    }, 300);

    // Add input event for realtime search results
    searchInput.addEventListener("input", debouncedSearch);
  }

  // Keep the button click handler
  if (searchButton) {
    searchButton.addEventListener("click", () => {
      const searchTerm = searchInput.value;
      const sortCriteria = sortSelect.value;
      initializeFeedPage(sortCriteria, searchTerm);
    });
  }

  // Keep the enter key functionality
  if (searchInput) {
    searchInput.addEventListener("keypress", (event) => {
      if (event.key === "Enter") {
        event.preventDefault(); // Prevent form submission
        const searchTerm = searchInput.value;
        const sortCriteria = sortSelect.value;
        initializeFeedPage(sortCriteria, searchTerm);
      }
    });
  }
}
