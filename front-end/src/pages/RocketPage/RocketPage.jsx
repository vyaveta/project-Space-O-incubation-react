import React, { useState } from 'react'
import './RocketPage.css'
import AdminHeader from '../../components/AdminHeader/AdminHeader'
import AdminSidebar from '../../components/AdminSidebar/AdminSidebar'
import axios from 'axios'
import { useEffect } from 'react'
import { getApplicationsRoute, getRocketDetailsRoute } from '../../utils/APIRoutes'
import {toast} from 'react-toastify'
import {MdChair} from 'react-icons/md'

const RocketPage = ({setShowSidebar, showSidebar}) => {

    const [windowL,setWindowL] = useState([])
    const [windowR,setWindowR] = useState([])
    const [backSeats,setBackseats] = useState([])

    useEffect(() => {
        const getRocketDetails = async () => {
        const {data} = await axios.get(getRocketDetailsRoute)
        if(data.status===false) return toast.error(data.msg)
        setWindowL(data.rocketDetails.windowL)
        setWindowR(data.rocketDetails.windowR)
        setBackseats(data.rocketDetails.backSeats)
        }
        getRocketDetails()
    },[])

    useEffect(() => {
        const getApplications = async () => {
            const {data} = await axios.get(getApplicationsRoute)
            if(data.status===false) return toast.error(data.msg)
            console.log(data,'is the application list')
        }
        getApplications()
    },[])

    const bookSeat = () => {

    }

  return (
    <div>
        <AdminHeader setShowSidebar={setShowSidebar} showSidebar={showSidebar} />
      <AdminSidebar setShowSidebar={setShowSidebar} showSidebar={showSidebar} />
      <div className="rocket-wrapper">
        <div className="seats">
            <div className="windowL">
                {
                    windowL.map((seat,index) => <div className={`seat ${seat.isBooked ? 'booked' : 'notBooked'}`} ></div> )
                }
            </div>
            <div className="windowR">
                {
                    windowR.map((seat,index) => <div className={`seat ${seat.isBooked ? 'booked' : 'notBooked'}`} 
                    onClick={() => bookSeat(index,'right')}
                    ></div>)
                }
            </div>
        </div>
      </div>
    </div>
  )
}

export default RocketPage