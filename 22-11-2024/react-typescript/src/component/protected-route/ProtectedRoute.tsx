import React from "react";
import { Navigate } from "react-router-dom";
import { UserRole } from "../../config/navConfig";

interface ProtectedRouteProps {
  children: JSX.Element;
  allowedRoles: UserRole[];
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  allowedRoles,
}) => {
  const user = JSON.parse(localStorage.getItem("auth_user_token") || "null");

  if (!user || !allowedRoles.includes(user.role)) {
    localStorage.removeItem("auth_user_token");
    return <Navigate to="/login" />;
  }

  return children;
};

export default ProtectedRoute;
