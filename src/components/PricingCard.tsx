import React from "react";
import { Check, Loader2 } from "lucide-react";

interface PricingCardProps {
  title: string;
  price: string;
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
}) => {
  return (
    <div
      className={`relative rounded-2xl p-8 shadow-lg transition-all ${
        isPopular ? "border-2 border-blue-600 bg-white scale-105" : "border border-gray-200 bg-gray-50"
      }`}
    >
      {isPopular && (
        <span className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-blue-600 text-white px-4 py-1 rounded-full text-sm font-medium">
          Most Popular
        </span>
      )}

      <h3 className="text-xl font-bold text-gray-900">{title}</h3>
      <div className="mt-4 flex items-baseline text-gray-900">
        <span className="text-4xl font-extrabold tracking-tight">{price}</span>
        {price !== "Free" && <span className="ml-1 text-xl font-semibold text-gray-500">/month</span>}
      </div>

      <ul className="mt-6 space-y-4">
        {features.map((feature, index) => (
          <li key={index} className="flex">
            <Check className="flex-shrink-0 w-5 h-5 text-green-500" />
            <span className="ml-3 text-gray-600">{feature}</span>
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
            className={`w-full py-3 rounded-lg font-semibold transition-colors flex justify-center items-center ${
              isPopular
                ? "bg-blue-600 text-white hover:bg-blue-700"
                : "bg-white text-blue-600 border border-blue-600 hover:bg-blue-50"
            }`}
          >
            {isLoading ? <Loader2 className="animate-spin h-5 w-5" /> : "Subscribe Now"}
          </button>
        )}
      </div>
    </div>
  );
};