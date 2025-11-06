export interface Session {
    id: string;
    name: string;
    created_at: string;
    status: "pending" | "completed" | "failed";
    user_id: string;
}
