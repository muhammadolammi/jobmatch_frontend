export interface ResultType {
    id: string
    candidate_email: string;
    match_score: number;
    relevant_experience: string[];
    relevant_skills: string[];
    missing_skills: string[];
    summary: string;
    recommendation: string;
    // Error result entry
    is_error_result: boolean;
    error: string;
}
