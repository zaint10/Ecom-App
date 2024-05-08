import { Outlet, Navigate } from "react-router-dom";
import { userAuthStore } from "../store/auth";
import PropTypes from "prop-types";

const PrivateRoute = ({ fallbackPath = "/login" }) => {
  const isAuthenticated = userAuthStore.getState(
    (state) => state.isAuthenticated,
  );

  PrivateRoute.propTypes = {
    fallbackPath: PropTypes.string,
  };

  return isAuthenticated ? <Outlet /> : <Navigate to={fallbackPath} />;
};

export default PrivateRoute;
