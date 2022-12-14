import './RocketPage.css'
import React, { useState } from 'react'
import axios from 'axios'
import { useEffect } from 'react'
import {toast} from 'react-toastify'
import { useCookies } from 'react-cookie'

import { allocateSeatForClientRoute, getApplicationsRoute, getApprovedAndNonAllocatedApplicationsRoute, getRocketDetailsRoute } from '../../utils/APIRoutes'
import AdminSidebar from '../../components/AdminSidebar/AdminSidebar'
import AdminHeader from '../../components/AdminHeader/AdminHeader'
import ModalForSeatAllocating from '../../modals/ModalForSeatAllocating/ModalForSeatAllocating'
import { useNavigate } from 'react-router-dom'

const RocketPage = ({setShowSidebar, showSidebar}) => {
    
    const navigate = useNavigate()
    const [cookie,setCookie,removeCookie] = useCookies([])

    const [count, setCount] = useState(0)
    const [lockedApplication,setLockedApplication] = useState()
    const [seatName,setSeatName] = useState()
    const [seatIndex,setSeatIndex] = useState()
    const [show, setShow] = useState(false);
    const [windowL,setWindowL] = useState([0,0])
    const [windowR,setWindowR] = useState([0,0])
    const [backSeats,setBackseats] = useState([])
    const [applications,setApplications] = useState([0])

    const getRocketDetails = async () => {
        const {data} = await axios.get(getRocketDetailsRoute)
        if(data.status===false) return toast.error(data.msg)
        setWindowL(data.rocketDetails.windowL)
        setWindowR(data.rocketDetails.windowR)
        setBackseats(data.rocketDetails.backSeats)
        }

    useEffect(() => {
        getRocketDetails()
        if(!cookie.adminToken) navigate('/admin/auth')
    },[])

    const getApplications = async () => {
        const {data} = await axios.get(getApprovedAndNonAllocatedApplicationsRoute)
        if(data.status===false) return toast.error(data.msg)
        setApplications(data.application)
    }

    useEffect(() => {
        getApplications()
    },[])

    useEffect(() => {
        getRocketDetails()
    },[count])
 
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const bookSeat = (position,index) => {
        setSeatIndex(index)
        setSeatName(position)
        handleShow()
    }

    const allocateSeat =async (clientEmail) => {
        if(clientEmail===null || clientEmail==='' || !clientEmail) return toast.error('client email is required')
        const {data} = await axios.post(allocateSeatForClientRoute,{clientEmail,seatName,seatIndex})
        if(data.status) {
            toast.success(data.msg)
            setCount(count+1)
        }
        else toast.error(data.msg)
    }


  return (
    <div>
        <AdminHeader setShowSidebar={setShowSidebar} showSidebar={showSidebar} />
      <AdminSidebar setShowSidebar={setShowSidebar} showSidebar={showSidebar} />
      <div className="rocket-wrapper">
        <div className="seats">
            <div className="windowL">
                {
                    windowL.map((seat,index) => <div key={index} className={`seat ${seat.isBooked ? 'booked' : 'notBooked'}`} 
                    onClick={seat.isBooked ? () => console.log('hello') : () => bookSeat('windowL',index)}
                    >{ seat.user }</div> )
                }
            </div>
            <div className="windowR">
                {
                    windowR.map((seat,index) => <div key={index} className={`seat ${seat.isBooked ? 'booked' : 'notBooked'}`} 
                    onClick={seat.isBooked ? () => console.log('hello') : () => bookSeat('windowR',index)}
                    >{seat.user}</div>)
                }
            </div>
        </div>
      </div>
      <ModalForSeatAllocating show={show} handleClose={handleClose} applications={applications} setLockedApplication={setLockedApplication} allocateSeat={allocateSeat} />
    </div>
  )
}

export default RocketPage