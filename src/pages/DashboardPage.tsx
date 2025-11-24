import React, { useState, useEffect } from "react";
import { useAppSelector } from "../app/hooks";
import { selectCurrentUser } from "../states/authslice";
import { createSession } from "../api/sessions";
import { getUserSubscription, UserSubscription } from "../api/subscriptions"; // Import the API we made
import { SessionList } from "../components/SessionList";
import { PlusCircle, CreditCard, Loader2 } from "lucide-react";
import { Link } from "react-router-dom";

function HRDashboardSection() {
    return (
        <div className="bg-blue-50 border border-blue-200 rounded-2xl p-6 mb-6">
            <h2 className="text-xl font-semibold text-blue-700 mb-1">HR Tools</h2>
            <p className="text-gray-600">
                Upload multiple resumes from candidates and generate comparative analysis reports.
            </p>
        </div>
    );
}

function JobSeekerDashboardSection() {
    return (
        <div className="bg-green-50 border border-green-200 rounded-2xl p-6 mb-6">
            <h2 className="text-xl font-semibold text-green-700 mb-1">Job Seeker Tools</h2>
            <p className="text-gray-600">
                Upload your resume and get insights on how well it fits a job description.
            </p>
        </div>
    );
}

export default function DashboardPage() {
    const user = useAppSelector(selectCurrentUser);
    
    // Session States
    const [creating, setCreating] = useState(false);
    const [title, setTitle] = useState("");
    const [jobTitle, setJobTitle] = useState("");
    const [jobDescription, setJobDescription] = useState("");

    // Subscription State (To handle the Upgrade Button logic)
    const [subscription, setSubscription] = useState<UserSubscription | null>(null);
    const [loadingSub, setLoadingSub] = useState(true);

    // Fetch Subscription on Mount
    useEffect(() => {
        const fetchSub = async () => {
            try {
                const sub = await getUserSubscription();
                setSubscription(sub);
            } catch (error) {
                console.error("Failed to check subscription", error);
            } finally {
                setLoadingSub(false);
            }
        };
        fetchSub();
    }, []);

    const handleCreate = async () => {
        if (!title.trim() || !jobTitle.trim() || !jobDescription.trim()) {
            alert("Please fill in all fields before creating a session.");
            return;
        }

        try {
            setCreating(true);
            await createSession({ name: title, job_title: jobTitle, job_description: jobDescription });
            window.location.reload();
        } catch (err) {
            console.error(err);
            alert("Error creating session");
        } finally {
            setCreating(false);
        }
    };

    const isHR = user?.role === "employer";
    const isJobSeeker = user?.role === "job_seeker";

    // Logic: Is the user on a paid plan?
    const isPaidPlan = subscription?.Status === "active" && subscription?.PlanID !== null;

    return (
        <div className="min-h-screen bg-gray-50 py-10 px-4">
            <div className="max-w-5xl mx-auto">
                {/* Header */}
                <header className="mb-10 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-800">
                            Welcome back, <span className="text-blue-700">{user?.display_name}</span>
                        </h1>
                        <p className="text-gray-600 mt-1">
                            Manage your sessions or create a new analysis below.
                        </p>
                    </div>

                    {/* Subscription Button */}
                    {!loadingSub && (
                        <Link
                            to="/pricing"
                            className={`inline-flex items-center justify-center px-4 py-2 border rounded-md shadow-sm text-sm font-medium transition-colors ${
                                isPaidPlan 
                                    ? "bg-white text-gray-700 border-gray-300 hover:bg-gray-50" // Neutral style for "Manage"
                                    : "text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 border-transparent" // CTA style for "Upgrade"
                            }`}
                        >
                            <CreditCard className="mr-2 h-4 w-4" />
                            {isPaidPlan ? "Manage Subscription" : "Upgrade Plan"}
                        </Link>
                    )}
                </header>

                {/* Role Section */}
                {isHR && <HRDashboardSection />}
                {isJobSeeker && <JobSeekerDashboardSection />}

                {/* Create Session Card */}
                <div className="bg-white shadow-md rounded-2xl p-8 mb-10">
                    <h2 className="text-2xl font-semibold text-gray-800 mb-6 flex items-center gap-2">
                        <PlusCircle className="text-blue-600 h-6 w-6" />
                        Create a New Session
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                        <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-gray-700 mb-1">Session Title</label>
                            <input
                                type="text"
                                placeholder={
                                    isHR
                                        ? "e.g., Backend Engineer Hiring Round 1"
                                        : "e.g., Resume Analysis for Software Engineer Role"
                                }
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Job Title</label>
                            <input
                                type="text"
                                value={jobTitle}
                                onChange={(e) => setJobTitle(e.target.value)}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm"
                                placeholder="e.g., Senior Software Engineer"
                            />
                        </div>

                        <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Job Description
                            </label>
                            <textarea
                                value={jobDescription}
                                onChange={(e) => setJobDescription(e.target.value)}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm"
                                rows={5}
                                placeholder="Paste the full job description here..."
                            />
                        </div>
                    </div>

                    <div className="flex justify-end">
                        <button
                            onClick={handleCreate}
                            disabled={creating}
                            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-lg shadow-md transition disabled:opacity-50 flex items-center"
                        >
                            {creating && <Loader2 className="animate-spin h-4 w-4 mr-2" />}
                            {creating ? "Creating..." : "Create Session"}
                        </button>
                    </div>
                </div>

                {/* Session List */}
                <SessionList />
            </div>
        </div>
    );
}