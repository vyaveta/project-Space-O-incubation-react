import React from 'react'
import { useCookies } from 'react-cookie'
import { useNavigate } from 'react-router-dom'
import './ClientHeader.css'

const ClientHeader = ({name , title , setAppear ,allowBooking }) => {
    const navigate = useNavigate()
    const [cookie,setCookie,removeCookie] = useCookies([])

    const handleLogout = () => {
        removeCookie('clientToken')
        navigate('/login')
    }

  return (
    <div className='client-header'>
        <div className="header__box">
            <h2 className='company-name'>{name}</h2>
        </div>
        <div className="header__box slogan" >{title}</div>
        <div className="header__box">
           {
            allowBooking &&  <button className='bluepill-button booking-button' onClick={() => setAppear(true)} >Book now!</button>
           }
        </div>
        <div className="header__box">
            <button className="button bluepill-button" onClick={handleLogout} >Logout</button>
        </div>
    </div>
  )
}

export default ClientHeader