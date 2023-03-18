import React from 'react'
import Booking from './Booking/Booking'
import Interested from './Interested/Interested'
import WeOffer from './WeOffer/WeOffer'
import logo from '../../img/logo.svg'
import { useState } from 'react'
import { useEffect } from 'react'

const Home = () => {
  const [loaded, setloaded] = useState(0)
  useEffect(() => {
    console.log(loaded)
  }, [loaded])
  
  return (
    <div>
      <div className={`fixed ${loaded>1 ? 'loaded':'flex'} top-0 left-0 right-0 bottom-0 bg-white items-center justify-center`}>
        <img src={logo} className="h-20 w-20"/>
      </div>
      <Booking lodaded={setloaded}/>
      <WeOffer loaded={setloaded}/>
    <Interested/>
    </div>
  )
}

export default Home