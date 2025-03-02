/**
 * Import base URL for API endpoints
 */
import { BASE_URL } from "../../constants/api.js";

/**
 * Authenticates a user with the API
 * @param {Object} user - The user credentials
 * @param {string} user.email - User's email address
 * @param {string} user.password - User's password
 * @returns {Promise<Object>} The authenticated user data
 * @throws {Error} If the login request fails
 */
export async function login(user) {
  // Construct the login endpoint URL
  const url = `${BASE_URL}auth/login`;

  // Configure the API request options
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Noroff-API-Key": "a8dac234-069e-437e-8cdd-e189118afca5",
    },
    body: JSON.stringify(user),
  };

  // Send the login request to the API
  const response = await fetch(url, options);
  const json = await response.json();

  // Check if the request was successful
  if (!response.ok) {
    // Extract error message from response or use default message
    throw new Error(json.errors?.[0]?.message || "Login failed");
  }

  // Store authenticated user data in localStorage for persistence
  localStorage.setItem("user", JSON.stringify(json));

  // Return the authenticated user data
  return json;
}
