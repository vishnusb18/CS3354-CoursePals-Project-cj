import React, { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";

export default function ProtectedRoute({ children }) {
  const { user } = useContext(AuthContext);
  if (!user) {
    // TODO: Redirect to login page if not authenticated
    return <Navigate to="/login" replace />;
  }
  // If using as a wrapper, render children; else, render Outlet for nested routes
  return children ? React.cloneElement(children, {}) : <Outlet />;
}
