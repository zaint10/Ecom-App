import { Outlet, Navigate } from "react-router-dom";
import { authUserStore } from "@store/auth";

const PrivateRoute = ({ fallbackPath = "/login" }) => {
  const isAuthenticated = authUserStore((state) => state.isAuthenticated());
  const [originalPath, setOriginalPath] = useState(location.pathname);

  useEffect(() => {
    setOriginalPath(location.pathname);
  }, [location.pathname]);

  return !isAuthenticated ? (
    <Outlet />
  ) : (
    <Navigate to={fallbackPath} state={{ from: originalPath }} />
  );
};

export default PrivateRoute;
