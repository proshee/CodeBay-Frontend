import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {authActions} from "../store/auth"
import {useDispatch} from "react-redux"


const Login = () => {
  const [Values, setValues] = useState({
    username: "",
    password: ""
  });
  
  const change = (e) => {
    const { name, value } = e.target;
    setValues({ ...Values, [name]: value });
  };
  const dispatch = useDispatch()
  const navigate = useNavigate();
  const submit = async () => {
    try {
      if (
        Values.username === "" ||
        Values.password === "" 

      ) {
        alert("All fields are required");
      }
      else {
        const res = await axios.post("https://codebay.onrender.com/api/v1/sign-in",Values)
        dispatch(authActions.login())
        dispatch(authActions.changeRole(res.data.role))
        localStorage.setItem("id",res.data.id)
        localStorage.setItem("token",res.data.token)
        localStorage.setItem("role",res.data.role)
        navigate("/profile")
      }
    } catch (error) {
      alert(error.response.data.message);
    }
  };
    return (
        <div className="h-screen bg-slate-300 px-12 py-8 flex items-center justify-center">
      <div className=" bg-slate-600 rounded-lg px-8 py-5 w-full md:w-3/6 lg:w-2/6">
        <p className=" text-zinc-200 text-xl">Login</p>
        <div className="mt-4">
          <div>
            <label  className=" text-zinc-400">
              Username{" "}
            </label>
            <input
              type="text"
              className="w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none"
              placeholder="username"
              name="username"
              required
              value={Values.username}
              onChange={change}
            />
          </div>

          <div className="mt-4">
            <label  className=" text-zinc-400">
              Password
            </label>
            <input
              type="password"
              className="w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none "
              placeholder="password"
              name="password"
              required
              value={Values.password}
              onChange={change}
            />
          </div>


          <div className="mt-4">
            <button className="w-full bg-blue-500 text-white hover:text-black hover:bg-slate-200 font-semibold py-2 rounded" onClick={submit}>
              Login
            </button>
          </div>
        </div>
        <div className="m-4 flex flex-col justify-between items-center">
            <h4 className="text-white m-1">OR</h4>
            <p className="text-zinc-400 m-1" >Create New Account <Link to= "/Signup" className="text-blue-500 underline ">SignUp</Link> </p>
        </div>
        <div></div>
      </div>
    </div>
    );
}

export default Login;
