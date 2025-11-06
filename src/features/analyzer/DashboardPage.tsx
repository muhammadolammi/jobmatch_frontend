import React, { useState } from "react";
import { useAppSelector } from "../../app/hooks";
import { selectCurrentUser } from "../../states/authslice";
import { createSession } from "../../api/sessions";
import { SessionList } from "../../components/SessionList";

// ✅ Reusable subcomponents for each user role
function HRDashboardSection() {
    return (
        <div className="bg-blue-50 border-l-4 border-blue-400 p-4 rounded-xl mb-6">
            <h2 className="text-lg font-semibold text-blue-700">HR Tools</h2>
            <p className="text-gray-600">
                Upload multiple resumes from candidates and generate analysis reports.
            </p>
        </div>
    );
}

function JobSeekerDashboardSection() {
    return (
        <div className="bg-green-50 border-l-4 border-green-400 p-4 rounded-xl mb-6">
            <h2 className="text-lg font-semibold text-green-700">Job Seeker Tools</h2>
            <p className="text-gray-600">
                Upload your resume and analyze how well it fits job descriptions.
            </p>
        </div>
    );
}

function DashboardPage() {
    const user = useAppSelector(selectCurrentUser);
    const [creating, setCreating] = useState(false);
    const [title, setTitle] = useState("");

    const handleCreate = async () => {
        if (!title.trim()) return;
        try {
            setCreating(true);
            await createSession(title);
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

    return (
        <div className="min-h-screen bg-gray-100 py-10 px-4">
            <div className="max-w-5xl mx-auto">
                {/* Header */}
                <div className="flex justify-between items-center mb-8">
                    <div>
                        <h1 className="text-3xl font-bold text-blue-700">
                            Welcome back, {user?.email}
                        </h1>
                        <p className="text-gray-600">
                            Manage your previous sessions or start a new one below.
                        </p>
                    </div>
                </div>

                {/* Role-specific section */}
                {isHR && <HRDashboardSection />}
                {isJobSeeker && <JobSeekerDashboardSection />}

                {/* Create Session */}
                <div className="bg-white p-4 rounded-2xl shadow mb-8 flex gap-2">
                    <input
                        type="text"
                        placeholder={
                            isHR
                                ? "Enter a title for your new hiring session..."
                                : "Enter a title for your new analysis session..."
                        }
                        className="flex-grow border rounded-lg px-3 py-2"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                    <button
                        onClick={handleCreate}
                        disabled={creating}
                        className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
                    >
                        {creating ? "Creating..." : "New Session"}
                    </button>
                </div>

                {/* Session list */}
                <SessionList />
            </div>
        </div>
    );
}

export default DashboardPage;
