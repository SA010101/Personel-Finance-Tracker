import { useState } from "react"
import { NavLink } from "react-router-dom"
import { useNavigate } from "react-router-dom"


function Login() {

    const BASE_URL="http://localhost:9000/app"
    const navigate=useNavigate()

    const [email,setEmail]=useState("")
    const [password,setPassword]=useState("")

    const LoginAPI=async (e)=>{
        e.preventDefault();

      const LoginData={
        email:email,
        password:password,
      }

    try {
        const response = await fetch(`${BASE_URL}/login`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(LoginData)
        });

        const data = await response.json();
        console.log(data);

        if (response.ok) {
          alert('User Register Successful');
          localStorage.setItem('token',data.token)
          localStorage.setItem('userId',data.user._id)
          localStorage.setItem('userName',data.user.name)
          localStorage.setItem('userEmail',data.user.email)
          localStorage.setItem('userRole',data.user.role)

          navigate("/")

        } else {
          alert(data.message || 'Something went wrong during registration.');
        }

      } catch (error) {

        alert('Registration failed: ' + error.message);
      }

    }


  return (
    <div className="bg-green-200 max-w-full h-lvh px-[500px] py-20">
      <div className="w-full flex flex-col justify-between gap-5 bg-white rounded-xl py-6 px-6">

          <div className="flex flex-col items-center gap-1">
            <div>Icon</div>
            <h1>WellCome Back</h1>
            <h1>Sign in to your finance tracker</h1>
          </div>
          <form onSubmit={LoginAPI} className="w-full flex flex-col gap-5 items-center" action="">
            <input className="w-full outline-0 border border-black rounded-lg py-2 px-3" type="email" placeholder="Email" onChange={(e)=>{setEmail(e.target.value)}}/>
            <input autoComplete="on" className="w-full outline-0 border border-black rounded-lg py-2 px-3" type="password" placeholder="Password" onChange={(e)=>{setPassword(e.target.value)}}/>
            <button className="w-full outline-0 border border-black rounded-lg py-2 px-3 font-semibold cursor-pointer">Sign In</button>
          </form>
          <div className="flex flex-col items-center gap-1">
            <label htmlFor="">Don't have an account?</label>
          <NavLink to='/Register'>
                  <button className="cursor-pointer">Create Account</button>
          </NavLink>
          </div>

      </div>
    </div>
  )
}

export default Login