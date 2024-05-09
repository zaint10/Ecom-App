import { create } from "zustand";
// import { mountStoreDevtool } from "simple-zustand-devtools";
import { clearAuthCookies, setAuthCookies } from "@utils/auth";
import { devtools } from "zustand/middleware";

let authUserStore = (set, get) => ({
  authUser: null,
  loading: false,
  setLoading: (loading) => set({ loading: loading }),
  setUser: (user) => set({ authUser: user }),
  user: () => ({
    id: get().authUser.pk || null,
    email: get().authUser.email || null,
    username: get().authUser.username || null,
    fullname: get().authUser.fullname || null,
    phone: get().authUser.phone || null,
  }),
  isAuthenticated: () => get().authUser !== null,
  doLogin: async ({ access, refresh, user }) => {
    await setAuthCookies(access, refresh);
    get().setUser(user);
    return true;
  },
  doLogout: () => {
    clearAuthCookies();
    get().setUser(null);
  },
});

if (import.meta.env.DEV) {
  authUserStore = create(devtools(authUserStore));
} else {
  authUserStore = create(authUserStore);
}

export { authUserStore };
