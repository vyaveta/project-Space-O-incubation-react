import React from 'react'
import '../Login/Login.css'
import { faCheck, faTimes, faInfoCircle } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useRef } from 'react';
import { useState } from 'react';
import { useCookies } from 'react-cookie'
import { useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify'
import axios from 'axios'
import jwt_decode from 'jwt-decode'
import { ClientRegister } from '../../utils/APIRoutes';
import  cloud  from '../../assets/cloud.png'
import {  middlewareCheck } from '../../utils/APIRoutes'


const USER_REGEX = /^[a-zA-z][a-zA-Z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[0-9])(?=.*[!@#$%^&()/.,_*])[a-zA-Z0-9!@#$%^&()/.,_*]{6,16}$/;
const EMAIL_REGEX =  /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

const Signup = () => {

    const [cookie,setCookie,removeCookie] = useCookies([])
    const navigate = useNavigate()

    const userRef = useRef()
    const errRef = useRef()

    const [user, setUser] = useState('')
    const [isGoogleAccount,setIsGoogleAccount] = useState(false)
    const [validName, setValidName] = useState(false)
    const [userFocus, setUserFocus] = useState(false)
    const [email,setEmail] = useState('')
    const [validEmail,SetValidEmail] = useState(false)
    const [emailFocus,setEmailFocus] = useState(false)
    const [pwd, setPwd] = useState('');
    const [validPwd, setValidPwd] = useState(false); 
    const [pwdFocus, setPwdFocus] = useState(false);
    const [matchPwd, setMatchPwd] = useState(''); 
    const [validMatch, setValidMatch] = useState(false); 
    const [matchFocus, setMatchFocus] = useState(false);

    const [errMsg,setErrMsg] = useState()

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

    // functions

    const handleError = (msg) => {
        toast.error(msg,toastOptions)
    }

    const handleCallbackGoogle = async (response) => {
        let userObj = await jwt_decode(response.credential)
        console.log(userObj)
       if(userObj){
        console.log(user,email,isGoogleAccount,'is the values')
        const {data} = await axios.post(ClientRegister,{user: userObj.given_name,email: userObj.email,isGoogleAccount:userObj.picture},{withCredentials:true})
       console.log(data,'is the data from the google signin')
      
       if(data.status) {
        toast.success(data.msg,toastOptions);
        navigate('/')
       }
           else   handleError(data.msg)
       }
    }

    // Now some useEffects


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
          userRef.current.focus()
    },[])

    useEffect(() => {
        const result = USER_REGEX.test(user);
        setValidName(result)
    },[user])

    useEffect(() => {
        const result = EMAIL_REGEX.test(email)
        SetValidEmail(result)
    },[email])

    useEffect(() => {
        const result = PWD_REGEX.test(pwd)
        setValidPwd(result)
        const match = pwd === matchPwd
        setValidMatch(match)
    },[pwd,matchPwd])

    useEffect(() => {
        setErrMsg('')
    },[user,pwd,matchPwd])

    useEffect(() => {
       try{
        google.accounts.id.initialize({
            client_id: '880019132334-5q1n8crc19h8fn9luukc0ksc2kgvmt8j.apps.googleusercontent.com',
            callback: handleCallbackGoogle
        })
        google.accounts.id.renderButton(
            document.getElementById('googleSignIn'),{
                theme: 'outlime', size: 'large' 
            }
        )
       }catch(err){
        
       }
    },[])

   

    const handleSubmit = async () => {
       try{
        if(!validEmail) handleError('Enter a valid email!')
        else if(!validName) handleError('This type of username are not allowed')
        else if(!validPwd) handleError('Your password is weak!')
        else if(!validMatch) handleError('Passwords doesnt match!')
        else {
            const toastLoadingId = toast.loading('Registration in progress....',toastOptions)
            const {data} = await axios.post(ClientRegister,{user,pwd,email},{withCredentials:true})
            console.log(data ,'is the response ') 
            if(data.status) {
                toast.update(toastLoadingId, { render: data.msg , type: "success", isLoading: false  });
                console.log('gotta navigate')
                navigate('/')
            }
            else   toast.update(toastLoadingId, { render: data.msg, type: "error", isLoading: false  });
        }
       }catch(err){
        console.log(err,'is the error occured in the handleSubmit function in the Signup.jsx')
       }
    }

  return (
        <div className="login-wrapper">
            <div className="clouds">
            <img src={cloud} alt="" />
            <img src={cloud} alt="" />
        </div>
            <div className="login-container">
                <div className="login__title">
                    <h2>Register</h2>
                </div>
                <div className="login__box">
                <label htmlFor=""> 

                </label>
                    <div className="input__div__2">
                    <input type="text" name="" id="username" placeholder='Username' ref={userRef} 
                    onChange = {(e) => setUser(e.target.value)}
                    value ={user}
                    aria-invalid = {validName ? 'false' : 'true'}
                    autoComplete = 'off'
                    aria-describedby='uidnote'
                    onFocus={ () => setUserFocus(true)}
                    onBlur = { () => setUserFocus(false)}
                    />
                    <label htmlFor=""> 
                    <span className={validName ? 'valid' : 'hide'}>
                        <FontAwesomeIcon icon={faCheck} />
                    </span>
                    <span className={validName || !user ? 'hide' : 'invalid'}>
                        <FontAwesomeIcon icon={faTimes} />
                    </span>
                    </label>
                    </div>
                    <p id='uidnote' className={  userFocus && user && !validName ? 'instructions ' : 'offscreen '}>
                    <FontAwesomeIcon icon={faInfoCircle} />
                    &nbsp; 8 to 24 characters. Must begin with a letter and Letters, numbers, underscores, hyphens are allowed.
                    </p>
                </div>
                <div className="login__box">
                   <div className="input__div__2">
                   <input type="email" placeholder='Email' name="" id=""
                    value={email}
                    onChange = {(e) => setEmail(e.target.value)}
                    onFocus = {() => setEmailFocus(true)}
                    onBlur = {() => setEmailFocus(false)}
                    />
                    <label htmlFor="">
                        <span className={email && validEmail ? 'valid' : 'hide'} >
                        <FontAwesomeIcon icon={faCheck} />
                        </span>
                        <span className={ email && !validEmail ? 'invalid' : 'hide' }>
                        <FontAwesomeIcon icon={faTimes} />
                        </span>
                    </label>
                   </div>
                   <p  className={  emailFocus && email && !validEmail ? 'instructions ' : 'offscreen '}>
                    <FontAwesomeIcon icon={faInfoCircle} />
                    &nbsp; Try to enter a valid email.
                    </p>
                </div>
                <div className="login__box">
                   <div className="input__div__2">
                   <input type="password" placeholder='password' name="" id=""
                    onChange={(e) => setPwd(e.target.value)}
                    value={pwd}
                    aria-invalid = {validPwd ? 'false' : 'true'}
                    onFocus={ () => setPwdFocus(true)}
                    onBlur = { () => setPwdFocus(false)}
                    />
                    <label htmlFor="">
                    <span className={validPwd ? 'valid' : 'hide'}>
                    <FontAwesomeIcon icon={faCheck} />
                    </span>
                    <span className={  !validPwd && pwd ? 'invalid' : 'hide'} >
                    <FontAwesomeIcon icon={faTimes} />
                    </span>
                   </label>
                   </div>
                   <p  className={  pwdFocus && pwd && !validPwd ? 'instructions ' : 'offscreen '}>
                    <FontAwesomeIcon icon={faInfoCircle} />
                      &nbsp; 6 to 16 characters. Must contain alphabet, number and special characters.
                    </p>
                </div>
                <div className="login__box">
                    <div className="input__div__2">
                    <input type="password" placeholder='confirm password'
                    onChange={(e) => setMatchPwd(e.target.value)}
                    value={matchPwd}
                    onFocus = {() => setMatchFocus(true)}
                    onBlur = {() => setMatchFocus(false)}
                    />
                    <label htmlFor="">
                        <span className={validPwd  && validMatch && pwd ? 'valid' : 'hide' }>
                        <FontAwesomeIcon icon={faCheck} />
                        </span>
                        <span className={(matchPwd && !validMatch) || (!validPwd && matchPwd) ? 'invalid' : 'hide'} >
                         <FontAwesomeIcon icon={faTimes} />
                    </span>
                    </label>
                    </div>
                    <p className={ matchPwd && matchFocus && !validMatch ? 'instructions': 'offscreen' }>
                        <FontAwesomeIcon icon={faInfoCircle} />
                      &nbsp; Make sure you have entered the correct password!.
                        </p>
                </div>
                <div className="login__box">
                    <button className="login__button" onClick={handleSubmit} >Register</button>
                </div>
                <div className="login__box" id='googleSignIn'></div>
                <div className="login__box">
                    <p>Already have an Account? <span 
                    style={{ textDecoration: 'underline', cursor: 'pointer' }} 
                    onClick = {() => {
                        navigate('/login')
                    }}
                    >SignIn</span> </p>
                    <p ref={errRef} className = {errMsg ? 'errmsg' : 'offscreen'} aria-live= 'assertive' >{errMsg}</p>
                </div>
            </div>
        </div>
    )
}

export default Signup