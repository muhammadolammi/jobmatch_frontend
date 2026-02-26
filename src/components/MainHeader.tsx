
import React from 'react';
import GoJobMatchLogo from "../components/JobMatchLogo";
import { Link, useLocation } from "react-router-dom";
import { useAppSelector } from '../app/hooks';
import { selectIsAuthenticated } from '../states/authslice';

const MainHeader: React.FC = () => {
    const isAuthenticated = useAppSelector(selectIsAuthenticated);
    const location = useLocation();
    const currentPath = location.pathname.replace("/", "");


    return (

        <header className="flex items-center justify-between whitespace-nowrap border-b border-slate-200 dark:border-slate-800 px-6 md:px-20 py-4 bg-white/80 dark:bg-background-dark/80 backdrop-blur-md sticky top-0 z-50">
            <GoJobMatchLogo />
            <div className="hidden md:flex flex-1 justify-end gap-8">
                <nav className="flex items-center gap-8">
                    {/* <a className="text-slate-600 dark:text-slate-300 text-sm font-medium hover:text-primary dark:hover:text-white transition-colors" href="#solutions">Solutions</a> */}
                    {/* <a className="text-slate-600 dark:text-slate-300 text-sm font-medium hover:text-primary dark:hover:text-white transition-colors" href="#how-it-works">How it Works</a> */}
                    <Link className="text-slate-600 dark:text-slate-300 text-sm font-medium hover:text-primary dark:hover:text-white transition-colors" to={"/features"}>
                        Features
                    </Link>

                    <Link className="text-slate-600 dark:text-slate-300 text-sm font-medium hover:text-primary dark:hover:text-white transition-colors" to={"/pricing"}>
                        Pricing
                    </Link>
                </nav>
                {isAuthenticated ? (
                    <div className="flex gap-3">
                        {currentPath !== "dashboard" && (
                            <Link
                                className="flex min-w-[100px] cursor-pointer items-center justify-center rounded-lg h-10 px-4 bg-primary text-white text-sm font-bold hover:bg-slate-800 transition-all"
                                to={"/dashboard"}
                            >
                                Dashboard
                            </Link>
                        )}
                    </div>
                ) : (<div className="flex gap-3">
                    <Link className="flex min-w-[100px] cursor-pointer items-center justify-center rounded-lg h-10 px-4 bg-primary text-white text-sm font-bold hover:bg-slate-800 transition-all" to={"/register"}>
                        Get Started
                    </Link>
                    <Link className="flex min-w-[100px] cursor-pointer items-center justify-center rounded-lg h-10 px-4 bg-slate-100 dark:bg-slate-800 text-primary dark:text-white text-sm font-bold hover:bg-slate-200 transition-all" to={"/login"}>
                        Login
                    </Link>
                </div>)
                }
            </div>
            {/* <!-- Mobile Menu Icon --> */}
            <button className="md:hidden p-2">
                <span className="material-symbols-outlined">menu</span>
            </button>
        </header>
    );
};

export default MainHeader;
