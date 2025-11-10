import React from "react";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ role, children }) {
  const token = localStorage.getItem("token");
  const userRole = localStorage.getItem("role");

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  if (role) {
    if (Array.isArray(role)) {
      if (!role.includes(userRole)) return <Navigate to="/login" replace />;
    } else {
      if (userRole !== role) return <Navigate to="/login" replace />;
    }
  }

  return children;
}
