import { useState } from "react"
import { NavLink } from "react-router-dom"
import { useNavigate } from "react-router-dom"


function Register() {

    const BASE_URL="http://localhost:9000/app"
    const navigate=useNavigate()

    const [name,setName]=useState("")
    const [email,setEmail]=useState("")
    const [password,setPassword]=useState("")

    const RegisterAPI=async (e)=>{
        e.preventDefault();

      const RegisterData={
        name:name,
        email:email,
        password:password,
      }
      console.log(RegisterData)

    try {
        const response = await fetch(`${BASE_URL}/register`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(RegisterData)
        });

        const data = await response.json();
        console.log(data);

        if (response.ok) {
          alert('User Register Successfully');
          navigate("/Login")

        } else {
          alert(data.message || 'Something went wrong during registration.');
        }

      } catch (error) {

        alert('Registration failed: ' + error.message);
      }

    }


  return (
    <div className="bg-green-200 max-w-full h-lvh px-[500px] py-20">
      <div className="w-full flex flex-col justify-between h-[500px] bg-white rounded-xl py-6 px-6">

          <div className="flex flex-col items-center gap-1">
            <div>Icon</div>
            <h1>Join Us</h1>
            <h1>Start tracking your finances today</h1>
          </div>
          <form onSubmit={RegisterAPI} className="w-full flex flex-col gap-5 items-center" action="">
            <input className="w-full outline-0 border border-black rounded-lg py-2 px-3" type="text" placeholder="Full Name" onChange={(e)=>{setName(e.target.value)}}/>
            <input className="w-full outline-0 border border-black rounded-lg py-2 px-3" type="email" placeholder="Email" onChange={(e)=>{setEmail(e.target.value)}}/>
            <input className="w-full outline-0 border border-black rounded-lg py-2 px-3" type="password" placeholder="Password" onChange={(e)=>{setPassword(e.target.value)}}/>
            <button className="w-full outline-0 border border-black rounded-lg py-2 px-3 font-semibold cursor-pointer">Create Account</button>
          </form>
          <div className="flex flex-col items-center gap-1">
            <label htmlFor="">Already have an account?</label>
          <NavLink to='/Login'>
                  <button className="cursor-pointer">Sign In</button>
          </NavLink>
          </div>

      </div>
    </div>
  )
}

export default Register