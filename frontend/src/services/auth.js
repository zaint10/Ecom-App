import { URLS } from "@services/urls";
import axiosClient from "@services/axiosClient";

export const loginAPI = async (reqData) => {
  try {
    const { data } = await axiosClient.post(URLS.login, reqData);
    return { data, error: null };
  } catch (error) {
    return { data: null, error };
  }
};

export const registerAPI = async ({
  first_name,
  last_name,
  username,
  phone,
  email,
  password1,
  password2,
}) => {
  try {
    const { data } = await axiosClient.post(URLS.register, {
      first_name,
      last_name,
      phone,
      username,
      email,
      password1,
      password2,
    });
    return { data, error: null };
  } catch (error) {
    return { data: null, error };
  }
};

export const refreshTokenAPI = async (refresh) => {
  try {
    const { data } = await axiosClient.post(URLS.tokenRefresh, {
      refresh,
    });

    return { data, error: null };
  } catch (error) {
    return { data: null, error };
  }
};

export const fetchAuthUserAPI = async () => {
  try {
    const { data } = await axiosClient.get(URLS.authUser);
    return { data, error: null };
  } catch (error) {
    return { data: null, error };
  }
};

const authAPIs = {
  loginAPI,
  registerAPI,
  refreshTokenAPI,
  fetchAuthUserAPI,
};

export default authAPIs;
