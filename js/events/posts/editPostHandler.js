import { fetchPostById } from "../../api/posts/fetchPosts.js";
import { populateEditForm } from "./populateEditForm.js";

export async function editPostHandler() {
  // get id from query params
  const params = new URLSearchParams(window.location.search);
  const postId = params.get("id");

  // get the post by id
  const post = await fetchPostById(postId);
  console.log(post);

  populateEditForm(post.data);

  // populate the form with the post data
  // add a submit event listener to the form
}
