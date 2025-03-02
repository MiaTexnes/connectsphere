/**
 * Sets the authentication token and user data in localStorage with expiry time
 * @param {Object} userData - User data containing access token and other info
 */
export function setAuthToken(userData) {
  const expiryTime = new Date().getTime() + 30 * 60 * 1000; // 30 minutes
  const authData = {
    ...userData,
    expiryTime,
  };
  localStorage.setItem("user", JSON.stringify(authData));
}

/**
 * Retrieves the authentication token from localStorage
 * @returns {string|null} The access token if exists, null otherwise
 */
export function getAuthToken() {
  const authData = JSON.parse(localStorage.getItem("user"));
  return authData?.data?.accessToken;
}

/**
 * Gets the username of the currently logged in user
 * @returns {string|null} The username if logged in, null otherwise
 */
function getUsername() {
  const user = localStorage.getItem("user");
  if (user) {
    const userObject = JSON.parse(user);
    return userObject.data?.name;
  }
  return null;
}

/**
 * Checks if the post author matches the logged in user
 * @param {string} authorName - The name of the post author
 * @returns {boolean} True if post belongs to current user
 */
export function isUsersPost(authorName) {
  const loggedInUsername = getUsername();
  return authorName === loggedInUsername;
}

/**
 * Logs out the user by removing auth data and redirecting to login
 */
export function logout() {
  localStorage.removeItem("user");
  window.location.href = "/index.html";
}

/**
 * Checks if user is authenticated and redirects to login if not
 * @returns {boolean} True if authenticated, false otherwise
 */
export function checkAuth() {
  const token = getAuthToken();
  if (!token) {
    window.location.href = "/index.html";
    return false;
  }
  return true;
}
