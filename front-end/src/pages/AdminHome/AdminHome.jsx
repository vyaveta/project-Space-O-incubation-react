import React,{useEffect,useState} from 'react'
import { useNavigate } from 'react-router-dom'
import { useCookies } from 'react-cookie'
import AdminHeader from '../../components/AdminHeader/AdminHeader'
import AdminIntro from '../../components/AdminIntro/AdminIntro'
import axios from 'axios'
import { getAllUsersRoute } from '../../utils/APIRoutes'


const AdminHome = () => {
  const [showSidebar,setShowSidebar] = useState(false)
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
       } 
       getAllUsers()
  },[])
  return (
    <div>
      <AdminHeader setShowSidebar={setShowSidebar} showSidebar={showSidebar} />
      <AdminIntro setShowSidebar={setShowSidebar} showSidebar={showSidebar} />
    </div>
  )
}

export default AdminHome