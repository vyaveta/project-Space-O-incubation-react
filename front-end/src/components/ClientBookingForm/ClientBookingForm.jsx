import React from 'react'
import './ClientBookingForm.css'

const ClientBookingForm = () => {
  return (
    <div className='booking-form-client'>
        <div className="booking-form-client__input-div">
            <input type="text" placeholder='First name' />
            <input type="text" placeholder='Last name' />
        </div>
        <div className="booking-form-client__input-div">
            <input type="text" placeholder='Country' />
            <input type="text" placeholder='State' />
        </div>
        <div className="booking-form-client__input-div">
            <input type="text" placeholder='Contact Info' />
        </div>
        <div className="booking-form-client__input-div">
            <input type="text" placeholder='Enter your mail id' />
        </div>
        <div className="booking-form-client__input-div">
            <textarea name="" id="" cols="30" rows="10" placeholder='Tell us why do you want to Explore the Space'></textarea>
        </div>
        <div className="booking-form-client__input-div">
            input
        </div>
        <div className="booking-form-client__input-div"></div>
        <div className="booking-form-client__input-div"></div>
    </div>
  )
}

export default ClientBookingForm