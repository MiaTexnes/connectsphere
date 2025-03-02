import { displayPosts } from "../../ui/posts/postsDisplay.js";

/**
 * Sets up an event listener on the filter input to filter posts by author name.
 *
 * @param {Array} posts - An array of post objects, each containing an author object with a name property.
 * @returns {void} - This function doesn't return anything; it sets up the event listener.
 *
 * @example
 * // Assuming posts is an array of post objects:
 * // [{ author: { name: "John Doe" }, title: "Post 1" }, ...]
 * filterPostsHandler(posts);
 *
 * @description
 * This function adds an input event listener to the element with ID "filterByAuthor".
 * When the user types in the input field, it filters the posts array for posts whose
 * author names include the input text (case-insensitive) and passes the filtered posts
 * to the displayPosts function.
 */
export default function filterPostsHandler(posts) {
  const filterInput = document.getElementById("filterByAuthor");

  filterInput.addEventListener("input", function (event) {
    const filterTerm = event.target.value.toLowerCase();

    const filterPosts = posts.filter((post) => {
      const authorName = post.author.name.toLowerCase();
      return authorName.includes(filterTerm);
    });

    const postsData = {
      data: filterPosts,
    };

    displayPosts(postsData, true);
  });
}
