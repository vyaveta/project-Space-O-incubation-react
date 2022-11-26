import './ClientBookingForm.css'
import React from 'react'
import { useEffect } from 'react'
import { useState  } from 'react'
import { toast } from 'react-toastify'
import { useCookies } from 'react-cookie'
import Select from 'react-select'
import axios from 'axios'
import { clientSeatBookingRoute } from '../../utils/APIRoutes'


const ClientBookingForm = ({countries , setAppear , setAllowBooking}) => {
    const USER_REGEX = /^[a-zA-z][a-zA-Z]{3,23}$/;
    const EMAIL_REGEX =  /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    const CONTACT_NUMBER_REGEX = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;

    const [cookie,setCookie,removeCookie] = useCookies([])
    
    const [firstName,setFirstName] = useState('')
    const [lastName,setLastName] = useState('')
    const [country,setCountry] = useState(false)
    const [state,setState] = useState('')
    const [contactNumber,setContactNumber] = useState('')
    const [email,setEmail] = useState('')
    const [reason,setReason] = useState('')
    const [agree,setAgree] = useState(false)

    const toastOptions =  {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light"
    }

    const changeHandler = value => {
        setCountry(value)
        console.log(cookie)
      }
    

    const handleError = (msg) => {
        toast.error(msg)
    }


    const handleSubmit = async () => {
        if(firstName.trim() === ''|| !USER_REGEX.test(firstName)) handleError('Enter a proper first name')
        else if(lastName.trim() === '' || !USER_REGEX.test(lastName)) handleError("Enter a proper Last name!")
        else if(contactNumber.trim() ==='' || !CONTACT_NUMBER_REGEX.test(contactNumber)) handleError("Enter a proper Contact number")
        else if(email.trim() === '' || !EMAIL_REGEX.test(email) ) handleError('Enter a proper Email!')
        else if(country == '' || country === false) handleError('Select a country')
        else if(state.trim() ==='' || !USER_REGEX.test(state)) handleError('Enter your state.')
        else if(reason.trim() === '') handleError('Enter a reason')
        else if(agree===false) handleError('Seems like you have not agreed to the consent letter.')
        else{
            const {data} = await axios.post(clientSeatBookingRoute,{firstName,lastName,contactNumber,email,country,state,reason,cookie},{withCredentials: true}
                ).catch((err) => {
                console.log(err,'is the error that occured in the axios post req for seat booking')
            }).finally(() => {
                setAppear(false)
            }) 
            if(data.status) {
                toast.success('Your application was sent successfully!',toastOptions)
                setAllowBooking(false)
            }
            else handleError(data.msg)
        }
    }

  return (
    <div className='booking-form-client'>
        <div className="booking-form-client__input-div">
            <input type="text" placeholder='First name' value={firstName} onChange={(e) => setFirstName(e.target.value)} />
            <input type="text" placeholder='Last name' value={lastName} onChange={(e) => setLastName(e.target.value)} />
        </div>
        <div className="booking-form-client__input-div">
            <Select options={countries} value={country} className='booking-from__select' onChange={changeHandler} />
            <input type="text" placeholder='State' value={state} onChange={(e)=> setState(e.target.value)} />
        </div>
        <div className="booking-form-client__input-div">
            <input type="number" placeholder='Contact Number' value={contactNumber} onChange={(e) => setContactNumber(e.target.value)}  />
        </div>
        <div className="booking-form-client__input-div">
            <input type="text" placeholder='Enter your mail id' value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div className="booking-form-client__input-div">
            <textarea name="" id="" cols="30" rows="10" placeholder='Tell us why do you want to Explore the Space (note: if your reason is not strong or genuine, We wont accept your request!)' 
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            ></textarea>
        </div>
        <div className="booking-form-client__input-div">
            <div className="policies">
            <h1>Policies and Consent letter</h1>
            <p>
                We, Space-O team is providing a free trip around our solar system for those who register for this form,
                So we hereby declare that We can provide a free trip for you that includes the travel cost ,airship cost,
                food and accomodation.
                <br />
                But we are not responsible for your actions throughout the journey , If you fails to obey the rules and 
                instructions given by our Space-O team and guides, we shall not take responsibility for you.
                And in case of any accidents or even death , We space-O team and company are not responsible.
            </p>
            </div>
        </div>
        <div className="booking-form-client__input-div">
            <div className="agreement">
            <input type="checkbox" name="agreement" id="agree" value='agree' checked={agree} onChange={(e) => setAgree(e.target.checked)} />
            <p>I agree to all the terms and service</p>
            </div>
        </div>
        <div className="booking-form-client__input-div">
            <button className="bluepill-button" onClick={handleSubmit} >Submit</button>
        </div>
        <div className="booking-form-client__input-div"></div>
    </div>
  )
}

export default ClientBookingForm