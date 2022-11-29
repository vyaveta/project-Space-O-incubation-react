import React,{useState,useEffect} from 'react'
import { useNavigate } from 'react-router-dom'

const AdminSidebar = ({showSidebar,setShowsidebar}) => {
    const navigate = useNavigate()
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
    <div className="admin-intro__left "
       style={{left:`${introLeft}px`}}
       >
    <div className="list">
        <h4>Applications</h4>
    </div>
    <div className="list"
    onClick={() => navigate('/admin/showAllUsers')}
    >
        <h4>Users</h4>
    </div>
    <div className="list">
        <h4>Rocket</h4>
    </div>
       </div>
  )
}

export default AdminSidebar