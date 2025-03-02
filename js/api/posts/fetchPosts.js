// Import post API functions for fetching posts and single post details
import { fetchPosts, fetchPostById } from "./postsApi.js";

// Import UI functions for displaying posts and initializing the feed page
import {
  initializeFeedPage,
  displayPosts,
} from "../../ui/posts/postsDisplay.js";

// Import function for handling post detail view in modal
import { viewPostDetails } from "../../ui/posts/postDetailModal.js";

/**
 * Re-export functions for external use
 * fetchPosts - Retrieves all posts from the API
 * fetchPostById - Gets a specific post by its ID
 * initializeFeedPage - Sets up the feed page with posts
 * displayPosts - Renders posts to the UI
 * viewPostDetails - Shows detailed view of a post in modal
 */
export {
  fetchPosts,
  fetchPostById,
  initializeFeedPage,
  displayPosts,
  viewPostDetails,
};
