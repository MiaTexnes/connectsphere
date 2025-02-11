export function displayMessage(container, messageType, message) {
  let parent = container;

  if (typeof container === "string") {
    parent = document.querySelector(container);
  }

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
      messageType = "blue";
  }

  parent.innerHTML = `<div class="p-4 mb-2 border border-${messageType}-400 text-${messageType} px-4 py-3 rounded relative" role="alert">${message}</div>`;
}
