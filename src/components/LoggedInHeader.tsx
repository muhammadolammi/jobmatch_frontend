import { Link, useNavigate } from "react-router-dom";
import GoJobMatchLogo from "./JobMatchLogo";
import { Banknote, LayoutDashboard } from "lucide-react";
interface Props {
    isAdmin: boolean;
    display_name: string;
}

export default function LoggedInHeader(props: Props) {
    const navigate = useNavigate()
    return (
        < header className="flex items-center justify-between whitespace-nowrap border-b border-slate-200 dark:border-slate-800 px-6 md:px-20 py-4 bg-white/80 dark:bg-background-dark/80 backdrop-blur-md sticky top-0 z-50" >
            <GoJobMatchLogo />
            {/* <div className="flex-1 max-w-xl justify-center">
                        <div className="relative group">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400 group-focus-within:text-primary transition-colors">
                                <span className="material-symbols-outlined text-xl">
                                    <Search />
                                </span>
                            </div>
                            <input className="block w-full pl-10 pr-3 py-2 border border-slate-200 dark:border-slate-700 rounded-lg bg-slate-50 dark:bg-slate-900 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-sm" placeholder="Search sessions, candidates, or jobs..." type="text" />
                        </div>
                    </div> */}

            <div className="hidden md:flex flex-1 justify-end gap-8">

                {/* Right Side Actions - Flex Container for Row Layout */}
                <div className="flex items-center gap-3 md:gap-6">

                    {/* 1. Admin Button (Conditional) */}
                    {props.isAdmin && (
                        <button
                            onClick={() => navigate("/admin/settings")}
                            className="flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-blue-600 px-3 py-2 rounded-lg transition-colors"
                        >
                            <LayoutDashboard className="w-4 h-4" />
                            Admin Dash
                        </button>
                    )}

                    {/* 2. Logout Button */}
                    {/* <button
                        onClick={handleLogout}
                        className="flex items-center gap-2 text-sm bg-red-50 text-red-600 hover:bg-red-600 hover:text-white border border-red-200 px-4 py-2 rounded-lg transition-all shadow-sm"
                    >
                        <LogOut className="w-4 h-4" />
                        Logout
                    </button> */}
                    <Link
                        to={"/pricing"}
                        className="hidden lg:flex items-center gap-2 px-4 py-2 text-sm font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors">

                        <span className="material-symbols-outlined text-lg">
                            <Banknote className="size-4" />
                        </span>

                        <span>Manage Subscription</span>
                    </Link>
                    <div className="flex items-center gap-2 pl-4 border-l border-slate-200 dark:border-slate-700">
                        <div className="text-right hidden sm:block">
                            <p className="text-xs font-bold">{props.display_name}</p>
                            {/* <p className="text-[10px] text-slate-500 uppercase tracking-wider">Premium Member</p> */}
                        </div>
                    </div>
                    <div className="size-9 rounded-full bg-primary/10 border-2 border-primary/20 overflow-hidden">
                        <img alt="User Profile" className="w-full h-full object-cover" data-alt="User profile avatar with a clean professional look" src="https://lh3.googleusercontent.com/aida-public/AB6AXuC_nUUbsh-F4psqwc3PTdb5kP5AOYsZjLf-qL8dowH_dp0wOlDAzk0wPshyPLMnJoy9kkCz8gmEVbfpevlk0tTxJbwfx4zkxTjywkRCSL04O62b-1hjtRWuey78uWpEIJyZw7F033A_zCOkWtjQJcLzojR0HPBzSJ1OOAlzYwxfkoSWC7WoGwMm1PToYphxe2FPk0rR-BKYcQ6FZtmqZ0il_GX_LtNO5nlDU-KX9t-YK5t3IKGGr9miTdFF8LEycnyvfjZqsYZKILia" />
                    </div>
                </div>

            </div>
        </header >


    );
}