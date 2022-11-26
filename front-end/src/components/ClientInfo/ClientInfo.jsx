import React from 'react'
import './ClientInfo.css'
import SpaceShip from '../../assets/spaceship.png'
import Stars from '../../assets/stars.gif'
import Earth from '../../assets/spaceTravel.gif'


const ClientInfo = ({text , text2 , setAppear , allowBooking}) => {
  return (
    <div className="scene" style={{
      'backgroundImage':`url(${Earth})`,
      'backgroundRepeat' : 'no-repeat',
      'backgroundSize' : '100vw',
      
    }} >
      <div className="rocket">
        <img  src={SpaceShip} width='100px'/>
      </div>
      <div className="info">
        <h3> {text}<br />
         {text2} </h3>
         <div className="button">
         {
          allowBooking?  <button className="bluepill-button" onClick={() => setAppear(true)}>Book Now!</button> : ( 
            <p className='notice-text'>You have sent your booking application</p>
          )
         }
         </div>
      </div>
    </div>
  )
}

export default ClientInfo