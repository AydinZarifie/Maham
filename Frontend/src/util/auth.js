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

export function getAdminType() {
  const adminType = localStorage.getItem("type");
  if (!adminType || adminType == "undefined" || adminType == "null") {
    return null;
  }
  return adminType;
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

export async function checkAuthLoader() {
  const valid = 
  // 200;
  await fetchAuthToken();
  if (valid == 200) {
    const token = getAuthToken();

    if (!token || token == "undefined" || token == "null") {
      return redirect("/loginAdmin");
    }

    return token;
  } else {
    return redirect("/loginAdmin");
  }
}

export async function checkSuperAdminLoader() {
  const adminType = getAdminType();

  if (adminType == "superadmin") {
    return adminType;
  } else if (adminType == "admin") {
    return redirect("/admin/estates");
  }
  return redirect("/loginAdmin");
}

async function fetchAuthToken() {
  const token = getAuthToken();
  const formData = new FormData();
  formData.append("token", token);
  const response = await fetch("http://localhost:5000/admin/verifyToken", {
    method: "POST",
    body: formData,
  });

  // const response  = await response.json();
  return response.status;
}
