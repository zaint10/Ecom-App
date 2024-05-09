import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import HomePage from "@pages/home/Home";
import LoginPage from "@pages/login/Login";
import RegisterPage from "@pages/register/Register";

import PrivateRoute from "@components/PrivateRoute";
import AuthWrapper from "@components/AuthWrapper";

function App() {
  return (
    <AuthWrapper>
      <Router>
        <Routes>
          <Route path="/" element={<PrivateRoute fallbackPath="/login" />}>
            <Route exact path="/" element={<HomePage />} />
            <Route exact path="/home" element={<HomePage />} />
          </Route>

          <Route exact path="/login" element={<LoginPage />} />
          <Route exact path="/register" element={<RegisterPage />} />
        </Routes>
      </Router>
    </AuthWrapper>
  );
}

export default App;
