import React, { useState } from "react";
import { api } from "../api/client";
import { ResultType } from "../types";
import { Loader2, UploadCloud, FileText } from "lucide-react"; // Added icons

interface Props {
    onResults: (data: ResultType[]) => void;
    sessionId: string;
}

const allowedExtensions = [".pdf", ".docx", ".txt"];

export const FileUploader: React.FC<Props> = ({ onResults, sessionId }) => {
    const [files, setFiles] = useState<FileList | null>(null);
    const [jobTitle, setJobTitle] = useState("");
    const [jobDescription, setJobDescription] = useState("");
    const [status, setStatus] = useState("");
    const [loading, setLoading] = useState(false);

    // --- All existing logic is preserved ---
    const handleUpload = async () => {
        if (!files || files.length === 0) {
            setStatus("⚠️ Please select at least one file.");
            return;
        }
        if (!jobTitle || !jobDescription) {
            setStatus("⚠️ Please fill out the job title and description.");
            return;
        }

        setLoading(true);
        setStatus("Uploading resumes...");
        const formData = new FormData();
        formData.append('session_id', sessionId);
        let validFiles = true;

        Array.from(files).forEach((file) => {
            const ext = file.name.slice(file.name.lastIndexOf(".")).toLowerCase();
            if (!allowedExtensions.includes(ext)) {
                setStatus(`❌ Invalid file type: ${file.name}`);
                setLoading(false);
                validFiles = false;
                return;
            }
            formData.append("files", file);
        });

        if (!validFiles) return;

        try {
            await api.post("/upload", formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });
            setStatus("✅ Upload complete. Running analysis...");

            const payload = {
                job_title: jobTitle,
                job_description: jobDescription,
                session_id: sessionId,
            };

            const res = await api.post("/analyze", payload);
            onResults(res.data);
            setStatus("✅ Analysis complete.");

            // Clear form on success
            setFiles(null);
            setJobTitle("");
            setJobDescription("");

        } catch (err: any) {
            console.error(err.message);
            setStatus(`❌ Error: ${err.response?.data?.detail || "Something went wrong."}`);
        } finally {
            setLoading(false);
        }
    };

    // --- MODERNIZED UI ---
    return (
        <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">
                AI Resume Analyzer
            </h2>

            <div className="space-y-6">
                {/* --- Job Details Inputs --- */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Job Title
                        </label>
                        <input
                            type="text"
                            value={jobTitle}
                            onChange={(e) => setJobTitle(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            rows={5}
                            placeholder="Paste the full job description here..."
                        />
                    </div>
                </div>

                {/* --- File Dropzone Input --- */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Resumes
                    </label>
                    <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg">
                        <div className="space-y-1 text-center">
                            <UploadCloud className="mx-auto h-12 w-12 text-gray-400" />
                            <div className="flex text-sm text-gray-600">
                                <label
                                    htmlFor="file-upload"
                                    className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500"
                                >
                                    <span>Click to upload files</span>
                                    <input
                                        id="file-upload"
                                        name="file-upload"
                                        type="file"
                                        multiple
                                        accept=".pdf,.docx,.txt"
                                        className="sr-only"
                                        onChange={(e) => setFiles(e.target.files)}
                                    />
                                </label>
                                <p className="pl-1">or drag and drop</p>
                            </div>
                            <p className="text-xs text-gray-500">
                                .pdf, .docx, .txt up to 10MB each
                            </p>
                        </div>
                    </div>
                </div>

                {/* --- Selected Files List --- */}
                {files && files.length > 0 && (
                    <div className="space-y-2">
                        <h4 className="text-sm font-medium text-gray-600">Selected Files:</h4>
                        <ul className="border border-gray-200 rounded-lg divide-y divide-gray-200">
                            {Array.from(files).map((file, i) => (
                                <li key={i} className="pl-3 pr-4 py-3 flex items-center justify-between text-sm">
                                    <div className="w-0 flex-1 flex items-center">
                                        <FileText className="flex-shrink-0 h-5 w-5 text-gray-400" />
                                        <span className="ml-2 flex-1 w-0 truncate">{file.name}</span>
                                    </div>
                                </li>
                            ))}
                        </ul>
                        <button
                            onClick={() => setFiles(null)}
                            className="text-xs text-gray-500 hover:text-red-600 transition"
                        >
                            Clear selection
                        </button>
                    </div>
                )}

                {/* --- Upload Button & Status --- */}
                <div>
                    <button
                        onClick={handleUpload}
                        disabled={loading}
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-lg transition-all shadow-md disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                    >
                        {loading ? (
                            <>
                                <Loader2 className="animate-spin mr-2 h-5 w-5" /> Processing...
                            </>
                        ) : (
                            "Analyze Resumes"
                        )}
                    </button>

                    {status && (
                        <p className={`text-sm mt-4 text-center font-medium ${status.startsWith("✅") ? "text-green-600" :
                            status.startsWith("❌") || status.startsWith("⚠️") ? "text-red-600" :
                                "text-gray-700"
                            }`}>
                            {status}
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
};