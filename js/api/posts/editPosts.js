import { BASE_URL } from "../../constants/api.js";
import { getAuthToken } from "../../events/aut/auth.js";
import { initializeFeedPage } from "./fetchPosts.js";
import { displayMessage } from "../../ui/common/displayMessage.js";

export async function editPost(postId, updatedData) {
  const token = getAuthToken();
  if (!token) {
    throw new Error("Not authenticated. Please login first.");
  }

  const url = `${BASE_URL}social/posts/${postId}`;
  const options = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
      "X-Noroff-API-Key": "a8dac234-069e-437e-8cdd-e189118afca5",
    },
    body: JSON.stringify(updatedData),
  };

  try {
    const response = await fetch(url, options);
    const json = await response.json();

    if (!response.ok) {
      throw new Error(json.errors?.[0]?.message || "Failed to update post");
    }

    return json;
  } catch (error) {
    console.error("Error updating post:", error);
    throw error;
  }
}

export function setupEditPostHandlers() {
  const modal = document.getElementById("edit-post-modal");
  const form = document.getElementById("edit-post-form");
  const cancelBtn = document.getElementById("cancel-edit-btn");
  let currentPostId = null;

  // Function to open the edit modal
  window.openEditModal = function (post) {
    const modal = document.getElementById("edit-post-modal");
    currentPostId = post.id;

    // Set the form values with fallback to empty string if undefined
    document.getElementById("edit-title").value = post.title || "";
    document.getElementById("edit-body").value = post.body || "";

    // Show the modal using requestAnimationFrame for smooth transition
    requestAnimationFrame(() => {
      modal.classList.remove("hidden");
      modal.classList.add("flex");
    });
  };

  // Close modal function
  function closeModal() {
    // First remove flex, then add hidden
    modal.classList.remove("flex");
    modal.classList.add("hidden");

    form.reset();
    currentPostId = null;
  }

  // Cancel button handler
  if (cancelBtn) {
    cancelBtn.addEventListener("click", closeModal);
  }

  // Click outside modal to close
  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      closeModal();
    }
  });

  // Handle form submission
  if (form) {
    form.addEventListener("submit", async (e) => {
      e.preventDefault();

      const updatedData = {
        title: document.getElementById("edit-title").value,
        body: document.getElementById("edit-body").value,
      };

      try {
        await editPost(currentPostId, updatedData);
        displayMessage("#message", "success", "Post updated successfully!");
        closeModal();
        await initializeFeedPage(); // Refresh the posts list
      } catch (error) {
        displayMessage(
          "#message",
          "error",
          `Failed to update post: ${error.message}`
        );
      }
    });
  }

  // Add keyboard support for closing modal
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && !modal.classList.contains("hidden")) {
      closeModal();
    }
  });
}
