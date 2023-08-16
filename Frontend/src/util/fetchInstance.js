import Cookies from "js-cookie";
import { getAuthToken, getCsrfToken } from "./auth";

let baseURL = "http://localhost:5000";

let originalRequest = async (url, config, credentials) => {
  url = `${baseURL}${url}`;
  let response = await fetch(url, config, credentials);
  let data = await response.json();
  return { response, data };
};

let refreshToken = async () => {
  let response = await fetch(
    "http://localhost:5000/admin/auth/refresh",
    {
      method: "get",
      mode: "cors",
      credentials: "include",
    },
    { withCredentials: true }
  );

  let data = await response.json();
  // localStorage.setItem("token", data.accessToken);
  Cookies.set("token", data.accessToken);
  return data.accessToken;
};

const fetchInstance = async (url, config = {}, credentials = {}) => {
  let authTokens = getAuthToken();
  let csrfToken = getCsrfToken();

  console.log(csrfToken);

  config["headers"] = {
    Authorization: `Bearer ${authTokens}`,
    // 'X-CSRF-Token': csrfToken,
  };

  let { response, data } = await originalRequest(url, config, credentials);

  if (response.status === 403) {
    authTokens = await refreshToken();

    config["headers"] = {
      Authorization: `Bearer ${authTokens}`,
      // 'X-CSRF-Token': csrfToken,
    };

    let newResponse = await originalRequest(url, config, credentials);
    response = newResponse.response;
    data = newResponse.data;
  }

  return { response, data };
};

export default fetchInstance;
