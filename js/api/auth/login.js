import { BASE_URL } from "../../constants/api.js";

export async function login(user) {
  const url = `${BASE_URL}auth/login`;

  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Noroff-API-Key": "a8dac234-069e-437e-8cdd-e189118afca5",
    },
    body: JSON.stringify(user),
  };

  const response = await fetch(url, options);
  const json = await response.json();

  if (!response.ok) {
    throw new Error(json.errors?.[0]?.message || "Login failed");
  }

  // Store user information in localStorage
  localStorage.setItem("user", JSON.stringify(json));

  return json;
}
