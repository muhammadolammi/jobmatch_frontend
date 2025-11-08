export interface ResultType {
    id?: string;
    candidate_email: string;
    match_score: number;
    relevant_experiences: string[]; // ✅ plural
    relevant_skills: string[];
    missing_skills: string[];
    summary: string;
    recommendation: string;
    is_error_result: boolean;
    error?: string;
}

export interface Session {
    id: string;
    name: string;
    created_at: string;
    status: "pending" | "completed" | "failed";
    user_id: string;
}
