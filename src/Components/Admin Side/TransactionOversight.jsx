import { useState, useEffect } from "react";

function TransactionOversight() {
  const BASE_URL = "http://localhost:9000/app";
  const token = localStorage.getItem("token");

  const [alltransactions, setAlltransactions] = useState([]);
  console.log(alltransactions);

  // Fetch API
  const fetchAlltransactions = async () => {
    try {
      const response = await fetch(`${BASE_URL}/getAllTransactions`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();
      console.log('Categories:', data);

      if (response.ok) {
        setAlltransactions(data.transactions);
      }

    } catch (error) {
      console.error('Error fetching categories:', error.message || error);
    }
  };

  useEffect(() => {
    fetchAlltransactions();
  }, []);

  return (
    <div className="px-4 md:px-24 py-10 bg-gray-100 min-h-screen">
      <div className="flex flex-col gap-8">

        {/* Header */}
        <div className="w-full p-6 rounded-xl bg-gradient-to-r from-blue-400 via-blue-300 to-blue-200 shadow-lg">
          <div className="flex items-center gap-3 mb-2">
            <div className="text-3xl">📊</div>
            <h1 className="text-3xl font-extrabold text-white drop-shadow">Admin Transaction Oversight</h1>
          </div>
          <p className="text-white font-medium">Monitor and manage all user transactions</p>
        </div>

        {/* Search */}
        <div className="w-full p-4 rounded-xl bg-white shadow-sm border border-gray-200">
          <div className="w-full flex items-center gap-3 px-4 py-2 rounded-lg border border-gray-300 bg-gray-50">
            <div className="text-xl text-gray-500">🔍</div>
            <input
              className="w-full py-2 px-2 rounded-lg outline-none bg-transparent text-gray-700"
              type="text"
              placeholder="Search by ID, user, category, or amount..."
            />
          </div>
        </div>

        {/* Transactions List */}
        <div className="w-full flex flex-wrap px-5 py-5 gap-6 bg-white rounded-xl shadow-md">
          {
            alltransactions.length === 0 ? (
              <div className="text-center text-gray-500 text-lg font-medium w-full">
                No Transactions
              </div>
            ) : (
              alltransactions.map((transaction, index) => {
                return (
                  <div key={index} className="flex flex-col gap-3 p-5 w-full sm:w-[300px] rounded-xl bg-gradient-to-br from-yellow-50 to-amber-100 border border-yellow-200 shadow-sm hover:shadow-md transition-shadow">
                    <div className="flex items-center gap-2 text-lg font-semibold text-green-700">
                      <span>💰</span>
                      <h1>Rs {transaction.amount}</h1>
                    </div>
                    <div className="flex items-center gap-2 text-gray-700">
                      <span>🆔</span>
                      <h1>UserId: {transaction._id}</h1>
                    </div>
                    <div className="flex items-center gap-2 text-gray-700">
                      <span>📂</span>
                      <h1>Category: {transaction.category}</h1>
                    </div>
                    <div className="flex items-center gap-2 text-gray-700">
                      <span>📅</span>
                      <h1>Date: {transaction.date}</h1>
                    </div>
                    <div className={`text-sm font-bold py-1 px-2 rounded-full w-fit ${transaction.type === 'income' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-600'}`}>
                      {transaction.type}
                    </div>
                    <div className="flex items-center gap-2 mt-2">
                      <span className="text-red-600">🗑️</span>
                      <button className="text-sm text-red-600 font-medium hover:underline">Delete Transaction</button>
                    </div>
                  </div>
                );
              })
            )
          }
        </div>
      </div>
    </div>
  );
}

export default TransactionOversight;
