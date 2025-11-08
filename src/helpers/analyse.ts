import { api } from "../api/client";


export const analyzeResume = async (sessionId: string,) => {

    try {
        const payload = {
            session_id: sessionId,
        };
        await api.post("/analyze", payload);
        // const res = await api.post(`/sessions/${sessionId}/analyze`);
        alert("Analysis re-queued successfully!");
    } catch (err: any) {
        // console.error(err); if (error.response && error.response.status === 429) {
        const remaining = err.response.data?.remaining_seconds;
        const message = err.response.data?.message || "Too many requests. Try again later.";

        if (remaining) {
            const hours = Math.floor(remaining / 3600);
            const minutes = Math.floor((remaining % 3600) / 60);
            alert(`⏳ ${message}\nYou can try again in ${hours}h ${minutes}m.`);
        } else {
            alert(message);
        }
    }


};
