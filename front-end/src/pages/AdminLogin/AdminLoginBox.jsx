import React,{useState} from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
import { adminLoginRoute } from '../../utils/APIRoutes'
import { useNavigate } from 'react-router-dom'

const AdminLoginBox = ({setLoginMode}) => {
    const navigate = useNavigate()
    const [adminName, setAdminName] = useState('')
    const [adminAuthCode,setAdminAuthCode] = useState('')

    const handleError = (msg) => {
      toast.error(msg)
    }

    const handleSubmit = async () => {
      try{
        if(adminName.trim() ==='') return handleError('Enter your adminName')
      if(adminAuthCode.trim()==='') return handleError("Enter your auth code")
      const {data} = await axios.post(adminLoginRoute,{adminName,adminAuthCode},{withCredentials: true})
      console.log(data,'is the data')
      if(data.status) {
        toast.success(data.msg)
        navigate('/admin')
      }else handleError(data.msg)
      }catch(er){
        console.log(er)
      }
    }

  return (
    <div className="login-div">
    <div className="admin-login__title">
     <h2>Admin Login</h2>
     </div>
     <div className="admin-login__input">
       <input type="text" value={adminName}  placeholder='Name' onChange={(e) => setAdminName(e.target.value)} />
     </div>
     <div className="admin-login__input">
       <input type="text" placeholder='Admin-Auth-Code' value={adminAuthCode} onChange={(e) => setAdminAuthCode(e.target.value)} />
     </div>
      <div className="admin-login__button-div">
       <button className='neo-button' onClick={handleSubmit}> Enter </button>
      </div>
      <div className="textmsg">
        <p onClick={() => setLoginMode(false)}>
            Register an admin
        </p>
      </div>
    </div>
  )
}

export default AdminLoginBox