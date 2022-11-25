import React from 'react'
import './ClientInfo.css'
import SpaceShip from '../../assets/spaceship.png'
import Stars from '../../assets/stars.gif'
import Earth from '../../assets/spaceTravel.gif'


const ClientInfo = ({text,text2}) => {
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
      </div>
    </div>
  )
}

export default ClientInfo