import { useState, useEffect } from "react";

function BudgetMonitoring() {
  const BASE_URL = "http://localhost:9000/app";
  const token = localStorage.getItem("token");

  const [allbudgets,setAllbudgets]=useState([])
  console.log(allbudgets)

  {/* API for fetch All Users Budgets */}
    const fetchBudgets = async () => {

      try {
        const response = await fetch(`${BASE_URL}/getAllUsersBudget`, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await response.json();
        console.log('Categories:', data);

        if (response.ok) {
          setAllbudgets(data.budgets)
        }

      } catch (error) {
        console.error('Error fetching categories:', error.message || error);
      }
    };

    useEffect(()=>{
      fetchBudgets()
    },[])

  return (
    <div className="w-full px-4 md:px-24 py-10 bg-gray-100 min-h-screen">
      <div className="w-full flex flex-col gap-8">
        {/* Header */}
        <div className="w-full p-6 rounded-lg bg-gradient-to-r from-blue-200 to-blue-100 shadow">
          <div className="flex items-center gap-3">
            <div>📊</div>
            <h1 className="text-3xl font-bold text-blue-900">Admin Budget Monitoring</h1>
          </div>
          <p className="text-gray-600">Track and manage user budget allocations</p>
        </div>

        {/* Users Budget Sections */}
    <div className="w-full flex flex-wrap lg:flex-row gap-6">
          
          {
              allbudgets.length===0? <div>No Budgets</div> :
              allbudgets.map((userbudget,index)=>{
                return <div key={index} className="flex flex-col px-3 py-3 rounded-lg gap-5 bg-blue-100">
              <div className="flex items-center gap-2">
               <div>Icon</div>
               <div>
                <h1>Budget Overview</h1>
                <h1>Monthly allocation</h1>
               </div>
            </div>

                <div>
                    <div className="flex gap-3">
                      <div>Icon</div>
                      <div>{userbudget.user}:</div>
                    </div>
                    <div className="flex gap-3">
                      <div>Icon</div>
                      <div>{userbudget.month}:</div>
                    </div>
                    <div className="flex gap-3">
                      <div>Icon</div>
                      <div>Rs: {userbudget.totalBudget}</div>
                    </div>
                </div>
                <div className="flex flex-col gap-2 bg-green-100">

                      <h1>Category Budgets</h1>
                    {Object.entries(userbudget.categoryBudgets).length > 0 ? (
                          Object.entries(userbudget.categoryBudgets).map(([category, budget], index) => (
                            <div key={index} className="flex justify-between border-b py-1 text-gray-800">
                              <span className="font-medium">{category}</span>
                              <span>Rs {budget}</span>
                            </div>
                          ))
                        ) : (
                          <div className="text-sm text-red-500">No category budgets set yet.</div>
                        )}



                </div>
                <button>Send Budget Alert</button>
                  </div>
              })
          }
          
         
        </div>
      </div>
    </div>
  );
}

export default BudgetMonitoring;
