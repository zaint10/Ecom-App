import axios from "axios";
import { refreshToken, isAccessTokenExpired, getAuthCookies } from "./auth";

const baseURL = import.meta.env.VITE_APP_API_URL;

const getAuthorizationHeader = () => {
  let authCookies = getAuthCookies();
  if (authCookies.access || !isAccessTokenExpired(authCookies.access)) {
    return `Bearer ${authCookies.access}`;
  }

  return null;
};

const createAxiosPrivate = () => {
  const customAxios = axios.create({
    baseURL,
    headers: {
      "Content-Type": "application/json",
    },
  });

  // Interceptor for adding trailing slashes to urls
  customAxios.interceptors.request.use(
    (config) => {
      // Append a trailing slash to the URL if it doesn't already have one
      if (!config.url.endsWith("/")) {
        config.url += "/";
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    },
  );

  // Request interceptor for attaching auth headers
  customAxios.interceptors.request.use(async (req) => {
    const authHeader = getAuthorizationHeader();
    if (authHeader) {
      req.headers.Authorization = authHeader;
    }
    return req;
  });

  // Response interceptor for handling refreshing tokens
  customAxios.interceptors.response.use(
    async (response) => response,
    async (error) => {
      const originalRequest = error.config;
      if (error.response.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;
        const authCookies = getAuthCookies();
        if (authCookies.refresh) {
          const newAccessToken = await refreshToken();
          if (newAccessToken) {
            originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
            return customAxios(originalRequest);
          } else {
            window.location.href = "/login";
            return Promise.reject(error);
          }
        }
      }

      return Promise.reject(error);
    },
  );

  // Interceptor for customizing errors
  customAxios.interceptors.response.use(
    async (response) => response,
    (error) => {
      // Construct error message
      let errorMessage = "An error occurred";
      const { code } = error;
      if (error.response) {
        // The request was made and the server responded with a status code
        errorMessage = `${code}: Request failed with status code ${error.response.status}(${error.response.statusText})`;
        if (error.response.data) {
          let serverMessage = "";
          if (error.response.data.error) {
            serverMessage = error.response.data.error;
          }

          if (serverMessage) {
            errorMessage += `\n${serverMessage}`;
          }
        }
      } else if (error.request) {
        // The request was made but no response was received
        errorMessage = `${code}: ${error.message}`;
      } else {
        // Something happened in setting up the request that triggered an error
        errorMessage =
          "ERR_CLIENT: Error occurred while processing the request";
      }

      // Create a new error object with the constructed message
      const newError = {
        ...error,
        message: errorMessage,
      };

      // Throw the new error object
      throw newError;
    },
  );

  return customAxios;
};

export default createAxiosPrivate();
