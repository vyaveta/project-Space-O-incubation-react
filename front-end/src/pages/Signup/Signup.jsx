import React from 'react'
import '../Login/Login.css'
import { faCheck, faTimes, faInfoCircle } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useRef } from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify'
import axios from 'axios'
import { ClientRegister } from '../../utils/APIRoutes';

const USER_REGEX = /^[a-zA-z][a-zA-Z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[0-9])(?=.*[!@#$%^&()/.,_*])[a-zA-Z0-9!@#$%^&()/.,_*]{6,16}$/;
const EMAIL_REGEX =  /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

const Signup = () => {

    const navigate = useNavigate()

    const userRef = useRef()
    const errRef = useRef()

    const [user, setUser] = useState('')
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
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light"
    }

    // Now some useEffects

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

    // functions

    const handleError = (msg) => {
        toast.error(msg,toastOptions)
    }

    const handleSubmit = async () => {
       try{
        if(!validEmail) handleError('Enter a valid email!')
        else if(!validName) handleError('This type of username are not allowed')
        else if(!validPwd) handleError('Your password is weak!')
        else if(!validMatch) handleError('Passwords doesnt match!')
        else {
            toast.loading('Registration in progress....',toastOptions)
            const {data} = await axios.post(ClientRegister,{user,pwd,email})
            console.log(data ,'is the response ') ; toast.dismiss()
            if(data.status)  toast.success('Account Created!',toastOptions)
        }
       }catch(err){
        console.log(err,'is the error occured in the handleSubmit function in the Signup.jsx')
       }
    }

  return (
        <div className="login-wrapper">
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