import { redirect } from "react-router-dom";

export function getAuthToken() {
  const token = localStorage.getItem("token");

  if (!token || token == undefined || token == null) {
    return null;
  }

  return token;
}

// export function tokenLoader() {
//   const token = getAuthToken();
//   return token;
// }

export function checkAuthLoader() {
  const token = getAuthToken();
  if (!token || token == undefined || token == null) {
    return redirect("/loginAdmin");
  }

  return token;
}
