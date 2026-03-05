import React, { useState } from "react";
// import { useAppSelector } from "../app/hooks";
// import { selectCurrentUser } from "../states/authslice";
import { createSession } from "../api/sessions";
// import { getUserSubscription, UserSubscription } from "../api/subscriptions"; // Import the API we made
import { SessionList } from "../components/SessionList";
import { PlusCircle, Loader2, ChartNoAxesCombined, Info, History, UploadCloud, FileText, } from "lucide-react";
// import { PlusCircle, Loader2, ChartNoAxesCombined, Info, History,UploadCloud, FileText, Percent, BookCheck } from "lucide-react";

import LoggedInHeader from "../components/LoggedInHeader";
import Footer from "../components/Footer";
import { useAppSelector } from "../app/hooks";
import { selectCurrentUser } from "../states/authslice";
import { useNavigate } from "react-router-dom";
import { analyzeResume } from "../helpers/analyse";
import { handleUpload } from "../helpers/fileupload";


// function HRDashboardSection() {
//     return (
//         <div className="bg-blue-50 border border-blue-200 rounded-2xl p-6 mb-6">
//             <h2 className="text-xl font-semibold text-blue-700 mb-1">HR Tools</h2>
//             <p className="text-gray-600">
//                 Upload multiple resumes from candidates and generate comparative analysis reports.
//             </p>
//         </div>
//     );
// }

// function JobSeekerDashboardSection() {
//     return (
//         <div className="bg-green-50 border border-green-200 rounded-2xl p-6 mb-6">
//             <h2 className="text-xl font-semibold text-green-700 mb-1">Job Seeker Tools</h2>
//             <p className="text-gray-600">
//                 Upload your resume and get insights on how well it fits a job description.
//             </p>
//         </div>
//     );
// }

export default function DashboardPage() {
    // Session States
    const [creating, setCreating] = useState(false);
    const [title, setTitle] = useState("");
    const [jobTitle, setJobTitle] = useState("");
    const [jobDescription, setJobDescription] = useState("");
    const [status, setStatus] = useState("");

    // Subscription State (To handle the Upgrade Button logic)
    // const [subscription, setSubscription] = useState<UserSubscription | null>(null);
    // const [loadingSub, setLoadingSub] = useState(true);
    const user = useAppSelector(selectCurrentUser);
    const navigate = useNavigate();

    const [files, setFiles] = useState<FileList | null>(null);
    const [uploadError, setUploadError] = useState("");


    // // Fetch Subscription on Mount
    // useEffect(() => {
    //     const fetchSub = async () => {
    //         try {
    //             const sub = await getUserSubscription();
    //             setSubscription(sub);
    //         } catch (error) {
    //             console.error("Failed to check subscription", error);
    //         } finally {
    //             setLoadingSub(false);
    //         }
    //     };
    //     fetchSub();
    // }, []);
    const validateFiles = (fileList: FileList | null) => {
        if (!fileList || fileList.length === 0) {
            return "Please upload at least one file.";
        }

        const allowedTypes = [
            "application/pdf",
            "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
            "text/plain"
        ];

        for (let file of Array.from(fileList)) {
            if (!allowedTypes.includes(file.type)) {
                return `File type not allowed: ${file.name}`;
            }

            if (file.size > 10 * 1024 * 1024) {
                return `File too large (max 10MB): ${file.name}`;
            }
        }

        return null;
    };
    const handleCreate = async (e: React.FormEvent) => {
        e.preventDefault();
        setUploadError("");

        if (!title.trim() || !jobTitle.trim() || !jobDescription.trim()) {
            alert("Please fill all required fields.");
            return;
        }

        const validationError = validateFiles(files);
        if (validationError) {
            setUploadError(validationError);
            return;
        }

        try {
            setCreating(true);

            // 1️⃣ Create Session
            const session = await createSession({
                name: title,
                job_title: jobTitle,
                job_description: jobDescription
            });

            if (!session.id) {
                throw new Error("Empty session id returned from server.");
            }
            await handleUpload({
                sessionId: session.id,
                files: files,
                setStatus: setStatus,
                setLoading: setCreating
            })
            await analyzeResume(session.id, "Analysis queued successfully!");
            // Navigate using the local variable
            navigate(`/session/${session.id}`);


        } catch (err) {
            console.error(err);
            alert(`Something went wrong during creation. error: ${err}`,);
        }
    };

    // console.log(user)
    const isHR = user?.role === "employer";
    const hasSideBAR = false
    // const isJobSeeker = user?.role === "job_seeker";

    // Logic: Is the user on a paid plan?
    // const isPaidPlan = subscription?.Status === "active" && subscription?.PlanID !== null;

    return (
        <>
            <LoggedInHeader isAdmin={user?.role === "admin"} display_name={user?.company_name ?? user?.first_name ?? ""} />
            <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-12 py-8">
                <div className="mb-8">
                    <h2 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">Welcome back, {user?.company_name ?? user?.first_name ?? user?.last_name ?? ""}</h2>
                    <p className="text-slate-500 dark:text-slate-400 mt-1">Ready to {user?.role === "job_seeker" ? "analyze your resumes" : "find the perfect candidate"} today?</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                    {/* Role Section */}
                    {/* {isHR && <HRDashboardSection />}
                        {isJobSeeker && <JobSeekerDashboardSection />} */}
                    {/* Create Session Card */}
                    {/* <div className="lg:col-span-8 flex flex-col gap-6 "> */}
                    <div
                        // className="lg:col-span-8 lg:col-start-3 flex flex-col gap-6"
                        className={`flex flex-col gap-6 ${hasSideBAR
                            ? "lg:col-span-8"
                            : "lg:col-span-10 lg:col-start-2"
                            }`}

                    >
                        <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm shadow-slate-300/50">
                            <div className="flex items-center gap-3 mb-6">
                                <span className="material-symbols-outlined text-primary dark:text-slate-200">
                                    <PlusCircle className="size-5" />
                                </span>
                                <h3 className="text-lg font-bold">Create New Analysis Session</h3>
                            </div>
                            <form className="space-y-6" onSubmit={handleCreate}>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Session Title</label>
                                        <input className="w-full px-4 py-3 border border-slate-200 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-950 focus:ring-2 focus:ring-primary/20 focus:border-primary text-sm transition-all"
                                            placeholder={
                                                isHR
                                                    ? "e.g., Q4 Engineering Recruitment"
                                                    : "e.g., Resume Analysis for Software Engineer Role"
                                            }
                                            value={title}
                                            onChange={(e) => setTitle(e.target.value)}
                                            type="text" />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Job Title</label>
                                        <input
                                            className="w-full px-4 py-3 border border-slate-200 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-950 focus:ring-2 focus:ring-primary/20 focus:border-primary text-sm transition-all"

                                            placeholder="e.g., Senior Full Stack Developer" type="text"

                                            value={jobTitle}
                                            onChange={(e) => setJobTitle(e.target.value)}
                                        />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Job Description</label>
                                    <textarea
                                        className="w-full px-4 py-3 border border-slate-200 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-950 focus:ring-2 focus:ring-primary/20 focus:border-primary text-sm transition-all resize-none"
                                        placeholder="Paste the full job requirements, responsibilities, and qualifications here..."
                                        rows={8}
                                        value={jobDescription}
                                        onChange={(e) => setJobDescription(e.target.value)}
                                    ></textarea>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                                        {isHR ? "Upload Resumes" : "Upload Resume"}
                                    </label>

                                    <div className="flex justify-center px-6 pt-5 pb-6 border-2 border-dashed border-slate-300 dark:border-slate-700 rounded-lg">
                                        <div className="space-y-2 text-center">
                                            <UploadCloud className="mx-auto h-10 w-10 text-slate-400" />

                                            <label className="cursor-pointer text-primary font-medium hover:underline">
                                                Select file(s)
                                                <input
                                                    type="file"
                                                    accept=".pdf,.docx,.txt"
                                                    multiple={isHR}
                                                    className="hidden"
                                                    onChange={(e) => setFiles(e.target.files)}
                                                />
                                            </label>

                                            <p className="text-xs text-slate-500">
                                                PDF, DOC, TXT up to 10MB each
                                            </p>
                                        </div>
                                    </div>

                                    {files && files.length > 0 && (
                                        <div className="border rounded-lg divide-y mt-2">
                                            {Array.from(files).map((file) => (
                                                <div key={file.name} className="flex items-center gap-2 p-2 text-sm">
                                                    <FileText className="h-4 w-4 text-slate-400" />
                                                    <span className="truncate">{file.name}</span>
                                                </div>
                                            ))}
                                        </div>
                                    )}

                                    {uploadError && (
                                        <p className="text-red-600 text-xs">{uploadError}</p>
                                    )}
                                </div>

                                {status && (
                                    <p
                                        className={`text-sm mt-4 text-center font-medium ${status.startsWith("✅")
                                            ? "text-green-600"
                                            : status.startsWith("❌") || status.startsWith("⚠️")
                                                ? "text-red-600"
                                                : "text-gray-700"
                                            }`}
                                    >
                                        {status}
                                    </p>
                                )}
                                <div className="flex items-center justify-between pt-2">
                                    <p className="text-xs text-slate-400 flex items-center gap-1">
                                        <span className="material-symbols-outlined text-sm">
                                            <Info className="size-3" />

                                        </span>
                                        Pro Tip: Clearer descriptions yield better match accuracy.
                                    </p>
                                    <button
                                        className="flex items-center gap-2 px-8 py-3 bg-primary text-white font-bold rounded-lg hover:bg-primary/90 transition-all shadow-lg shadow-primary/20 active:scale-95" type="submit">
                                        <span className="material-symbols-outlined">
                                            <ChartNoAxesCombined />
                                        </span>
                                        {/* <span>Create Analysis</span> */}
                                        {creating && <Loader2 className="animate-spin h-4 w-4 mr-2" />}
                                        {creating ? "Creating..." : "Create Analysis"}
                                    </button>
                                </div>
                            </form>

                        </div>



                    </div>

                    {/* <div className="lg:col-span-4 flex flex-col gap-6">
                        <div className="grid grid-cols-1 gap-4">
                            <div className="bg-white dark:bg-slate-900 p-5 rounded-xl border border-slate-200 dark:border-slate-800 flex items-center gap-4 shadow-sm">
                                <div className="size-12 rounded-lg bg-blue-50 dark:bg-blue-900/20 text-blue-600 flex items-center justify-center">
                                    <span className="material-symbols-outlined text-2xl">
                                        <BookCheck />
                                    </span>
                                </div>
                                <div>
                                    <p className="text-xs font-medium text-slate-500 uppercase tracking-wide">Analyses Completed</p>
                                    <p className="text-2xl font-black text-slate-900 dark:text-white">1,284</p>
                                </div>
                            </div> *

                            <div className="bg-white dark:bg-slate-900 p-5 rounded-xl border border-slate-200 dark:border-slate-800 flex items-center gap-4 shadow-sm">
                                <div className="size-12 rounded-lg bg-amber-50 dark:bg-amber-900/20 text-amber-600 flex items-center justify-center">
                                    <span className="material-symbols-outlined text-2xl">token</span>
                                </div>
                                <div>
                                    <p className="text-xs font-medium text-slate-500 uppercase tracking-wide">Credits Remaining</p>
                                    <p className="text-2xl font-black text-slate-900 dark:text-white">450</p>
                                </div>
                            </div>
                            <div className="bg-white dark:bg-slate-900 p-5 rounded-xl border border-slate-200 dark:border-slate-800 flex items-center gap-4 shadow-sm">
                                <div className="size-12 rounded-lg bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 flex items-center justify-center">
                                    <span className="material-symbols-outlined text-2xl">
                                        <Percent />
                                    </span>
                                </div>
                                <div>
                                    <p className="text-xs font-medium text-slate-500 uppercase tracking-wide">Avg Match Score</p>
                                    <div className="flex items-baseline gap-1">
                                        <p className="text-2xl font-black text-slate-900 dark:text-white">82%</p>
                                        <span className="text-[10px] text-emerald-600 font-bold">+2.4%</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="bg-primary text-white p-6 rounded-xl relative overflow-hidden group">
                            <div className="relative z-10">
                                <h4 className="font-bold mb-2">Need bulk analysis?</h4>
                                <p className="text-sm text-slate-300 mb-4">Upload up to 500 resumes at once with our Enterprise API.</p>
                                <button className="text-xs font-bold underline underline-offset-4 hover:text-white transition-colors">Explore API Docs</button>
                            </div>
                            <div className="absolute -right-4 -bottom-4 opacity-10 group-hover:scale-110 transition-transform duration-500">
                                <span className="material-symbols-outlined text-8xl">bolt</span>
                            </div>
                        </div>
                    </div> */}
                </div>

                {/* Session List */}
                <div className="mt-12 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm">
                    <div className="px-6 py-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between bg-slate-50/50 dark:bg-slate-800/30">
                        <div className="flex items-center gap-2">
                            <span className="material-symbols-outlined text-slate-400">
                                <History className="size-4" />
                            </span>
                            <h3 className="font-bold">Recent Analysis Sessions</h3>
                        </div>
                        <button className="text-sm font-semibold text-primary dark:text-slate-300 hover:underline">View All</button>
                    </div>
                    <SessionList />

                </div>

            </div >
            <Footer />
        </>

    );
}