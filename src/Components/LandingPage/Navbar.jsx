import { NavLink } from "react-router-dom"


function Navbar() {

          
         const userName =localStorage.getItem('userName')
         const userRole =localStorage.getItem('userRole')


  return (
    <nav className="w-full flex justify-between items-center px-16 py-5 bg-blue-100 ">
        <div className="flex gap-4">
          <div>Icon</div>
          <h1 className="text-lg font-semibold">Finance Tracker</h1>
        </div>
        {
          userRole==="user"? 
          <div className="flex gap-4">
          <h1>{userName}</h1>

          <NavLink to="/User">
              <button>Dashboard</button>
          </NavLink>
          
          <button onClick={()=>{localStorage.removeItem('userName'),localStorage.removeItem('userRole'),location.reload();}}>LogOut</button>
         </div>
          : userRole==="admin" ?
          <div className="flex gap-4">
          <h1>{userName}</h1>

          <NavLink to="/Admin">
              <button>Dashboard</button>
          </NavLink>
          
         <button onClick={()=>{localStorage.removeItem('userName'),localStorage.removeItem('userRole'),location.reload();}}>LogOut</button> 
        
         </div>
          :
         <div className="flex gap-4">
          <div>Guest Icon</div>
          <h1>Guest</h1>
          <NavLink to="/Login">
                  <button>Login</button>
          </NavLink> 
        </div>
        }
        
    </nav>
  )
}

export default Navbar
