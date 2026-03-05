// import React, { useEffect, useMemo, useState } from "react";
// import { Link, useNavigate, useParams } from "react-router-dom";
// import { ResultView } from "../components/ResultsView";
// import { EmptySession, ResultType } from "../types";
// import { useAppSelector } from "../app/hooks";
// import { selectCurrentUser } from "../states/authslice";
// import { api } from "../api/client";
// import { Session } from "../types";
// import { getSession } from "../api/sessions";
// import { useSessionUpdates } from "../hooks/useSessionUpdates";
// import { ArrowLeftIcon, Banknote, LayoutDashboard } from "lucide-react";

// export default function SessionPage() {
//     const { id: sessionId } = useParams<{ id: string }>();
//     const [session, setSession] = useState<Session>(EmptySession);
//     const [results, setResults] = useState<ResultType[] | null>(null);
//     const [loadingSession, setLoadingSession] = useState(false);
//     const [loadingResults, setLoadingResults] = useState(false);
//     const [error, setError] = useState<string>("");
//     const [isGenerating, setIsGenerating] = useState<boolean>(false);
//     const navigate = useNavigate()


//     const user = useAppSelector(selectCurrentUser);
//     const isHR = user?.role === "employer";
//     const isAdmin = user?.role === "admin";


//     const status = useSessionUpdates(session);
//     const handleResult = (data: ResultType | ResultType[]) => {
//         setResults(Array.isArray(data) ? data : [data]);

//     };

//     useEffect(() => {
//         if (!sessionId) return;
//         let mounted = true;

//         (async () => {
//             setError("");
//             setLoadingSession(true);
//             try {
//                 const s = await getSession(sessionId);
//                 if (!mounted) return;
//                 setSession(s);
//             } catch (err: any) {
//                 console.error("fetch session failed", err);
//                 if (mounted) setError("Failed to load session.");
//             } finally {
//                 if (mounted) setLoadingSession(false);
//             }
//         })();

//         return () => {
//             mounted = false;
//         };
//     }, [sessionId]);

//     useEffect(() => {
//         if (!sessionId) return;
//         let mounted = true;

//         const fetchResults = async () => {
//             setError("");
//             setLoadingResults(true);
//             try {
//                 const resp = await api.get(`/results/${sessionId}`);
//                 if (!mounted) return;
//                 handleResult(resp.data?.results ?? []);
//             } catch (err) {
//                 console.error("fetch results error", err);
//                 if (mounted) setError("Failed to load analysis results.");
//             } finally {
//                 if (mounted) setLoadingResults(false);
//             }
//         };

//         if (session?.status === "completed" || status === "completed" || status === "failed" || session?.status === "failed") {
//             fetchResults();
//             setIsGenerating(false)
//         } else {
//             setIsGenerating(true)
//         }

//         return () => {
//             mounted = false;
//         };
//     }, [sessionId, session?.status, status]);

//     const showLoading = loadingSession || loadingResults;

//     const content = useMemo(() => {
//         if (showLoading) return <div className="text-center text-gray-500 animate-pulse">Loading analysis...</div>;
//         if (error) return <div className="text-center text-red-600">{error}</div>;

//         if (!results || results!.length === 0)
//             return <div className="text-center text-gray-500 mt-8">No analysis results yet. Upload or rerun analysis to begin.</div>;

//         if (isHR) {
//             return (
//                 <div className="flex flex-wrap -mx-2">
//                     {results.map((res, i) => (
//                         <ResultView key={res.id ?? i} result={res} />
//                     ))}
//                 </div>
//             );
//         }

//         return (
//             <div className="space-y-6">
//                 {results.map((res, i) => (
//                     <ResultView key={res.id ?? i} result={res} />
//                 ))}
//             </div>
//         );
//     }, [results, showLoading, error, isHR]);

//     return (

//         // <div className="bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100 min-h-screen" >
//         //     <header className="sticky top-0 z-50 w-full bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800">

//         //         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

//         //             <div className="flex justify-between h-16 items-center">
//         //                 <div className="flex items-center gap-4">
//         //                     <Link className="flex items-center gap-2 text-primary dark:text-slate-100 hover:opacity-80 transition-opacity" to="/dashboard">
//         //                         <span className="material-symbols-outlined">
//         //                             <ArrowLeftIcon className="size-5" />
//         //                         </span>
//         //                         <span className="text-sm font-semibold">Back to Dashboard</span>
//         //                     </Link>
//         //                     <div className="h-6 w-px bg-slate-200 dark:bg-slate-700"></div>
//         //                     <div className="flex flex-col">
//         //                         <span className="text-xs font-bold uppercase tracking-wider text-slate-500">{session.name} </span>
//         //                         <h1 className="text-sm font-bold text-primary dark:text-white truncate max-w-[200px] sm:max-w-none">{session.job_title}</h1>
//         //                     </div>
//         //                 </div>

//         //                 <div className="hidden md:flex flex-1 justify-end gap-8">

//         //                     {/* Right Side Actions - Flex Container for Row Layout */}
//         //                     <div className="flex items-center gap-3 md:gap-6">

//         //                         {/* 1. Admin Button (Conditional) */}
//         //                         {isAdmin && (
//         //                             <button
//         //                                 onClick={() => navigate("/admin/settings")}
//         //                                 className="flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-blue-600 px-3 py-2 rounded-lg transition-colors"
//         //                             >
//         //                                 <LayoutDashboard className="w-4 h-4" />
//         //                                 Admin Dash
//         //                             </button>
//         //                         )}

//         //                         {/* 2. Logout Button */}
//         //                         {/* <button
//         //                 onClick={handleLogout}
//         //                 className="flex items-center gap-2 text-sm bg-red-50 text-red-600 hover:bg-red-600 hover:text-white border border-red-200 px-4 py-2 rounded-lg transition-all shadow-sm"
//         //             >
//         //                 <LogOut className="w-4 h-4" />
//         //                 Logout
//         //             </button> */}
//         //                         <Link
//         //                             to={"/pricing"}
//         //                             className="hidden lg:flex items-center gap-2 px-4 py-2 text-sm font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors">

//         //                             <span className="material-symbols-outlined text-lg">
//         //                                 <Banknote className="size-4" />
//         //                             </span>

//         //                             <span>Manage Subscription</span>
//         //                         </Link>
//         //                         <div className="flex items-center gap-2 pl-4 border-l border-slate-200 dark:border-slate-700">
//         //                             <div className="text-right hidden sm:block">
//         //                                 <p className="text-xs font-bold">{user?.company_name ?? user?.first_name ?? ""}</p>
//         //                                 {/* <p className="text-[10px] text-slate-500 uppercase tracking-wider">Premium Member</p> */}
//         //                             </div>
//         //                         </div>
//         //                         <div className="size-9 rounded-full bg-primary/10 border-2 border-primary/20 overflow-hidden">
//         //                             <img alt="User Profile" className="w-full h-full object-cover" data-alt="User profile avatar with a clean professional look" src="https://lh3.googleusercontent.com/aida-public/AB6AXuC_nUUbsh-F4psqwc3PTdb5kP5AOYsZjLf-qL8dowH_dp0wOlDAzk0wPshyPLMnJoy9kkCz8gmEVbfpevlk0tTxJbwfx4zkxTjywkRCSL04O62b-1hjtRWuey78uWpEIJyZw7F033A_zCOkWtjQJcLzojR0HPBzSJ1OOAlzYwxfkoSWC7WoGwMm1PToYphxe2FPk0rR-BKYcQ6FZtmqZ0il_GX_LtNO5nlDU-KX9t-YK5t3IKGGr9miTdFF8LEycnyvfjZqsYZKILia" />
//         //                         </div>
//         //                     </div>
//         //                 </div>
//         //             </div>
//         //         </div>
//         //     </header>
//         //     {/* <LoggedInHeader isAdmin={isAdmin} display_name={user?.company_name ?? user?.first_name ?? ""} /> */}
//         //     <div className="min-h-screen bg-gray-100 py-10 px-4">
//         //         <div className="max-w-4xl mx-auto mb-6">
//         //             <h1 className="text-3xl font-bold text-blue-700 mb-2">
//         //                 {isHR ? "Candidate Resume Analysis" : "Resume Fit Analysis"}
//         //             </h1>
//         //             <p className="text-gray-600">
//         //                 {isHR
//         //                     ? "Upload multiple candidate resumes for AI-driven insights."
//         //                     : "Upload your resume and compare it to target job descriptions."}
//         //             </p>
//         //         </div>

//         //         <div className="max-w-4xl mx-auto">

//         //             <div className="mt-6">
//         //                 {status === "failed" && (
//         //                     <div className="rounded-md bg-red-50 border border-red-200 p-3 text-red-700">
//         //                         Analysis failed. You can retry the analysis or re-upload resumes.
//         //                     </div>
//         //                 )}
//         //                 {isGenerating && (
//         //                     <div className="rounded-md bg-yellow-50 border border-yellow-200 p-3 text-yellow-700">
//         //                         Generating analysis — this may take a few seconds. (Status: {status})
//         //                     </div>
//         //                 )}
//         //                 {status === "completed" && (
//         //                     <div className="rounded-md bg-green-50 border border-green-200 p-3 text-green-700">
//         //                         Analysis complete.
//         //                     </div>
//         //                 )}
//         //             </div>

//         //         </div>
//         //         <div className="mt-6">{content}</div>

//         //     </div>
//         //     <footer />
//         // </div>
//         <body className="bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100 min-h-screen">
//             {/* <!-- Top Navigation Bar --> */}
//             <header className="sticky top-0 z-50 w-full bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800">
//                 <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//                     <div className="flex justify-between h-16 items-center">
//                         <div className="flex items-center gap-4">
//                             <Link className="flex items-center gap-2 text-primary dark:text-slate-100 hover:opacity-80 transition-opacity" to="/dashboard">
//                                 <span className="material-symbols-outlined">
//                                     <ArrowLeftIcon className="size-5" />

//                                 </span>
//                                 <span className="text-sm font-semibold">Back to Dashboard</span>
//                             </Link>
//                             <div className="h-6 w-px bg-slate-200 dark:bg-slate-700"></div>
//                             <div className="flex flex-col">
//                                 <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Session {session.name}</span>
//                                 <h1 className="text-sm font-bold text-primary dark:text-white truncate max-w-[200px] sm:max-w-none">{session.job_title}</h1>
//                             </div>
//                         </div>
//                         <div className="flex items-center gap-3">
//                             <div className="p-2 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors">
//                                 <span className="material-symbols-outlined">{user?.company_name ?? user?.first_name ?? ""}</span>
//                             </div>
//                             <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center overflow-hidden border border-slate-200">
//                                 <img alt="User Profile" className="w-full h-full object-cover" data-alt="Close up portrait of a professional male user" src="https://lh3.googleusercontent.com/aida-public/AB6AXuC_nUUbsh-F4psqwc3PTdb5kP5AOYsZjLf-qL8dowH_dp0wOlDAzk0wPshyPLMnJoy9kkCz8gmEVbfpevlk0tTxJbwfx4zkxTjywkRCSL04O62b-1hjtRWuey78uWpEIJyZw7F033A_zCOkWtjQJcLzojR0HPBzSJ1OOAlzYwxfkoSWC7WoGwMm1PToYphxe2FPk0rR-BKYcQ6FZtmqZ0il_GX_LtNO5nlDU-KX9t-YK5t3IKGGr9miTdFF8LEycnyvfjZqsYZKILia" />
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </header>
//             <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//                 <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
//                     {/* <!-- Main Content Area (Column 1-8) --> */}
//                     <div className="lg:col-span-8 space-y-6">
//                         {/* <!-- Match Score Card --> */}
//                         <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-8 shadow-sm">
//                             <div className="flex flex-col md:flex-row items-center justify-between gap-8">
//                                 <div className="relative w-48 h-48 flex items-center justify-center">
//                                     {/* <!-- Circular Progress SVG --> */}
//                                     <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
//                                         <circle className="text-slate-100 dark:text-slate-800" cx="50" cy="50" fill="transparent" r="42" stroke="currentColor" stroke-width="8"></circle>
//                                         <circle className="text-emerald-500" cx="50" cy="50" fill="transparent" r="42" stroke="currentColor" stroke-dasharray="263.89" stroke-dashoffset="39.58" stroke-linecap="round" stroke-width="8"></circle>
//                                     </svg>
//                                     <div className="absolute inset-0 flex flex-col items-center justify-center">
//                                         <span className="text-5xl font-black text-primary dark:text-white">85%</span>
//                                         <span className="text-sm font-medium text-emerald-600 dark:text-emerald-400">Match Score</span>
//                                     </div>
//                                 </div>
//                                 <div className="flex-1 text-center md:text-left">
//                                     <h2 className="text-2xl font-bold text-primary dark:text-white mb-2">Excellent Fit!</h2>
//                                     <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
//                                         Your profile is a strong match for this role. You possess 92% of the required core technologies and exceed the experience level for Senior leadership.
//                                     </p>
//                                     <div className="mt-4 flex flex-wrap justify-center md:justify-start gap-2">
//                                         <span className="px-3 py-1 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300 text-xs font-bold rounded-full uppercase tracking-wide">High Relevance</span>
//                                         <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-xs font-bold rounded-full uppercase tracking-wide">Ready to Apply</span>
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>
//                         {/* <!-- Analysis Lists Grid --> */}
//                         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                             {/* <!-- Key Strengths --> */}
//                             <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm">
//                                 <div className="flex items-center gap-2 mb-4">
//                                     <span className="material-symbols-outlined text-emerald-500">task_alt</span>
//                                     <h3 className="font-bold text-primary dark:text-white">Key Strengths</h3>
//                                 </div>
//                                 <ul className="space-y-4">
//                                     <li className="flex items-start gap-3">
//                                         <span className="material-symbols-outlined text-emerald-500 text-sm mt-1">check_circle</span>
//                                         <span className="text-sm text-slate-700 dark:text-slate-300">Expertise in <strong>React &amp; Next.js</strong> perfectly aligns with the core tech stack.</span>
//                                     </li>
//                                     <li className="flex items-start gap-3">
//                                         <span className="material-symbols-outlined text-emerald-500 text-sm mt-1">check_circle</span>
//                                         <span className="text-sm text-slate-700 dark:text-slate-300">Over 6 years of experience in <strong>System Design</strong> and architecture.</span>
//                                     </li>
//                                     <li className="flex items-start gap-3">
//                                         <span className="material-symbols-outlined text-emerald-500 text-sm mt-1">check_circle</span>
//                                         <span className="text-sm text-slate-700 dark:text-slate-300">Proven track record of <strong>mentoring junior developers</strong>.</span>
//                                     </li>
//                                     <li className="flex items-start gap-3">
//                                         <span className="material-symbols-outlined text-emerald-500 text-sm mt-1">check_circle</span>
//                                         <span className="text-sm text-slate-700 dark:text-slate-300">Strong background in <strong>Performance Optimization</strong>.</span>
//                                     </li>
//                                 </ul>
//                             </div>
//                             {/* <!-- Missing Skills / Gaps --> */}
//                             <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm">
//                                 <div className="flex items-center gap-2 mb-4">
//                                     <span className="material-symbols-outlined text-amber-500">warning</span>
//                                     <h3 className="font-bold text-primary dark:text-white">Missing Skills &amp; Gaps</h3>
//                                 </div>
//                                 <ul className="space-y-4">
//                                     <li className="flex items-start gap-3">
//                                         <span className="material-symbols-outlined text-amber-500 text-sm mt-1">error</span>
//                                         <span className="text-sm text-slate-700 dark:text-slate-300">Missing specific experience with <strong>GraphQL Subscriptions</strong>.</span>
//                                     </li>
//                                     <li className="flex items-start gap-3">
//                                         <span className="material-symbols-outlined text-amber-500 text-sm mt-1">error</span>
//                                         <span className="text-sm text-slate-700 dark:text-slate-300">No explicit mention of <strong>E2E testing (Cypress/Playwright)</strong>.</span>
//                                     </li>
//                                     <li className="flex items-start gap-3">
//                                         <span className="material-symbols-outlined text-amber-500 text-sm mt-1">error</span>
//                                         <span className="text-sm text-slate-700 dark:text-slate-300">Resume lacks details on <strong>Cloud Infrastructure (AWS/Vercel)</strong>.</span>
//                                     </li>
//                                 </ul>
//                             </div>
//                         </div>
//                         {/* <!-- Recommendations Section --> */}
//                         <div className="bg-primary text-white rounded-xl p-8 shadow-lg overflow-hidden relative">
//                             <div className="relative z-10">
//                                 <div className="flex items-center gap-2 mb-4">
//                                     <span className="material-symbols-outlined text-blue-300">lightbulb</span>
//                                     <h3 className="text-lg font-bold">Recommendations</h3>
//                                 </div>
//                                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                                     <div className="bg-white/10 rounded-lg p-4 border border-white/10">
//                                         <p className="text-sm font-medium mb-2 text-blue-100">Resume Optimization</p>
//                                         <p className="text-xs text-slate-300 leading-relaxed">Consider adding a project section specifically highlighting your unit testing coverage to address the E2E gap.</p>
//                                     </div>
//                                     <div className="bg-white/10 rounded-lg p-4 border border-white/10">
//                                         <p className="text-sm font-medium mb-2 text-blue-100">Interview Tip</p>
//                                         <p className="text-xs text-slate-300 leading-relaxed">Be prepared to discuss your approach to scalable frontend architecture, as this is a high-priority requirement.</p>
//                                     </div>
//                                 </div>
//                             </div>
//                             {/* <!-- Decorative background element --> */}
//                             <div className="absolute -bottom-12 -right-12 w-48 h-48 bg-blue-500/20 rounded-full blur-3xl"></div>
//                         </div>
//                     </div>
//                     {/* <!-- Sidebar (Column 9-12) --> */}
//                     <aside className="lg:col-span-4 space-y-6">
//                         {/* <!-- Job Summary Card --> */}
//                         <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm">
//                             <div className="flex items-center gap-4 mb-6">
//                                 <div className="w-12 h-12 rounded-lg bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
//                                     <span className="material-symbols-outlined text-primary dark:text-slate-400">business</span>
//                                 </div>
//                                 <div>
//                                     <h3 className="font-bold text-primary dark:text-white leading-tight">TechCorp Solutions</h3>
//                                     <p className="text-sm text-slate-500">San Francisco, CA (Remote)</p>
//                                 </div>
//                             </div>
//                             <div className="space-y-4">
//                                 <div>
//                                     <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Job Description</h4>
//                                     <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed line-clamp-6">
//                                         We are looking for a Senior Frontend Engineer to join our core product team. You will be responsible for building high-performance web applications using React, Next.js, and Tailwind CSS. The ideal candidate has experience with state management (Redux/Zustand), API integration (GraphQL), and leading front-end architectural decisions. You will collaborate closely with designers and product managers to deliver exceptional user experiences.
//                                     </p>
//                                     <button className="mt-2 text-primary dark:text-blue-400 text-xs font-bold hover:underline flex items-center gap-1">
//                                         View Full Description <span className="material-symbols-outlined text-xs">open_in_new</span>
//                                     </button>
//                                 </div>
//                                 <div className="pt-4 border-t border-slate-100 dark:border-slate-800 space-y-3">
//                                     <div className="flex justify-between text-sm">
//                                         <span className="text-slate-500">Salary Range</span>
//                                         <span className="font-semibold text-primary dark:text-slate-200">$160k - $210k</span>
//                                     </div>
//                                     <div className="flex justify-between text-sm">
//                                         <span className="text-slate-500">Experience</span>
//                                         <span className="font-semibold text-primary dark:text-slate-200">5+ Years</span>
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>
//                         {/* <!-- Action Buttons --> */}
//                         <div className="flex flex-col gap-3">
//                             <button className="w-full bg-primary text-white py-3 px-4 rounded-lg font-bold flex items-center justify-center gap-2 hover:bg-primary/90 transition-colors shadow-md shadow-primary/20">
//                                 <span className="material-symbols-outlined">picture_as_pdf</span>
//                                 Download Report PDF
//                             </button>
//                             <button className="w-full bg-white dark:bg-slate-800 text-primary dark:text-white border border-slate-200 dark:border-slate-700 py-3 px-4 rounded-lg font-bold flex items-center justify-center gap-2 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors">
//                                 <span className="material-symbols-outlined">share</span>
//                                 Share Analysis
//                             </button>
//                         </div>
//                         {/* <!-- Analysis History Mini Widget --> */}
//                         <div className="bg-slate-100/50 dark:bg-slate-800/50 rounded-xl p-4 border border-dashed border-slate-300 dark:border-slate-700">
//                             <h4 className="text-xs font-bold text-slate-500 uppercase mb-3">Previous Scans</h4>
//                             <div className="space-y-3">
//                                 <div className="flex items-center justify-between">
//                                     <span className="text-xs text-slate-600 dark:text-slate-400">v1.2 (2 days ago)</span>
//                                     <span className="text-xs font-bold text-slate-800 dark:text-slate-200">72%</span>
//                                 </div>
//                                 <div className="flex items-center justify-between">
//                                     <span className="text-xs text-slate-600 dark:text-slate-400">v1.1 (1 week ago)</span>
//                                     <span className="text-xs font-bold text-slate-800 dark:text-slate-200">68%</span>
//                                 </div>
//                             </div>
//                         </div>
//                     </aside>
//                 </div>
//             </main>
//             {/* <!-- Footer --> */}
//             <footer className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 border-t border-slate-200 dark:border-slate-800 mt-12">
//                 <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-slate-400 text-sm">
//                     <div className="flex items-center gap-2">
//                         <div className="w-6 h-6 text-primary dark:text-white">
//                             <svg fill="currentColor" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
//                                 <path d="M36.7273 44C33.9891 44 31.6043 39.8386 30.3636 33.69C29.123 39.8386 26.7382 44 24 44C21.2618 44 18.877 39.8386 17.6364 33.69C16.3957 39.8386 14.0109 44 11.2727 44C7.25611 44 4 35.0457 4 24C4 12.9543 7.25611 4 11.2727 4C14.0109 4 16.3957 8.16144 17.6364 14.31C18.877 8.16144 21.2618 4 24 4C26.7382 4 29.123 8.16144 30.3636 14.31C31.6043 8.16144 33.9891 4 36.7273 4C40.7439 4 44 12.9543 44 24C44 35.0457 40.7439 44 36.7273 44Z"></path>
//                             </svg>
//                         </div>
//                         <span className="font-bold text-slate-600 dark:text-slate-300">Gojobmatch</span>
//                     </div>
//                     <p>© 2024 Gojobmatch Analysis Engine. All rights reserved.</p>
//                 </div>
//             </footer>
//         </body>
//     );
// }

import React, { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ResultView } from "../components/ResultsView";
import { EmptySession, ResultType, Session } from "../types";
import { useAppSelector } from "../app/hooks";
import { selectCurrentUser } from "../states/authslice";
import { api } from "../api/client";
import { getSession } from "../api/sessions";
import { useSessionUpdates } from "../hooks/useSessionUpdates";
import { ArrowLeftIcon, CheckCircle2, CheckCircle, AlertTriangle, AlertCircle, Lightbulb, Building2, ChevronDown } from "lucide-react";
import Footer from "../components/Footer";

export default function SessionPage() {
    const { id: sessionId } = useParams<{ id: string }>();
    const [session, setSession] = useState<Session>(EmptySession);
    const [results, setResults] = useState<ResultType[] | null>(null);
    const [loadingSession, setLoadingSession] = useState(false);
    const [loadingResults, setLoadingResults] = useState(false);
    const [error, setError] = useState<string>("");
    const [isGenerating, setIsGenerating] = useState<boolean>(false);
    const [showFullDescription, setShowFullDescription] = useState(false);

    const user = useAppSelector(selectCurrentUser);
    const isHR = user?.role === "employer";

    const status = useSessionUpdates(session);

    const handleResult = (data: ResultType | ResultType[]) => {
        setResults(Array.isArray(data) ? data : [data]);
    };

    /* ---------------- FETCH SESSION ---------------- */
    useEffect(() => {
        if (!sessionId) return;
        let mounted = true;

        (async () => {
            setLoadingSession(true);
            try {
                const s = await getSession(sessionId);
                if (mounted) setSession(s);
            } catch {
                if (mounted) setError("Failed to load session.");
            } finally {
                if (mounted) setLoadingSession(false);
            }
        })();

        return () => { mounted = false; };
    }, [sessionId]);

    /* ---------------- FETCH RESULTS ---------------- */
    useEffect(() => {
        if (!sessionId) return;
        let mounted = true;

        const fetchResults = async () => {
            setLoadingResults(true);
            try {
                const resp = await api.get(`/results/${sessionId}`);
                console.log(resp)
                if (mounted) handleResult(resp.data?.results ?? []);
            } catch {
                if (mounted) setError("Failed to load analysis results.");
            } finally {
                if (mounted) setLoadingResults(false);
            }
        };

        if (
            session?.status === "completed" ||
            status === "completed" ||
            status === "failed"
        ) {
            fetchResults();
            setIsGenerating(false);
        } else {
            setIsGenerating(true);
        }

        return () => { mounted = false; };
    }, [sessionId, session?.status, status]);

    const showLoading = loadingSession || loadingResults;

    /* ---------------- PRIMARY RESULT ---------------- */
    const primaryResult = results?.[0];

    const matchScore = primaryResult?.match_score ?? 0;
    const relevantSkills = primaryResult?.relevant_skills ?? [];
    const relevantExperiences = primaryResult?.relevant_experiences ?? [];
    const missingSkills = primaryResult?.missing_skills ?? [];
    const summary = primaryResult?.summary ?? "";
    const recommendation = primaryResult?.recommendation ?? "";
    const isErrorResult = primaryResult?.is_error_result ?? false;
    const errorMessage = primaryResult?.error ?? "";

    // const radius = 42;
    // const circumference = 2 * Math.PI * radius;
    // const strokeOffset = circumference - (matchScore / 100) * circumference;

    /* ---------------- HR MULTI RESULT VIEW ---------------- */
    const content = useMemo(() => {
        if (showLoading)
            return <div className="text-center text-gray-500 animate-pulse">Loading analysis...</div>;

        if (error)
            return <div className="text-center text-red-600">{error}</div>;

        if (!results || results.length === 0)
            return <div className="text-center text-gray-500">No analysis results yet.</div>;

        return (
            <div className="space-y-6">
                {results.map((res, i) => (
                    <ResultView key={res.id ?? i} result={res} />
                ))}
            </div>
        );
    }, [results, showLoading, error]);

    if (isHR) {
        return <div className="p-6">{content}</div>;
    }

    if (loadingSession) {
        return <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
            <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
            {/* <p className="text-sm text-slate-500 dark:text-slate-400">
            Loading analysis...
        </p> */}
        </div>
    }
    /* ---------------- MAIN PAGE ---------------- */
    return (
        <div className="bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100 min-h-screen">

            {/* HEADER */}
            <header className="sticky top-0 z-50 w-full bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800">
                <div className="max-w-7xl mx-auto px-4 h-16 flex items-center gap-4">
                    <Link to="/dashboard" className="flex items-center gap-2 text-primary">
                        <ArrowLeftIcon className="size-5" />
                        <span className="text-sm font-semibold">Back to Dashboard</span>
                    </Link>
                    <div>
                        <span className="text-xs uppercase text-slate-500">Session {session.name}</span>
                        <h1 className="text-sm font-bold">{session.job_title}</h1>
                    </div>
                </div>
            </header>
            {/* main */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

                    {/* LEFT CONTENT */}
                    <div className="lg:col-span-8 space-y-6">

                        {isErrorResult && (
                            <div className="bg-red-50 text-red-700 p-3 rounded-md">
                                {errorMessage || "Analysis failed for this candidate."}
                            </div>
                        )}

                        {isGenerating && (
                            <div className="bg-yellow-50 text-yellow-700 p-3 rounded-md">
                                Generating analysis...
                            </div>
                        )}

                        {/* MATCH SCORE CARD */}
                        {/* <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-8 shadow-sm">
                            <div className="flex flex-col md:flex-row items-center gap-8">

                                <div className="relative w-48 h-48">
                                    <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                                        <circle
                                            cx="50"
                                            cy="50"
                                            r={radius}
                                            stroke="currentColor"
                                            strokeWidth="8"
                                            fill="transparent"
                                            className="text-slate-200"
                                        />
                                        <circle
                                            cx="50"
                                            cy="50"
                                            r={radius}
                                            stroke="currentColor"
                                            strokeWidth="8"
                                            fill="transparent"
                                            strokeDasharray={circumference}
                                            strokeDashoffset={strokeOffset}
                                            strokeLinecap="round"
                                            className="text-emerald-500"
                                        />
                                    </svg>

                                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                                        <span className="text-5xl font-black">{matchScore}%</span>
                                        <span className="text-sm text-emerald-600">Match Score</span>
                                    </div>
                                </div>

                                <div>
                                    <h2 className="text-2xl font-bold mb-2">
                                        {matchScore >= 75 ? "Excellent Fit!" :
                                            matchScore >= 50 ? "Moderate Fit" :
                                                "Needs Improvement"}
                                    </h2>

                                    <p className="text-slate-600">
                                        {summary || "AI analysis based on resume and job description."}
                                    </p>
                                </div>
                            </div>
                        </div> */}
                        <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-8 shadow-sm">
                            <div className="flex flex-col md:flex-row items-center justify-between gap-8">
                                <div className="relative w-48 h-48 flex items-center justify-center">
                                    {/* <!-- Circular Progress SVG --> */}
                                    <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                                        <circle className="text-slate-100 dark:text-slate-800" cx="50" cy="50" fill="transparent" r="42" stroke="currentColor" stroke-width="8"></circle>
                                        <circle className="text-emerald-500" cx="50" cy="50" fill="transparent" r="42" stroke="currentColor" stroke-dasharray="263.89" stroke-dashoffset="39.58" stroke-linecap="round" stroke-width="8"></circle>
                                    </svg>
                                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                                        <span className="text-5xl font-black text-primary dark:text-white">{matchScore}%</span>
                                        <span className="text-sm font-medium text-emerald-600 dark:text-emerald-400">Match Score</span>
                                    </div>
                                </div>
                                <div className="flex-1 text-center md:text-left">
                                    <h2 className="text-2xl font-bold text-primary dark:text-white mb-2">
                                        {matchScore >= 75 ? "Excellent Fit!" :
                                            matchScore >= 50 ? "Moderate Fit" :
                                                "Needs Improvement"}
                                    </h2>
                                    <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                                        {/* Your profile is a strong match for this role. You possess 92% of the required core technologies and exceed the experience level for Senior leadership. */}
                                        {summary || "AI analysis based on resume and job description."}
                                    </p>
                                    {/* <div className="mt-4 flex flex-wrap justify-center md:justify-start gap-2">
                                        <span className="px-3 py-1 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300 text-xs font-bold rounded-full uppercase tracking-wide">High Relevance</span>
                                        <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-xs font-bold rounded-full uppercase tracking-wide">Ready to Apply</span>
                                    </div> */}
                                </div>
                            </div>
                        </div>

                        {/* Analysis */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* <!-- Key Strengths --> */}
                            <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm">
                                <div className="flex items-center gap-2 mb-4">
                                    <span className="material-symbols-outlined text-emerald-500">
                                        <CheckCircle />
                                    </span>
                                    <h3 className="font-bold text-primary dark:text-white">Key Strengths</h3>
                                </div>
                                <ul className="space-y-4">
                                    {relevantSkills.map((skill, i) => (
                                        <li key={`skill-${i}`} className="flex items-start gap-3">
                                            <span className="material-symbols-outlined text-emerald-500 text-sm mt-1">
                                                <CheckCircle2 className="text-sm size-3" />
                                            </span>
                                            <span className="text-sm text-slate-700 dark:text-slate-300">{skill}</span>
                                        </li>
                                    ))}
                                    {relevantExperiences.map((exp, i) => (
                                        <li key={`exp-${i}`} className="flex items-start gap-3">
                                            <span className="material-symbols-outlined text-emerald-500 text-sm mt-1">
                                                <CheckCircle2 className="text-sm size-3" />

                                            </span>
                                            <span className="text-sm text-slate-700 dark:text-slate-300">{exp}</span>


                                        </li>
                                    ))}
                                    {relevantSkills.length === 0 && relevantExperiences.length === 0 && (
                                        <p className="text-sm text-slate-500">No strong matches identified.</p>
                                    )}


                                </ul>
                            </div>
                            {/* <!-- Missing Skills / Gaps --> */}
                            <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm">
                                <div className="flex items-center gap-2 mb-4">
                                    <span className="material-symbols-outlined text-amber-500">
                                        <AlertTriangle />
                                    </span>
                                    <h3 className="font-bold text-primary dark:text-white">Missing Skills</h3>
                                </div>
                                <ul className="space-y-4">
                                    {missingSkills.map((skill, i) => (

                                        <li key={i} className="flex items-start gap-3">
                                            <span className="material-symbols-outlined text-amber-500 text-sm mt-1">
                                                <AlertCircle className="text-sm size-3" />
                                            </span>
                                            <span className="text-sm text-slate-700 dark:text-slate-300">{skill}</span>


                                        </li>
                                    ))}
                                    {missingSkills.length === 0 && (
                                        <p className="text-sm text-slate-500">No major skill gaps detected.</p>
                                    )}


                                </ul>
                            </div>
                        </div>


                        {/* RECOMMENDATION */}
                        <div className="bg-primary text-white rounded-xl p-8 shadow-lg overflow-hidden relative">
                            <div className="relative z-10">
                                <div className="flex items-center gap-2 mb-4">
                                    <Lightbulb className="material-symbols-outlined text-blue-300" />
                                    <h3 className="text-lg font-bold">Recommendation</h3>
                                </div>
                                <div className="bg-primary text-white rounded-xl p-8">
                                    <p className="text-sm leading-relaxed">
                                        {recommendation || "No recommendation available."}
                                    </p>
                                    {/* <p className="text-xs text-slate-300 leading-relaxed">Be prepared to discuss your approach to scalable frontend architecture, as this is a high-priority requirement.</p> */}
                                </div>
                            </div>
                        </div>

                    </div>

                    {/* SIDEBAR */}
                    <aside className="lg:col-span-4 space-y-6">
                        <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm">
                            <div className="flex items-center gap-4 mb-6">
                                <div className="w-12 h-12 rounded-lg bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
                                    <span className="material-symbols-outlined text-primary dark:text-slate-400">
                                        <Building2 />

                                    </span>
                                </div>
                                <div>
                                    <h3 className="font-bold text-primary dark:text-white leading-tight">{session.job_title}</h3>
                                    {/* <p className="text-sm text-slate-500">San Francisco, CA (Remote)</p> */}
                                </div>
                            </div>
                            <div className="space-y-4">
                                <div>
                                    <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Job Description</h4>
                                    <p className={`text-sm text-slate-600 dark:text-slate-400 leading-relaxed ${showFullDescription ? "" : "line-clamp-6"
                                        }`}>
                                        {session.job_description}                                    </p>
                                    {/* <button className="mt-2 text-primary dark:text-blue-400 text-xs font-bold hover:underline flex items-center gap-1"> */}
                                    {/* View Full Description <span className="material-symbols-outlined text-xs">
                                            <ExternalLink />
                                        </span>
                                    </button> */}
                                    <button
                                        onClick={() => setShowFullDescription(!showFullDescription)}
                                        className="mt-2 text-primary dark:text-blue-400 text-xs font-bold hover:underline flex items-center gap-1"
                                    >
                                        {showFullDescription ? "Collapse Description" : "View Full Description"}

                                        <ChevronDown
                                            className={`w-4 h-4 transition-transform duration-300 ${showFullDescription ? "rotate-180" : ""
                                                }`}
                                        />
                                    </button>

                                </div>
                                {/* <div className="pt-4 border-t border-slate-100 dark:border-slate-800 space-y-3">
                                    <div className="flex justify-between text-sm">
                                        <span className="text-slate-500">Salary Range</span>
                                        <span className="font-semibold text-primary dark:text-slate-200">$160k - $210k</span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                        <span className="text-slate-500">Experience</span>
                                        <span className="font-semibold text-primary dark:text-slate-200">5+ Years</span>
                                    </div>
                                </div> */}
                            </div>
                        </div>
                        {/* <div className="bg-white dark:bg-slate-900 rounded-xl p-6 shadow-sm">
                            <h3 className="font-bold mb-2">{session.job_title}</h3>
                            <p className="text-sm text-slate-600">
                                {session.job_description}
                            </p>
                        </div> */}
                    </aside>
                </div>

            </div >
            <Footer />
        </div >

    );
}