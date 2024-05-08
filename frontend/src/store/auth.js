import { create } from "zustand";
import { mountStoreDevtool } from "simple-zustand-devtools";
import { clearAuthCookies, loginAPI, setAuthCookies } from "../utils/auth";

const userAuthStore = create((set, get) => ({
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
  login: async (email, username, password) => {
    const { data, error } = await loginAPI(email, username, password);
    if (error) {
      // empty //
    }
    await setAuthCookies(data.access, data.refresh);
    get().setUser(data.user);
    return true;
  },
  logout: () => {
    clearAuthCookies();
    get().setUser(null);
  },
}));

if (import.meta.env.DEV) {
  mountStoreDevtool("Store", userAuthStore);
}

export { userAuthStore };
