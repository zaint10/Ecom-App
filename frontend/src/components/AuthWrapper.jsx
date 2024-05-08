import { useEffect, useState } from "react";
import { fetchAuthUserAPI, getAuthCookies, refreshToken } from "../utils/auth";
import { userAuthStore } from "../store/auth";

const AuthWrapper = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const { logout, setUser } = userAuthStore.getState();

  useEffect(() => {
    setLoading(true);
    const authCookies = getAuthCookies();
    if (!authCookies.access || !authCookies.refresh) {
      setLoading(false);
    }

    const handler = async () => {
      await refreshToken();
      const { data: user, error } = await fetchAuthUserAPI();
      if (error) {
        logout();
      } else {
        setUser(user);
      }

      setLoading(false);
    };

    handler();
  }, [logout, setUser]);

  return <>{loading ? null : children}</>;
};

export default AuthWrapper;
