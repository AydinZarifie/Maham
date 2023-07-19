import { getAuthToken } from "./auth";

let baseURL = "http://localhost:5000";

let originalRequest = async (url, config) => {
  url = `${baseURL}${url}`;
  let response = await fetch(url, config);
  let data = await response.json();
  console.log("REQUESTING:", data);
  return { response, data };
};

let refreshToken = async () => {
  let response = await fetch(
    "urlForRefreshToken",
    {
      method: "POST",
      mode: "cors",
      credentials: "include",
    },
    { withCredentials: true }
  );

  let data = await response.json();
  localStorage.setItem("token", data.token);
  return data;
};

const fetchInstance = async (url, config = {}) => {
  let authTokens = getAuthToken();

  config["headers"] = {
    Authorization: `Bearer ${authTokens}`,
  };

  console.log("Before Request");
  let { response, data } = await originalRequest(url, config);
  console.log("After Request");

  if (response.statusText === "Unauthorized") {
    authTokens = await refreshToken();

    config["headers"] = {
      Authorization: `Bearer ${authTokens}`,
    };

    let newResponse = await originalRequest(url, config);
    response = newResponse.response;
    data = newResponse.data;
  }

  return { response, data };
};

export default fetchInstance;
