import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AuthProvider from "react-auth-kit";
import AuthOutlet from "@auth-kit/react-router/AuthOutlet";
import createStore from "react-auth-kit/createStore";
import createRefresh from "react-auth-kit/createRefresh";

import HomePage from "./pages/Home";
import LoginPage from "./pages/Login";
import RegisterPage from "./pages/Register";

import apiService from "./api";
import { ACCESS_KEY_NAME } from "./constants";

const refresh = createRefresh({
  interval: 10,
  refreshApiCallback: async (param) => {
    try {
      const response = await apiService.post(
        "/auth/token/refresh/",
        { refresh: param.refreshToken },
        {
          headers: { Authorization: `Bearer ${param.authToken}` },
        }
      );
      return {
        isSuccess: true,
        newAuthToken: response.data.access,
        newAuthTokenExpireIn: 300,
      };
    } catch (error) {
      console.error(error);
      return {
        isSuccess: false,
      };
    }
  },
});

const store = createStore({
  authName: ACCESS_KEY_NAME,
  authType: "cookie",
  cookieDomain: window.location.hostname,
  cookieSecure: window.location.protocol === "https:",
  refresh: refresh,
});

function App() {
  return (
    <AuthProvider store={store}>
      <Router>
        <Routes>
          <Route element={<AuthOutlet fallbackPath="/login" />}>
            <Route path="/" element={<HomePage />} />
          </Route>

          <Route exact path="/login" element={<LoginPage />} />
          <Route exact path="/register" element={<RegisterPage />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
