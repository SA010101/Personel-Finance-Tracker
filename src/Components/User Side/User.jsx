// import { User } from 'lucide-react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';

function User() {
  const navigate = useNavigate();

  return (
    <div className='flex flex-col lg:flex-row min-h-screen'>
      {/* Sidebar */}
      <div className='flex flex-col w-full lg:w-75 shadow-md sticky top-0 bg-white z-10'>

        {/* Header */}
        <div className='flex justify-center items-center gap-4 px-6 py-6 bg-green-100'>
          <div>Icon</div>
          <div className='flex flex-col items-start'>
            <h1 className='text-xl font-bold text-gray-800'>Finance Tracker</h1>
            <p className='text-sm text-gray-600'>Dashboard User</p>
          </div>
        </div>

        <hr className='border-t border-gray-200 my-2' />

        {/* Navigation */}
        <div className='flex flex-col gap-4 px-4 py-6'>
          <h2 className='text-xs font-semibold text-gray-500 tracking-widest px-2'>MANAGEMENT</h2>

          <NavLink to="" end className={({ isActive }) => `group w-full rounded-lg transition ${isActive ? 'bg-blue-100 text-blue-700' : 'hover:bg-gray-100 text-gray-700'}`}>
            <div className='flex items-center gap-3 px-4 py-2 font-medium'>
              📊 <span>Overview</span>
            </div>
          </NavLink>

          <NavLink to="AddTransaction" className={({ isActive }) => `group w-full rounded-lg transition ${isActive ? 'bg-blue-100 text-blue-700' : 'hover:bg-gray-100 text-gray-700'}`}>
            <div className='flex items-center gap-3 px-4 py-2 font-medium'>
              🍽️ <span>Add Transaction</span>
            </div>
          </NavLink>

          <NavLink to="ManageBudget" className={({ isActive }) => `group w-full rounded-lg transition ${isActive ? 'bg-blue-100 text-blue-700' : 'hover:bg-gray-100 text-gray-700'}`}>
            <div className='flex items-center gap-3 px-4 py-2 font-medium'>
              👤 <span>Manage Budget</span>
            </div>
          </NavLink>

          <NavLink to="UpdateProfile" className={({ isActive }) => `group w-full rounded-lg transition ${isActive ? 'bg-blue-100 text-blue-700' : 'hover:bg-gray-100 text-gray-700'}`}>
            <div className='flex items-center gap-3 px-4 py-2 font-medium'>
              🧾 <span>UpdateProfile</span>
            </div>
          </NavLink>
        </div>

        <hr className='border-t border-gray-200 my-2' />

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

        <hr className='border-t border-gray-200 my-2' />

        {/* Version Info */}
        <div className='text-center text-xs text-gray-500 py-4'>
          <p>© 2025 Restaurant Dashboard</p>
          <p>v1.0.0</p>
        </div>
      </div>

      {/* Main Content */}
      <div className='flex-grow bg-gray-50'>
        <Outlet />
      </div>
    </div>
  );
}

export default User;
