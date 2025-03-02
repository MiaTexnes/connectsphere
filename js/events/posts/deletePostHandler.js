// Import required functions from other modules
import { deletePost } from "../../api/posts/deletePost.js";
import { initializeFeedPage } from "../../ui/posts/postsDisplay.js";
import { displayMessage } from "../../ui/common/displayMessage.js";

/**
 * Sets up event handlers for post deletion buttons
 * @param {HTMLElement} modal - The modal containing the post
 * @description Attaches click listeners to all delete buttons and handles confirmation
 */
export function deletePostHandler(modal) {
  // Find all delete post buttons in the DOM
  const deleteBtns = document.querySelectorAll(".delete-post-btn");

  // Attach click event listener to each delete button
  deleteBtns.forEach((btn) => {
    btn.addEventListener("click", async (event) => {
      // Get the post ID from the button's data attribute
      const postId = event.target.dataset.id;
      // Show confirmation dialog to prevent accidental deletion
      const shouldDelete = confirm(
        "Are you sure you want to delete this post?"
      );

      if (shouldDelete) {
        try {
          // Call API to delete the post
          await deletePost(postId);
          // Refresh the feed page to show updated content
          await initializeFeedPage();
          // Remove the modal that contained the post
          modal.remove();
        } catch (error) {
          // Display error message if deletion fails
          displayMessage(
            "#message",
            "error",
            `Failed to delete post: ${error.message}`
          );
        }
      }
    });
  });
}
