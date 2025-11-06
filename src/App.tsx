import React, { useEffect, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./features/auth/LoginPage";
import RegisterPage from "./features/auth/RegisterPage";
import ProtectedRoute from "./components/ProtectedRoute";
import MainLayout from "./layouts/MainLayout";
import { useAppSelector, useAppDispatch } from "./app/hooks";
import { selectIsAuthenticated, fetchCurrentUser } from "./states/authslice";
import DashboardPage from "./features/analyzer/DashboardPage";
import SessionPage from "./features/analyzer/SessionPage";

function App() {
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(true);

  // ✅ Fetch the current user session when the app loads
  useEffect(() => {
    dispatch(fetchCurrentUser())
    setLoading(false)


  }, [dispatch]);

  // Optional: simple loading screen
  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen text-gray-600">
        Loading user session...
      </div>
    );
  }

  return (
    <Routes>
      {/* Protected Routes */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <MainLayout>
              <DashboardPage />
            </MainLayout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/session/:id"
        element={
          <ProtectedRoute>
            <MainLayout>
              <SessionPage />
            </MainLayout>
          </ProtectedRoute>
        }
      />

      <Route path="/" element={<Navigate to="/dashboard" replace />} />

      {/* Public Routes */}
      <Route
        path="/login"
        element={!isAuthenticated ? <LoginPage /> : <Navigate to="/dashboard" replace />}
      />
      <Route
        path="/register"
        element={!isAuthenticated ? <RegisterPage /> : <Navigate to="/dashboard" replace />}
      />

      {/* 404 Fallback */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;
