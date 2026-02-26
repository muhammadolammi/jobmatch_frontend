import { api } from "./client";

export interface ContactDepartment {
    id: string;
    name: string;

}

export interface Contact {
    id: string;
    first_name: string;
    last_name: string;
    email: string;
    message: string;

}

export const getContactDepartments = async (): Promise<ContactDepartment[]> => {
    try {
        const response = await api.get("/contact-departments");
        return response.data;
    } catch (error) {
        console.error("Failed to fetch Contact Departments", error);
        // Fallback to empty array if API fails (safe default)
        return [];
    }
};

export interface ContactPayload {
    first_name: string;
    last_name: string;
    email: string;
    department_id?: string;
    message: string;
}

export const postContactMessage = async (body: ContactPayload): Promise<boolean> => {
    // console.log(body)
    try {
        // const response = await api.post("/contact", body);
        await api.post("/contact", body);
        // return response.data;
        return true;
    } catch (error) {
        console.error("Failed to post contact message", error);
        return false;
    }
};