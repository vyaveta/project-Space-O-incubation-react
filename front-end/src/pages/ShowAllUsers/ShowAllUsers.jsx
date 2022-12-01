import React, { useEffect, useState } from 'react'
import './ShowAllUsers.css'
import AdminHeader from '../../components/AdminHeader/AdminHeader'
import AdminSidebar from '../../components/AdminSidebar/AdminSidebar'
import axios from 'axios'
import { blockClientRoute, getAllUsersRoute } from '../../utils/APIRoutes'
import { useCookies } from 'react-cookie'
import {BsLightningFill} from 'react-icons/bs'
import { GiPowerButton } from 'react-icons/gi'
import {toast}  from 'react-toastify'
import { useNavigate } from 'react-router-dom'

const ShowAllUsers = ({ showSidebar, setShowSidebar }) => {
  
  const navigate = useNavigate()
  const [count,setCount] = useState(0)
  const [cookie, setCookie, removeCookie] = useCookies([])
  let theClients = []
  const [clients, setClients] = useState([])

  const get = async () => {
    const { data } = await axios.get(getAllUsersRoute)
    if (data.status) {
      theClients = data.clients
      setClients(data.clients)
      console.log(clients, 'is the clients', theClients, 'how about this')
      console.log(data.clients)
      setClients(data.clients)
      console.log(clients,'this');
    }  
  }

  useEffect(() => {
    get()
    if(!cookie.adminToken) navigate('/admin/auth')
  }, [])
  useEffect(() => {
    get()
  },[count])
  const blockClient = async (client) => {
    console.log(client)
    const {data} = await axios.post(blockClientRoute,{_id:client._id})
    console.log(data,'is the data from the block client function')
    if(data.status) {
      setCount(count+1)
      return toast.success(data.msg)
    }
    toast.error(data.msg)
  }
  return (
    <div>
      <AdminHeader setShowSidebar={setShowSidebar} showSidebar={showSidebar} />
      <AdminSidebar setShowSidebar={setShowSidebar} showSidebar={showSidebar} />
      <div className="show-all-users">
        <div className="all-users-outer-box">
        <div className="all-users__user">
               <h3>Client name</h3>
               <h3>Client email</h3>
               <button className='block__button'>Action</button>
               </div>
          {
            clients.map((data,index) => {
              return (
                <div className="all-users__user" key={index}>
               <h3>{data.clientname}</h3>
               <h3>{data.email}</h3>
               <button className='block__button'
               onClick={() => {
                blockClient(data)
               }}
               >{
                data.isBanned ? <BsLightningFill /> :  <GiPowerButton />
               }</button>
               </div>
              )
            })
          }
        </div>
      </div>
    </div>
  )
}

export default ShowAllUsers