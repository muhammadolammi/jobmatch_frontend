import React from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { logout, selectCurrentUser } from "../states/authslice";
import { useNavigate, Link } from "react-router-dom"; // Added Link for semantic navigation
import { LayoutDashboard, LogOut } from "lucide-react"; // Optional: Icons make it look better

interface MainLayoutProps {
    children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
    const user = useAppSelector(selectCurrentUser);
    
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const handleLogout = () => {
        dispatch(logout());
        navigate("/login");
    };

    // Helper to check if user is admin
    const isAdmin = user?.role === "admin";

    return (
        <div className="min-h-screen flex flex-col bg-gray-50">
            {/* Top Navbar */}
            <header className="bg-white shadow-md py-4 px-6 flex justify-between items-center sticky top-0 z-50">
                <Link to="/dashboard">
                    <h1 className="text-2xl font-bold text-blue-600 cursor-pointer">JobMatch AI</h1>
                </Link>

                {/* Right Side Actions - Flex Container for Row Layout */}
                <div className="flex items-center gap-4">
                     
                     {/* 1. Admin Button (Conditional) */}
                     {isAdmin && (
                        <button
                            onClick={() => navigate("/admin/settings")}
                            className="flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-blue-600 px-3 py-2 rounded-lg transition-colors"
                        >
                            <LayoutDashboard className="w-4 h-4" />
                            Admin Dash
                        </button>
                     )}
                    
                    {/* 2. Logout Button */}
                    <button
                        onClick={handleLogout}
                        className="flex items-center gap-2 text-sm bg-red-50 text-red-600 hover:bg-red-600 hover:text-white border border-red-200 px-4 py-2 rounded-lg transition-all shadow-sm"
                    >
                        <LogOut className="w-4 h-4" />
                        Logout
                    </button>
                </div>
            </header>

            {/* Main content */}
            <main className="flex-1 p-6">
                <div className="max-w-5xl mx-auto">{children}</div>
            </main>

            {/* Footer */}
            <footer className="bg-white text-gray-500 text-center py-4 text-sm border-t">
                © {new Date().getFullYear()} JobMatch AI. All rights reserved.
            </footer>
        </div>
    );
};

export default MainLayout;