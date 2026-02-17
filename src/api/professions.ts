import { api } from "./client";



export interface Profession {
    id: string;
    name: string;
    created_at: string;
    updated_at: string;
}
// NEW: Fetch the current user's subscription details
export const getProfessions = async (): Promise<Profession[]> => {
    try {
        const response = await api.get("/professions");
        return response.data;
    } catch (error) {
        console.error("Failed to fetch professions", error);
        // Fallback to empty array if API fails (safe default)
        return [];
    }
};

export const postProfession = async (profession: string): Promise<Profession> => {
    try {
        const response = await api.post("/professions", { name: profession });
        return response.data;
    } catch (error) {
        console.error("Failed to post profession", error);
        // Fallback to empty array if API fails (safe default)
        return { id: "", name: profession, created_at: "", updated_at: "" };
    }
};