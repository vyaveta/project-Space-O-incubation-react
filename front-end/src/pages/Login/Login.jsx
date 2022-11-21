import React from 'react'
import './Login.css'
import { useNavigate } from "react-router-dom";

function Login() {

    const navigate = useNavigate()

  return (
    
    <div className="login-wrapper">
    <div className="login-container">
        <div className="login__title">
            <h2>Login</h2>
        </div>
        <div className="login__box">
            
            <input type="email" placeholder='Email' name="" id="" />
        </div>
        <div className="login__box">
            <input type="password" placeholder='password' name="" id="" />
        </div>
        <div className="login__box">
            <button className="login__button">Login</button>
        </div>
        <div className="login__box">
            <p>Dont have an Account? <span 
            style={{textDecoration:'underline',cursor:'pointer'}} 
            onClick ={() => {
                navigate('/register')
            }}
            >Signup</span> </p>
        </div>
    </div>
    </div>
  )
}

export default Login