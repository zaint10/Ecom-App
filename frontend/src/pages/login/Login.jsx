import { Link, useNavigate, useLocation } from "react-router-dom";
import LoginForm from "@components/login-form/LoginForm";
import { authUserStore } from "@store/auth";

import { useApi } from "@hooks/index";
import { authAPIs } from "@services/index";

const LoginPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { state } = location;
  const { error, executeRequest: requestLogin } = useApi();
  const { doLogin } = authUserStore.getState();

  const handleLogin = async (reqData) => {
    const { data, error } = await requestLogin(authAPIs.loginAPI, reqData);
    if (!error && (await doLogin(data))) {
      const { from } = state || { from: { pathname: "/" } };
      navigate(from.pathname);
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
