import { useState, useEffect } from "react";

function ManageBudget() {
  const BASE_URL = "http://localhost:9000/app";
  const token = localStorage.getItem("token");

  const [month, setMonth] = useState("");
  const [totalbudget, setTotalbudget] = useState(0);
  const [categoryName, setCategoryname] = useState("");
  const [categoryBudgets, setCategoryBudgets] = useState({});
  const [categoriesdata, setCategoriesdata] = useState([]);

  console.log(categoryBudgets);

  // Object.values method used to create array from object values and calculate total allocated category budgets
  const AllocatedCategoriesBudget = Object.values(categoryBudgets).reduce(
    (sum, val) => sum + parseInt(val || 0),
    0
  );

  // Budget payload for API
  const BudgetData = {
    month: month,
    totalBudget: totalbudget,
    categoryBudgets: categoryBudgets,
  };

  // API Call: Add Budget
  const AddBudgetAPI = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${BASE_URL}/addBudget`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(BudgetData),
      });

      const data = await response.json();
      if (response.ok) {
        alert("Budget Added");
      }
      console.log("Saved:", data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  // API Call: Add Category
  const AddCategoryAPI = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${BASE_URL}/addCategory`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ categoryName }),
      });

      const data = await response.json();
      if (response.ok) {
        alert("Category Added");
        fetchCategories();
      }
      console.log("Saved:", data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  // API Call: Fetch Categories
  const fetchCategories = async () => {
    try {
      const response = await fetch(`${BASE_URL}/categories`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();
      console.log("Categories:", data);

      if (response.ok) {
        alert("Categories Fetched");
        setCategoriesdata(data);
      }
    } catch (error) {
      console.error("Error fetching categories:", error.message || error);
    }
  };

  // Fetch categories on component mount
  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <div className="w-full px-4 md:px-24 py-10 bg-gray-100 min-h-screen">
      <div className="w-full flex flex-col gap-8">
        {/* Header */}
        <div className="w-full p-6 rounded-lg bg-gradient-to-r from-blue-200 to-blue-100 shadow">
          <div className="flex items-center gap-3">
            <div>📊</div>
            <h1 className="text-3xl font-bold text-blue-900">Budget Management</h1>
          </div>
          <p className="text-gray-600">Set and track your monthly spending limits</p>
        </div>

        {/* Budget & Category Section */}
        <div className="w-full flex flex-col lg:flex-row gap-6">
          {/* Monthly Budget Form */}
          <div className="flex flex-col gap-4 px-6 py-6 bg-white rounded-lg shadow w-full lg:w-2/3">
            <div className="flex items-center gap-3 text-lg font-semibold text-blue-800">
              <div>🗓️</div>
              <h1>Monthly Budget Setup</h1>
            </div>

            <form onSubmit={AddBudgetAPI} className="flex flex-col gap-5">
              <div className="flex flex-col gap-3">
                <label className="font-medium">Select Month</label>
                <input
                  className="outline-none border border-gray-300 rounded-lg p-2"
                  type="month"
                  onChange={(e) => setMonth(e.target.value)}
                />
                <label className="font-medium">Total Monthly Budget (Rs)</label>
                <input
                  className="outline-none border border-gray-300 rounded-lg p-2"
                  type="number"
                  onChange={(e) => setTotalbudget(e.target.value)}
                />
              </div>

              {/* Category Budgets */}
              <div className="flex flex-col gap-4">
                <h2 className="font-semibold text-gray-700">Category Budget</h2>

                {categoriesdata.length === 0 ? (
                  <div className="text-sm text-red-500">
                    No categories found. Add some categories.
                  </div>
                ) : (
                  categoriesdata.map((category, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <label className="w-1/2">{category.categoryName}</label>
                      <input
                        type="number"
                        className="outline-none border border-gray-300 rounded-lg p-2 w-1/2"
                        onChange={(e) => {
                          const value = e.target.value;
                          setCategoryBudgets((prev) => ({
                            ...prev,
                            [category.categoryName]: value,
                          }));
                        }}
                        value={categoryBudgets[category.categoryName] || ""}
                      />
                    </div>
                  ))
                )}

                <button
                  type="submit"
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition"
                >
                  Save Budget
                </button>
              </div>
            </form>
          </div>

          {/* Category Management */}
          <div className="flex flex-col px-6 py-6 gap-6 rounded-lg bg-yellow-50 shadow w-full lg:w-1/3">
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-lg font-semibold text-yellow-800">
                <div>➕</div>
                <h1>Add New Category</h1>
              </div>
              <form onSubmit={AddCategoryAPI} className="flex flex-col gap-3">
                <label className="font-medium">Category Name</label>
                <input
                  className="outline-none border border-gray-300 px-3 py-2 rounded-lg"
                  type="text"
                  placeholder="e.g. Food, Transportation, Entertainment"
                  onChange={(e) => setCategoryname(e.target.value)}
                />
                <button
                  type="submit"
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition"
                >
                  Add Category
                </button>
              </form>
            </div>

            {/* Existing Categories */}
            <div className="space-y-2">
              <h2 className="font-semibold text-gray-700">Existing Categories</h2>
              {categoriesdata.map((category, index) => (
                <div
                  key={index}
                  className="flex justify-between text-sm border-b pb-1 text-gray-700"
                >
                  <label>{category.categoryName}</label>
                  <span>Budget: Rs {categoryBudgets[category.categoryName] || 0}</span>
                </div>
              ))}
            </div>

            {/* Budget Summary */}
            <div className="space-y-2 text-sm text-gray-800 font-medium">
              <div className="flex justify-between">
                <span>Total Monthly Budget:</span>
                <span>Rs {totalbudget}</span>
              </div>
              <div className="flex justify-between">
                <span>Allocated to Categories:</span>
                <span>Rs {AllocatedCategoriesBudget}</span>
              </div>
              <div className="flex justify-between">
                <span>Remaining Budget:</span>
                <span>Rs {totalbudget - AllocatedCategoriesBudget}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ManageBudget;
