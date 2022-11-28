import React, { useState } from 'react'
import {toast} from 'react-toastify'
import axios from 'axios'
import { adminRegisterRoute } from '../../utils/APIRoutes'
import { useNavigate } from 'react-router-dom'

const AdminSignupBox = ({setLoginMode}) => {

  const navigate =useNavigate()

    const [adminName,setAdminName] = useState('')
    const [adminAuthCode,setAdminAuthCode] = useState('')
    const [adminAccessCode,setAdminAccessCode] = useState('')

    const handleError = (msg) => {
        toast.error(msg)
    }

    const handleSubmit = async () => {
      try{
        if(adminName.includes(' ') || adminName==='') handleError('Invalid format for Admin Name')
        else if(adminAccessCode.includes(' ') || adminAccessCode==='') handleError('Invalid format for AccessCode')
        else if(adminAuthCode.includes(' ') || adminAuthCode==='') handleError('Invalid format for AuthCode')
        else{
            const {data} = await axios.post(adminRegisterRoute,{adminName,adminAuthCode,adminAccessCode},{withCredentials: true})
            if(data.status) {
              toast.success(data.msg)
              navigate('/admin')
            }
            else handleError(data.msg)
        }
      }catch(err){
        console.log(err)
        toast.error('error occured in code')
      }
    }

  return (
    <div>
         <div className="login-div">
    <div className="admin-login__title">
     <h2>Admin Register</h2>
     </div>
     <div className="admin-login__input">
       <input type="text" value={adminName}  placeholder='Name' onChange={(e) => setAdminName(e.target.value)} />
     </div>
     <div className="admin-login__input">
       <input type="text"  placeholder='Admin-Auth-Code' value={adminAuthCode} onChange={(e) => setAdminAuthCode(e.target.value)} />
     </div>
     <div className="admin-login__input">
       <input type="text" placeholder='Admin-Access-Code' value={adminAccessCode} onChange={(e) => setAdminAccessCode(e.target.value)} />
     </div>
      <div className="admin-login__button-div">
       <button className='neo-button' onClick={handleSubmit}> Validate </button>
      </div>
      <div className="textmsg">
        <p onClick={() => setLoginMode(true)}>
            Turn on Login mode
        </p>
      </div>
    </div>
    </div>
  )
}

export default AdminSignupBox