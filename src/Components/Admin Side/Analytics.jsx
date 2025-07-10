import { useState, useEffect } from "react";

function Analytics() {
  const BASE_URL = "http://localhost:9000/app";
  const token = localStorage.getItem("token");

  const [budgetanalytics,setBudgetAnalytics]=useState([])
  console.log(budgetanalytics)

  {/* API for fetch All Users Budgets */}
    const fetchBudgetAnalytics= async () => {

      try {
        const response = await fetch(`${BASE_URL}/admin/analytics/overview`, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await response.json();
        console.log('Categories:', data);

        if (response.ok) {
          setBudgetAnalytics(data)
        }

      } catch (error) {
        console.error('Error fetching categories:', error.message || error);
      }
    };

    useEffect(()=>{
      fetchBudgetAnalytics()
    },[])

  return (
    <div className="w-full px-4 md:px-24 py-10 bg-gray-100 min-h-screen">
      <div className="w-full flex flex-col gap-8">
        {/* Header */}
        <div className="w-full p-6 rounded-lg bg-gradient-to-r from-blue-200 to-blue-100 shadow">
          <div className="flex items-center gap-3">
            <div>📊</div>
            <h1 className="text-3xl font-bold text-blue-900">Analytics Dashboard</h1>
          </div>
        </div>

          <div className="w-full flex flex-wrap gap-8 bg-green-50 ">

            <div className="flex flex-col items-center">
              <div>🧍 Total Users</div>
              <h1>{budgetanalytics.totalUsers}</h1>
            </div>

            <div className="flex flex-col items-center">
              <div>✅ Active This Month</div>
              <h1>{budgetanalytics.activeUsers}</h1>
            </div>

            <div className="flex flex-col items-center">
              <div>🆕 New Users</div>
              <h1>{budgetanalytics.newUsers}</h1>
            </div>

            <div className="flex flex-col items-center">
              <div>💰 Total Income</div>
              <h1>{budgetanalytics.totalIncome}</h1>
            </div>

            <div className="flex flex-col items-center">
              <div>💸 Total Expense</div>
              <h1>{budgetanalytics.totalExpense}</h1>
            </div>

          </div>

          <div className="w-full flex flex-col gap-5 bg-blue-100">
            <h1>📊 Top Spending Categories</h1>
            <div>
              {Array.isArray(budgetanalytics.topCategories) && budgetanalytics.topCategories.length > 0 ? (
                    budgetanalytics.topCategories.map((category, index) => (
                      <div key={index} className="w-full flex justify-between items-center">
                        <h1>{category.name}</h1>
                        <h1>Rs: {category.amount}</h1>
                      </div>
                    ))
                  ) : (
                    <div>No Top Categories</div>
                  )}
                
            </div>
          </div>


      </div>
    </div>
  );
}

export default Analytics;
