// Import required functions for fetching post data and populating form
import { fetchPostById } from "../../api/posts/fetchPosts.js";
import { populateEditForm } from "./populateEditForm.js";

/**
 * Handles setting up the edit post form with existing post data
 * Fetches post data from API and pre-fills form fields
 * @async
 * @returns {Promise<void>}
 */
export async function editPostHandler() {
  // Extract post ID from URL query parameters
  const params = new URLSearchParams(window.location.search);
  const postId = params.get("id");

  // Retrieve post data from API using the extracted ID
  const post = await fetchPostById(postId);

  // Fill the edit form with the post's existing content
  populateEditForm(post.data);

  // Note: Form submission is handled separately
}
