import React, { useContext } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useLocation,
  Outlet,
} from "react-router-dom";

import LoginPage from "./pages/Login";
import DashboardPage from "./pages/Dashboard";
import RegistersPage from "./pages/Registers";
import AuthContext from "./contexts/AuthContext";
import Role from "./@types/Role";

interface ProtectedRouteProps {
  role: Role;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = (props) => {
  const authCtx = useContext(AuthContext);
  const location = useLocation();

  if (!authCtx.isAuthenticated()) return <Navigate to={"/"} />;

  return authCtx.user.role === props.role ? (
    <Outlet />
  ) : authCtx.isAuthenticated() ? (
    <Navigate to="/unauthorized" state={{ from: location }} replace />
  ) : (
    <Navigate to="/" state={{ from: location }} replace />
  );
};

const Routing: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<ProtectedRoute role="collaborator" />}>
          <Route path="/registers" element={<RegistersPage />} />
        </Route>
        <Route element={<ProtectedRoute role="administrator" />}>
          <Route path="/dashboard" element={<DashboardPage />} />
        </Route>
        <Route path="/" element={<LoginPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Routing;
