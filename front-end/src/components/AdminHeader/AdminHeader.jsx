import React, { useState } from 'react'
import './AdminHeader.css'
import { BsPower } from "react-icons/bs";
import { DiGhostSmall } from "react-icons/di"; 
import { useCookies } from 'react-cookie' 
import { useNavigate } from 'react-router-dom';

const AdminHeader = ({showSidebar,setShowSidebar}) => {
  const navigate = useNavigate()
  const [cookie,setCookie,removeCookie] = useCookies([])

  const HandleLogout = () => {
    console.log(cookie,'is the cookies')
    removeCookie('adminToken')
    navigate('/admin/auth')
  }

  return (
    <div className='admin-header'>
      <div className="admin-header__box">
        <DiGhostSmall className='admin-icon'  onClick={(e) =>  setShowSidebar(!showSidebar)}  />
      </div>
        <div className="admin-header__box">
            <h2>Space-O </h2>
        </div>
        <div className="admin-header__box">
          <BsPower className='admin-icon'
          onClick={HandleLogout}
          />
        </div>
    </div>
  )
}

export default AdminHeader