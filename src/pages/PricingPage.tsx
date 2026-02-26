import React, { useEffect, useState } from "react";
import { PricingCard } from "../components/PricingCard";
import { subscribeToPlan, getPlans, getUserSubscription, Plan, UserSubscription } from "../api/subscriptions";
import { Expand } from "lucide-react";
import MainHeader from "../components/MainHeader";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../app/hooks";
import { selectIsAuthenticated } from "../states/authslice";

export default function PricingPage() {
    const [plans, setPlans] = useState<Plan[]>([]);
    const [userSub, setUserSub] = useState<UserSubscription | null>(null);
    const [loading, setLoading] = useState(true);
    const [subscribingId, setSubscribingId] = useState<string | null>(null);
    const navigate = useNavigate()
    const isAuthenticated = useAppSelector(selectIsAuthenticated);


    useEffect(() => {
        const fetchData = async () => {
            try {
                const [plansData, subData] = await Promise.all([
                    getPlans(),
                    getUserSubscription()
                ]);

                const safePlans = Array.isArray(plansData) ? plansData : [];
                const sortedPlans = safePlans.sort((a, b) => a.amount - b.amount);
                sortedPlans.push({
                    id: "frontend_enterprise",
                    name: "Enterprise",
                    description: "Scaling for large teams",
                    amount: 0,
                    currency: "",
                    daily_limit: 0,
                    subscription_page: "",
                    plan_code: "frontend_enterprise"


                })

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
        if (planCode == "frontend_enterprise") {
            navigate("/contact?department=sales")
            return

        }
        if (!isAuthenticated) {
            alert("Must login to subscribe")
            navigate("/login")
            return

        }
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


    return (
        <div>
            <MainHeader />
            <main className="py-16 sm:py-24">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                    {/* <!-- Hero Section --> */}
                    <div className="text-center mb-16">
                        <h1 className="text-4xl sm:text-5xl font-black text-primary dark:text-white tracking-tight mb-4">Simple, Transparent Pricing</h1>
                        <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">Choose the plan that's right for your career growth. No hidden fees, cancel any time.</p>
                        {/* <!-- Toggle Component --> */}
                        <div className="mt-10 flex justify-center items-center gap-4">
                            <span className="text-sm font-medium text-slate-600 dark:text-slate-400">Monthly</span>
                            {/* <div className="relative inline-flex h-8 w-48 items-center justify-center rounded-lg bg-slate-200 dark:bg-slate-800 p-1">
                                <button className="flex h-full w-1/2 items-center justify-center rounded-md bg-white dark:bg-primary text-xs font-bold shadow-sm transition-all text-primary dark:text-white">Monthly</button>
                                {/* <button className="flex h-full w-1/2 items-center justify-center rounded-md text-xs font-bold text-slate-500 hover:text-primary dark:hover:text-white transition-all">Yearly <span className="ml-1 text-[10px] text-emerald-600">-20%</span></button> */}
                            {/* </div> */}
                            {/* <span className="text-sm font-medium text-slate-600 dark:text-slate-400">Annual</span> */}
                        </div>
                    </div>


                    <div className={`grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch`}>
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

                            const isCurrentPlan = (isActivePaidPlan || isDefaultFreePlan) && isAuthenticated;

                            // ============================================================

                            const isPro = plan.name.toLowerCase().includes("pro") || plan.name.toLowerCase().includes("premium");
                            const displayPrice = plan.amount === 0 ? "" : `₦${(plan.amount / 100).toLocaleString()}`;

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


                    {/* <!-- Trust Badges Section --> */}
                    {/* <div className="mt-24 pt-16 border-t border-slate-200 dark:border-slate-800">
                        <p className="text-center text-xs font-bold uppercase tracking-widest text-slate-400 mb-10">Trusted by modern career builders everywhere</p>
                        <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 opacity-40 grayscale">
                            <img alt="Partner" data-alt="Corporate logo of a tech partner" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDTSzEUj6TF0BZwEV5LLfgDFWGfoQ0Cn6AbfZltP7NEn_6YPXS263PBFNjQxi0CcL_G2hjVg3kZY-7zfWcmIvu0Kwrs279sr4zaz6P6FUnBA16Hb_wD6BWjVTPnb8LLgSmUK98Uxe700DXnS2qDr7kah_yWq0CTpMiPJZNLT_sbElyRZ72ZEtfo1q-X5v_bB9JBV7q1fYVYNjfgtie_UaK-VHs2fFx3AcQfxDH8AHsPCBbdQgbwB2_LpmvDPE9s0_FfqVIEbfRnVtqH" />
                            <img alt="Partner" data-alt="Corporate logo of a tech partner" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAmM8BhcgpvmqDdlA8eEBfAbTHnkiZ-rhzaU4MdBjwmY1JJRsF5OF5Q2i--ONPSSf5IGvwy5sLxjUd1AE81MQaX2qbCdQr_uCYSeVzHAz8MPXqfT-US2uknYtqqbmwY9n3NvHESHNrzzwL_KB8HxRIYVdlvOo2PdQbp7xLvZCO6DCpleEoZKKU-POn4WjUF8nVxeH2irpjj5NPN9gffY3HuR-_6jWF9PH6LvSoe1p_IbHD40qEjva4FVBGL4HMNwqC7lHSLjc8erdp1" />
                            <img alt="Partner" data-alt="Corporate logo of a tech partner" src="https://lh3.googleusercontent.com/aida-public/AB6AXuB2yZzm-R77p54-XyGlQb8sywbZzOOEmOYBC74FySfSgUrjiEudaO0xpYL4UDroQA0pdavXGM5sQoX3jQujLgf9aAxDFIo9gqB9hr3KyXW-6Jm7W193aExzQdrZ_bnUjMz4RAijbgV_XFGSoZf7r1cYrcBU2nAbBmT0uQS-xRvhN6cvoNWyKbB9nSs2Rr-wZaFhUWQRrnFjupIrOB9C6a5NYcDiLFby9BlmWW5NM43Fr8XOYCg8oCmlzhCSV5hXRbPXPbpscz7dLWgU" />
                            <img alt="Partner" data-alt="Corporate logo of a tech partner" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBJSKbN1nvLHjLHkJTvr9dLfs5tT4G0rk0RG4CsYL_St_9q5PKwmVESDo7yYp3wbCuOJqUuly5hGmJv0wZICQp3rrL1OuGwwM11ac0swG9BSb7-Q_xpwmaJGhI2kTK4SSiaGeC2SEC62CrWK7LuskemuEAobB_jwaTfgpbrYO0kcWMGPRmWe7reE1t9vzzaObgcftt51tOFigqmLgwrnu6iKErB1m_K28ouXfN2i6C58XjYPE12ytZQ3K7_6QcAPiX0wUTrKUTbElzi" />
                            <img alt="Partner" data-alt="Corporate logo of a tech partner" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAsDKdchg0LapZIu1IgLikonS4O77AKjAuko5kIzrexyEdCej_ak6dhb6OXgqX-DuXum4_Cxl66hjYXfp73DQHS9JRGsz7urotaIo-Ejx2C72t8PNWB541bsaLK-ph8MpqGOI3d9zBUonQX535-17P6JjCrpsNxcycJC3ooytcQNjpLwLj6YZg-Tk-n1pf_c2XdkLR1Kp8JNfn7SwdYFRS3rg2IIG5gdvyP8cdjt1_9TGgW0u2vFGJ61pTvRGgg4CXi3Lq3zA3q9m9s" />
                        </div>
                    </div> */}
                    {/* <!-- FAQ Section -- */}
                    <div className="mt-24 max-w-3xl mx-auto">
                        <h2 className="text-2xl font-black text-center mb-12 text-primary dark:text-white">Frequently Asked Questions</h2>
                        <div className="space-y-6">
                            <div className="group border-b border-slate-200 dark:border-slate-800 pb-4">
                                <button className="flex w-full items-center justify-between text-left font-bold text-slate-900 dark:text-slate-100">
                                    <span>Can I switch plans later?</span>
                                    <span className="material-symbols-outlined text-slate-400 group-hover:text-primary transition-colors">
                                        <Expand className="size-5" />
                                    </span>
                                </button>
                                <p className="mt-3 text-sm text-slate-500 hidden group-focus-within:block">Yes, you can upgrade or downgrade your plan at any time from your account settings.</p>
                            </div>
                            <div className="group border-b border-slate-200 dark:border-slate-800 pb-4">
                                <button className="flex w-full items-center justify-between text-left font-bold text-slate-900 dark:text-slate-100">
                                    <span>Is there a free trial for Pro?</span>
                                    <span className="material-symbols-outlined text-slate-400 group-hover:text-primary transition-colors"> <Expand className="size-5" /></span>
                                </button>
                                <p className="mt-3 text-sm text-slate-500 hidden group-focus-within:block">Absolutely! You can try all Pro features free for 14 days before your first billing cycle.</p>
                            </div>
                            <div className="group border-b border-slate-200 dark:border-slate-800 pb-4">
                                <button className="flex w-full items-center justify-between text-left font-bold text-slate-900 dark:text-slate-100">
                                    <span>What counts as an 'analysis'?</span>
                                    <span className="material-symbols-outlined text-slate-400 group-hover:text-primary transition-colors"> <Expand className="size-5" /></span>
                                </button>
                                <p className="mt-3 text-sm text-slate-500 hidden group-focus-within:block">An analysis is counted every time our AI processes a new job description against your profile.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </main >
            <Footer />
        </div >
    );
}

// export default function PricingPage() {
//     const [plans, setPlans] = useState<Plan[]>([]);
//     const [userSub, setUserSub] = useState<UserSubscription | null>(null);
//     const [loading, setLoading] = useState(true);
//     const [subscribingId, setSubscribingId] = useState<string | null>(null);

//     useEffect(() => {
//         const fetchData = async () => {
//             try {
//                 const [plansData, subData] = await Promise.all([
//                     getPlans(),
//                     getUserSubscription()
//                 ]);

//                 const safePlans = Array.isArray(plansData) ? plansData : [];
//                 const sortedPlans = safePlans.sort((a, b) => a.amount - b.amount);

//                 setPlans(sortedPlans);
//                 setUserSub(subData);
//             } catch (error) {
//                 console.error("Error loading pricing data:", error);
//             } finally {
//                 setLoading(false);
//             }
//         };

//         fetchData();
//     }, []);

//     const handleSubscribe = async (planCode: string) => {
//         if (!planCode) return;
//         try {
//             setSubscribingId(planCode);
//             const response = await subscribeToPlan(planCode);
//             if (response.Data?.subscribe_page) {
//                 window.location.href = response.Data.subscribe_page;
//             }
//         } catch (error: any) {
//             alert(error.message || "Subscription failed");
//         } finally {
//             setSubscribingId(null);
//         }
//     };

//     if (loading) return <div className="flex justify-center items-center h-screen"><Loader2 className="animate-spin h-10 w-10 text-blue-600" /></div>;

//     const containerWidth = plans.length <= 2 ? "max-w-5xl" : "max-w-7xl";
//     const gridCols = plans.length === 1
//         ? "grid-cols-1 max-w-md mx-auto"
//         : plans.length === 2
//             ? "grid-cols-1 md:grid-cols-2"
//             : "grid-cols-1 md:grid-cols-2 lg:grid-cols-3";

//     return (
//         <div className="min-h-screen bg-gray-50 py-20 px-6 sm:px-8 lg:px-12">
//             <div className={`${containerWidth} mx-auto transition-all duration-300`}>

//                 <div className="mb-16">
//                     <a href="/dashboard" className="inline-flex items-center text-gray-600 hover:text-blue-600 transition mb-8 font-medium">
//                         <ArrowLeft className="h-5 w-5 mr-2" /> Back to Dashboard
//                     </a>

//                     <div className="text-center max-w-2xl mx-auto">
//                         <h2 className="text-4xl font-extrabold text-gray-900 tracking-tight">
//                             Choose the perfect plan
//                         </h2>
//                         <p className="mt-4 text-xl text-gray-600">
//                             Upgrade your career tools with higher limits and premium features.
//                         </p>
//                     </div>
//                 </div>

//                 <div className={`grid ${gridCols} gap-10 lg:gap-12 items-start`}>
//                     {plans.map((plan) => {
//                         // ============================================================
//                         // 👇 UPDATED LOGIC HERE
//                         // ============================================================

//                         // 1. Check if the user has a strictly ACTIVE subscription
//                         const hasActiveSub = userSub?.Status === "active";

//                         // 2. Paid Plan Logic:
//                         // It is "Current" ONLY if the IDs match AND the status is Active.
//                         // If status is 'cancelled', 'past_due', or 'pending', this returns false (so user can click Subscribe)
//                         const isActivePaidPlan = plan.amount > 0 && userSub?.PlanID === plan.id && hasActiveSub;

//                         // 3. Free Plan Logic:
//                         // It is "Current" if the user has NO active paid subscription.
//                         // (i.e. they are new, or their paid plan expired/cancelled)
//                         const isDefaultFreePlan = plan.amount === 0 && !hasActiveSub;

//                         const isCurrentPlan = isActivePaidPlan || isDefaultFreePlan;

//                         // ============================================================

//                         const isPro = plan.name.toLowerCase().includes("pro") || plan.name.toLowerCase().includes("premium");
//                         const displayPrice = plan.amount === 0 ? "Free" : `₦${(plan.amount / 100).toLocaleString()}`;

//                         return (
//                             <div key={plan.id} className={`transform transition-all duration-300 ${isPro ? 'lg:-mt-4 lg:mb-4' : ''}`}>
//                                 <PricingCard
//                                     title={plan.name}
//                                     price={displayPrice}
//                                     features={getFeaturesForPlan(plan.name, plan.daily_limit)}
//                                     planCode={plan.plan_code}
//                                     isPopular={isPro}
//                                     isLoading={subscribingId === plan.plan_code}
//                                     onSubscribe={() => handleSubscribe(plan.plan_code || "")}
//                                     currentPlan={isCurrentPlan}
//                                 />
//                             </div>
//                         );
//                     })}
//                 </div>
//             </div>
//         </div>
//     );
// }

// // Helper
