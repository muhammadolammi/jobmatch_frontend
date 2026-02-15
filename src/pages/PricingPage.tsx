import React, { useEffect, useState } from "react";
import { PricingCard } from "../components/PricingCard";
import { subscribeToPlan, getPlans, getUserSubscription, Plan, UserSubscription } from "../api/subscriptions";
import { ArrowLeft, Loader2 } from "lucide-react";

export default function PricingPage() {
    const [plans, setPlans] = useState<Plan[]>([]);
    const [userSub, setUserSub] = useState<UserSubscription | null>(null);
    const [loading, setLoading] = useState(true);
    const [subscribingId, setSubscribingId] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [plansData, subData] = await Promise.all([
                    getPlans(),
                    getUserSubscription()
                ]);

                const safePlans = Array.isArray(plansData) ? plansData : [];
                const sortedPlans = safePlans.sort((a, b) => a.amount - b.amount);
                
                setPlans(sortedPlans);
                setUserSub(subData);
            } catch (error) {
                console.error("Error loading pricing data:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const handleSubscribe = async (planCode: string) => {
        if (!planCode) return;
        try {
            setSubscribingId(planCode);
            const response = await subscribeToPlan(planCode);
            if (response.Data?.subscribe_page) {
                window.location.href = response.Data.subscribe_page;
            }
        } catch (error: any) {
            alert(error.message || "Subscription failed");
        } finally {
            setSubscribingId(null);
        }
    };

    if (loading) return <div className="flex justify-center items-center h-screen"><Loader2 className="animate-spin h-10 w-10 text-blue-600" /></div>;

    const containerWidth = plans.length <= 2 ? "max-w-5xl" : "max-w-7xl";
    const gridCols = plans.length === 1 
        ? "grid-cols-1 max-w-md mx-auto" 
        : plans.length === 2 
            ? "grid-cols-1 md:grid-cols-2" 
            : "grid-cols-1 md:grid-cols-2 lg:grid-cols-3";

    return (
        <div className="min-h-screen bg-gray-50 py-20 px-6 sm:px-8 lg:px-12">
            <div className={`${containerWidth} mx-auto transition-all duration-300`}>
                
                <div className="mb-16">
                    <a href="/dashboard" className="inline-flex items-center text-gray-600 hover:text-blue-600 transition mb-8 font-medium">
                        <ArrowLeft className="h-5 w-5 mr-2" /> Back to Dashboard
                    </a>
                    
                    <div className="text-center max-w-2xl mx-auto">
                        <h2 className="text-4xl font-extrabold text-gray-900 tracking-tight">
                            Choose the perfect plan
                        </h2>
                        <p className="mt-4 text-xl text-gray-600">
                            Upgrade your career tools with higher limits and premium features.
                        </p>
                    </div>
                </div>

                <div className={`grid ${gridCols} gap-10 lg:gap-12 items-start`}>
                    {plans.map((plan) => {
                        // ============================================================
                        // 👇 UPDATED LOGIC HERE
                        // ============================================================

                        // 1. Check if the user has a strictly ACTIVE subscription
                        const hasActiveSub = userSub?.Status === "active";

                        // 2. Paid Plan Logic:
                        // It is "Current" ONLY if the IDs match AND the status is Active.
                        // If status is 'cancelled', 'past_due', or 'pending', this returns false (so user can click Subscribe)
                        const isActivePaidPlan = plan.amount > 0 && userSub?.PlanID === plan.id && hasActiveSub;

                        // 3. Free Plan Logic:
                        // It is "Current" if the user has NO active paid subscription.
                        // (i.e. they are new, or their paid plan expired/cancelled)
                        const isDefaultFreePlan = plan.amount === 0 && !hasActiveSub;

                        const isCurrentPlan = isActivePaidPlan || isDefaultFreePlan;
                        
                        // ============================================================

                        const isPro = plan.name.toLowerCase().includes("pro") || plan.name.toLowerCase().includes("premium");
                        const displayPrice = plan.amount === 0 ? "Free" : `₦${(plan.amount/100 ).toLocaleString()}`; 

                        return (
                            <div key={plan.id} className={`transform transition-all duration-300 ${isPro ? 'lg:-mt-4 lg:mb-4' : ''}`}>
                                <PricingCard
                                    title={plan.name}
                                    price={displayPrice}
                                    features={getFeaturesForPlan(plan.name, plan.daily_limit)} 
                                    planCode={plan.plan_code}
                                    isPopular={isPro}
                                    isLoading={subscribingId === plan.plan_code}
                                    onSubscribe={() => handleSubscribe(plan.plan_code || "")}
                                    currentPlan={isCurrentPlan} 
                                />
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}

// Helper
const getFeaturesForPlan = (planName: string, dailyLimit: number) => {
    const name = planName.toLowerCase();
    if (name.includes("free")) {
        return [`${dailyLimit} AI Scans Daily`, "Basic Resume Analysis", "Standard Support"];
    } else if (name.includes("pro") || name.includes("premium")) {
        return [`${dailyLimit} AI Scans Daily`, "Advanced Job Matching", "Detailed Insights", "Priority Support", "History Access"];
    } else {
        return [`${dailyLimit} AI Scans Daily`, "All Pro Features", "Dedicated Manager", "API Access", "Custom Reports"];
    }
};