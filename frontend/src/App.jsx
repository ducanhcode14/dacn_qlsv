// frontend/src/App.jsx
import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";

import Dashboard from "./pages/admin/Dashboard";
import Users from "./pages/admin/Users";
import Courses from "./pages/admin/Courses";
import Lecturers from "./pages/admin/Lecturers";
import Sections from "./pages/admin/Sections";
import Students from "./pages/admin/Students";
import Scores from "./pages/admin/Scores";

import Profile from "./pages/user/Profile";
import Enrollment from "./pages/user/Enrollment";

import LecturerDashboard from "./pages/lecturer/LecturerDashboard";
import ProtectedRoute from "./components/ProtectedRoute";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Default */}
        <Route path="/" element={<Navigate to="/login" replace />} />

        {/* --- Auth --- */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* --- Admin routes --- */}
        <Route
          path="/admin/dashboard"
          element={
            <ProtectedRoute role="admin">
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/users"
          element={
            <ProtectedRoute role="admin">
              <Users />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/courses"
          element={
            <ProtectedRoute role="admin">
              <Courses />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/lecturers"
          element={
            <ProtectedRoute role="admin">
              <Lecturers />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/sections"
          element={
            <ProtectedRoute role="admin">
              <Sections />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/students"
          element={
            <ProtectedRoute role="admin">
              <Students />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/scores"
          element={
            <ProtectedRoute role="admin">
              <Scores />
            </ProtectedRoute>
          }
        />

        {/* --- Lecturer routes --- */}
        <Route
          path="/lecturer/dashboard"
          element={
            <ProtectedRoute role="lecturer">
              <LecturerDashboard />
            </ProtectedRoute>
          }
        />

        {/* --- Student routes --- */}
        <Route
          path="/user/profile"
          element={
            <ProtectedRoute role="student">
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route
          path="/user/enrollment"
          element={
            <ProtectedRoute role="student">
              <Enrollment />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
