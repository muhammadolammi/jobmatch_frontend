import React from "react";
import { CheckCircle2, Loader2 } from "lucide-react";

interface PricingCardProps {
  title: string;
  price: string;
  description?: string;
  features: string[];
  planCode?: string;
  isPopular?: boolean;
  onSubscribe?: (code: string) => void;
  isLoading?: boolean;
  currentPlan?: boolean;

}

export const PricingCard: React.FC<PricingCardProps> = ({
  title,
  price,
  features,
  planCode,
  isPopular,
  onSubscribe,
  isLoading,
  currentPlan,
  description
}) => {
  var buttonWord = "Subscribe Now"
  if (planCode === "frontend_enterprise") {
    buttonWord = "Contact Sales"
  }
  return (
    <div
      className={` ${isPopular ? "relative flex flex-col p-8 bg-white dark:bg-slate-900 rounded-xl border-2 border-primary shadow-xl scale-105 z-10" : "flex flex-col p-8 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-shadow"
        }`}
    >
      {isPopular && (
        <span className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary text-white text-[10px] font-black uppercase tracking-widest px-4 py-1.5 rounded-full">
          Most Popular
        </span>
      )}

      <div className="mb-8">
        <h3 className="text-lg font-bold text-primary dark:text-white">{title}</h3>
        <p className="text-sm text-slate-500 mt-1">{description ?? "Empty description"}</p>
      </div>
      <div className="mb-8">
        <div className="flex items-baseline">
          <span className="text-4xl font-black tracking-tight">{price === "0" ? "" : price}</span>
          <span className="text-slate-500 ml-1">{price === "" ? "" : "/mo"}</span >
        </div>
      </div>
      {/* <div className="mt-4 flex items-baseline text-gray-900">
        <span className="text-4xl font-extrabold tracking-tight">{price}</span>
        {price !== "Free" && <span className="ml-1 text-xl font-semibold text-gray-500">/month</span>}
      </div> */}

      <ul className="space-y-4 mb-8 flex-grow">
        {features.map((feature, index) => (
          <li key={index} className="flex items-start gap-3 text-sm text-slate-600 dark:text-slate-400">
            <span className="material-symbols-outlined text-primary text-lg">
              <CheckCircle2 className="size-5" />
            </span>
            <span >{feature}</span>
          </li>
        ))}
      </ul>

      <div className="mt-8">
        {currentPlan ? (
          <button
            disabled
            className="w-full bg-gray-200 text-gray-500 py-3 rounded-lg font-semibold cursor-not-allowed"
          >
            Current Plan
          </button>
        ) : (
          <button
            onClick={() => planCode && onSubscribe && onSubscribe(planCode)}
            disabled={isLoading || !planCode}
            className={` ${isPopular
              ? "w-full py-3 px-4 rounded-lg bg-primary text-white font-bold text-sm hover:shadow-lg hover:brightness-110 transition-all"
              : "w-full py-3 px-4 rounded-lg bg-slate-100 dark:bg-slate-800 text-primary dark:text-white font-bold text-sm hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
              }`}
          >
            {isLoading ? <Loader2 className="animate-spin h-5 w-5" /> : buttonWord}
          </button>
        )}
      </div>
    </div>
  );
};