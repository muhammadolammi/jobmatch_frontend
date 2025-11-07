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
        console.error(err);
        alert("Error re-running analysis — maybe no resumes uploaded yet?");
    }
};
