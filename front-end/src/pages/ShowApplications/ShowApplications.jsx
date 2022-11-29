import React, { useState } from 'react'
import './ShowApplications.css'
import AdminHeader from '../../components/AdminHeader/AdminHeader'
import AdminSidebar from '../../components/AdminSidebar/AdminSidebar'
import axios from 'axios'
import { useEffect } from 'react'
import { getApplicationsRoute } from '../../utils/APIRoutes'
import {toast} from 'react-toastify'

const ShowApplications = ({showSidebar,setShowSidebar}) => {
    const [applications,setApplications] = useState([])
    useEffect(() => {
        const getApplications = async() => {
            const {data} = await axios.get(getApplicationsRoute)
            console.log(data,'is the application datas')
            if(data.status) {
                setApplications(data.applications)
            }
        }
        getApplications()
    },[])
  return (
    <div>
        <AdminHeader setShowSidebar={setShowSidebar} showSidebar={showSidebar} />
      <AdminSidebar setShowSidebar={setShowSidebar} showSidebar={showSidebar} />
      <div className="showApplications">
        <div className="applications">
           {
             applications.map((application,index) => {
                return(
                    <div className="application">
               <div className="info__div">
               <h3>{application.clientname}</h3>
                <h3>{application.clientEmail}</h3>
               </div>
                <button className='application__button'>view</button>
                <button className='application__button'>Approve</button>
                <button className='application__button'>Decline</button>
            </div>
                )
            })
           }
        </div>
      </div>
    </div>
  )
}

export default ShowApplications