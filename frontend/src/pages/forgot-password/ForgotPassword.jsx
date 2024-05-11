import { Link } from "react-router-dom";
import ForgotPasswordForm from "@components/forgot-password-form/ForgotPasswordForm";

import { useApi } from "@hooks/index";
import { authAPIs } from "@services/index";
import { useEffect } from "react";
import { parseFormErrors } from "@utils/index";

const ForgotPassword = () => {
  const { data, executeRequest: requestForgotPassword } = useApi();

  useEffect(() => {
    if (data) {
      //
    }
  }, [data]);

  const handleForgotPassword = async (reqData) => {
    const { data, error } = await requestForgotPassword(
      authAPIs.forgotPasswordAPI,
      reqData,
    );
    const fieldErrors = parseFormErrors(error);
    return { data, errors: fieldErrors };
  };

  return (
    <div>
      <h1>Lets get you sign in!</h1>
      <ForgotPasswordForm onSubmit={handleForgotPassword} />
      <div>
        <Link to="/login">
          <h3>Login to your account</h3>
        </Link>
      </div>
    </div>
  );
};
export default ForgotPassword;
