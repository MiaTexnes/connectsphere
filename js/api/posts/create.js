import { BASE_URL } from "../../constants/api.js";

export async function create(post) {
  // Get the access token from localStorage
  const user = JSON.parse(localStorage.getItem("user"));
  const token = user?.accessToken;

  if (!token) {
    throw new Error("Not authenticated. Please login first.");
  }

  const url = `${BASE_URL}social/posts`;

  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
      "X-Noroff-API-Key": "a8dac234-069e-437e-8cdd-e189118afca5",
    },
    body: JSON.stringify(post),
  };

  const response = await fetch(url, options);
  const json = await response.json();

  if (!response.ok) {
    throw new Error(json.errors?.[0]?.message || "Creating post failed");
  }

  return json;
}
