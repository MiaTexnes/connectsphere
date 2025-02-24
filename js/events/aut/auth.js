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
  if (!authData) return null;

  // Check if token has expired
  if (new Date().getTime() > authData.expiryTime) {
    logout();
    return null;
  }

  return authData.accessToken;
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
