import Axios from "axios";
import { refreshToken, getAuthCookies } from "../utils/auth";

const baseURL = import.meta.env.VITE_APP_API_URL;

export const axiosClient = Axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});

const getAuthorizationHeader = () => {
  let authCookies = getAuthCookies();
  if (authCookies.access) {
    return `Bearer ${authCookies.access}`;
  }

  return null;
};

// Request interceptor
axiosClient.interceptors.request.use(
  (req) => {
    // Modify config before sending the request
    const authHeader = getAuthorizationHeader();
    if (authHeader) {
      req.headers["Authorization"] = authHeader;
    }

    // Append a trailing slash to the URL if it doesn't already have one
    if (!req.url.endsWith("/")) {
      req.url += "/";
    }
    return req;
  },
  (error) => {
    // Handle request error
    return Promise.reject(error);
  },
);

let isRefreshing = false;
let refreshQueue = [];

// Response interceptor
axiosClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          refreshQueue.push((resolve, reject));
        })
          .then((refreshToken) => {
            originalRequest.headers.Authorization = `Bearer ${refreshToken}`;
            return axiosClient(originalRequest);
          })
          .catch((error) => {
            return Promise.reject(error);
          });
      }
    }
    isRefreshing = true;
    let newAccessToken = null;
    try {
      const { data, refreshError } = await refreshToken();
      if (refreshError) {
        throw refreshError;
      }
      newAccessToken = data.refresh;
      if (originalRequest._retry) {
        // Retry original request with new access token
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return axiosClient(originalRequest);
      }
    } catch (error) {
      // Redirect to login page or display an
      // error message saying session expred
      return Promise.reject(error);
    } finally {
      isRefreshing = false;
      refreshQueue.forEach((prom) => prom.resolve(newAccessToken));
      refreshQueue = [];
    }
    return Promise.reject(error);
  },
);

// Interceptor for customizing errors
axiosClient.interceptors.response.use(
  async (response) => response,
  (error) => {
    if (error.response) {
      // The request was made and the server responded with a status code
      const { status, statusText, data } = error.response;
      let errorMessage = `Request failed with status code ${status} (${statusText}).`;

      if (data && data.error) {
        errorMessage += `\n${data.error}`;
      }
      // Throw an error object with the constructed message
      throw { ...error, message: errorMessage };
    } else if (error.request) {
      // The request was made but no response was received
      throw { ...error, message: `Network Error: ${error.message}` };
    } else {
      // Something happened in setting up the request that triggered an error
      let errorMessage =
        "An error occurred while processing your request. Please try again later. (Error code: ERR_REQUEST_SETUP)";
      throw { ...error, message: errorMessage };
    }
  },
);

export default axiosClient;
