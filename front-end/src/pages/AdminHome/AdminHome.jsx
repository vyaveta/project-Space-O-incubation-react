import React,{useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
import { useCookies } from 'react-cookie'


const AdminHome = () => {
  const navigate = useNavigate()
  const [cookie,setCookie,removeCookie] = useCookies([])

  useEffect(() => {
    if(!cookie.adminToken){
      navigate('/admin/auth')
    }
  },[])
  return (
    <div>AdminHome</div>
  )
}

export default AdminHome