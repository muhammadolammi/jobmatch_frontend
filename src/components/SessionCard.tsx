import { Delete, Loader2, RotateCcw } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Session } from "../types";
import { analyzeResume } from "../helpers/analyse";
import { useSessionUpdates } from "../hooks/useSessionUpdates";
import { useState } from "react";
import { api } from "../api/client";
// import { useSessionUpdates } from "../hooks/useSessionUpdates";

export const SessionCard = ({ session, onDeleteSuccess }: { session: Session, onDeleteSuccess: (id: string) => void }) => {
    const navigate = useNavigate();
    const handleClick = () => navigate(`/session/${session.id}`);
    // const { id: sessionId } = useParams<{ id: string }>();
    // const [status, setStatus] = useState(session.status || "idle");
    const status = useSessionUpdates(session)
    const [isdeleteloading, setisdeleteloading] = useState(false);
    const [rerunning, setRerunning] = useState(false);
    const handleRerun = async () => {
        try {
            setRerunning(true);
            await analyzeResume(session.id, 'Analysis re-queued successfully!');
            // setStatus("✅ Analysis re-queued successfully!");
        } catch (err: any) {
            const remaining = err.response.data?.remaining_seconds;
            const message = err.response.data?.message || "Too many requests. Try again later.";

            if (remaining) {
                const hours = Math.floor(remaining / 3600);
                const minutes = Math.floor((remaining % 3600) / 60);
                alert(`⏳ ${message}\nYou can try again in ${hours}h ${minutes}m.`);
            } else {
                alert(message);
            }
        } finally {
            setRerunning(false);
        }
    };
    const handleDelete = async () => {
        try {
            setisdeleteloading(true)
            await api.delete(`/sessions/${session.id}`)
            onDeleteSuccess(session.id);
        } catch (error) {
            setisdeleteloading(false)

            alert("error deleting session")
        } finally {
            setisdeleteloading(false)
        }
    }

    // ✅ Listen for live updates per session 
    // useEffect(() => {
    //     if (!session) return;
    //     const source = new EventSource(`/api/sessions/${session.id}/updates`, {
    //         withCredentials: true,
    //     });
    //     // 
    //     source.onmessage = (event) => {
    //         const data = JSON.parse(event.data);
    //         console.log("SSE update:", data);
    //         setStatus(data.status || "unknown");

    //         if (["completed", "failed"].includes(data.status)) {
    //             source.close();
    //         }
    //     };
    //     source.onerror = () => source.close();
    //     return () => source.close();
    // }, [session.id]);

    return (
        // <div
        //     onClick={handleClick}
        //     className="relative p-5 rounded-2xl bg-white shadow hover:shadow-md cursor-pointer transition"
        // >
        //     {/* Header Row */}
        //     <div className="flex justify-between items-start">
        //         <div>
        //             <h3 className="font-semibold text-lg text-gray-800">{session.name}</h3>
        //             <div className="flex items-center text-sm text-gray-500 mt-1">
        //                 <Calendar className="w-4 h-4 mr-1" />
        //                 {new Date(session.created_at).toLocaleString()}
        //             </div>
        //         </div>

        //         {/* ✅ Rerun Button */}
        //         <button
        //             onClick={(e) => {
        //                 e.stopPropagation();
        //                 analyzeResume(session.id)

        //             }}
        //             className="flex items-center gap-1 text-gray-500 hover:text-blue-600 transition"
        //             title="Rerun Analysis"
        //         >
        //             <RotateCcw className="w-4 h-4" />
        //         </button>
        //     </div>

        //     {/* Status Tag */}
        //     <div className="mt-3">
        //         <span
        //             className={`px-3 py-1 text-xs font-medium rounded-full ${status === "completed"
        //                 ? "bg-green-100 text-green-700"
        //                 : status === "failed"
        //                     ? "bg-red-100 text-red-700"
        //                     : "bg-yellow-100 text-yellow-700"
        //                 }`}
        //         >
        //             {status}
        //         </span>
        //     </div>
        // </div>
        <tr
            onClick={handleClick}
            key={session.id}
            className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"
        >
            <td className="px-6 py-4 font-medium">
                {session.name}
            </td>

            <td className="px-6 py-4 text-slate-500">
                {session.job_title}
            </td>

            <td className="px-6 py-4">
                <span
                    className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold
                      ${status === "completed"
                            ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400"
                            : "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400"
                        }
                    `}
                >
                    <span
                        className={`size-1.5 rounded-full ${status === "completed"
                            ? "bg-emerald-500"
                            : "bg-blue-500 animate-pulse"
                            }`}
                    ></span>
                    {status === "completed" ? "Completed" : "Processing"}
                </span>
            </td>

            <td className="px-6 py-4 text-slate-500">
                {new Date(session.created_at).toLocaleDateString()}
            </td>

            <td className="px-6 py-4 text-right">
                {/* <button className="p-1.5 text-slate-400 hover:text-primary transition-colors">
                                            <span className="material-symbols-outlined text-xl">
                                                <Eye className="size-5" />
                                            </span>
                                        </button> */}
                <div>
                    <button

                        onClick={(e) => {
                            e.stopPropagation();
                            handleRerun()

                        }}
                        disabled={rerunning}
                        className="flex items-center gap-1 text-gray-500 hover:text-blue-600 transition"
                        title="Rerun Analysis"
                    >
                        {rerunning ? (
                            <>
                                <Loader2 className="animate-spin  h-4 w-4" />
                            </>
                        ) : (
                            <>
                                <RotateCcw className="w-4 h-4 " />
                            </>
                        )}
                        {/* <RotateCcw className="w-4 h-4" /> */}
                    </button>
                    <button

                        onClick={(e) => {
                            e.stopPropagation();
                            handleDelete()

                        }}
                        disabled={isdeleteloading}
                        className="flex items-center gap-1 text-red-500 hover:text-blue-600 transition"
                        title="Rerun Analysis"
                    >
                        {isdeleteloading ? (
                            <>
                                <Loader2 className="animate-spin  h-4 w-4" />
                            </>
                        ) : (
                            <>
                                <Delete className="w-4 h-4 " />
                            </>
                        )}
                        {/* <RotateCcw className="w-4 h-4" /> */}
                    </button>
                </div>
            </td>
        </tr>

    );
};
