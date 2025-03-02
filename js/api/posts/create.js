/**
 * Import base URL constant for API endpoints
 */
import { BASE_URL } from "../../constants/api.js";

/**
 * Creates a new post using the ConnectSphere API
 * @param {Object} post - The post data to be created
 * @param {string} post.title - The title of the post
 * @param {string} post.body - The content of the post
 * @param {string} [post.media] - Optional media URL for the post
 * @returns {Promise<Object>} The created post data
 * @throws {Error} If user is not authenticated or post creation fails
 */
export async function create(post) {
  // Retrieve authentication token from stored user data
  const user = JSON.parse(localStorage.getItem("user"));
  const token = user?.data?.accessToken;

  // Verify user is authenticated before proceeding
  if (!token) {
    throw new Error("Not authenticated. Please login first.");
  }

  // Build the API endpoint URL for post creation
  const url = `${BASE_URL}social/posts`;

  // Configure the API request with authentication and post data
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
      "X-Noroff-API-Key": "a8dac234-069e-437e-8cdd-e189118afca5",
    },
    body: JSON.stringify(post),
  };

  // Send the create post request and get response
  const response = await fetch(url, options);
  const json = await response.json();

  // Handle unsuccessful post creation
  if (!response.ok) {
    throw new Error(json.errors?.[0]?.message || "Creating post failed");
  }

  // Return the newly created post data
  return json;
}
