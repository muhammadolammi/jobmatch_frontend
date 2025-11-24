import React, { useEffect, useState } from "react";
import { getPlans, Plan } from "../api/subscriptions";
import { createNewPlan, updatePlanUrl } from "../api/admin";
import { Loader2, Save, Plus, Link as LinkIcon } from "lucide-react";

export default function AdminSettingsPage() {
    const [plans, setPlans] = useState<Plan[]>([]);
    const [loading, setLoading] = useState(true);

    // Form State for New Plan
    const [newPlan, setNewPlan] = useState({ name: "", amount: 0, currency: "NGN", daily_limit: 10, id:"" });
    const [creating, setCreating] = useState(false);

    // State for Editing URLs
    // specific map to track which plan is being edited: { [planCode]: "http://..." }
    const [editUrls, setEditUrls] = useState<{ [key: string]: string }>({});
    const [savingUrl, setSavingUrl] = useState<string | null>(null);

    // 1. Fetch Plans on Load
    const loadPlans = async () => {
        try {
            setLoading(true);
            const data = await getPlans();
            const safeData = Array.isArray(data) ? data : [];
            setPlans(safeData);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadPlans();
    }, []);

    // 2. Handle Create Plan
    const handleCreate = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            setCreating(true);
            await createNewPlan(newPlan);
            alert("Plan created successfully!");
            setNewPlan({ name: "", amount: 0, currency: "NGN", daily_limit: 10 , id :""}); // Reset form
            loadPlans(); // Refresh list
        } catch (error: any) {
            alert(error.response?.data?.error || "Failed to create plan");
        } finally {
            setCreating(false);
        }
    };

    // 3. Handle Update URL
    const handleUpdateUrl = async (planCode: string, planId: string) => {
        const urlToSave = editUrls[planCode];
        if (!urlToSave) return;

        try {
            setSavingUrl(planCode);
            await updatePlanUrl(planId, urlToSave);
            alert("Subscription URL updated!");
            loadPlans(); // Refresh to see confirmed change
        } catch (error: any) {
            alert("Failed to update URL");
        } finally {
            setSavingUrl(null);
        }
    };

    if (loading) return <div className="p-10 flex justify-center"><Loader2 className="animate-spin" /></div>;

    return (
        <div className="min-h-screen bg-gray-50 py-10 px-4">
            <div className="max-w-6xl mx-auto">
                <h1 className="text-3xl font-bold text-gray-800 mb-8">Admin Configuration</h1>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    
                    {/* SECTION 1: CREATE NEW PLAN */}
                    <div className="lg:col-span-1">
                        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 sticky top-10">
                            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                                <Plus className="w-5 h-5 text-blue-600" /> Create New Plan
                            </h2>
                            <form onSubmit={handleCreate} className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Plan Name</label>
                                    <input 
                                        type="text" 
                                        required
                                        className="w-full mt-1 p-2 border rounded-md"
                                        value={newPlan.name}
                                        onChange={e => setNewPlan({...newPlan, name: e.target.value})}
                                        placeholder="e.g. Gold Tier"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Amount (in Naira)</label>
                                    <input 
                                        type="number" 
                                        required
                                        className="w-full mt-1 p-2 border rounded-md"
                                        value={newPlan.amount}
                                        onChange={e => setNewPlan({...newPlan, amount: parseInt(e.target.value)})}
                                        placeholder="e.g. 5000 for 5k NGN"
                                    />
                                    <p className="text-xs text-gray-500 mt-1">5000 NGN = 500000</p>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Daily API Limit</label>
                                    <input 
                                        type="number" 
                                        required
                                        className="w-full mt-1 p-2 border rounded-md"
                                        value={newPlan.daily_limit}
                                        onChange={e => setNewPlan({...newPlan, daily_limit: parseInt(e.target.value)})}
                                    />
                                </div>
                                <button 
                                    disabled={creating}
                                    type="submit" 
                                    className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition disabled:opacity-50"
                                >
                                    {creating ? "Creating..." : "Create Plan"}
                                </button>
                            </form>
                        </div>
                    </div>

                    {/* SECTION 2: MANAGE EXISTING PLANS */}
                    <div className="lg:col-span-2 space-y-6">
                        <h2 className="text-xl font-semibold text-gray-800">Existing Plans</h2>
                        {plans.map((plan) => (
                            <div key={plan.id} className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                                <div className="flex justify-between items-start mb-4">
                                    <div>
                                        <h3 className="text-lg font-bold text-gray-900">{plan.name}</h3>
                                        <p className="text-sm text-gray-500">{plan.plan_code}</p>
                                    </div>
                                    <div className="text-right">
                                        <span className="block font-mono font-semibold">₦{(plan.amount ).toLocaleString()}</span>
                                        <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                                            Limit: {plan.daily_limit}
                                        </span>
                                    </div>
                                </div>

                                {/* URL EDITOR */}
                                <div className="mt-4 pt-4 border-t border-gray-100">
                                    <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2 flex items-center gap-1">
                                        <LinkIcon className="w-3 h-3" /> Subscription Page URL
                                    </label>
                                    <div className="flex gap-2">
                                        <input 
                                            type="text" 
                                            className="flex-1 p-2 text-sm border rounded-md bg-gray-50"
                                            placeholder="https://paystack.com/pay/..."
                                            // Show the drafted edit OR the existing value from DB
                                            value={editUrls[plan.plan_code || ""] ?? plan.subscription_page ?? ""}
                                            onChange={(e) => {
                                                if (plan.plan_code) {
                                                    setEditUrls({ ...editUrls, [plan.plan_code]: e.target.value });
                                                }
                                            }}
                                        />
                                        <button 
                                            onClick={() => plan.plan_code && handleUpdateUrl(plan.plan_code, plan.id)}
                                            disabled={savingUrl === plan.plan_code}
                                            className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 disabled:opacity-50"
                                        >
                                            {savingUrl === plan.plan_code ? <Loader2 className="w-4 h-4 animate-spin"/> : <Save className="w-4 h-4" />}
                                        </button>
                                    </div>
                                    <p className="text-xs text-gray-400 mt-2">
                                        This URL is where users are redirected when they click "Subscribe".
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>

                </div>
            </div>
        </div>
    );
}