import { useApi } from "@hooks/index";
import { authAPIs } from "@services/index";
import { useEffect } from "react";
import { parseFormErrors } from "@utils/index";
import ChangePasswordForm from "@components/change-password-form/ChangePasswordForm";

const ChangePassword = () => {
  const { data: changePasswordData, executeRequest: reqChangePassword } =
    useApi();

  useEffect(() => {
    if (changePasswordData) {
      //
    }
  }, [changePasswordData]);

  const handleChangePassword = async (reqData) => {
    const { data, error } = await reqChangePassword(
      authAPIs.changePasswordAPI,
      reqData,
    );
    const fieldErrors = parseFormErrors(error);
    return { data, errors: fieldErrors };
  };

  return (
    <div>
      <ChangePasswordForm onSubmit={handleChangePassword} />
    </div>
  );
};
export default ChangePassword;
