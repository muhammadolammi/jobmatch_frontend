import React from "react";
import { useAppDispatch } from "../app/hooks";
import { logout } from "../states/authslice";
import { useNavigate } from "react-router-dom";

interface MainLayoutProps {
    children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const handleLogout = () => {
        dispatch(logout());
        navigate("/login");
    };

    return (
        <div className="min-h-screen flex flex-col bg-gray-50">
            {/* Top Navbar */}
            <header className="bg-white shadow-md py-4 px-6 flex justify-between items-center">
                <h1 className="text-2xl font-bold text-blue-600">JobMatch AI</h1>

                <button
                    onClick={handleLogout}
                    className="text-sm bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-all shadow-sm"
                >
                    Logout
                </button>
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
