import React from "react";
import { Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  Title
} from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend, Title);

const CategoryExpensePieChart = ({ totalExpense = 0, categoryExpenses = [] }) => {
  // Total of known category expenses
  const knownTotal = categoryExpenses.reduce((acc, curr) => acc + curr.amount, 0);
  const remaining = Math.max(totalExpense - knownTotal, 0);

  const labels = categoryExpenses.map((item) => item.category);
  const dataValues = categoryExpenses.map((item) => item.amount);

  // Add 'Remaining' slice if needed
  if (remaining > 0) {
    labels.push("Remaining");
    dataValues.push(remaining);
  }

  const data = {
    labels,
    datasets: [
      {
        label: "Expense Distribution",
        data: dataValues,
        backgroundColor: [
          "#3b82f6", // Blue
          "#10b981", // Green
          "#f59e0b", // Amber
          "#ef4444", // Red
          "#8b5cf6", // Violet
          "#ec4899", // Pink
          "#9ca3af", // Gray (for Remaining)
        ],
        borderColor: "#fff",
        borderWidth: 1
      }
    ]
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "bottom"
      },
      title: {
        display: true,
        text: `Category Expenses vs Total (Rs ${totalExpense})`
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            const amount = context.raw;
            const percent = ((amount / totalExpense) * 100).toFixed(2);
            return `Rs ${amount} (${percent}%)`;
          }
        }
      }
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white p-4 rounded shadow">
      <Pie data={data} options={options} />
    </div>
  );
};

export default CategoryExpensePieChart;
