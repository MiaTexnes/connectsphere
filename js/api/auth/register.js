// Import the BASE_URL constant from the api.js file
import { BASE_URL } from "../../constants/api.js";

// Function to register a new user
export async function register(user) {
  // Construct the URL for the registration endpoint
  const url = `${BASE_URL}auth/register`;

  // Define the options for the fetch request
  const options = {
    method: "POST", // HTTP method
    headers: {
      "Content-Type": "application/json", // Specify the content type as JSON
    },
    body: JSON.stringify(user), // Convert the user object to a JSON string
  };

  // Make the fetch request to the registration endpoint
  const response = await fetch(url, options);
  // Parse the JSON response
  const json = await response.json();
  console.log(response); // Log the response for debugging

  // Check if the response is not OK (status code is not in the range 200-299)
  if (!response.ok) {
    // Throw an error with the message from the response or a default message
    throw new Error(json.errors?.[0]?.message || "Registration failed");
  }

  // Return the parsed JSON response
  return json;
}
