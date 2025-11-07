import { api } from "./client"; // your axios instance

export const getSessions = async () => {
    const res = await api.get("/sessions");
    return res.data;
};

interface CreateSessionProps {
    name: string,
    job_title: string,
    job_description: string
}
export async function createSession({
    name,
    job_title,
    job_description,
}: CreateSessionProps) {
    const res = await api.post("/sessions", { name, job_title, job_description });
    return res.data;
};
