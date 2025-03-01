import { BASE_URL } from "../../constants/api.js";
import { getAuthToken } from "../../events/aut/auth.js";

/**
 * Deletes a post with the specified ID
 *
 * @async
 * @param {string} id - The ID of the post to delete
 * @throws {Error} If the user is not authenticated or if the deletion fails
 * @returns {Promise<void>} A promise that resolves when the post is successfully deleted
 * @example
 * try {
 *   await deletePost('123');
 *   console.log('Post deleted successfully');
 * } catch (error) {
 *   console.error('Failed to delete post:', error.message);
 * }
 */
export async function deletePost(id) {
  const token = getAuthToken();
  if (!token) {
    throw new Error("Not authenticated. Please login first.");
  }

  const url = `${BASE_URL}social/posts/${id}`;

  const options = {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
      "X-Noroff-API-Key": "a8dac234-069e-437e-8cdd-e189118afca5",
    },
  };

  const response = await fetch(url, options);

  if (!response.ok) {
    throw new Error("Delete post failed");
  }
}
