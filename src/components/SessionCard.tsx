import { Calendar, RotateCcw } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { Session } from "../types";
import React, { useEffect, useState } from "react";
import { analyzeResume } from "../helpers/analyse";
// import { useSessionUpdates } from "../hooks/useSessionUpdates";

export const SessionCard = ({ session }: { session: Session }) => {
    const navigate = useNavigate();
    const handleClick = () => navigate(`/session/${session.id}`);
    // const { id: sessionId } = useParams<{ id: string }>();
    const [status, setStatus] = useState(session.status || "idle");


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
    }, [session.id]);

    return (
        <div
            onClick={handleClick}
            className="relative p-5 rounded-2xl bg-white shadow hover:shadow-md cursor-pointer transition"
        >
            {/* Header Row */}
            <div className="flex justify-between items-start">
                <div>
                    <h3 className="font-semibold text-lg text-gray-800">{session.name}</h3>
                    <div className="flex items-center text-sm text-gray-500 mt-1">
                        <Calendar className="w-4 h-4 mr-1" />
                        {new Date(session.created_at).toLocaleString()}
                    </div>
                </div>

                {/* ✅ Rerun Button */}
                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        analyzeResume(session.id)

                    }}
                    className="flex items-center gap-1 text-gray-500 hover:text-blue-600 transition"
                    title="Rerun Analysis"
                >
                    <RotateCcw className="w-4 h-4" />
                </button>
            </div>

            {/* Status Tag */}
            <div className="mt-3">
                <span
                    className={`px-3 py-1 text-xs font-medium rounded-full ${status === "completed"
                        ? "bg-green-100 text-green-700"
                        : status === "failed"
                            ? "bg-red-100 text-red-700"
                            : "bg-yellow-100 text-yellow-700"
                        }`}
                >
                    {status}
                </span>
            </div>
        </div>
    );
};
