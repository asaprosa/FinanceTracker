// pages/upgrade.jsx
'use client';

import { CheckCircle, Star } from 'lucide-react';
import { useState } from 'react';

const plans = [
  {
    title: "Free",
    price: "$0",
    features: ["Basic Expense Tracking", "Limited Reports", "Community Support"],
  },
  {
    title: "Pro",
    price: "$9.99/month",
    features: ["Unlimited Expense Tracking", "Advanced Reports", "Priority Support", "Budget Planning Tools"],
  },
  {
    title: "Premium",
    price: "$19.99/month",
    features: [
      "Everything in Pro",
      "Personalized Insights",
      "Real-time Notifications",
      "Exclusive Features",
    ],
  },
];

export default function Upgrade() {
  const [selectedPlan, setSelectedPlan] = useState("Free");

  return (
    <div className="p-10 min-h-screen bg-gray-50">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold">Upgrade Your Experience</h1>
        <p className="text-lg text-gray-600 mt-2">
          Choose a plan that fits your needs and unlock more features.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {plans.map((plan) => (
          <div
            key={plan.title}
            className={`p-6 rounded-lg shadow-lg transition duration-300 ${
              selectedPlan === plan.title
                ? "bg-primary text-white"
                : "bg-white"
            }`}
          >
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-semibold">{plan.title}</h2>
              {selectedPlan === plan.title && <Star className="text-yellow-400" />}
            </div>
            <h3 className="text-xl font-bold mt-4">{plan.price}</h3>
            <ul className="mt-6 space-y-3">
              {plan.features.map((feature, index) => (
                <li key={index} className="flex items-center">
                  <CheckCircle className="mr-2 h-5 w-5 text-green-500" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
            
            <button
              onClick={() => setSelectedPlan(plan.title)}
              className={`mt-6 w-full py-2 rounded-lg font-bold text-center transition duration-300 ${
                selectedPlan === plan.title
                  ? "bg-yellow-500"
                  : "bg-primary text-white hover:bg-primary-dark"
              }`}
            >
              {selectedPlan === plan.title ? "Selected" : "Choose Plan"}
            </button>
          </div>
        ))}
      </div>

      <div className="text-center mt-10">
        <p className="text-gray-500">
          Need more details?{" "}
          <a href="/contact" className="text-primary font-semibold">
            Contact Us
          </a>
        </p>
      </div>
    </div>
  );
}
