import { useEffect, useState } from "react";
import { fetchAndHandleAuthenticatedUser } from "@utils/auth";
import { authUserStore } from "@store/auth";

const AuthWrapper = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const { logout, setUser } = authUserStore.getState();

  useEffect(() => {
    setLoading(true);

    const handle = async () => {
      let user = null;
      try {
        user = await fetchAndHandleAuthenticatedUser();
      } catch (error) {
        logout();
      } finally {
        setUser(user);
        setLoading(false);
      }
    };

    handle();
  }, [logout, setUser]);

  return <>{loading ? null : children}</>;
};

export default AuthWrapper;
