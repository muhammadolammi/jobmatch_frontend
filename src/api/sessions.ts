import { api } from "./client"; // your axios instance

export const getSessions = async () => {
    const res = await api.get("/sessions");
    return res.data;
};

export const createSession = async (name: string) => {
    const res = await api.post("/sessions", { name });
    return res.data;
};
