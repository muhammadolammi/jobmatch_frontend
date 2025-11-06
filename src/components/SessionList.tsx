import React, { useEffect, useState } from "react";
import { Session } from "../types/Session";
import { getSessions } from "../api/sessions";
import { SessionCard } from "./SessionCard";

export const SessionList = () => {
    const [sessions, setSessions] = useState<Session[]>([]);
    const [loading, setLoading] = useState(true);

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
        return <p className="text-gray-500 text-center">Loading sessions...</p>;

    if (!sessions.length)
        return (
            <p className="text-gray-500 text-center">
                No previous sessions found. Create one to get started!
            </p>
        );

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            {sessions.map((session) => (
                <SessionCard key={session.id} session={session} />
            ))}
        </div>
    );
};
