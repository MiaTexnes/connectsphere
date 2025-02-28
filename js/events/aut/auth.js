export function setAuthToken(userData) {
  const expiryTime = new Date().getTime() + 30 * 60 * 1000; // 30 minutes
  const authData = {
    ...userData,
    expiryTime,
  };
  localStorage.setItem("user", JSON.stringify(authData));
}

export function getAuthToken() {
  const authData = JSON.parse(localStorage.getItem("user"));

  return authData?.data?.accessToken;
}

function getUsername() {
  const user = localStorage.getItem("user");
  if (user) {
    const userObject = JSON.parse(user);
    return userObject.data?.name;
  }
  return null;
}

export function isUsersPost(authorName) {
  console.log("Author name:", authorName);

  const loggedInUsername = getUsername();
  console.log("loggedInUsername", loggedInUsername);
  return authorName === loggedInUsername;
}

export function logout() {
  localStorage.removeItem("user");
  window.location.href = "/index.html";
}

export function checkAuth() {
  const token = getAuthToken();
  if (!token) {
    window.location.href = "/index.html";
    return false;
  }
  return true;
}

// export function setAuthToken(userData) {
//   const expiryTime = new Date().getTime() + 30 * 60 * 1000; // 30 minutes
//   const authData = {
//     ...userData,
//     expiryTime,
//   };
//   localStorage.setItem("user", JSON.stringify(authData));
// }

// export function getAuthToken() {
//   const authData = JSON.parse(localStorage.getItem("user"));
//   if (!authData) return null;

//   // Check if token has expired
//   if (new Date().getTime() > authData.expiryTime) {
//     logout();
//     return null;
//   }

//   return authData.accessToken;
// }

// export function logout() {
//   localStorage.removeItem("user");
//   window.location.href = "/index.html";
// }

// export function checkAuth() {
//   const token = getAuthToken();
//   if (!token) {
//     window.location.href = "/index.html";
//     return false;
//   }
//   return true;
// }
