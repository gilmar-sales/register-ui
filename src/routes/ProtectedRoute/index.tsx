import React, { useContext } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import Role from "../../@types/Role";
import AuthContext from "../../contexts/AuthContext";

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

export default ProtectedRoute;
