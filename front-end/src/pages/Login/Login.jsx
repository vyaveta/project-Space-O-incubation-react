import React, { useState , useEffect} from 'react'
import './Login.css'
import { useNavigate } from "react-router-dom";
import { useRef } from 'react';
import {toast } from 'react-toastify'
import { useCookies } from 'react-cookie'
import axios from 'axios';
import { clientLoginRoute, middlewareCheck } from '../../utils/APIRoutes';
import jwt_decode from 'jwt-decode'
import  cloud  from '../../assets/cloud.png'

function Login() {
    const navigate = useNavigate()

    const [cookie,setCookie,removeCookie] = useCookies([])

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
            const {data} = await axios.post(clientLoginRoute,{user: userObj.given_name,email: userObj.email,isGoogleAccount:userObj.picture},{withCredentials:true})
            if(data.status===false) return handleError(data.msg)
             toast.success(data.msg,toastOptions)
             navigate('/')
        }
    }
    const handleSubmit = async () => {
        if(email.trim()==='') handleError('Enter email!')
        else if(password.trim()==='') handleError('Enter the password')
        else if(email.includes('@')===false || email.includes('.co')===false || email.length < 5) handleError('Enter a proper Email or try sigin with google')
        else{
            const {data} = await axios.post(clientLoginRoute,{ email, password},{withCredentials:true})
            console.log(data,'is the data')
            if(data.status===false) handleError(data.msg)
            else navigate('/')
        }
    }
    const handleError = (msg) => {
        toast.error(msg,toastOptions)
    }

    useEffect(() => {
        const cookieCheck = async() => {
            if(cookie) {
                const {data} = await axios.post(middlewareCheck,{cookie},{withCredentials: true}).catch((err) => console.log(err,'is the error form the axios side in the clientHome.jsx'))
                if(data.status===false) {
                    removeCookie('clientToken')
                    navigate('/login')
                }else{
                    navigate('/')
                }
            }
        }
        cookieCheck()
    },[])


    useEffect(() => {
       try{
       setTimeout(() => {
        google.accounts.id.initialize({
            client_id: '880019132334-5q1n8crc19h8fn9luukc0ksc2kgvmt8j.apps.googleusercontent.com',
            callback: handleCallbackGoogle
        })
        google.accounts.id.renderButton(
            document.getElementById('googleSignIn'),{
                theme: 'outlime', size: 'large' 
            }
        )
       },1000)
       }catch(e){
        console.log('error on the google sigin function',e)
       }
    },[])

  return (
    
    <div className="login-wrapper">
        <div className="clouds">
            <img src={cloud} alt="" />
            <img src={cloud} alt="" />
        </div> 
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