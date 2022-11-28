import React from 'react'
import './AdminLogin.css'
import Earth from '../../assets/earth.png'
import Mars from '../../assets/mars.png'
import Saturn from '../../assets/saturn.png'
import Sun from '../../assets/thesunr.gif'
import { useState } from 'react'
import { useCookies } from 'react-cookie'

import AdminLoginBox from './AdminLoginBox'
import AdminSignupBox from './AdminSignupBox'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const AdminLogin = () => {
  const navigate = useNavigate()
  const [cookie,setCookie,removeCookie] = useCookies([])
  const [loginMode,setLoginMode] = useState(true)
  useEffect(() => {
    if(cookie.adminToken) navigate('/admin')
    console.log(cookie,'is the cookie') 
  },[cookie])
  return (
     <div className="login-wrapper-admin">
      <div className="admin-login">
      <div className='planets-container'>
        <div className="sun">
         <img src={Sun} alt="" />
        </div>
      <div className="route"><div className="planet" id='first-planet'> <img src={Mars} alt=""  /> </div></div>
      <div className="route"> <div className="planet" id='second-planet'> <img src={Earth} alt="" /> </div></div>
      <div className="route"> <div className="planet" id='third-planet'> <img  className='saturn' src={Saturn} alt=""  /> </div></div>
    </div>
   
    </div>
    {
      loginMode ? <AdminLoginBox setLoginMode={setLoginMode} /> : <AdminSignupBox  setLoginMode = {setLoginMode}/>
    }
    </div>
  )
}

export default AdminLogin