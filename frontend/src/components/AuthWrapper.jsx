import { useEffect, useState } from "react";
import { fetchAndHandleAuthenticatedUser } from "@utils/auth";
import { authUserStore } from "@store/auth";

const AuthWrapper = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [doLogout, setUser] = authUserStore((state) => [
    state.doLogout,
    state.setUser,
  ]);

  useEffect(() => {
    setLoading(true);

    const handle = async () => {
      let user = null;
      try {
        user = await fetchAndHandleAuthenticatedUser();
      } catch (error) {
        doLogout();
      } finally {
        setUser(user);
        setLoading(false);
      }
    };

    handle();
  }, [doLogout, setUser]);

  return <>{loading ? null : children}</>;
};

export default AuthWrapper;
