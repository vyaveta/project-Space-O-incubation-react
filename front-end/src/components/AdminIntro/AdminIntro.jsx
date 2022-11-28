import React, { useEffect } from 'react'
import './AdminIntro.css'
import styled from 'styled-components'
import { useRef } from 'react'
import { useState } from 'react'
import axios from 'axios'


const AdminIntro = ({setShowSidebar,showSidebar}) => {
    const leftIntroHide = -300
    const leftIntroShow = 0
    const [introLeft,setIntroLeft] = useState(-300)
    console.log(introLeft,'is the intro left')
    const toogleLeftIntro =() => {
        setIntroLeft(0)
    }
    useEffect(() => {
        if(showSidebar) setIntroLeft(0)
        else setIntroLeft(-300)
    },[showSidebar])
   
  return (
    <div className='admin-intro'>
       <div className="admin-intro__left "
       style={{left:`${introLeft}px`}}
       >
    <div className="list">
        <h4>Applications</h4>
    </div>
    <div className="list">
        <h4>Users</h4>
    </div>
    <div className="list">
        <h4>Rocket</h4>
    </div>
       </div>
       <div className="admin-intro__right">
        
       </div>

    </div>
   
  )
}

export default AdminIntro