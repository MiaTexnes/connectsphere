/**
 * Import the base URL constant used for API endpoints
 */
import { BASE_URL } from "../../constants/api.js";

/**
 * Registers a new user with the ConnectSphere API
 * @param {Object} user - The user registration data containing:
 *   @param {string} user.name - Username (3-20 characters)
 *   @param {string} user.email - Email (must be noroff.no or stud.noroff.no domain)
 *   @param {string} user.password - Password (minimum 8 characters)
 * @returns {Promise<Object>} Response containing the new user data
 * @throws {Error} If registration fails or validation errors occur
 */
export async function register(user) {
  // Construct the complete URL for the registration endpoint
  const url = `${BASE_URL}auth/register`;

  // Configure the fetch request with method, headers and body
  const options = {
    method: "POST", // Use POST method for creating new user
    headers: {
      "Content-Type": "application/json", // Specify JSON data format
    },
    body: JSON.stringify(user), // Convert user object to JSON string
  };

  // Send the registration request and await response
  const response = await fetch(url, options);
  // Parse the JSON response
  const json = await response.json();

  // Check if the request was unsuccessful
  if (!response.ok) {
    // Throw error with API error message or fallback message
    throw new Error(json.errors?.[0]?.message || "Registration failed");
  }

  // Return the parsed response data
  return json;
}
