import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useCookies } from 'react-cookie'
import axios from 'axios'
import {toast } from 'react-toastify'
import './ClientHome.css'
import { useEffect } from 'react'
import {  middlewareCheck } from '../../utils/APIRoutes'
import ClientHeader from '../../components/ClientHeader/ClientHeader'
import ClientIntro from '../../components/ClientIntro/ClientIntro'
import ClientInfo from '../../components/ClientInfo/ClientInfo'
import ClientBooking from '../../modals/ClientBooking/ClientBooking'
import { useState } from 'react'

const ClientHome = () => {
    const [allowBooking,setAllowBooking] = useState(true)
    const [appear,setAppear] = useState(false)
    const navigate = useNavigate()

    const [cookie,setCookie,removeCookie] = useCookies([])

    useEffect(() => {
        const verifyClient = async () => {
            if(!cookie) navigate('/login')
            else{
                const {data} = await axios.post(middlewareCheck,{cookie},{withCredentials: true}).catch((err) => console.log(err,'is the error form the axios side in the clientHome.jsx'))
                if(data.status===false) {
                    removeCookie('clientToken')
                    navigate('/login')
                }else{
                    if(data.client.isBooked) setAllowBooking(false)
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
    <div className='client-home'>
        <ClientHeader name='Space-O' title='We make your Space travel fantasies into reality' setAppear = {setAppear} allowBooking={allowBooking} />
        <ClientIntro  text='Book your Interstellar journey,' text2='View and Experience the Magic and the Beauty of the Universe' />
        <ClientInfo text='Book your tickets now!' text2 = 'and confirm your seats in the nova cruiser space ship ' setAppear = {setAppear} allowBooking={allowBooking} />
        <ClientBooking value = {appear} setAppear = {setAppear} setAllowBooking={setAllowBooking}  />
    </div>
  )
}

export default ClientHome