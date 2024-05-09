import { create } from "zustand";
import { mountStoreDevtool } from "simple-zustand-devtools";
import { clearAuthCookies, setAuthCookies } from "@utils/auth";

const authUserStore = create((set, get) => ({
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
  logout: () => {
    clearAuthCookies();
    get().setUser(null);
  },
}));

if (import.meta.env.DEV) {
  mountStoreDevtool("StoreZain", authUserStore);
}

export { authUserStore };
