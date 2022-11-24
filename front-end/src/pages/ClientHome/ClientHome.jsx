import React from 'react'
import { useNavigate } from 'react-router-dom'
import './ClientHome.css'

const ClientHome = () => {
    const navigate = useNavigate()

    const handleLogout = () => {
        navigate('/login')
    }

  return (
    <div>
        <h1>Hello Client</h1>
        <button className="button" onClick={handleLogout}>Logout</button>
    </div>
  )
}

export default ClientHome