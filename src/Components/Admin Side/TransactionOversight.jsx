import { useState, useEffect } from "react";

function TransactionOversight() {
  const BASE_URL = "http://localhost:9000/app";
  const token = localStorage.getItem("token");

  const [alltransactions,setAlltransactions]=useState([])
  console.log(alltransactions)

  {/* API for fetch All Users Budgets */}
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
          setAlltransactions(data.transactions)
        }

      } catch (error) {
        console.error('Error fetching categories:', error.message || error);
      }
    };

    useEffect(()=>{
      fetchAlltransactions()
    },[])

  return (
          <div className="w-full px-4 md:px-24 py-10 bg-gray-100 min-h-screen">
            <div className="w-full flex flex-col gap-8">
              {/* Header */}
              <div className="w-full p-6 rounded-lg bg-gradient-to-r from-blue-200 to-blue-100 shadow">
                <div className="flex items-center gap-3">
                  <div>📊</div>
                  <h1 className="text-3xl font-bold text-blue-900">Admin Transaction Oversight</h1>
                </div>
                <p className="text-gray-600">Monitor and manage all user transactions</p>
              </div>

               <div className="w-full p-3 rounded-lg bg-gradient-to-r from-blue-200 to-blue-100 shadow">
                <div className="w-full flex items-center px-3 rounded-lg border border-black gap-2">
                  <div>icon</div>
                  <input className="w-full py-2 rounded-lg outline-0 " type="text" placeholder="Search by ID,user,catogory,or amount..."/>
                </div>
              </div>

              {/* Users Budget Sections */}
              <div className="w-full flex flex-wrap px-5 py-5 gap-6 bg-indigo-100 lg:flex-row">        
              {
                  alltransactions.length===0? <div>No Transactions</div>:
                  alltransactions.map((transaction,index)=>{
                      return <div key={index} className="flex flex-col px-4 py-5 gap-2 rounded-lg bg-amber-50">

                      <div className="flex gap-3">
                        <div>Icon</div>
                        <h1>Rs {transaction.amount}</h1>
                      </div>
                      <div className="flex gap-3">
                        <div>Icon</div>
                        <h1>UserId: {transaction._id}</h1>
                      </div>
                      <div className="flex gap-3">
                        <div>Icon</div>
                        <h1>Category: {transaction.category}</h1>
                      </div>
                      <div className="flex gap-3">
                        <div>Icon</div>
                        <h1>Date: {transaction.date}</h1>
                      </div>
                      <div>{transaction.type}</div>
                      <div className="flex gap-3">
                        <div>Delete Icon</div>
                        <button>Delete Transaction</button>
                      </div>

                  </div>
                  })
              }     
              </div>
      </div>
    </div>
  );
}

export default TransactionOversight;
