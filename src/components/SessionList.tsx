import React, { useEffect, useState } from "react";
import { Session } from "../types";
import { getSessions } from "../api/sessions";
// import { Eye } from "lucide-react";

import { SessionCard } from "./SessionCard";

// import { SessionCard } from "./SessionCard";

export const SessionList = () => {
    const [sessions, setSessions] = useState<Session[]>([]);
    const [loading, setLoading] = useState(true);
    const handleDeleteSession = (id: string) => {
        setSessions(prev => prev.filter(s => s.id !== id));
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getSessions();
                setSessions(data);
            } catch (err) {
                console.error("Error fetching sessions:", err);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    if (loading)
        return <div className="flex flex-col items-center justify-center min-h-[10vh] gap-4">
            <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
            {/* <p className="text-sm text-slate-500 dark:text-slate-400">
            Loading analysis...
        </p> */}
        </div>
    // return <p className="text-gray-500 text-center">Loading sessions...</p>;

    if (!sessions.length)
        return (
            <p className="p-10 text-gray-500 text-center">
                No previous sessions found. Create one to get started!
            </p>
        );

    return (
        // <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
        //     {sessions.map((session) => (
        //         <SessionCard key={session.id} session={session} />
        //     ))}
        // </div>
        <table className="w-full text-left">
            <thead>
                <tr className="text-[10px] uppercase tracking-wider text-slate-400 border-b border-slate-100 dark:border-slate-800">
                    <th className="px-6 py-4 font-bold">Session Name</th>
                    <th className="px-6 py-4 font-bold">Job Title</th>
                    <th className="px-6 py-4 font-bold">Status</th>
                    <th className="px-6 py-4 font-bold">Date Created</th>
                    {/* <th className="px-6 py-4 font-bold text-right">Actions</th> */}
                </tr>
            </thead>

            <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-sm">
                {sessions.map((session) => {
                    //         const session_status = useSessionUpdates(session)

                    //         const isCompleted = session_status === "completed";

                    //         return (
                    //             <tr
                    //                 onClick={() => {
                    //                     navigate(`/session/${session.id}`)

                    //                 }}
                    //                 key={session.id}
                    //                 className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"
                    //             >
                    //                 <td className="px-6 py-4 font-medium">
                    //                     {session.name}
                    //                 </td>

                    //                 <td className="px-6 py-4 text-slate-500">
                    //                     {session.job_title}
                    //                 </td>

                    //                 <td className="px-6 py-4">
                    //                     <span
                    //                         className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold
                    //   ${isCompleted
                    //                                 ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400"
                    //                                 : "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400"
                    //                             }
                    // `}
                    //                     >
                    //                         <span
                    //                             className={`size-1.5 rounded-full ${isCompleted
                    //                                 ? "bg-emerald-500"
                    //                                 : "bg-blue-500 animate-pulse"
                    //                                 }`}
                    //                         ></span>
                    //                         {isCompleted ? "Completed" : "Processing"}
                    //                     </span>
                    //                 </td>

                    //                 <td className="px-6 py-4 text-slate-500">
                    //                     {new Date(session.created_at).toLocaleDateString()}
                    //                 </td>

                    //                 <td className="px-6 py-4 text-right">
                    //                     {/* <button className="p-1.5 text-slate-400 hover:text-primary transition-colors">
                    //                         <span className="material-symbols-outlined text-xl">
                    //                             <Eye className="size-5" />
                    //                         </span>
                    //                     </button> */}
                    //                     <button
                    //                         onClick={(e) => {
                    //                             e.stopPropagation();
                    //                             analyzeResume(session.id)

                    //                         }}
                    //                         className="flex items-center gap-1 text-gray-500 hover:text-blue-600 transition"
                    //                         title="Rerun Analysis"
                    //                     >
                    //                         <RotateCcw className="w-4 h-4" />
                    //                     </button>
                    //                 </td>
                    //             </tr>
                    //         );
                    return (
                        <SessionCard
                            session={session} key={session.id}
                            onDeleteSuccess={handleDeleteSession} />// Pass the callback/>
                    )
                })}
            </tbody>
        </table>
    );
};
