// Import functions needed for updating posts and displaying feedback
import { editPost } from "../../api/posts/editPosts.js";
import { displayMessage } from "../../ui/common/displayMessage.js";

/**
 * Populates a form with existing post data and handles the update submission
 * @param {Object} post - The post object containing data to populate the form
 * @param {string} post.id - Unique identifier for the post
 * @param {string} post.title - Title of the post
 * @param {string} post.body - Content of the post
 * @param {Object} [post.media] - Optional media information for the post
 * @param {string} [post.media.url] - URL of the post image
 * @param {string} [post.media.alt] - Alt text for the post image
 */
export function populateEditForm(post) {
  // Destructure post properties for easier access
  const { title, body, media, id } = post;

  // Get the edit post form element from the DOM
  const form = document.getElementById("edit-post-form");

  // Fill form fields with existing post data, using empty strings for missing values
  form.title.value = title || "";
  form.content.value = body || "";

  // Handle media fields which may be undefined
  form.imageUrl.value = media?.url || "";
  form.imageAlt.value = media?.alt || "";
  form.id.value = id || "";

  // Set up submission handler for the edit form
  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    // Get form data from the submitted form
    const form = event.target;
    const formData = new FormData(form);

    // Extract core post data from form
    const id = formData.get("id");
    const title = formData.get("title");
    const body = formData.get("content");

    // Create base post object with required fields
    const post = {
      title,
      body,
    };

    // Handle optional media fields if present
    const imageUrl = formData.get("imageUrl");
    let imageAlt = formData.get("imageAlt");

    // Only add media if URL is provided
    if (imageUrl.trim() !== "") {
      // If alt text is missing, use title as fallback
      if (imageAlt.trim() === "") {
        imageAlt = title;
      }

      // Add media object to post data
      post.media = {
        url: imageUrl,
        alt: imageAlt,
      };
    }

    try {
      // Send updated post data to API
      await editPost(id, post);
      // Show success message to user
      displayMessage("#message", "success", "Post updated successfully!");

      // Redirect to the feed page after successful update
      setTimeout(() => {
        window.location.href = "/feed/index.html";
      }, 2000); // Delay for 2 seconds to show the success message
    } catch (error) {
      // Display error message if update fails
      displayMessage(
        "#message",
        "error",
        `Failed to update post: ${error.message}`
      );
    }
  });
}
