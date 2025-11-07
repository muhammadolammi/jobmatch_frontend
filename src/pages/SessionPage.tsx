import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { FileUploader } from "../components/FileUploader";
import { ResultView } from "../components/ResultsView";
import { ResultType } from "../types";
import { useAppSelector } from "../app/hooks";
import { selectCurrentUser } from "../states/authslice";

export default function SessionPage() {
    const { id: sessionId } = useParams<{ id: string }>();
    const [results, setResults] = useState<ResultType[] | null>(null);
    const user = useAppSelector(selectCurrentUser);

    const isHR = user?.role === "employer";

    // ✅ Handle backend returning list or single object
    const handleResult = (data: ResultType | ResultType[]) => {
        if (Array.isArray(data)) {
            setResults(data);
        } else {
            setResults([data]);
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 py-10 px-4">
            <div className="max-w-4xl mx-auto mb-10">
                <h1 className="text-3xl font-bold text-blue-700 mb-2">
                    {isHR ? "Candidate Resume Analysis" : "Resume Fit Analysis"}
                </h1>
                <p className="text-gray-600">
                    {isHR
                        ? "Upload multiple candidate resumes for AI-driven insights."
                        : "Upload your resume and compare it to target job descriptions."}
                </p>
            </div>

            {/* ✅ Uploader dynamically supports single or multiple files */}
            <FileUploader
                onResult={handleResult}
                sessionId={sessionId || ""}
                allowMultiple={isHR}
            />

            {/* ✅ Results List Section */}
            <div className="max-w-4xl mx-auto mt-12 space-y-8">
                {results && results.length > 0 ? (
                    results.map((res, i) => (
                        <div
                            key={res.id || i}
                            className="bg-white shadow rounded-xl p-6 transition hover:shadow-md"
                        >
                            {/* Optional header when HR uploads multiple resumes */}
                            {isHR && results.length > 1 && (
                                <div className="mb-3 border-b border-gray-200 pb-2">
                                    <h3 className="text-lg font-semibold text-gray-800">
                                        Candidate {i + 1}: {res.candidate_email || "Unnamed"}
                                    </h3>
                                </div>
                            )}

                            <ResultView result={res} />
                        </div>
                    ))
                ) : (
                    <div className="text-center text-gray-500 mt-8">
                        No analysis results yet. Upload or rerun analysis to begin.
                    </div>
                )}
            </div>
        </div>
    );
}
