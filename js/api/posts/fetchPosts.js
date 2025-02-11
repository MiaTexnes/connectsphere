import { BASE_URL } from "../../constants/api.js";

// Options for the fetch request
const options = {
  headers: {
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoibWlhdGV4bmVzIiwiZW1haWwiOiJtaWF0ZXhuZXNAbm9yb2ZmLm5vIiwiaWF0IjoxNzM4NTA1NTQzfQ.ii_i4vNlxW_OozOjJnUl4LIs3W1pD-457LPi22OOzY4",
    "X-Noroff-API-Key": "a8dac234-069e-437e-8cdd-e189118afca5",
  },
};

// Function to fetch all posts
export async function fetchPosts() {
  const url = `${BASE_URL}social/posts`;

  const response = await fetch(url, options);
  const json = await response.json();
  console.log(response);

  if (!response.ok) {
    throw new Error(json.errors?.[0]?.message || "Fetching posts failed");
  }

  return json;
}
