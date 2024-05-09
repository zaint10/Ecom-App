import { Link, useNavigate, useLocation } from "react-router-dom";
import LoginForm from "@components/login-form/LoginForm";
import { authUserStore } from "@store/auth";

import { useApi } from "@hooks/index";
import { authAPIs } from "@services/index";
import { useEffect } from "react";

const LoginPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { state } = location;
  const { data, error, executeRequest: requestLogin } = useApi();
  const { doLogin, isAuthenticated } = authUserStore.getState();

  useEffect(() => {
    if (data && isAuthenticated()) {
      const { from } = state || { from: { pathname: "/" } };
      if (from.pathname === "/login") {
        navigate("/");
      } else {
        navigate(from.pathname);
      }
    }
  }, [data, navigate, isAuthenticated, state]);

  const handleLogin = async (reqData) => {
    const { data } = await requestLogin(authAPIs.loginAPI, reqData);
    if (data) {
      await doLogin(data);
    }
  };

  return (
    <div>
      <h1>Lets get you sign in!</h1>
      <LoginForm onSubmit={handleLogin} loginError={error} />
      <div>
        <Link to="/register">
          <h3>Dont have an acocunt?</h3>
        </Link>
      </div>
    </div>
  );
};
export default LoginPage;
