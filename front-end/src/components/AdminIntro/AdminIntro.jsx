import React, { useEffect } from 'react'
import './AdminIntro.css'
import styled from 'styled-components'
import { useRef } from 'react'
import { useState } from 'react'
import axios from 'axios'
import AdminSidebar from '../AdminSidebar/AdminSidebar'


const AdminIntro = ({setShowSidebar,showSidebar}) => {
   
   
  return (
    <div className='admin-intro'>
       <AdminSidebar setShowsidebar={setShowSidebar} showSidebar={showSidebar} />
       <div className="admin-intro__right">
        
       </div>
    </div>
   
  )
}

export default AdminIntro