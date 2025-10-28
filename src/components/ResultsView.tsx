import React from "react";
import { ResultType } from "../types";
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
    result: ResultType | null;
}

const SkillTag: React.FC<{ text: string; type: "relevant" | "missing" }> = ({
    text,
    type,
}) => (
    <span
        className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${type === "relevant"
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

export const ResultView: React.FC<Props> = ({ result }) => {
    if (!result) {
        return (
            <div className="mt-8 text-center text-gray-500">
                No analysis yet. Upload a resume to see results.
            </div>
        );
    }

    const isRecommended = result.recommendation
        ? !result.recommendation.toLowerCase().includes("not recommended")
        : false;

    return (
        <div className="mt-12 max-w-4xl mx-auto px-4">
            {/* --- Header --- */}
            <div className="bg-white shadow-2xl rounded-3xl overflow-hidden border border-gray-100 transition-all hover:shadow-3xl">
                <div className="p-8 border-b border-gray-100 bg-gradient-to-r from-blue-50 to-blue-100">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                        <div className="flex items-center gap-3">
                            <User className="h-6 w-6 text-blue-600" />
                            <h3 className="text-xl font-semibold text-gray-800">
                                {result.candidate_email}
                            </h3>
                        </div>
                        <div className="bg-blue-600 text-white px-5 py-3 rounded-xl text-center">
                            <span className="block text-xs uppercase tracking-wider font-semibold">
                                Match Score
                            </span>
                            <p className="text-4xl font-bold">{result.match_score}%</p>
                        </div>
                    </div>
                </div>

                {/* --- Body --- */}
                <div className="p-8 space-y-8">
                    {/* --- Summary --- */}
                    <section>
                        <h4 className="text-lg font-semibold text-gray-700 mb-2 flex items-center">
                            <ClipboardList className="h-5 w-5 mr-2 text-blue-500" />
                            AI Summary
                        </h4>
                        <p className="text-gray-600 text-sm leading-relaxed">
                            {result.summary}
                        </p>
                    </section>

                    {/* --- Skills --- */}
                    <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <h4 className="text-md font-semibold text-gray-700 mb-3 flex items-center">
                                <CheckCircle2 className="h-5 w-5 mr-2 text-green-500" />
                                Relevant Skills
                            </h4>
                            <div className="flex flex-wrap gap-2">
                                {result.relevant_skills.length > 0 ? (
                                    result.relevant_skills.map((skill) => (
                                        <SkillTag key={skill} text={skill} type="relevant" />
                                    ))
                                ) : (
                                    <span className="text-sm text-gray-500 italic">
                                        No relevant skills found.
                                    </span>
                                )}
                            </div>
                        </div>

                        <div>
                            <h4 className="text-md font-semibold text-gray-700 mb-3 flex items-center">
                                <XCircle className="h-5 w-5 mr-2 text-red-500" />
                                Missing Skills
                            </h4>
                            <div className="flex flex-wrap gap-2">
                                {result.missing_skills.length > 0 ? (
                                    result.missing_skills.map((skill) => (
                                        <SkillTag key={skill} text={skill} type="missing" />
                                    ))
                                ) : (
                                    <span className="text-sm text-gray-500 italic">
                                        No missing skills found.
                                    </span>
                                )}
                            </div>
                        </div>
                    </section>

                    {/* --- Relevant Experience --- */}
                    <section>
                        <h4 className="text-md font-semibold text-gray-700 mb-3">
                            Relevant Experience
                        </h4>
                        <ul className="list-disc list-inside space-y-1 text-sm text-gray-600">
                            {result.relevant_experience.length > 0 ? (
                                result.relevant_experience.map((exp, i) => (
                                    <li key={i}>{exp}</li>
                                ))
                            ) : (
                                <li className="italic list-none">
                                    No specific experience snippets found.
                                </li>
                            )}
                        </ul>
                    </section>

                    {/* --- Recommendation --- */}
                    <section>
                        <h4 className="text-md font-semibold text-gray-700 mb-2">
                            Recommendation
                        </h4>
                        <div
                            className={`p-5 rounded-xl flex items-center ${isRecommended
                                ? "bg-green-50 text-green-700"
                                : "bg-red-50 text-red-700"
                                }`}
                        >
                            {isRecommended ? (
                                <ThumbsUp className="h-5 w-5 mr-3 flex-shrink-0" />
                            ) : (
                                <ThumbsDown className="h-5 w-5 mr-3 flex-shrink-0" />
                            )}
                            <p className="text-sm font-medium">{result.recommendation}</p>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
};
