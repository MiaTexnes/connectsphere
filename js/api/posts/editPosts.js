import { BASE_URL } from "../../constants/api.js";
import { getAuthToken } from "../../events/aut/auth.js";

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
