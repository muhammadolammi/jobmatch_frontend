import { api } from "./client";

export interface Plan {
    id: string; // or number, depending on your DB
    name: string;
    amount: number;
    currency: string;
    daily_limit: number;
    plan_code?: string; 
    subscription_page: string;
}
export interface UserSubscription {
    ID?: string;
    UserID?: string;
    PlanID?: string | null; // This is the key field we need
    Status: string;         // "active", "pending", "free", etc.
}
export interface SubscribeResponse {
    Message: string;
    Data: {
        subscribe_page: string;
    };
}

// 1. Fetch all available plans
export const getPlans = async (): Promise<Plan[]> => {
    
     try {
       const response = await api.get("/plans"); 
      //  console.log(response.data)
    return response.data.Data; // Assuming backend returns [ {name: "Pro", ...}, ... ]
    } catch (error: any) {
        // Axios stores the response error in error.response.data
        const errMsg = error.response?.data?.error || "Failed to get PLans";
        throw new Error(errMsg);
    }
};

// 2. Subscribe to a specific plan
export const subscribeToPlan = async (planCode: string): Promise<SubscribeResponse> => {
    try {
        const response = await api.post(`/subscribe`, { plan_code: planCode });
        return response.data;
    } catch (error: any) {
        // Axios stores the response error in error.response.data
        const errMsg = error.response?.data?.error || "Failed to initiate subscription";
        throw new Error(errMsg);
    }
};


// NEW: Fetch the current user's subscription details
export const getUserSubscription = async (): Promise<UserSubscription> => {
    try {
        const response = await api.get("/subscription/me");
        return response.data;
    } catch (error) {
        console.error("Failed to fetch subscription", error);
        // Fallback to free if API fails (safe default)
        return { Status: "free", PlanID: null };
    }
};