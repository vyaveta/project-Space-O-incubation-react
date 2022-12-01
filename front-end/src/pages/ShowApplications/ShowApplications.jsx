import React, { useState } from 'react'
import './ShowApplications.css'
import axios from 'axios'
import { useEffect } from 'react'
import {toast} from 'react-toastify'
import Button from 'react-bootstrap/Button';
import { useCookies } from 'react-cookie'

import AdminSidebar from '../../components/AdminSidebar/AdminSidebar'
import { changeApplicationStatusRoute, getApplicationsRoute } from '../../utils/APIRoutes'
import AdminHeader from '../../components/AdminHeader/AdminHeader'
import ApplicationModel from '../../modals/ClientApplicationForTheAdminToView/ApplicationModel'
import { useNavigate } from 'react-router-dom'

const ShowApplications = ({showSidebar,setShowSidebar}) => {

    const [cookie,setCookie,removeCookie] = useCookies([])
    const navigate = useNavigate()

    const [count,setCount] = useState(0) // I think there is a more effcient way to do this , but I dont have enough time to do my research. Since I have got a deadline to complete this task
    const [show, setShow] = useState(false);
    const [application,setApplication] = useState({})

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [applications,setApplications] = useState([])

    const getApplications = async() => {
      const {data} = await axios.get(getApplicationsRoute)
      console.log(data,'is the application datas')
      if(data.status) {
          setApplications(data.applications)
      }
  }

    useEffect(() => {
        getApplications()
        if(!cookie.adminToken) navigate('/admin/auth')
    },[])

    useEffect(() => {
      getApplications()
    },[count])

    const showApplication = (index) => {
        console.log('gonna show',applications[index])
        setShow(true)
        setApplication(applications[index])
    }
    const changeApplicationStatus = async (_id,status) => {
      const {data} = await axios.post(changeApplicationStatusRoute,{_id,status})
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
      <div className="showApplications">
        <div className="applications">
           {
             applications.map((application,index) => {
                return(
                    <div className="application" key={index}>
               <div className="info__div">
               <h3>{application.clientname}</h3>
                <h3>{application.clientEmail}</h3>
               </div>
                <button className='application__button view-button-admin'
                onClick={() => showApplication(index)}
                >view</button>
                { application.isApproved ? <p className='application-status'>Approved</p> : application.isDeclined ? <p  className='application-status'>Declined</p> : <> 
                <button className='application__button'
                  onClick={() => changeApplicationStatus(application._id,'approve')}
                  >Approve</button>
                <button className='application__button decline-button-admin'
                 onClick={() => changeApplicationStatus(application._id,'decline')}
                >Decline</button>
                </>
              }
            </div>
                )
            })
           }
        </div>
      </div>
      <ApplicationModel show={show} handleClose={handleClose} handleShow={handleShow} application={application} />
    </div>
  )
}

export default ShowApplications