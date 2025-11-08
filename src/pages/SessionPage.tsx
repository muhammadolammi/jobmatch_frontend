import React, { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { FileUploader } from "../components/FileUploader";
import { ResultView } from "../components/ResultsView";
import { ResultType } from "../types";
import { useAppSelector } from "../app/hooks";
import { selectCurrentUser } from "../states/authslice";
import { api } from "../api/client";
import { Session } from "../types";
import { getSession } from "../api/sessions";
import { useSessionUpdates } from "../hooks/useSessionUpdates";

export default function SessionPage() {
    const { id: sessionId } = useParams<{ id: string }>();
    const [session, setSession] = useState<Session | null>(null);
    const [results, setResults] = useState<ResultType[] | null>(null);
    const [loadingSession, setLoadingSession] = useState(false);
    const [loadingResults, setLoadingResults] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const user = useAppSelector(selectCurrentUser);
    const isHR = user?.role === "employer";

    const status = useSessionUpdates(session);

    const handleResult = (data: ResultType | ResultType[]) => {
        setResults(Array.isArray(data) ? data : [data]);
    };

    useEffect(() => {
        if (!sessionId) return;
        let mounted = true;

        (async () => {
            setError(null);
            setLoadingSession(true);
            try {
                const s = await getSession(sessionId);
                if (!mounted) return;
                setSession(s);
            } catch (err: any) {
                console.error("fetch session failed", err);
                if (mounted) setError("Failed to load session.");
            } finally {
                if (mounted) setLoadingSession(false);
            }
        })();

        return () => {
            mounted = false;
        };
    }, [sessionId]);

    useEffect(() => {
        if (!sessionId) return;
        let mounted = true;

        const fetchResults = async () => {
            setError(null);
            setLoadingResults(true);
            try {
                const resp = await api.get(`/results/${sessionId}`);
                if (!mounted) return;
                handleResult(resp.data?.results ?? []);
            } catch (err) {
                console.error("fetch results error", err);
                if (mounted) setError("Failed to load analysis results.");
            } finally {
                if (mounted) setLoadingResults(false);
            }
        };

        if (session?.status === "completed" || status === "completed") {
            fetchResults();
        }

        return () => {
            mounted = false;
        };
    }, [sessionId, session?.status, status]);

    const isGenerating = status && !["completed", "failed", "idle"].includes(status);
    const showLoading = loadingSession || loadingResults;

    const content = useMemo(() => {
        if (showLoading) return <div className="text-center text-gray-500 animate-pulse">Loading analysis...</div>;
        if (error) return <div className="text-center text-red-600">{error}</div>;
        if (!results || results.length === 0)
            return <div className="text-center text-gray-500 mt-8">No analysis results yet. Upload or rerun analysis to begin.</div>;

        if (isHR) {
            return (
                <div className="flex flex-wrap -mx-2">
                    {results.map((res, i) => (
                        <ResultView key={res.id ?? i} result={res} />
                    ))}
                </div>
            );
        }

        return (
            <div className="space-y-6">
                {results.map((res, i) => (
                    <ResultView key={res.id ?? i} result={res} />
                ))}
            </div>
        );
    }, [results, showLoading, error, isHR]);

    return (
        <div className="min-h-screen bg-gray-100 py-10 px-4">
            <div className="max-w-4xl mx-auto mb-6">
                <h1 className="text-3xl font-bold text-blue-700 mb-2">
                    {isHR ? "Candidate Resume Analysis" : "Resume Fit Analysis"}
                </h1>
                <p className="text-gray-600">
                    {isHR
                        ? "Upload multiple candidate resumes for AI-driven insights."
                        : "Upload your resume and compare it to target job descriptions."}
                </p>
            </div>

            <div className="max-w-4xl mx-auto">
                <FileUploader sessionId={sessionId || ""} allowMultiple={isHR} />

                <div className="mt-6">
                    {status === "failed" && (
                        <div className="rounded-md bg-red-50 border border-red-200 p-3 text-red-700">
                            Analysis failed. You can retry the analysis or re-upload resumes.
                        </div>
                    )}
                    {isGenerating && (
                        <div className="rounded-md bg-yellow-50 border border-yellow-200 p-3 text-yellow-700">
                            Generating analysis — this may take a few seconds. (Status: {status})
                        </div>
                    )}
                    {status === "completed" && (
                        <div className="rounded-md bg-green-50 border border-green-200 p-3 text-green-700">
                            Analysis complete.
                        </div>
                    )}
                </div>

            </div>
            <div className="mt-6">{content}</div>

        </div>
    );
}
