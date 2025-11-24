import React, { JSX, useEffect, useState } from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import LoginPage from "./pages/auth/LoginPage";
import RegisterPage from "./pages/auth/RegisterPage";
import ProtectedRoute from "./components/ProtectedRoute";
import MainLayout from "./layouts/MainLayout";
import { useAppSelector, useAppDispatch } from "./app/hooks";
import { selectIsAuthenticated, fetchCurrentUser, refreshToken, selectCurrentUser } from "./states/authslice";
import DashboardPage from "./pages/DashboardPage";
import SessionPage from "./pages/SessionPage";
import PricingPage from "./pages/PricingPage";
import AdminSettingsPage from "./pages/AdminSettingsPage";

function App() {
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(true);
      const navigate = useNavigate();

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
      <Route path="/pricing" element={<ProtectedRoute>
            <MainLayout>
              <PricingPage />
            </MainLayout>
          </ProtectedRoute>} />

      <Route 
        path="/admin/settings" 
        element={          <ProtectedRoute>   <MainLayout>  
           <AdminRoute>
                <AdminSettingsPage />
            </AdminRoute>
              </MainLayout>        </ProtectedRoute>} />


                      
 
           
        
      

      <Route path="/" element={
        <ProtectedRoute>
          <Navigate to="/dashboard" replace />
        </ProtectedRoute>
      } />

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
