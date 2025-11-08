import React from "react";
import { Navigate } from "react-router-dom";
import { useAppSelector } from "../app/hooks";
import { selectIsAuthenticated } from "../states/authslice";

interface ProtectedRouteProps {
    children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {

    const isAuthenticated = useAppSelector(selectIsAuthenticated);
    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }


    // Otherwise, render the protected content
    return <>{children}</>;
};

export default ProtectedRoute;
