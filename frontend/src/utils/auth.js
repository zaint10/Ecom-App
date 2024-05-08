// import { userAuthStore } from "../store/auth";
import axiosPrivate from "./axios";
import Cookies from "js-cookie";
import {
  ACCESS_TOKEN_KEY_NAME,
  AUTH_STATE_KEY_NAME,
  REFRESH_TOKEN_KEY_NAME,
} from "./constants";
import { jwtDecode } from "jwt-decode";

const loginAPI = async (email, username, password) => {
  try {
    const { data } = await axiosPrivate.post("/auth/login/", {
      email,
      username,
      password,
    });
    return { data, error: null };
  } catch (error) {
    return { data: null, error: error.message };
  }
};

const register = async (
  first_name,
  last_name,
  username,
  phone,
  email,
  password1,
  password2,
) => {
  try {
    const { data } = await axiosPrivate.pust("/auth/register", {
      first_name,
      last_name,
      phone,
      username,
      email,
      password1,
      password2,
    });
    await loginAPI(email, password1);
    return { data, error: null };
  } catch (error) {
    return { data: null, error: error.message };
  }
};

const setAuthCookies = async (accessToken, refreshToken) => {
  const decodedAccessToken = jwtDecode(accessToken);
  const decodedRefreshToken = jwtDecode(refreshToken);
  Cookies.set(ACCESS_TOKEN_KEY_NAME, accessToken, {
    expires: new Date(decodedAccessToken.exp * 1000),
  });
  Cookies.set(REFRESH_TOKEN_KEY_NAME, refreshToken, {
    expires: new Date(decodedRefreshToken.exp * 1000),
  });
  const { data: user } = await axiosPrivate.get("/auth/user");
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
  if (isAccessTokenExpired(authCookies.access)) {
    try {
      const { data } = await axiosPrivate.post("/auth/token/refresh/", {
        refresh: authCookies.refresh,
      });

      await setAuthCookies(data.access, authCookies.refresh);
      return data.access;
    } catch (error) {
      clearAuthCookies();
    }
  }
};

const fetchAuthUserAPI = async () => {
  try {
    const { data } = await axiosPrivate.get("/auth/user");
    return { data, error: null };
  } catch (error) {
    return { data: null, error };
  }
};

export {
  loginAPI,
  register,
  fetchAuthUserAPI,
  isAccessTokenExpired,
  refreshToken,
  setAuthCookies,
  getAuthCookies,
};
