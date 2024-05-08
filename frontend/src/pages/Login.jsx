import { Link, useNavigate } from "react-router-dom";
// import useSignIn from "react-auth-kit/hooks/useSignIn";
// import useSignOut from "react-auth-kit/hooks/useSignOut";
// import styled from "@emotion/styled";
import LoginForm from "../components/Login/LoginForm";
import { userAuthStore } from "../store/auth";

const LoginPage = () => {
  const navigate = useNavigate();
  const { login } = userAuthStore.getState();

  const handleLogin = async (email, username, password) => {
    await login(email, username, password);
    navigate("/");
  };

  return (
    <div>
      <h1>Lets get you sign in!</h1>
      <LoginForm onSubmit={handleLogin} />
      <div>
        <Link to="/signup">
          <h3>Dont have an acocunt?</h3>
        </Link>
      </div>
    </div>
  );
};
export default LoginPage;
