import axios from 'axios'
import React, { useEffect, useState } from 'react'
import CardOffer from './CardOffer/CardOffer'
import apiurl from '../../../apiurl'
const WeOffer = ({loaded}) => {
  const [offers, setoffers] = useState([])
  useEffect(() => {
    axios.get(`${apiurl}homepage`).then((res)=>{
      setoffers(res.data.result)
      loaded((p)=>p+1)
    }).catch((err)=>{
      console.log(err)
    })
  }, [])
  
  return (
    <div className='pt-7 bg-blue-100'>
        <h1 className='text-black text-center text-5xl uppercase'>WHAT WE OFFER </h1>
        <p className='text-center text-gray-500 mt-5 text-xl'>We video all the work we carry out for you. </p>
        <div className='grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 mt-7 p-3'>
         
            {offers.map((v,i)=>{
              return<CardOffer title={v.title}
              img={v.icon}
              decs={v.desc}/>
            })}
      
        </div>
    </div>
  )
}

export default WeOffer