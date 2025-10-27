import React from "react";
import { ResultType } from "../types";
// Import icons for a richer UI
import {
    CheckCircle2,
    XCircle,
    ClipboardList,
    ThumbsUp,
    ThumbsDown,
    Star,
    User,
} from "lucide-react";

interface Props {
    results: ResultType[];
}

// --- Helper component for tags ---
const SkillTag: React.FC<{ text: string; type: "relevant" | "missing" }> = ({
    text,
    type,
}) => (
    <span
        className={`inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium ${type === "relevant"
            ? "bg-green-100 text-green-800"
            : "bg-red-100 text-red-800"
            }`}
    >
        {type === "relevant" ? (
            <Star className="mr-1.5 h-4 w-4" />
        ) : (
            <XCircle className="mr-1.5 h-4 w-4" />
        )}
        {text}
    </span>
);

export const ResultsView: React.FC<Props> = ({ results }) => {
    if (!results.length) return null;

    // Sort results by match_score descending
    const sortedResults = [...results].sort((a, b) => b.match_score - a.match_score);

    return (
        <div className="mt-12 max-w-6xl mx-auto px-4">
            <h2 className="text-3xl font-bold mb-8 text-center text-gray-800">
                Analysis Results
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {sortedResults.map((r, idx) => (
                    <div
                        key={idx}
                        className="bg-white shadow-xl rounded-2xl overflow-hidden transition-all hover:shadow-2xl"
                    >
                        {/* --- Card Header --- */}
                        <div className="p-6 border-b border-gray-200 bg-gray-50 flex flex-col md:flex-row justify-between md:items-center gap-4">
                            <div>
                                <h3 className="text-xl font-semibold text-gray-900 flex items-center">
                                    <User className="h-5 w-5 mr-2 text-gray-500" />
                                    {r.candidate_email}
                                </h3>
                            </div>
                            <div className="text-center bg-blue-600 text-white rounded-lg px-6 py-3">
                                <span className="text-sm font-medium uppercase tracking-wide">
                                    Match Score
                                </span>
                                <p className="text-4xl font-bold">{r.match_score}%</p>
                            </div>
                        </div>

                        <div className="p-6 space-y-6">
                            {/* --- Summary --- */}
                            <div>
                                <h4 className="text-lg font-semibold text-gray-700 mb-2 flex items-center">
                                    <ClipboardList className="h-5 w-5 mr-2 text-blue-500" />
                                    AI Summary
                                </h4>
                                <p className="text-sm text-gray-600 leading-relaxed">
                                    {r.summary}
                                </p>
                            </div>

                            {/* --- Skills Grid --- */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {/* Relevant Skills */}
                                <div>
                                    <h4 className="text-md font-semibold text-gray-700 mb-3 flex items-center">
                                        <CheckCircle2 className="h-5 w-5 mr-2 text-green-500" />
                                        Relevant Skills
                                    </h4>
                                    <div className="flex flex-wrap gap-2">
                                        {r.relevant_skills.length > 0 ? (
                                            r.relevant_skills.map((skill) => (
                                                <SkillTag key={skill} text={skill} type="relevant" />
                                            ))
                                        ) : (
                                            <span className="text-sm text-gray-500 italic">
                                                No relevant skills found.
                                            </span>
                                        )}
                                    </div>
                                </div>

                                {/* Missing Skills */}
                                <div>
                                    <h4 className="text-md font-semibold text-gray-700 mb-3 flex items-center">
                                        <XCircle className="h-5 w-5 mr-2 text-red-500" />
                                        Missing Skills
                                    </h4>
                                    <div className="flex flex-wrap gap-2">
                                        {r.missing_skills.length > 0 ? (
                                            r.missing_skills.map((skill) => (
                                                <SkillTag key={skill} text={skill} type="missing" />
                                            ))
                                        ) : (
                                            <span className="text-sm text-gray-500 italic">
                                                No missing skills found.
                                            </span>
                                        )}
                                    </div>
                                </div>
                            </div>

                            {/* --- Relevant Experience (as a list) --- */}
                            <div>
                                <h4 className="text-md font-semibold text-gray-700 mb-3">
                                    Relevant Experience
                                </h4>
                                <ul className="list-disc list-inside space-y-1 text-sm text-gray-600">
                                    {r.relevant_experience.length > 0 ? (
                                        r.relevant_experience.map((exp, i) => <li key={i}>{exp}</li>)
                                    ) : (
                                        <li className="italic list-none">No specific experience snippets found.</li>
                                    )}
                                </ul>
                            </div>

                            {/* --- Recommendation Callout --- */}
                            <div>
                                <h4 className="text-md font-semibold text-gray-700 mb-2">
                                    Recommendation
                                </h4>
                                <div
                                    className={`p-4 rounded-lg flex items-center ${r.recommendation.toLowerCase().includes("not")
                                        ? "bg-red-50 text-red-700"
                                        : "bg-green-50 text-green-700"
                                        }`}
                                >
                                    {r.recommendation.toLowerCase().includes("not") ? (
                                        <ThumbsDown className="h-5 w-5 mr-3 flex-shrink-0" />
                                    ) : (
                                        <ThumbsUp className="h-5 w-5 mr-3 flex-shrink-0" />
                                    )}
                                    <p className="text-sm font-medium">{r.recommendation}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};