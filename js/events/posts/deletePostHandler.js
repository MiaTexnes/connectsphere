import { deletePost } from "../../api/posts/deletePost.js";
import { initializeFeedPage } from "../../ui/posts/postsDisplay.js";
import { displayMessage } from "../../ui/common/displayMessage.js";

export function deletePostHandler() {
  const deleteBtns = document.querySelectorAll(".delete-post-btn");
  console.log("Delete buttons", deleteBtns);

  deleteBtns.forEach((btn) => {
    btn.addEventListener("click", async (event) => {
      const postId = event.target.dataset.id;
      const shouldDelete = confirm(
        "Are you sure you want to delete this post?"
      );

      if (shouldDelete) {
        try {
          await deletePost(postId);
          await initializeFeedPage();
        } catch (error) {
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
