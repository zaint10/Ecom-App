import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import useSignIn from "react-auth-kit/hooks/useSignIn";
import useSignOut from "react-auth-kit/hooks/useSignOut";
// import styled from "@emotion/styled";
import LoginForm from "../components/Login/LoginForm";
import apiService from "../api";

const LoginPage = () => {
  const signIn = useSignIn();
  const signOut = useSignOut();
  const navigate = useNavigate();

  useEffect(() => {
    signOut();
  }, [signOut]);

  const handleLogin = async (email, username, password) => {
    try {
      const response = await apiService.post("/auth/login/", {
        email,
        username,
        password,
      });

      signIn({
        auth: {
          token: response.data.access,
          type: "Bearer",
        },
        refresh: response.data.refresh,
        userState: response.data.user,
      });
      navigate("/");
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div>
      <h1>Let's get you sign in!</h1>
      <LoginForm onSubmit={handleLogin} />
      <div>
        <Link to="/signup">
          <h3>Don't have an acocunt?</h3>
        </Link>
      </div>
    </div>
  );
};
export default LoginPage;
