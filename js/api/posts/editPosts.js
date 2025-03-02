// Import the base URL for API endpoints
import { BASE_URL } from "../../constants/api.js";
// Import authentication utility function
import { getAuthToken } from "../../events/aut/auth.js";

/**
 * Updates an existing post in the ConnectSphere API
 * @param {string} postId - The unique identifier of the post to update
 * @param {Object} updatedData - The new data to update the post with
 * @param {string} updatedData.title - The new title for the post
 * @param {string} updatedData.body - The new content for the post
 * @param {string} [updatedData.media] - Optional new media URL for the post
 * @returns {Promise<Object>} The updated post data from the API
 * @throws {Error} If authentication fails or update is unsuccessful
 */
export async function editPost(postId, updatedData) {
  // Get the authentication token
  const token = getAuthToken();
  // Check if user is authenticated
  if (!token) {
    throw new Error("Not authenticated. Please login first.");
  }

  // Build the API endpoint URL with the post ID
  const url = `${BASE_URL}social/posts/${postId}`;
  // Set up the request configuration
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
    // Send the update request to the API
    const response = await fetch(url, options);
    const json = await response.json();

    // Check if the update was successful
    if (!response.ok) {
      throw new Error(json.errors?.[0]?.message || "Failed to update post");
    }

    // Return the updated post data
    return json;
  } catch (error) {
    console.error("Error updating post:", error);
    throw error;
  }
}
