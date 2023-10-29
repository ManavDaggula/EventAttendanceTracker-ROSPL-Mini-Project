import axios from "axios"
import "./admin_css/adminlogin.css"
import React, { useState } from 'react'
import { useNavigate } from "react-router-dom"

const AdminLogin = (props) => {
  const navigate = useNavigate();
  const [uname, setUname] = useState("");
  const [password, setPassword] = useState("");

  function login(){
    if(uname && password && uname!=="" && password!==""){
      axios.post("/login",{username:uname, password:password},{withCredentials: true})
      .then(data=>{
        console.log(data);
        props.setAdmin();
        navigate("/admin");
      })
      .catch(err=>{
        console.error(err);
        window.alert("Invalid Credentials.")
      })
    }
    else{
      window.alert("Please enter username and password.")
    }
  }
  return (
    <div className="login-window">
    <h3>Enter Credentials</h3>
    <div className="login-form">
        <label>Email or Username</label>
        <input type="text" required onChange={(e)=>setUname(e.target.value)}/>
        <label>Password</label>
        <input type="password" required onChange={(e)=>setPassword(e.target.value)}/>
        <button className="button" onClick={login}>Login</button>
    </div>
    </div>
  )
}

export default AdminLogin