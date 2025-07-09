    import { useState,useEffect } from "react"
    import BudgetUsageReport from "./BudgetUsageReport";
    import BudgetVsSpendingChart from "./BudgetVsSpendingChart";

    function Overview() {

      const BASE_URL="http://localhost:9000/app"

      const token=localStorage.getItem('token')
      const [month] = useState(() => new Date().toISOString().slice(0, 7));
      const [categoriesdata,setCategoriesdata]=useState([])
      const [transactionsdata,setTransactionsdata]=useState([])
      const [budgetdata,setBudgetdata]=useState([])
      const [category,setCategory]=useState("")
      const [amount,setAmount]=useState("")
      const [type,setType]=useState("expense")
      const [date,setDate]=useState("")
      const [note,setNote]=useState("")
      console.log(transactionsdata)
      console.log(budgetdata)
      
      {/* Logic for Getting BudgetsCategories */}
      const BudgetCategories=budgetdata.categoryBudgets;
      console.log(BudgetCategories)

      {/*Logic for Calculating Total Income*/}
      const IncomesArr = transactionsdata.filter(item => item.type === "income");
      const TotalIncome = IncomesArr.reduce((sum, item) => sum + item.amount, 0);

      {/*Logic for Calculating Total Income*/}
      const ExpenseArr = transactionsdata.filter(item => item.type === "expense");
      console.log(ExpenseArr)
      const TotalExpense = ExpenseArr.reduce((sum, item) => sum + item.amount, 0);

      {/* Calculating Budgets for Category */}
      const getPercentUsed = (amount, budget) => {
        if (!budget || budget === 0) return 0;
          return (amount / budget) * 100;
        };


      console.log(TotalIncome)
      // Formatting Date and Time
      const formatDate = (dateStr) => {
          const date = new Date(dateStr);
          return `${date.getDate()} ${date.toLocaleString("en-US", { month: "long" })} ${date.getFullYear()}`;
        };

    {/* API for fetch Categories */}
    const fetchCategories = async () => {

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

    {/* API for fetch Budget */}
    const fetchBudget = async () => {

      try {
        const response = await fetch(`${BASE_URL}/budgets?month=${month}`, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await response.json();

        if (response.ok) {
      alert("Budget fetched")
          setBudgetdata(data)
        }

      } catch (error) {
        console.error('Error fetching categories:', error.message || error);
      }
    };


    {/* Delete Transaction API */}
    const deleteTransaction = async (transactionId) => {

  try {
    const response = await fetch(`${BASE_URL}/deleteTransaction/${transactionId}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.ok) {
      console.log(`Transaction ${transactionId} deleted successfully`);
      fetchTransactions();
    } else {
      const errorData = await response.json();
      console.error('Failed to delete transaction:', errorData.message || response.statusText);
    }

  } catch (error) {
    console.error('Error deleting transaction:', error.message || error);
  }
};


    useEffect(()=>{
    fetchCategories(),
    fetchTransactions()
    fetchBudget()
    },[])


      return (
        <div className="w-full px-24">
          <div className="w-full flex flex-col gap-5 px-5 py-10 bg-gray-300">

              <div className="w-full flex justify-between items-center px-3 py-2 rounded-lg bg-blue-100">

                <div>
                   <div className="flex items-center gap-2">
                    <div>Icon</div>
                    <h1 className="text-2xl font-bold">Financial Dashboard</h1>
                  </div>
                    <h1>Your complete financial overview at a glance</h1>
              </div>
                    <button className="bg-blue-500 px-3 py-1 rounded-lg">Export PDF</button>
              </div>

              <div className="w-full flex justify-between">

                <div className="bg-green-100 flex flex-col px-2 py-2 rounded-lg gap-4 w-48">
                      <div className="flex justify-between items-center">
                          <div>Icon</div>
                            <div className="flex flex-col gap-1">
                              <h1>Total Income</h1>
                              <h1>Rs: {TotalIncome}</h1>
                            </div>
                     </div>
                     <div>horizintal grap</div>
                </div>

                <div className="bg-green-100 flex flex-col px-2 py-2 rounded-lg gap-4 w-48">
                      <div className="flex justify-between items-center">
                          <div>Icon</div>
                            <div className="flex flex-col gap-1">
                              <h1>Total Expenses</h1>
                              <h1>Rs: {TotalExpense}</h1>
                            </div>
                     </div>
                     <div>horizintal grap</div>
                </div>

                <div className="bg-green-100 flex flex-col px-2 py-2 rounded-lg gap-4 w-48">
                      <div className="flex justify-between items-center">
                          <div>Icon</div>
                            <div className="flex flex-col gap-1">
                              <h1>Net Balance</h1>
                              <h1>Rs: {TotalIncome-TotalExpense}</h1>
                            </div>
                     </div>
                     <div>horizintal grap</div>
                </div>

              </div>

                  <div className="w-full flex flex-col bg-blue-200 justify-between">

                      <div className="flex gap-2">
                        <div>Icon</div>
                        <h1>Monthly Budget Progress</h1>
                      </div>
                      <div className="flex items-center justify-between gap-3">
                        <div>Horizintal Bar</div>
                        <div className="flex flex-col px-2 py-2 gap-2 rounded-lg  bg-green-200 ">
                         <h1>Rs {TotalExpense} / Rs {budgetdata.totalBudget}</h1>
                         <h1>{Number((TotalExpense / budgetdata.totalBudget) * 100).toFixed(2)}% Used</h1>

                          </div>
                      </div>

              </div>

                 <div className="w-full flex flex-col justify-between px-3 py-2 gap-5 rounded-lg bg-blue-100">

                  <div className="flex gap-2">
                    <div>📊</div>
                    <h1>Category Spending</h1>
                  </div>
                  <div className="flex gap-3">
                    {/* Budget Usage Percentage */}
                   <BudgetUsageReport budgets={budgetdata.categoryBudgets} expenses={ExpenseArr} />
                    
                  </div>
                  
              </div>

        <div className="w-full flex justify-between px-3 py-2 gap-5 rounded-lg bg-blue-100">

                <div className="flex flex-col gap-3 bg-fuchsia-50">

                 <div className="w-full flex items-center gap-3">
                  <div>🔄</div>
                  <h1>Income vs Expense Trend</h1>
                </div>

                  <div>Graph will here</div>

                </div>
                
                <div className="flex flex-col gap-3 bg-fuchsia-50">

                 <div className="w-full flex items-center gap-3">
                  <div>🥧</div>
                  <h1>Expense Distribution</h1>
                </div>

                  <div>Here will be pie pie Chart (Category Expense Amount) Vs (Total expenses amount) percentage base</div>

                </div>
                
        </div> 




                <div className="w-full flex flex-col justify-between px-3 py-2 gap-5 rounded-lg bg-blue-100">

                <div className="w-full flex items-center gap-3">
                  <div>🔄</div>
                  <h1>Budget vs Actual Spending</h1>
                </div>
                  
                  <div className="w-full bg-green-100">
                    <BudgetVsSpendingChart budgets={budgetdata.categoryBudgets} expenses={ExpenseArr} />
                  </div>
                
                  </div>              




              <div className="w-full flex flex-col justify-between px-3 py-2 gap-5 rounded-lg bg-blue-100">

                <div className="w-full flex items-center gap-3">
                  <div>🔄</div>
                  <h1>Recent Transactions</h1>
                </div>
                  
                {
                  transactionsdata.length==0? <div>No Transactions</div>:
                  transactionsdata.map((transaction,index)=>{
                    return <div key={index} className="flex justify-between items-center">
                  <div className="flex flex-col gap-2">
                    <h1>{transaction.category}</h1>
                    <h1>{transaction.date}</h1>
                  </div>
                  <div>Rs: {transaction.amount}</div>
                  <button className="cursor-pointer" onClick={()=>{deleteTransaction(transaction._id)}}>Delete Icon</button>
                </div>

                  })
                }
                
                  </div>
          </div>
          
        </div>
      )
    }

    export default Overview
