import './App.css'
import { BrowserRouter, Routes, Route} from 'react-router-dom';

import Register from '../src/Components/Auth/Register'
import Login from '../src/Components/Auth/Login'

import User from '../src/Components/User Side/User'
import Overview from '../src/Components/User Side/Overview'
import AddTransaction from '../src/Components/User Side/AddTransaction'
import ManageBudget from '../src/Components/User Side/ManageBudget'
import UpdateProfile from '../src/Components/User Side/UpdateProfile'

import Admin from '../src/Components/Admin Side/Admin'
import Analytics from '../src/Components/Admin Side/Analytics'
import TransactionOversight from '../src/Components/Admin Side/TransactionOversight'
import BudgetMonitoring from '../src/Components/Admin Side/BudgetMonitoring'
import UserManagement from '../src/Components/Admin Side/UserManagement'
import RolesAndPermissions from '../src/Components/Admin Side/RolesAndPermissions'
import UpdateAdminProfile from './Components/Admin Side/UpdateAdminProfile'



function App() {

  return (
    
      <BrowserRouter>
        <Routes>

        {/* Auth Routing */}
        <Route path='/Register' element={<Register/>}/>
        <Route path='/Login' element={<Login/>}/>

        {/* Landing Page */}

        {/* User Side Routing */}
        <Route path='/User' element={<User/>}>

        <Route index element={<Overview/>}/>
        <Route path='AddTransaction' element={<AddTransaction/>}/>
        <Route path='ManageBudget' element={<ManageBudget/>}/>
        <Route path='UpdateProfile' element={<UpdateProfile/>}/>
        
        </Route>


        {/* Admin Side Routing */}
        <Route path='/Admin' element={<Admin/>}>

        <Route index element={<Analytics/>}/>
        <Route path='TransactionOversight' element={<TransactionOversight/>}/>
        <Route path='BudgetMonitoring' element={<BudgetMonitoring/>}/>
        <Route path='UserManagement' element={<UserManagement/>}/>
        <Route path='RolesAndPermissions' element={<RolesAndPermissions/>}/>
        <Route path='UpdateProfile' element={<UpdateAdminProfile/>}/>
        
        </Route>


        </Routes>
      
      </BrowserRouter>

  )
}

export default App
