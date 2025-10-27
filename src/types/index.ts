export interface ResultType {
    candidate_email: string;
    match_score: number;
    relevant_experience: string[];
    relevant_skills: string[];
    missing_skills: string[];
    summary: string;
    recommendation: string;
}
