import { useState } from "react"

function ManageBudget() {


  const [month,setMonth]=useState("")
  const [totalbudet,setTotalbudget]=useState("")

  const AddBudgetAPI=async ()=>{

  }

  return (
    <div className="w-full h-lvh px-24 bg-green-100">
      <div className="w-full h-lvh flex flex-col gap-5 px-5 py-10 bg-gray-300">

          <div className="w-full px-3 py-2 rounded-lg bg-blue-100">
          
            <div className="flex items-center gap-2">
                <div>Icon</div>
                <h1 className="text-2xl font-bold">Budget Management</h1>
            </div>
            <h1>Set and track your monthly spending limits</h1>

           </div>
          <div className="w-full flex justify-between px-3 py-3 gap-5 bg-sky-100">
            <div className="flex flex-col gap-2 px-5 py-5 rounded-lg bg-blue-50">
              <div className="flex gap-3 items-center">
                <div>Icon</div>
                <h1>Monthly Budget Setup</h1>
              </div>
              <form onSubmit={AddBudgetAPI} className="flex flex-col gap-3" action="">
                <div className="flex flex-col gap-2">
                  <label>Select Month</label>
                  <input className="outline-0 border border-black" type="month" onChange={(e)=>{setMonth(e.target.value)}}/>
                  <label>Total Monthly Budget (Rs)</label>
                  <input className="outline-0 border border-black" type="number" onChange={(e)=>{setTotalbudget(e.target.value)}}/>
                </div>
                <div className="flex flex-col gap-3">
                  <h1>Category Budget</h1>

                  <div className="flex gap-3">
                    <label htmlFor="">Food</label>
                    <input className="outline-0 border border-black" type="number" />
                  </div>

                   <div className="flex gap-3">
                    <label htmlFor="">Rent</label>
                    <input className="outline-0 border border-black" type="number" />
                  </div>

                   <div className="flex gap-3">
                    <label htmlFor="">Travel</label>
                    <input className="outline-0 border border-black" type="number" />
                  </div>
                  
                   <div className="flex gap-3">
                    <label htmlFor="">Utilities</label>
                    <input className="outline-0 border border-black" type="number" />
                  </div>

                  <button>Save Budget</button>

                </div>
              </form>
            </div>
            <div className="w-[200px] h-64 bg-yellow-100">Right Side</div>
          </div>

      </div>
      
    </div>
  )
}

export default ManageBudget
