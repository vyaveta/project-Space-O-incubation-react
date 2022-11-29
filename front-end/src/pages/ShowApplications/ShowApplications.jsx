import React, { useState } from 'react'
import './ShowApplications.css'
import AdminHeader from '../../components/AdminHeader/AdminHeader'
import AdminSidebar from '../../components/AdminSidebar/AdminSidebar'
import axios from 'axios'
import { useEffect } from 'react'
import { getApplicationsRoute } from '../../utils/APIRoutes'
import {toast} from 'react-toastify'
import Button from 'react-bootstrap/Button';
import ApplicationModel from '../../modals/ClientApplicationForTheAdminToView/ApplicationModel'

const ShowApplications = ({showSidebar,setShowSidebar}) => {

    const [show, setShow] = useState(false);
    const [application,setApplication] = useState({})

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

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

    const showApplication = (index) => {
        console.log('gonna show',applications[index])
        setShow(true)
        setApplication(applications[index])
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
                <button className='application__button'
                onClick={() => showApplication(index)}
                >view</button>
                { application.isDeclined ? '' :
                  <button className='application__button'>Approve</button>
                }
                <button className='application__button'>Decline</button>
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