// ------------------- TYPES -------------------

export interface ResultType {
    id: string;
    candidate_email: string;
    match_score: number;
    relevant_experiences: string[]; // never null
    relevant_skills: string[];
    missing_skills: string[];
    summary: string;
    recommendation: string;
    is_error_result: boolean;
    error: string; // empty string if no error
}

export interface Session {
    id: string;
    name: string;
    created_at: string;
    status: "pending" | "completed" | "failed" | "processing";
    user_id: string;
}

export interface User {
    id: string;
    email: string;
    role: "employer" | "job_seeker" | "admin" | "none"; // default to "none"
    display_name: string;
   
}

export interface AuthState {
    user: User;
    accessToken: string;
    isAuthenticated: boolean;
    loading: boolean;
    error: string;
}

// ------------------- EMPTY VERSIONS -------------------

export const EmptyResult: ResultType = {
    id: "",
    candidate_email: "",
    match_score: 0,
    relevant_experiences: [],
    relevant_skills: [],
    missing_skills: [],
    summary: "",
    recommendation: "",
    is_error_result: false,
    error: "",
};

export const EmptySession: Session = {
    id: "",
    name: "",
    created_at: "",
    status: "pending",
    user_id: "",
};

export const EmptyUser: User = {
    id: "",
    email: "",
    role: "none",
    display_name: "john"
};

export const EmptyAuthState: AuthState = {
    user: EmptyUser,
    accessToken: "",
    isAuthenticated: false,
    loading: false,
    error: "",
};
