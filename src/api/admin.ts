import { api } from "./client";

// Define the shape of data needed to create a plan
export interface CreatePlanParams {
    name: string;
    amount: number;
    currency: string;
    daily_limit: number;
}

export const createNewPlan = async (data: CreatePlanParams) => {
    const response = await api.post("/plans", data);
    return response.data;
};

export const updatePlanUrl = async (planId: string, pageUrl: string) => {
    const response = await api.post("/plans/subpage", {
        plan_id: planId,
        subscription_page: pageUrl
    });
    return response.data;
};