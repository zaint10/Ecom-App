import { fetchAuthUserAPI, refreshTokenAPI } from "../APIs/auth";
import axiosClient from "../APIs/axiosClient";
import Cookies from "js-cookie";
import {
  ACCESS_TOKEN_KEY_NAME,
  AUTH_STATE_KEY_NAME,
  REFRESH_TOKEN_KEY_NAME,
} from "./constants";
import { jwtDecode } from "jwt-decode";

const setAuthCookies = async (accessToken, refreshToken) => {
  const decodedAccessToken = jwtDecode(accessToken);
  const decodedRefreshToken = jwtDecode(refreshToken);
  Cookies.set(ACCESS_TOKEN_KEY_NAME, accessToken, {
    expires: new Date(decodedAccessToken.exp * 1000),
  });
  Cookies.set(REFRESH_TOKEN_KEY_NAME, refreshToken, {
    expires: new Date(decodedRefreshToken.exp * 1000),
  });
  const { data: user } = await axiosClient.get("/auth/user");
  Cookies.set(AUTH_STATE_KEY_NAME, JSON.stringify(user));
};

const getAuthCookies = () => {
  return {
    access: Cookies.get(ACCESS_TOKEN_KEY_NAME),
    refresh: Cookies.get(REFRESH_TOKEN_KEY_NAME),
  };
};

export const clearAuthCookies = () => {
  Cookies.remove(ACCESS_TOKEN_KEY_NAME);
  Cookies.remove(REFRESH_TOKEN_KEY_NAME);
  Cookies.remove(AUTH_STATE_KEY_NAME);
};

const isAccessTokenExpired = (accessToken) => {
  if (!accessToken) {
    // Access token is not provided
    return true;
  }

  const decodedToken = jwtDecode(accessToken);
  // Timestamp in seconds
  const expirationTime = decodedToken.exp;
  // Converting into seconds
  const currentTime = Date.now() / 1000;

  return currentTime >= expirationTime;
};

const refreshToken = async () => {
  const authCookies = getAuthCookies();
  const { data, error } = await refreshTokenAPI(authCookies.refresh);
  if (!error) {
    await setAuthCookies(data.access, authCookies.refresh);
    return { data, error: null };
  }
  return { data: null, error };
};

const fetchAndHandleAuthenticatedUser = async () => {
  const authCookies = getAuthCookies();
  if (!authCookies.refresh) {
    throw new Error("USER_NOT_LOGGED_IN");
  }

  if (isAccessTokenExpired(authCookies.access)) {
    const { error } = await refreshToken();
    if (error) {
      throw error;
    }
  }
  const { data, error } = await fetchAuthUserAPI();
  if (error) {
    throw error;
  }

  return data;
};

export {
  isAccessTokenExpired,
  refreshToken,
  setAuthCookies,
  getAuthCookies,
  fetchAndHandleAuthenticatedUser,
};
