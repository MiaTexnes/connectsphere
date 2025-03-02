// Import required dependencies and utilities
import { BASE_URL } from "../../constants/api.js";
import { getAuthToken } from "../../events/aut/auth.js";

/**
 * Deletes a post with the specified ID
 *
 * @async
 * @param {string} id - The ID of the post to delete
 * @throws {Error} If the user is not authenticated or if the deletion fails
 * @returns {Promise<void>} A promise that resolves when the post is successfully deleted
 */
export async function deletePost(id) {
  // Get authentication token from utility function
  const token = getAuthToken();

  // Check if user is authenticated
  if (!token) {
    throw new Error("Not authenticated. Please login first.");
  }

  // Construct the URL for the specific post to delete
  const url = `${BASE_URL}social/posts/${id}`;

  // Configure the DELETE request with authentication
  const options = {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
      "X-Noroff-API-Key": "a8dac234-069e-437e-8cdd-e189118afca5",
    },
  };

  // Send the delete request to the API
  const response = await fetch(url, options);

  // Handle unsuccessful deletion
  if (!response.ok) {
    throw new Error("Delete post failed");
  }
}
