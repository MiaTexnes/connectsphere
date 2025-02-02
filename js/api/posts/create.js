import { BASE_URL } from "../../constants/api";

export async function create(post) {
  const url = `${BASE_URL}/social/posts`;

  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(post),
  };

  const response = await fetch(url, options);
  const json = await response.json();
  console.log(response);

  if (!response.ok) {
    throw new Error(json.errors?.[0]?.message || "Fetching posts failed");
  }

  return json;

}