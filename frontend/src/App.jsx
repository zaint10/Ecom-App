import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import HomePage from "@pages/home/Home";
import LoginPage from "@pages/login/Login";
import RegisterPage from "@pages/register/Register";

import PrivateRoute from "@components/PrivateRoute";
import AuthWrapper from "@components/AuthWrapper";
import ForgotPassword from "@pages/forgot-password/ForgotPassword";
import ResetPassword from "@pages/reset-password/ResetPassword";
import ChangePassword from "@pages/change-password/ChangePassword";

import AppLayout from "@layouts/AppLayout";
function App() {
  return (
    <Router>
      <AppLayout>
        <AuthWrapper>
          <Routes>
            <Route path="/" element={<PrivateRoute fallbackPath="/login" />}>
              <Route exact path="/" element={<HomePage />} />
              <Route exact path="/home" element={<HomePage />} />
              <Route
                exact
                path="/change-password"
                element={<ChangePassword />}
              />
            </Route>

            <Route exact path="/login" element={<LoginPage />} />
            <Route exact path="/forgot-password" element={<ForgotPassword />} />
            <Route
              exact
              path="/password/reset/confirm/:uid/:token"
              element={<ResetPassword />}
            />
            <Route exact path="/register" element={<RegisterPage />} />
          </Routes>
        </AuthWrapper>
      </AppLayout>
    </Router>
  );
}

export default App;
