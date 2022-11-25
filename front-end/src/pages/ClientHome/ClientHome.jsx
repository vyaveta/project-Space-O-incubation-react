import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useCookies } from 'react-cookie'
import axios from 'axios'
import {toast } from 'react-toastify'
import './ClientHome.css'
import { useEffect } from 'react'
import {  middlewareCheck } from '../../utils/APIRoutes'

const ClientHome = () => {
    const navigate = useNavigate()

    const [cookie,setCookie,removeCookie] = useCookies([])

    useEffect(() => {
        const verifyClient = async () => {
            if(!cookie) navigate('/login')
            else{
                const {data} = await axios.post(middlewareCheck,{cookie},{withCredentials: true}).catch((err) => console.log(err,'is the error form the axios side in the clientHome.jsx'))
                console.log(data)
                if(data.status===false) {
                    removeCookie('clientToken')
                    navigate('/login')
                }else{
                    toast(`Hi ${data.client.clientname} `,{theme: 'light'})
                }
            }
        }
        verifyClient()
    },[])

    const handleLogout = () => {
        removeCookie('clientToken')
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