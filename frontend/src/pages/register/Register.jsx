import RegisterForm from "@components/register-form/RegisterForm";
import useApi from "@hooks/useApi";
import authAPIs from "@services/auth";
import { authUserStore } from "@store/auth";
import { parseFormErrors } from "@utils/index";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const RegisterPage = () => {
  const { data, executeRequest: requestRegister } = useApi();
  const { doLogin, isAuthenticated } = authUserStore.getState();
  const navigate = useNavigate();

  useEffect(() => {
    if (data && isAuthenticated()) {
      navigate("/");
    }
  }, [data, navigate, isAuthenticated]);

  useEffect(() => {
    (async function () {
      await doLogin(data);
    })();
  }, [data, doLogin]);

  return (
    <div>
      <RegisterForm
        onSubmit={async (reqData) => {
          const { data, error } = await requestRegister(
            authAPIs.registerAPI,
            reqData,
          );
          const fieldErrors = parseFormErrors(error);

          return { data, errors: fieldErrors };
        }}
      />
    </div>
  );
};
export default RegisterPage;
