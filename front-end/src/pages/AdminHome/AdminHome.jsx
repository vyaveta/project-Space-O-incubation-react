import React,{useEffect,useState} from 'react'
import { useNavigate } from 'react-router-dom'
import { useCookies } from 'react-cookie'
import AdminHeader from '../../components/AdminHeader/AdminHeader'
import AdminIntro from '../../components/AdminIntro/AdminIntro'


const AdminHome = () => {
  const [showSidebar,setShowSidebar] = useState(false)
  const navigate = useNavigate()
  const [cookie,setCookie,removeCookie] = useCookies([])

  useEffect(() => {
    if(!cookie.adminToken){
      navigate('/admin/auth')
    }
  },[])
  return (
    <div>
      <AdminHeader setShowSidebar={setShowSidebar} showSidebar={showSidebar} />
      <AdminIntro setShowSidebar={setShowSidebar} showSidebar={showSidebar} />
    </div>
  )
}

export default AdminHome