import { initializeFeedPage } from "./fetchPosts.js";

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

// Function to search posts in sort.js
export function searchPosts(posts, searchTerm) {
  if (!searchTerm) return posts;

  searchTerm = searchTerm.toLowerCase();
  return posts.filter((post) => {
    // Add null checks for title and body
    const title = post.title?.toLowerCase() || "";
    const body = post.body?.toLowerCase() || "";

    return title.includes(searchTerm) || body.includes(searchTerm);
  });
}

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

  // Add search button click handler
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
