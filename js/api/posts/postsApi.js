// Import the base URL for API endpoints
import { BASE_URL } from "../../constants/api.js";

// Default request options with authentication headers
const options = {
  headers: {
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoibWlhdGV4bmVzIiwiZW1haWwiOiJtaWF0ZXhuZXNAbm9yb2ZmLm5vIiwiaWF0IjoxNzM4NTA1NTQzfQ.ii_i4vNlxW_OozOjJnUl4LIs3W1pD-457LPi22OOzY4",
    "X-Noroff-API-Key": "a8dac234-069e-437e-8cdd-e189118afca5",
  },
};

/**
 * Fetches all posts from the ConnectSphere API
 * @async
 * @returns {Promise<Object>} Response containing array of posts with author details
 * @throws {Error} If the fetch request fails or returns an error
 */
export async function fetchPosts() {
  const url = `${BASE_URL}social/posts?_author=true`;

  const response = await fetch(url, options);
  const json = await response.json();

  if (!response.ok) {
    throw new Error(json.errors?.[0]?.message || "Fetching posts failed");
  }

  return json;
}

/**
 * Fetches a specific post by its ID
 * @async
 * @param {string} postId - The ID of the post to fetch
 * @returns {Promise<Object>} Response containing the post data with author details
 * @throws {Error} If the fetch request fails or post is not found
 */
export async function fetchPostById(postId) {
  const url = `${BASE_URL}social/posts/${postId}?_author=true`;

  const response = await fetch(url, options);
  const json = await response.json();

  if (!response.ok) {
    throw new Error(json.errors?.[0]?.message || "Fetching post failed");
  }

  return json;
}

/**
 * Searches posts using a query string
 * @async
 * @param {string} query - The search query to filter posts
 * @returns {Promise<Object>} Response containing filtered posts with author details
 * @throws {Error} If the search request fails
 */
export async function searchPostsByQuery(query) {
  const url = `${BASE_URL}social/posts/search?_author=true&q=${query}`;

  const response = await fetch(url, options);
  const json = await response.json();

  if (!response.ok) {
    throw new Error(json.errors?.[0]?.message || "Searching posts failed");
  }

  return json;
}
