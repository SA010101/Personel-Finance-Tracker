import { NavLink, Outlet, useNavigate } from 'react-router-dom';

function Admin() {
  const navigate = useNavigate();

  return (
    <div className='flex flex-col lg:flex-row min-h-screen'>
      
      {/* Sidebar */}
      <div className='flex flex-col w-full lg:w-80 bg-white border-r border-gray-200 shadow-md sticky top-0 z-10'>

        {/* Header */}
        <div className='flex justify-center items-center gap-4 px-6 py-6 bg-gradient-to-r from-green-200 via-green-100 to-green-50'>
          <div className="text-2xl">🛠️</div>
          <div className='flex flex-col items-start'>
            <h1 className='text-xl font-bold text-green-800'>Admin Panel</h1>
            <p className='text-sm text-gray-700'>Administrator</p>
          </div>
        </div>

        <hr className='border-t border-gray-300 my-2' />

        {/* Navigation */}
        <div className='flex flex-col gap-3 px-4 py-4'>
          <h2 className='text-xs font-bold text-gray-500 tracking-widest px-2 uppercase'>Management</h2>

          {[
            { to: "", label: "Analytics", icon: "📊" },
            { to: "TransactionOversight", label: "Transaction Oversight", icon: "🍽️" },
            { to: "BudgetMonitoring", label: "Budget Monitoring", icon: "👤" },
            { to: "UserManagement", label: "User Management", icon: "🧾" },
            { to: "RolesAndPermissions", label: "Roles and Permissions", icon: "🛡️" },
            { to: "UpdateProfile", label: "Update Profile", icon: "🧑‍💼" },
          ].map(({ to, label, icon }) => (
            <NavLink
              key={to}
              to={to}
              end={to === ""}
              className={({ isActive }) =>
                `group flex items-center gap-3 px-4 py-2 rounded-lg font-medium transition 
                ${isActive ? 'bg-blue-100 text-blue-800 shadow-inner' : 'text-gray-700 hover:bg-gray-100'}`
              }
            >
              <span className='text-lg'>{icon}</span>
              <span>{label}</span>
            </NavLink>
          ))}
        </div>

        <hr className='border-t border-gray-300 my-2' />

        {/* Footer Controls */}
        <div className='flex flex-col gap-2 px-4 py-4'>
          <NavLink to="/" className="w-full">
            <button className='w-full py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm font-medium transition'>
              🏠 Home
            </button>
          </NavLink>

          <button
            onClick={() => {
              localStorage.removeItem('userName');
              localStorage.removeItem('userRole');
              navigate('/');
            }}
            className='w-full py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg text-sm font-medium transition'
          >
            🚪 Logout
          </button>
        </div>

        <hr className='border-t border-gray-300 my-2' />

        {/* Version Info */}
        <div className='text-center text-xs text-gray-500 py-4'>
          <p>© 2025 Restaurant Dashboard</p>
          <p>v1.0.0</p>
        </div>
      </div>

      {/* Main Content Area */}
      <div className='flex-grow bg-gray-50 p-4 lg:p-8 overflow-y-auto'>
        <Outlet />
      </div>
    </div>
  );
}

export default Admin;
