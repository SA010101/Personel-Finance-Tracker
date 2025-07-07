    import { useState,useEffect } from "react"

    function AddTransaction() {

      const BASE_URL="http://localhost:9000/app"

      const token=localStorage.getItem('token')
      const [month,setMonth]=useState("")
      const [totalbudget,setTotalbudget]=useState(0)
      const [categoriesdata,setCategoriesdata]=useState([])
      const [transactionsdata,setTransactionsdata]=useState([])
      console.log(transactionsdata)

    //   const BudgetData = {
    //   month: month,
    //   totalBudget: totalbudget,
    //   categoryBudgets: categoryBudgets,
    // };

    {/* API for fetch Categories */}
    const fetchCategories = async () => {
      const token = localStorage.getItem('token');

      try {
        const response = await fetch(`${BASE_URL}/categories`, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await response.json();
        console.log('Categories:', data);

        if (response.ok) {
          setCategoriesdata(data)
        }

      } catch (error) {
        console.error('Error fetching categories:', error.message || error);
      }
    };

    {/* API for fetch Transactions */}
    const fetchTransactions = async () => {
      const token = localStorage.getItem('token');

      try {
        const response = await fetch(`${BASE_URL}/transactions`, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await response.json();
        console.log('Categories:', data);

        if (response.ok) {
      
          setTransactionsdata(data)
        }

      } catch (error) {
        console.error('Error fetching categories:', error.message || error);
      }
    };

    useEffect(()=>{
    fetchCategories(),
    fetchTransactions()
    },[])


      return (
        <div className="w-full px-24">
          <div className="w-full flex flex-col gap-5 px-5 py-10 bg-gray-300">

              <div className="w-full px-3 py-2 rounded-lg bg-blue-100">
              
                <div className="flex items-center gap-2">
                    <div>Icon</div>
                    <h1 className="text-2xl font-bold">Add Transaction</h1>
                </div>
                <h1>Record your income and expenses</h1>

              </div>
              <div className="w-full flex justify-between px-3 py-3 gap-5">
                <div className="flex flex-col gap-2 px-5 py-5 rounded-lg bg-blue-50">
                  <div className="flex gap-3 items-center">
                    <div>📝</div>
                    <h1>New Transaction</h1>
                  </div>
                  <form className="flex flex-col gap-3" action="">
                    
                    <div className="flex flex-col gap-2">
                      <h1>Transaction Type</h1>
                      <div className="flex gap-4">
                        <button className="bg-green-200 px-4 py-1 rounded-lg font-semibold">Expense</button>
                        <button className="bg-blue-200 px-4 py-1 rounded-lg font-semibold">Income</button>
                      </div>

                      <div className="flex flex-col gap-1">
                          <label htmlFor="">Amount (Rs)</label>
                          <input className="w-full px-3 py-1 outline-0 border border-black rounded-lg" type="number" placeholder="0.00"/>
                      </div>

                     <div className="flex flex-col gap-1">
                          <label htmlFor="">Date</label>
                          <input className="w-full px-3 py-1 outline-0 border border-black rounded-lg" type="date" placeholder="0.00"/>
                    </div>

                    <div className="flex flex-col gap-1">
                          <label htmlFor="">Note (Optional)</label>
                          <input className="w-full px-3 py-1 outline-0 border border-black rounded-lg" type="text" placeholder="Add a note"/>
                    </div>

                    </div>


                  <button className="bg-blue-500 px-3 py-1 cursor-pointer rounded-lg">Save Budget</button>
                  </form>
                </div>
                <div className="flex flex-col px-4 py-4 gap-7 rounded-lg bg-yellow-100">

                  hh
                </div>
              </div>

          </div>
          
        </div>
      )
    }

    export default AddTransaction
