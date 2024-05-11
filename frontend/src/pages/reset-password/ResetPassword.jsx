import { useNavigate, useParams } from "react-router-dom";

import { useApi } from "@hooks/index";
import { authAPIs } from "@services/index";
import { useEffect } from "react";
import { parseFormErrors } from "@utils/index";
import ResetPasswordForm from "@components/reset-password-form/ResetPasswordForm";

const ResetPassword = () => {
  const { data: resetPasswordData, executeRequest: reqResetPassword } =
    useApi();
  const { error: verifyResetTokenError, executeRequest: reqVerifyToken } =
    useApi();
  const { token, uid } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (resetPasswordData) {
      navigate("/login");
    }
    if (verifyResetTokenError) {
      //
    }
  }, [resetPasswordData, verifyResetTokenError, navigate]);

  useEffect(() => {
    const handleVerifyToken = async () => {
      await reqVerifyToken(authAPIs.verifyResetTokenAPI, {
        token,
        uid,
      });
    };

    handleVerifyToken();
  }, []);

  const handleResetPassword = async (reqData) => {
    const { data, error } = await reqResetPassword(
      authAPIs.resetPasswordConfirmAPI,
      { ...reqData, token, uid },
    );
    const fieldErrors = parseFormErrors(error);
    return { data, errors: fieldErrors };
  };

  return (
    <div>
      <ResetPasswordForm onSubmit={handleResetPassword} />
    </div>
  );
};
export default ResetPassword;
