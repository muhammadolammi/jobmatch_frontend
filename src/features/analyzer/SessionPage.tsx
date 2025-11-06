import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { FileUploader } from "../../components/FileUploader";
import { ResultView } from "../../components/ResultsView";
import { ResultType } from "../../types";
import { useAppSelector } from "../../app/hooks";
import { selectCurrentUser } from "../../states/authslice";


export default function SessionPage() {
    const { id: sessionId } = useParams<{ id: string }>();
    const [result, setResult] = useState<ResultType | null>(null);
    const user = useAppSelector(selectCurrentUser);

    const isHR = user?.role === "employer";
    // const isJobSeeker = user?.role === "job_seeker";

    return (
        <div className="min-h-screen bg-gray-100 py-10 px-4">
            <div className="max-w-4xl mx-auto mb-10">
                <h1 className="text-3xl font-bold text-blue-700 mb-2">
                    {isHR ? "Candidate Resume Analysis" : "Resume Fit Analysis"}
                </h1>
                <p className="text-gray-600">
                    {isHR
                        ? "Upload a folder of candidate resumes for bulk analysis."
                        : "Upload your resume and compare it to job descriptions."}
                </p>
            </div>

            {/* File Uploader adapts based on user role */}
            <FileUploader
                onResult={setResult}
                sessionId={sessionId || ""}
                allowMultiple={isHR} // 🔥 easily handled in the component
            />

            <ResultView result={result} />
        </div>
    );
}

