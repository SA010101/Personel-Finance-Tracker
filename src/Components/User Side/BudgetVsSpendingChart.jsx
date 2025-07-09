import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from "chart.js";

// Register chart components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const BudgetVsSpendingChart = ({ budgets = {}, expenses = [] }) => {
  const categories = Object.keys(budgets);

  const expenseMap = expenses.reduce((acc, curr) => {
    acc[curr.category.toLowerCase()] = curr.amount;
    return acc;
  }, {});

  const data = {
    labels: categories.map(
      (cat) => cat.charAt(0).toUpperCase() + cat.slice(1)
    ),
    datasets: [
      {
        label: "Budget Allocated",
        backgroundColor: "#3b82f6", // Tailwind blue-500
        data: categories.map((cat) => budgets[cat] || 0)
      },
      {
        label: "Actual Spent",
        backgroundColor: "#10b981", // Tailwind green-500
        data: categories.map((cat) => expenseMap[cat.toLowerCase()] || 0)
      }
    ]
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { position: "bottom" },
      title: { display: true, text: "Budget vs Actual Spending by Category" }
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: function (value) {
            return `Rs ${value}`;
          }
        }
      }
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-4 bg-white rounded shadow">
      <Bar data={data} options={options} />
    </div>
  );
};

export default BudgetVsSpendingChart;
