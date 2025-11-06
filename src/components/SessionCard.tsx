import { Calendar } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Session } from "../types/Session";

export const SessionCard = ({ session }: { session: Session }) => {
    const navigate = useNavigate();
    const handleClick = () => navigate(`/session/${session.id}`);

    return (
        <div
            onClick={handleClick}
            className="p-4 rounded-2xl bg-white shadow hover:shadow-md cursor-pointer transition"
        >
            <div className="flex justify-between items-center">
                <h3 className="font-semibold text-lg text-gray-800">{session.name}</h3>
                <span
                    className={`px-3 py-1 text-xs rounded-full ${session.status === "completed"
                        ? "bg-green-100 text-green-700"
                        : session.status === "failed"
                            ? "bg-red-100 text-red-700"
                            : "bg-yellow-100 text-yellow-700"
                        }`}
                >
                    {session.status}
                </span>
            </div>
            <div className="flex items-center text-sm text-gray-500 mt-2">
                <Calendar className="w-4 h-4 mr-1" />
                {new Date(session.created_at).toLocaleString()}
            </div>
        </div>
    );
};
