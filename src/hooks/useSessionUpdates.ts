// small resilient SSE hook
import { useEffect, useRef, useState } from "react";
import { Session } from "../types";

export function useSessionUpdates(session: Session | null) {
    const [status, setStatus] = useState<string>(session?.status || "idle");
    const sourceRef = useRef<EventSource | null>(null);

    useEffect(() => {
        if (!session) return;


        // clean any existing connection first
        if (sourceRef.current) {
            sourceRef.current.close();
            sourceRef.current = null;
        }

        const url = `/api/sessions/${session.id}/updates`;
        const source = new EventSource(url, { withCredentials: true });
        sourceRef.current = source;

        source.onmessage = (event) => {
            try {
                const data = JSON.parse(event.data);
                // Expecting { status: 'processing' | 'completed' | 'failed' | ... }
                if (data && typeof data.status === "string") {
                    setStatus(data.status);
                } else {
                    console.warn("Unexpected SSE payload", data);
                }

                if (["completed", "failed"].includes(data.status)) {
                    // server done — close connection
                    if (sourceRef.current) {
                        sourceRef.current.close();
                        sourceRef.current = null;
                    }
                }
            } catch (err) {
                console.error("Failed to parse SSE message", err, event.data);
            }
        };

        source.onerror = (err) => {
            // browsers will attempt to reconnect automatically;
            // log and close after a short delay to avoid noisy reconnect storms
            console.warn("[SSE] connection error", err);
            setTimeout(() => {
                if (sourceRef.current) {
                    sourceRef.current.close();
                    sourceRef.current = null;
                }
            }, 3000);
        };

        return () => {
            if (sourceRef.current) {
                sourceRef.current.close();
                sourceRef.current = null;
            }
        };
    }, [session]);

    return status;
}
