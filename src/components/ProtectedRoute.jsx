import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useUser } from "../context/UserContext.jsx";

export default function ProtectedRoute({ children }) {
  const { user } = useUser();
  const location = useLocation();

  if (!user) {
    // Redirect to signup if not authenticated, preserving the current path
    return <Navigate to="/signup" state={{ from: location.pathname }} replace />;
  }

  return children;
}
