import { useState, useEffect } from "react";
import BudgetUsageReport from "./BudgetUsageReport";
import BudgetVsSpendingChart from "./BudgetVsSpendingChart";
import CategoryExpensePieChart from "./CategoryExpensePieChart";

function Overview() {
  const BASE_URL = "http://localhost:9000/app";
  const token = localStorage.getItem("token");

  const [month] = useState(() => new Date().toISOString().slice(0, 7));
  const [categoriesdata, setCategoriesdata] = useState([]);
  const [transactionsdata, setTransactionsdata] = useState([]);
  const [budgetdata, setBudgetdata] = useState([]);

  // Calculate Total Income
  const IncomesArr = transactionsdata.filter((item) => item.type === "income");
  const TotalIncome = IncomesArr.reduce((sum, item) => sum + item.amount, 0);

  // Calculate Total Expense
  const ExpenseArr = transactionsdata.filter((item) => item.type === "expense");
  const TotalExpense = ExpenseArr.reduce((sum, item) => sum + item.amount, 0);

  // Calculate Percentage of Budget Used
  const getPercentUsed = (amount, budget) => {
    if (!budget || budget === 0) return 0;
    return (amount / budget) * 100;
  };

  // API Call: Fetch Categories
  const fetchCategories = async () => {
    try {
      const response = await fetch(`${BASE_URL}/categories`, {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await response.json();
      if (response.ok) setCategoriesdata(data);
    } catch (error) {
      console.error("Error fetching categories:", error.message || error);
    }
  };

  // API Call: Fetch Transactions
  const fetchTransactions = async () => {
    try {
      const response = await fetch(`${BASE_URL}/transactions`, {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await response.json();
      if (response.ok) setTransactionsdata(data);
    } catch (error) {
      console.error("Error fetching transactions:", error.message || error);
    }
  };

  // API Call: Fetch Budget
  const fetchBudget = async () => {
    try {
      const response = await fetch(`${BASE_URL}/budgets?month=${month}`, {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await response.json();
      if (response.ok) setBudgetdata(data);
    } catch (error) {
      console.error("Error fetching budget:", error.message || error);
    }
  };

  // API Call: Delete Transactions
  const deleteTransaction = async (transactionId) => {
    try {
      const response = await fetch(`${BASE_URL}/deleteTransaction/${transactionId}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (response.ok) {
        fetchTransactions();
      }
    } catch (error) {
      console.error("Error deleting transaction:", error.message || error);
    }
  };

  useEffect(() => {
    fetchCategories();
    fetchTransactions();
    fetchBudget();
  }, []);

  return (
    <div className="w-full px-6 py-10 bg-gray-100">
      <div className="max-w-7xl mx-auto flex flex-col gap-6">
        {/* Header */}
        <div className="flex justify-between items-center bg-gradient-to-r from-blue-500 to-indigo-500 text-white p-6 rounded-lg shadow-md">
          <div>
            <h1 className="text-3xl font-bold">📊 Financial Dashboard</h1>
            <p className="text-sm">Your complete financial overview at a glance</p>
          </div>
          <button className="bg-white text-blue-600 font-medium px-4 py-2 rounded-md shadow hover:bg-gray-100 transition">
            Export PDF
          </button>
        </div>

        {/* Income, Expense, Net Balance */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            { label: "Total Income", value: TotalIncome, color: "from-green-400 to-green-600" },
            { label: "Total Expenses", value: TotalExpense, color: "from-red-400 to-red-600" },
            { label: "Net Balance", value: TotalIncome - TotalExpense, color: "from-blue-400 to-blue-600" },
          ].map((card, i) => (
            <div
              key={i}
              className={`bg-gradient-to-r ${card.color} text-white p-4 rounded-lg shadow-md flex justify-between items-center`}
            >
              <div>
                <h2 className="text-lg font-semibold">{card.label}</h2>
                <p className="text-xl font-bold">Rs: {card.value}</p>
              </div>
              <div>📈</div>
            </div>
          ))}
        </div>

        {/* Monthly Budget Progress */}
        <div className="bg-white p-5 rounded-lg shadow space-y-4">
          <div className="flex items-center gap-2 text-lg font-semibold">
            📅 <span>Monthly Budget Progress</span>
          </div>
          <div className="flex items-center justify-between gap-4">
            <div className="flex-1 bg-gray-200 rounded-full h-6 overflow-hidden">
              <div
                className="bg-green-500 h-full rounded-full transition-all duration-300"
                style={{ width: `${(TotalExpense / budgetdata.totalBudget) * 100}%` }}
              ></div>
            </div>
            <div className="text-sm text-green-800 font-medium bg-green-100 px-4 py-2 rounded-md">
              <p>Rs {TotalExpense} / Rs {budgetdata.totalBudget}</p>
              <p>{Number((TotalExpense / budgetdata.totalBudget) * 100).toFixed(2)}% Used</p>
            </div>
          </div>
        </div>

        {/* Category Spending */}
        <div className="bg-white p-5 rounded-lg shadow space-y-4">
          <div className="flex items-center gap-2 text-lg font-semibold">
            🗂️ <span>Category Spending</span>
          </div>
          <BudgetUsageReport budgets={budgetdata.categoryBudgets} expenses={ExpenseArr} />
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-5 rounded-lg shadow space-y-3">
            <h2 className="flex items-center gap-2 text-lg font-semibold">📈 Income vs Expense Trend</h2>
            <div className="bg-gray-100 h-64 rounded-md flex items-center justify-center text-gray-400">
              Graph will be here
            </div>
          </div>

          <div className="bg-white p-5 rounded-lg shadow space-y-3">
            <h2 className="flex items-center gap-2 text-lg font-semibold">🥧 Expense Distribution</h2>
            <CategoryExpensePieChart totalExpense={TotalExpense} categoryExpenses={ExpenseArr} />
          </div>
        </div>

        {/* Budget vs Actual Spending */}
        <div className="bg-white p-5 rounded-lg shadow space-y-4">
          <div className="flex items-center gap-2 text-lg font-semibold">
            📊 <span>Budget vs Actual Spending</span>
          </div>
          <BudgetVsSpendingChart budgets={budgetdata.categoryBudgets} expenses={ExpenseArr} />
        </div>

        {/* Recent Transactions */}
        <div className="bg-white p-5 rounded-lg shadow space-y-4">
          <div className="flex items-center gap-2 text-lg font-semibold">
            💳 <span>Recent Transactions</span>
          </div>
          {transactionsdata.length === 0 ? (
            <p className="text-gray-500">No Transactions</p>
          ) : (
            <div className="space-y-3">
              {transactionsdata.map((transaction, index) => (
                <div
                  key={index}
                  className="flex justify-between items-center border-b pb-2 text-sm"
                >
                  <div className="flex flex-col text-gray-700">
                    <span className="font-semibold">{transaction.category}</span>
                    <span className="text-xs text-gray-500">{transaction.date}</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="font-medium">Rs: {transaction.amount}</span>
                    <button
                      className="text-red-500 hover:text-red-700 transition"
                      onClick={() => deleteTransaction(transaction._id)}
                    >
                      🗑️
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Overview;
