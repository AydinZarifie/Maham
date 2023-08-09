import Cookies from "js-cookie";
import { redirect } from "react-router-dom";

// export function getTokenDuration() {
//   const storedExpirationDate = localStorage.getItem('expiration');
//   const expirationDate = new Date(storedExpirationDate);
//   const now = new Date();
//   const duration = expirationDate.getTime() - now.getTime();
//   return duration;
// }

export function getAuthToken() {
  // const token = localStorage.getItem("token");
  const token = Cookies.get("token");

  if (!token || token == "undefined" || token == "null") {
    return null;
  }

  return token;
}

export function getCsrfToken() {
  const csrfToken = Cookies.get("csrfToken");

  if (!csrfToken || csrfToken == "undefined" || csrfToken == "null") {
    return null;
  }

  return csrfToken;
}

// export function tokenLoader() {
//   const token = getAuthToken();
//   return token;
// }

export function checkAuthLoader() {
  // const valid = fetchAuthToken();
  // if (!valid) {
  //   return redirect("/loginAdmin");
  // }
  const token = getAuthToken();
  if (!token || token == "undefined" || token == "null") {
    return redirect("/loginAdmin");
  }

  return token;
}

// async function fetchAuthToken() {
//   const token = getAuthToken();
//   const formData = new FormData();
//   formData.append("token", token);
//   const response = await fetch("url", {
//     method: "POST",
//     body: formData,
//   });
//   return response.json();
// }
