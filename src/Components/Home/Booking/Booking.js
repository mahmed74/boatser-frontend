import axios from 'axios'
import React, { useEffect, useState } from 'react'
import BookingForm from './BookingForm/BookingForm'
import apiurl from '../../../apiurl'
const Booking = ({lodaded}) => {
    const [url, seturl] = useState('')
    const [hero, sethero] = useState('')
    useEffect(() => {
      axios.get(`${apiurl}sitedata`).then((data)=>{
        if(data.status === 200){
          const obj = data.data.result[0]
          console.log(obj)
          sethero(obj.hero)
          seturl(obj.bgurl)
          lodaded((p)=> p+1)
        }
      }).catch((err)=>{
        console.log(err)
      })
    }, [])
    
  return (
    // 
    <div className='h-full w-full bg-blue-200 p-5 md:p-20 grid md:grid-cols-2 sm:grid-cols-1 grid-cols-1'
    style={{backgroundImage: `url(${url})`}} id="booking">
        <div className='items-center justify-center flex'>
            <h1 className='md:text-7xl text-5xl mx-3 my-5 md:my-0 md:mx-0 text-white text-center font-black'>{hero}</h1>
        </div>
        <div className=''>
            <BookingForm/>
        </div>
    </div>
  )
}

export default Booking