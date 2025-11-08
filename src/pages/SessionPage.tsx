import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FileUploader } from "../components/FileUploader";
import { ResultView } from "../components/ResultsView";
import { ResultType } from "../types";
import { useAppSelector } from "../app/hooks";
import { selectCurrentUser } from "../states/authslice";
import { api } from "../api/client";
import { Session } from "../types";
import { getSession } from "../api/sessions";

export default function SessionPage() {
    const { id: sessionId } = useParams<{ id: string }>();
    const [results, setResults] = useState<ResultType[] | null>(null);
    const [loading, setLoading] = useState(true);
    const [session, setSession] = useState<Session | null>();

    const user = useAppSelector(selectCurrentUser);
    const isHR = user?.role === "employer";
    const [status, setStatus] = useState("idle");

    // ✅ Listen for live updates per session 
    useEffect(() => {
        if (!session) return;

        const source = new EventSource(`/api/sessions/${session.id}/updates`, {
            withCredentials: true,
        });
        // 
        source.onmessage = (event) => {
            const data = JSON.parse(event.data);
            console.log("SSE update:", data);
            setStatus(data.status || "unknown");

            if (["completed", "failed"].includes(data.status)) {
                source.close();
            }
        };
        source.onerror = () => source.close();
        return () => source.close();
    }, [sessionId]);

    const handleResult = (data: ResultType | ResultType[]) => {
        if (Array.isArray(data)) {
            setResults(data);
        } else {
            setResults([data]);
        }
    };
    async function fetchResult() {
        try {
            setLoading(true);
            const response = await api.get(`/results/${sessionId}`);
            handleResult(response.data.results);
            console.log("✅ Results fetched after completion");
        } catch (error) {
            console.error("Error fetching data:", error);
        } finally {
            setLoading(false);
        }
    }

    async function fetchSession() {
        try {
            setLoading(true);
            const sessionRes = await getSession(sessionId!);
            setSession(sessionRes);
        } catch (error) {
            console.error("Error fetching session:", error);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        if (!sessionId) return;
        fetchResult()

        fetchSession();
    }, [sessionId]);

    // ✅ Run this when status becomes completed
    useEffect(() => {
        if (!sessionId) return;
        if (status !== "completed") return; // only when done
        fetchResult();
    }, [sessionId, status]);


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

            {/* ✅ Upload component */}
            <FileUploader sessionId={sessionId || ""} allowMultiple={isHR} />

            {/* ✅ Results section */}
            <div className="max-w-4xl mx-auto mt-12 space-y-8">
                {loading ? (
                    <div className="text-center text-gray-500 animate-pulse">
                        Loading analysis results...
                    </div>
                ) : results && results.length > 0 ? (
                    results.map((res, i) => (
                        <div
                            key={res.id || i}
                            className={`p-6 rounded-xl border shadow-sm transition ${res.is_error_result
                                ? "bg-red-50 border-red-300"
                                : "bg-white hover:shadow-md"
                                }`}
                        >
                            {isHR && (
                                <div className="mb-3 border-b border-gray-200 pb-2">
                                    <h3 className="text-lg font-semibold text-gray-800">
                                        Candidate {i + 1}: {res.candidate_email || "Unnamed"}
                                    </h3>
                                </div>
                            )}

                            {/* ✅ Error Result */}
                            {res.is_error_result ? (
                                <div>
                                    <p className="text-red-700 font-semibold">
                                        Error generating analysis:
                                    </p>
                                    <p className="text-red-600 mt-1">
                                        {res.error || "Unknown error occurred."}
                                    </p>
                                </div>
                            ) : (
                                <ResultView result={res} />
                            )}
                            {status !== "completed" && (
                                <div className="text-center text-sm text-yellow-700 bg-yellow-50 border border-yellow-200 rounded-md py-2 mt-4">
                                    {status === "failed"
                                        ? "Analysis failed. Please retry."
                                        : "Generating analysis... this may take a few seconds."}
                                </div>
                            )}
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
