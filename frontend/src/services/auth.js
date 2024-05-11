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

export const forgotPasswordAPI = async (reqData) => {
  try {
    const { data } = await axiosClient.post(URLS.resetPassword, reqData);
    return { data, error: null };
  } catch (error) {
    return { data: null, error };
  }
};

export const resetPasswordConfirmAPI = async (reqData) => {
  try {
    const { data } = await axiosClient.post(URLS.resetPasswordConfirm, reqData);
    return { data, error: null };
  } catch (error) {
    return { data: null, error };
  }
};

export const verifyResetTokenAPI = async (reqData) => {
  try {
    const { data } = await axiosClient.post(URLS.verifyResetToken, reqData);
    return { data, error: null };
  } catch (error) {
    return { data: null, error };
  }
};

export const changePasswordAPI = async (reqData) => {
  try {
    const { data } = await axiosClient.post(URLS.changePassword, reqData);
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
  forgotPasswordAPI,
  resetPasswordConfirmAPI,
  verifyResetTokenAPI,
  changePasswordAPI,
};

export default authAPIs;
