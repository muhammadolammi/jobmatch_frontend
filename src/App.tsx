import React, { JSX, useEffect, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./pages/auth/LoginPage";
import RegisterPage from "./pages/auth/RegisterPage";
import ProtectedRoute from "./components/ProtectedRoute";
import { useAppSelector, useAppDispatch } from "./app/hooks";
import { selectIsAuthenticated, fetchCurrentUser, refreshToken, selectCurrentUser } from "./states/authslice";
import DashboardPage from "./pages/DashboardPage";
import SessionPage from "./pages/SessionPage";
import PricingPage from "./pages/PricingPage";
import AdminSettingsPage from "./pages/AdminSettingsPage";
import LandingPage from "./pages/LandingPage";
import ContactPage from "./pages/ContactPage";
import F404Page from "./pages/404Page";

function App() {
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("access_token");

    const initializeUser = async () => {
      if (token) {
        try {
          await dispatch(fetchCurrentUser()).unwrap();
        } catch {
          try {
            await dispatch(refreshToken()).unwrap();
            await dispatch(fetchCurrentUser()).unwrap();
          } catch {
            console.log("User must login again");
          }
        }
      }
      setLoading(false);
    };

    initializeUser();
  }, [dispatch]);



  // Optional: simple loading screen
  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen text-gray-600">
        Loading user session...
      </div>
    );
  }
  // A simple Guard Component
  const AdminRoute = ({ children }: { children: JSX.Element }) => {
    const user = useAppSelector(selectCurrentUser);
    if (user?.role !== "admin") {
      return <Navigate to="/dashboard" replace />

      // return <div className="p-10 text-center text-red-600">Access Denied: Admins Only</div>;
    }
    return children;
  };

  return (
    <Routes>
      {/* Protected Routes */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <DashboardPage />
          </ProtectedRoute>
        }
      />

      <Route
        path="/session/:id"
        element={
          <ProtectedRoute>
            <SessionPage />
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin/settings"
        element={<ProtectedRoute>
          <AdminRoute>
            <AdminSettingsPage />
          </AdminRoute>
        </ProtectedRoute>} />





      {/* Public Routes */}
      <Route path="/" element={
        // !isAuthenticated ? <LandingPage /> : <Navigate to="/dashboard" replace />
        <LandingPage />

      } />
      <Route
        path="/login"
        element={!isAuthenticated ? <LoginPage /> : <Navigate to="/dashboard" replace />}
      />
      {/* <Route path="/home" element={<LandingPage />} /> */}
      <Route
        path="/register"
        element={!isAuthenticated ? <RegisterPage /> : <Navigate to="/dashboard" replace />}
      />
      <Route
        path="/contact"
        element={
          <ContactPage />
        }
      />
      <Route path="/pricing" element={
        <PricingPage />
      } />


      {/* 404 Fallback */}
      <Route path="*" element={
        < F404Page />
      } />
    </Routes>
  );
}

export default App;
