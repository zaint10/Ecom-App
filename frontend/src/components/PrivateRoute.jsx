import { Outlet, Navigate } from "react-router-dom";
import { authUserStore } from "@store/auth";

const PrivateRoute = ({ fallbackPath = "/login" }) => {
  const isAuthenticated = authUserStore((state) => state.isAuthenticated());

  return isAuthenticated ? (
    <Outlet />
  ) : (
    <Navigate to={fallbackPath} state={{ from: location.pathname }} />
  );
};

export default PrivateRoute;
