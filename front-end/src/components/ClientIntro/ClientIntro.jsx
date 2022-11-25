import React from 'react'
import './ClientIntro.css'
import Space from '../../assets/space.png'
import Intro from '../../assets/intro.gif'

const ClientIntro = ({text , text2}) => {
  return (
         <div className="intro" style={{
         'backgroundImage': `url(${Intro})`,
         'backgroundRepeat' : 'no-repeat',
         'backgroundSize' : '100vw'
       }} >
       <div className="intro__box">
          <h3>{text} <br /> {text2} </h3>
       </div>
       </div>
  )
}

export default ClientIntro