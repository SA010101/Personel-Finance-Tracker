    import { useState,useEffect } from "react"

    function AddTransaction() {

      const BASE_URL="http://localhost:9000/app"

      const token=localStorage.getItem('token')
      const [categoriesdata,setCategoriesdata]=useState([])
      const [transactionsdata,setTransactionsdata]=useState([])
      const [category,setCategory]=useState("")
      const [amount,setAmount]=useState("")
      const [type,setType]=useState("")
      const [date,setDate]=useState("")
      const [note,setNote]=useState("")
      console.log(transactionsdata)
      console.log(type)

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

    {/* API for Add Transaction */}
    const AddTransactions = async () => {

      const AddTransactionData={
        category: category,
        amount: amount,
        type: type,
        date: date,
        note: note,
      }

      try {
        const response = await fetch(`${BASE_URL}/addTransaction`, {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body:JSON.stringify(AddTransactionData)
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
                        <button className="bg-green-200 px-4 py-1 rounded-lg font-semibold" onClick={()=>{setType("EXPENSE")}}>Expense</button>
                        <button className="bg-blue-200 px-4 py-1 rounded-lg font-semibold" onClick={()=>{setType("INCOME")}}>Income</button>
                      </div>

                      <select name="" id="">
                        <option value="">1</option>
                        <option value="">2</option>
                        <option value="">3</option>
                      </select>

                      <div className="flex flex-col gap-1">
                          <label htmlFor="">Amount (Rs)</label>
                          <input className="w-full px-3 py-1 outline-0 border border-black rounded-lg" type="number" placeholder="0.00" onChange={(e)=>{setAmount(e.target.value)}}/>
                      </div>

                     <div className="flex flex-col gap-1">
                          <label htmlFor="">Date</label>
                          <input className="w-full px-3 py-1 outline-0 border border-black rounded-lg" type="date" onChange={(e)=>{setDate(e.target.value)}}/>
                    </div>

                    <div className="flex flex-col gap-1">
                          <label htmlFor="">Note (Optional)</label>
                          <input className="w-full px-3 py-1 outline-0 border border-black rounded-lg" type="text" placeholder="Add a note" onChange={(e)=>{setNote(e.target.value)}}/>
                    </div>

                    </div>

                  <button className="bg-blue-500 px-3 py-1 cursor-pointer rounded-lg">Save Budget</button>
                  </form>
                </div>
                <div className="flex flex-col px-4 py-4 gap-7 rounded-lg bg-yellow-100">

                  <div className="flex gap-3 items-center">
                    <div>📋</div>
                    <h1>Recent Transactions</h1>
                  </div>

                  {
                    transactionsdata.length===0? <div>No Transactions Yet</div>:
                    transactionsdata.map((transaction,index)=>{
                     return <div key={index} className="flex justify-between w-80 bg-orange-500 h-20">

                                <div className="flex flex-col">
                                  <h1>{transaction.type}</h1>
                                  <h1>{transaction.category}</h1>
                                  <h1>{formatDate(transaction.date)}</h1>
                                </div>
                                
                                <div className="flex items-center gap-2">
                                  <h1>Rs: {transaction.amount}</h1>
                                  <button onClick={()=>{deleteTransaction(transaction._id)}}>Delete Icon</button>
                                </div>

                            </div>
                    })
                  }

                </div>
              </div>

          </div>
          
        </div>
      )
    }

    export default AddTransaction
