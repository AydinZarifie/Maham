import { getAuthToken } from "./auth";

let baseURL = "http://localhost:5000";

let originalRequest = async (url, config,credentials) => {
  url = `${baseURL}${url}`;
  let response = await fetch(url, config,credentials);
  let data = await response.json();
  return { response, data };
};

let refreshToken = async () => {
  let response = await fetch(
    "urlForRefreshToken",
    {
      method: "get",
      mode: "cors",
      credentials: "include",
    },
    { withCredentials: true }
  );

  let data = await response.json();
  localStorage.setItem("token", data.accessToken);
  return data;
};

const fetchInstance = async (url, config = {},credentials={}) => {
  let authTokens = getAuthToken();

  config["headers"] = {
    Authorization: `Bearer ${authTokens}`,
  };

  let { response, data } = await originalRequest(url, config,credentials);

  if (response.status === 401) {
    authTokens = await refreshToken();

    config["headers"] = {
      Authorization: `Bearer ${authTokens}`,
    };

    let newResponse = await originalRequest(url, config,credentials);
    response = newResponse.response;
    data = newResponse.data;
  }

  return { response, data };
};

export default fetchInstance;