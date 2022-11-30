import React, { useState } from 'react'
import './RocketPage.css'
import AdminHeader from '../../components/AdminHeader/AdminHeader'
import AdminSidebar from '../../components/AdminSidebar/AdminSidebar'
import axios from 'axios'
import { useEffect } from 'react'
import { allocateSeatForClientRoute, getApplicationsRoute, getApprovedAndNonAllocatedApplicationsRoute, getRocketDetailsRoute } from '../../utils/APIRoutes'
import {toast} from 'react-toastify'
import {MdChair} from 'react-icons/md'
import ModalForSeatAllocating from '../../modals/ModalForSeatAllocating/ModalForSeatAllocating'

const RocketPage = ({setShowSidebar, showSidebar}) => {
    const [count, setCount] = useState(0)
    const [lockedApplication,setLockedApplication] = useState()
    const [seatName,setSeatName] = useState()
    const [seatIndex,setSeatIndex] = useState()
    const [show, setShow] = useState(false);
    const [windowL,setWindowL] = useState([])
    const [windowR,setWindowR] = useState([])
    const [backSeats,setBackseats] = useState([])
    const [applications,setApplications] = useState([])

    const getRocketDetails = async () => {
        const {data} = await axios.get(getRocketDetailsRoute)
        if(data.status===false) return toast.error(data.msg)
        setWindowL(data.rocketDetails.windowL)
        setWindowR(data.rocketDetails.windowR)
        setBackseats(data.rocketDetails.backSeats)
        }

    useEffect(() => {
        getRocketDetails()
    },[])

    const getApplications = async () => {
        const {data} = await axios.get(getApprovedAndNonAllocatedApplicationsRoute)
        if(data.status===false) return toast.error(data.msg)
        console.log(data,'is the application list')
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
            setCount(count++)
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
                    onClick={() => bookSeat('windowL',index)}
                    ></div> )
                }
            </div>
            <div className="windowR">
                {
                    windowR.map((seat,index) => <div key={index} className={`seat ${seat.isBooked ? 'booked' : 'notBooked'}`} 
                    onClick={() => bookSeat('windowR',index)}
                    ></div>)
                }
            </div>
        </div>
      </div>
      <ModalForSeatAllocating show={show} handleClose={handleClose} applications={applications} setLockedApplication={setLockedApplication} allocateSeat={allocateSeat} />
    </div>
  )
}

export default RocketPage