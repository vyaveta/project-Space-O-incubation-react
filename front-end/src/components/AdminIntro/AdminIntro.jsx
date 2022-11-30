import React, { useEffect } from 'react'
import './AdminIntro.css'
import styled from 'styled-components'
import { useRef } from 'react'
import { useState } from 'react'
import axios from 'axios'
import AdminSidebar from '../AdminSidebar/AdminSidebar'
import AdminHomeComponent from '../AdminHome/AdminHomeComponent'


const AdminIntro = ({setShowSidebar,showSidebar}) => {
   
   
  return (
    <div className='admin-intro'>
       
       <div className="admin-intro__right">
        <AdminHomeComponent />
       </div>
    </div>
   
  )
}

export default AdminIntro