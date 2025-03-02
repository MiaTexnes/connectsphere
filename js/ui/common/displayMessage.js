/**
 * Displays a styled message in a specified container
 * @param {string|HTMLElement} container - CSS selector or DOM element to display the message in
 * @param {string} messageType - Type of message: "error", "success", "warning", or any other value for info
 * @param {string} message - The message text to display (can include HTML)
 * @returns {void}
 */
export function displayMessage(container, messageType, message) {
  let parent = container;

  // If a CSS selector string is provided, get the actual DOM element
  if (typeof container === "string") {
    parent = document.querySelector(container);
  }

  // Map message types to Tailwind CSS color classes
  switch (messageType) {
    case "error":
      messageType = "red";
      break;
    case "success":
      messageType = "green";
      break;
    case "warning":
      messageType = "orange";
      break;
    default:
      messageType = "blue"; // Default to blue for info messages
  }

  // Insert the message with appropriate styling into the container
  parent.innerHTML = `<div class="p-4 mb-2 border border-${messageType}-400 text-${messageType} px-4 py-3 rounded relative" role="alert">${message}</div>`;
}
