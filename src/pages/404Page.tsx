import Footer from "../components/Footer";
import MainHeader from "../components/MainHeader";
import { Home, LayoutDashboard } from "lucide-react"

import { useLocation, useNavigate } from "react-router-dom";

export default function F404Page() {
    const location = useLocation();
    const currentPath = location.pathname.replace("/", "");

    const commingSoonPages = ["help-center", "privacy-policy", "resume-tips", "hiring-blog", "career-advice", "cookie-policy", "terms-of-service", "features"]
    const isComingSoon = commingSoonPages.includes(currentPath)
    const navigate = useNavigate()


    return (
        <div className="flex flex-col min-h-screen bg-background-light dark:bg-background-dark font-display">
            <MainHeader />
            <main className="flex-1 flex flex-col items-center justify-center px-6 py-12 md:py-24">
                <div className="max-w-[800px] w-full text-center space-y-8">
                    {/* <!-- Illustration/Visual Element --> */}
                    {/* <div className="relative mx-auto w-full max-w-md aspect-video rounded-2xl overflow-hidden bg-primary/5 dark:bg-primary/20 flex items-center justify-center border border-primary/10 mb-12 group">
                    <div className="absolute inset-0 bg-gradient-to-tr from-primary/10 to-transparent"></div>
                    <div className="relative flex flex-col items-center gap-4">
                        <span className="material-symbols-outlined text-7xl text-primary/40 dark:text-primary/60 animate-pulse">construction</span>
                        <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white dark:bg-slate-800 shadow-sm border border-slate-100 dark:border-slate-700">
                            <span className="w-2 h-2 rounded-full bg-green-500"></span>
                            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">AI Engine Optimization in Progress</span>
                        </div>
                    </div>
                    <div className="absolute bottom-4 right-4 opacity-10">
                        <span className="material-symbols-outlined text-9xl">query_stats</span>
                    </div>
                </div> */}
                    {/* <!-- Text Content --> */}
                    <div className="space-y-4">

                        <h1 className="text-4xl md:text-6xl font-black text-slate-900 dark:text-white tracking-tight">
                            {isComingSoon ? <span className="text-primary/50">Feature Coming Soon.</span> : "Page Not Found."}
                        </h1>
                        <p className="text-lg md:text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed">
                            {isComingSoon ? "We're currently building this feature to help you find your next opportunity even faster. Our AI recruitment platform is evolving to serve your career growth better." : <div className="inline-flex items-center px-3 py-1 rounded-full bg-primary/10 text-primary dark:bg-primary/30 dark:text-slate-200 text-sm font-bold tracking-wide">
                                404 ERROR
                            </div>}

                        </p>
                    </div>
                    {/* <!-- Action Buttons --> */}
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-6">
                        <button
                            onClick={() => {
                                navigate("/dashboard")
                            }}
                            className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-4 bg-primary text-white rounded-xl font-bold shadow-lg shadow-primary/20 hover:shadow-primary/30 hover:-translate-y-0.5 transition-all">
                            <LayoutDashboard className="text-xl" />
                            Go Back to Dashboard
                        </button>
                        <button
                            onClick={() => {
                                navigate("/")
                            }}
                            className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-4 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 rounded-xl font-bold hover:bg-slate-50 dark:hover:bg-slate-700 transition-all">

                            <Home className="text-xl" />

                            Return Home
                        </button>
                    </div>
                    {/* <!-- Progress/Status --> */}
                    {/* <div className="pt-12 flex flex-col items-center gap-3">
                    <p className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em]">Development Progress</p>
                    <div className="w-48 h-1.5 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
                        <div className="h-full bg-primary w-[75%] rounded-full"></div>
                    </div>
                    <p className="text-xs text-slate-500 dark:text-slate-400 italic">Estimated launch: Q4 2024</p>
                </div> */}
                </div>
            </main>
            <Footer />
        </div >
    )
}