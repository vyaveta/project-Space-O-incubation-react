import React,{useEffect,useState} from 'react'
import { useNavigate } from 'react-router-dom'
import { useCookies } from 'react-cookie'
import axios from 'axios'

import AdminHeader from '../../components/AdminHeader/AdminHeader'
import AdminIntro from '../../components/AdminIntro/AdminIntro'
import { getAllUsersRoute } from '../../utils/APIRoutes'
import AdminSidebar from '../../components/AdminSidebar/AdminSidebar'
import AdminHomeComponent from '../../components/AdminHome/AdminHomeComponent'


const AdminHome = ({showSidebar,setShowSidebar}) => {
  const [clients,setClients] = useState()
  const navigate = useNavigate()
  const [cookie,setCookie,removeCookie] = useCookies([])

  useEffect(() => {
    if(!cookie.adminToken){
      navigate('/admin/auth')
    }
  },[])
  useEffect(() => {
       const getAllUsers = async () => {
        const {data} = await axios.get(getAllUsersRoute)
        console.log(data,'is the data')
        setClients(data.clients)
       } 
       getAllUsers()
  },[])
  return (
    <div>
      <AdminHeader setShowSidebar={setShowSidebar} showSidebar={showSidebar} />
      <AdminSidebar setShowsidebar={setShowSidebar} showSidebar={showSidebar} />
      <AdminHomeComponent />
      {/* <AdminIntro setShowSidebar={setShowSidebar} showSidebar={showSidebar} clients={clients}  /> */}
    </div>
  )
}

export default AdminHome