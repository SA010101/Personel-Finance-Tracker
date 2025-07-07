import { useState,useEffect } from "react"

function ManageBudget() {

  const BASE_URL="http://localhost:9000/app"

  const token=localStorage.getItem('token')
  const [month,setMonth]=useState("")
  const [totalbudget,setTotalbudget]=useState("")
  const [foodbudget,setFoodbudget]=useState("")
  const [rentbudget,setRentbudget]=useState("")
  const [travelbudget,setTravelbudget]=useState("")
  const [utilitiesbudget,setUtilitiesbudget]=useState("")
  const [categoryName,setCategoryname]=useState("")
  const [categoriesdata,setCategoriesdata]=useState([])
  console.log(categoriesdata)

  const BudgetData={
    month:month,
    totalBudget:totalbudget,
    categoryBudgets:{
      Food:foodbudget,
      Rent:rentbudget,
      Travel:travelbudget,
      Utilities:utilitiesbudget,
    }
  }

  const AddBudgetAPI=async (e)=>{

    e.preventDefault();

     try {
    const response = await fetch(`${BASE_URL}/addBudget`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(BudgetData),
    });

    const data = await response.json();
    if(response.ok){
      alert("Budget Added")
    }
    console.log('Saved:', data);
  } catch (error) {
    console.error('Error:', error);
  }
};

const AddCategoryAPI=async (e)=>{

    e.preventDefault();

     try {
    const response = await fetch(`${BASE_URL}/addCategory`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({categoryName}),
    });

    const data = await response.json();
    if(response.ok){
      alert("Category Added")
    }
    console.log('Saved:', data);
  } catch (error) {
    console.error('Error:', error);
  }
};

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
      alert("Categories Fetched")
      setCategoriesdata(data)
    }

  } catch (error) {
    console.error('Error fetching categories:', error.message || error);
  }
};

useEffect(()=>{
fetchCategories()
},[])


  return (
    <div className="w-full px-24">
      <div className="w-full flex flex-col gap-5 px-5 py-10 bg-gray-300">

          <div className="w-full px-3 py-2 rounded-lg bg-blue-100">
          
            <div className="flex items-center gap-2">
                <div>Icon</div>
                <h1 className="text-2xl font-bold">Budget Management</h1>
            </div>
            <h1>Set and track your monthly spending limits</h1>

           </div>
          <div className="w-full flex justify-between px-3 py-3 gap-5">
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
                  <input className="outline-0 border border-black rounded-lg" type="number" onChange={(e)=>setTotalbudget(e.target.value)}/>
                </div>
                <div className="flex flex-col gap-3">
                  <h1>Category Budget</h1>

                  <div className="flex gap-3">
                    <label htmlFor="">Food</label>
                    <input className="outline-0 border border-black rounded-lg" type="number" onChange={(e)=>{setFoodbudget(e.target.value)}}/>
                  </div>

                   <div className="flex gap-3">
                    <label htmlFor="">Rent</label>
                    <input className="outline-0 border border-black rounded-lg" type="number" onChange={(e)=>{setRentbudget(e.target.value)}}/>
                  </div>

                   <div className="flex gap-3">
                    <label htmlFor="">Travel</label>
                    <input className="outline-0 border border-black rounded-lg" type="number" onChange={(e)=>{setTravelbudget(e.target.value)}}/>
                  </div>
                  
                   <div className="flex gap-3">
                    <label htmlFor="">Utilities</label>
                    <input className="outline-0 border border-black rounded-lg" type="number" onChange={(e)=>{setUtilitiesbudget(e.target.value)}}/>
                  </div>

                  <button className="bg-blue-500 px-3 py-1 cursor-pointer rounded-lg">Save Budget</button>

                </div>
              </form>
            </div>
            <div className="flex flex-col px-4 py-4 gap-7 bg-yellow-100">

              <div>

                <div className="flex gap-4">
                  <div>Icon</div>
                  <h1>Add New Category</h1>
                </div>
                <form onSubmit={AddCategoryAPI} className="flex flex-col gap-2" action="">
                  <h1>Category Name</h1>
                  <input className="outline-0 border border-black px-2 rounded-lg" type="text" placeholder="i-e Food,Transportation,Entertainment etc" onChange={(e)=>{setCategoryname(e.target.value)}}/>
                  <button className="bg-blue-500 px-3 py-1 cursor-pointer rounded-lg">Add Category</button>
                </form>
              </div>

              <div className="flex flex-col gap-1">
                <h1>Existing Categories</h1>
               
               {
                categoriesdata.length==0? <div>No Categories yet</div>:
                categoriesdata.map((category,index)=>{
                return <div key={index} className="flex justify-between">
                    <label htmlFor="">Food</label>
                    <h1>Budget:Rs 1000</h1>
                </div>
                })
               }
                
              </div>
              <div className="flex flex-col gap-2">
                  <div className="flex justify-between">
                      <h1>Total Monthly Budget:</h1>
                      <h1>Rs {totalbudget}</h1>
                  </div>

                  <div className="flex justify-between">
                      <h1>Allocated to Categories:</h1>
                      <h1>Rs 20000</h1>
                  </div>

                  <div className="flex justify-between">
                      <h1>Remaining Budget:</h1>
                      <h1>Rs 60000</h1>
                  </div>
                
              </div>
            </div>
          </div>

      </div>
      
    </div>
  )
}

export default ManageBudget
