import { Navigate } from "react-router-dom";

export const ProtectedRoute = ({ children, allowedRole }) => {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  // Not logged in
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // Logged in but wrong role
  if (allowedRole && role !== allowedRole) {
    return <Navigate to={role === "employer" ? "/employer/dashboard" : "/seeker/dashboard"} replace />;
  }

  return children;
};
