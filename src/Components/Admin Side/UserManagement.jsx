import { useState, useEffect } from "react";

function UserManagement() {
  const BASE_URL = "http://localhost:9000/app";
  const token = localStorage.getItem("token");
  const [userdata,setUserdata]=useState([])
  console.log(userdata)

  // API Call: Fetch Categories
  const fetchUsers = async () => {
    try {
      const response = await fetch(`${BASE_URL}/users`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();
      console.log("Categories:", data);

      if (response.ok) {
        setUserdata(data.users);
      }
    } catch (error) {
      console.error("Error fetching categories:", error.message || error);
    }
  };

  const deleteUser = async (userId) => {
  try {
    const response = await fetch(`${BASE_URL}/deleteUser/${userId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.ok) {
      console.log(`User with ID ${userId} deleted successfully.`);
      fetchUsers();
    } else {
      const errorData = await response.json();
      console.error("Delete failed:", errorData.message || "Unknown error");
    }
  } catch (error) {
    console.error("Error deleting user:", error.message || error);
  }
};


  // Fetch categories on component mount
  useEffect(() => {
    fetchUsers();
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
        <div className="w-full flex flex-col gap-6">
         
         {
            userdata.length===0? <div>No User Found</div> :
            userdata.map((user,index)=>{
              return  <div key={index} className="w-full flex justify-between items-center">
                  <div className="flex flex-col gap-2">
                        <h1>Id: {user._id}</h1>
                        <h1>{user.name}</h1>
                  </div>
                  <div className="flex gap-2">
                    <h1>{user.role}</h1>
                    <button onClick={()=>{deleteUser(user._id)}}>Delete</button>
                  </div>
                  
          </div>
            })
         }
         

        </div>
            
            
            </div>
    </div>
  );
}

export default UserManagement;
