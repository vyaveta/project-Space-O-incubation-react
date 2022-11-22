import React, { useState , useEffect} from 'react'
import './Login.css'
import { useNavigate } from "react-router-dom";
import { useRef } from 'react';
import {toast } from 'react-toastify'
import axios from 'axios';
import { clientLoginRoute } from '../../utils/APIRoutes';
import jwt_decode from 'jwt-decode'

function Login() {
    const navigate = useNavigate()

    const emailRef = useRef()

    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    const [googleAccount,setGoogleAccount] = useState(false)

    const toastOptions =  {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light"
    }

    const handleCallbackGoogle = async (response) => {
        let userObj = await jwt_decode(response.credential)
        if(userObj) {
            console.log('here its working')
            const {data} = await axios.post(clientLoginRoute,{user: userObj.given_name,email: userObj.email,isGoogleAccount:userObj.picture})
            if(data.status===false) handleError(data.msg)
            else toast.success(data.msg,toastOptions)
        }
    }
    const handleSubmit = async () => {
        if(email.trim()==='') handleError('Enter email!')
        else if(password.trim()==='') handleError('Enter the password')
        else{
            const {data} = await axios.post(clientLoginRoute,{ email, password , googleAccount})
            if(data.status===false) handleError(data.msg)
        }
    }
    const handleError = (msg) => {
        toast.error(msg,toastOptions)
    }


    useEffect(() => {
        google.accounts.id.initialize({
            client_id: '880019132334-5q1n8crc19h8fn9luukc0ksc2kgvmt8j.apps.googleusercontent.com',
            callback: handleCallbackGoogle
        })
        google.accounts.id.renderButton(
            document.getElementById('googleSignIn'),{
                theme: 'outlime', size: 'large' 
            }
        )
    },[])

  return (
    
    <div className="login-wrapper">
    <div className="login-container">
        <div className="login__title">
            <h2>Login</h2>
        </div>
        <div className="login__box">
            
            <input type="email" placeholder='Email' name="" id="" autoComplete='off' value={email} ref={emailRef} onChange = {(e) => setEmail(e.target.value)} />
        </div>
        <div className="login__box">
            <input type="password" placeholder='password' name="" id="" value={password} onChange = {(e) => setPassword(e.target.value)} />
        </div>
        <div className="login__box">
            <button className="login__button" onClick={handleSubmit} >Login</button>
        </div>
        <div className="login__box" id='googleSignIn'></div>
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