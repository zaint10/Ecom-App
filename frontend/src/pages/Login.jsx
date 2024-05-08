import { Link, useNavigate } from "react-router-dom";
import LoginForm from "../components/Login/LoginForm";
import { authUserStore } from "../store/auth";
import useApi from "../APIs/useApi";
import { authAPIs } from "../APIs";

const LoginPage = () => {
  const navigate = useNavigate();
  const { executeRequest: requestLogin } = useApi();
  const { doLogin } = authUserStore.getState();

  const handleLogin = async (reqData) => {
    const { data, error } = await requestLogin(authAPIs.loginAPI, reqData);
    if (!error && (await doLogin(data))) {
      navigate("/");
    }
  };

  return (
    <div>
      <h1>Lets get you sign in!</h1>
      <LoginForm onSubmit={handleLogin} />
      <div>
        <Link to="/register">
          <h3>Dont have an acocunt?</h3>
        </Link>
      </div>
    </div>
  );
};
export default LoginPage;
