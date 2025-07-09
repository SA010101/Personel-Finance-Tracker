import React from "react";

const BudgetUsageReport = ({ budgets = {}, expenses = [] }) => {
  // Create a map of expenses by category in lowercase for quick lookup
  const expenseMap = expenses.reduce((acc, curr) => {
    acc[curr.category.toLowerCase()] = curr.amount;
    return acc;
  }, {});

  const getPercentUsed = (amount, budget) => {
    if (!budget || budget === 0) return 0;
    return (amount / budget) * 100;
  };

  return (
    <div className="max-w-2xl mx-auto p-4 space-y-6">
      {Object.entries(budgets).map(([categoryKey, budgetAmount]) => {
        const expenseAmount = expenseMap[categoryKey.toLowerCase()] || 0;
        const percentUsed = getPercentUsed(expenseAmount, budgetAmount);
        const isOverBudget = percentUsed > 100;

        // Capitalize category name for display
        const displayCategory =
          categoryKey.charAt(0).toUpperCase() + categoryKey.slice(1);

        return (
          <div
            key={categoryKey}
            className="p-4 border rounded shadow-sm bg-white space-y-2"
          >
            <div className="font-semibold text-lg flex justify-between items-center">
              <span>📂 {displayCategory}</span>
              <span className={isOverBudget ? "text-red-500" : "text-green-600"}>
                {percentUsed.toFixed(2)}% used
              </span>
            </div>
            <div className="text-sm text-gray-600">
              Rs: {expenseAmount} / {budgetAmount}
            </div>
            <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
              <div
                className={`h-full rounded-full ${
                  isOverBudget ? "bg-red-500" : "bg-green-500"
                }`}
                style={{ width: `${Math.min(percentUsed, 100)}%` }}
              ></div>
            </div>
            <div className="text-right text-xs text-gray-600">
              {percentUsed.toFixed(2)}%
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default BudgetUsageReport;
