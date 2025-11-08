import { useEffect, useRef, useState } from "react";

export function useSessionUpdates(sessionId?: string) {
    const [status, setStatus] = useState<string>("idle");
    const sourceRef = useRef<EventSource | null>(null);

    useEffect(() => {
        if (!sessionId) return;

        // Prevent multiple connections
        if (sourceRef.current) {
            sourceRef.current.close();
            sourceRef.current = null;
        }

        const source = new EventSource(`/api/sessions/${sessionId}/updates`, {
            withCredentials: true,
        });
        sourceRef.current = source;

        source.onmessage = (event) => {
            try {
                const data = JSON.parse(event.data);
                console.log("[SSE update]", data);
                setStatus(data.status || "unknown");

                if (["completed", "failed"].includes(data.status)) {
                    source.close();
                    sourceRef.current = null;
                }
            } catch (err) {
                console.error("Bad SSE message:", event.data);
            }
        };

        source.onerror = (err) => {
            console.warn("[SSE error]", err);
            // Don't close immediately — browsers auto-reconnect
            // Only close if backend is truly gone
            setTimeout(() => {
                if (sourceRef.current) {
                    sourceRef.current.close();
                    sourceRef.current = null;
                }
            }, 3000);
        };

        return () => {
            if (sourceRef.current) {
                console.log("[SSE cleanup]");
                sourceRef.current.close();
                sourceRef.current = null;
            }
        };
    }, [sessionId]);

    return status;
}
