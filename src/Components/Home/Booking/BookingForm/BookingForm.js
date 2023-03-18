import React, { useState } from 'react'
import axios from 'axios'
import apiurl from '../../../../apiurl'
const BookingForm = () => {
  const [firstname, setfirstname] = useState('')
  const [lastmae, setlastmae] = useState('')
  const [email, setemail] = useState('')
  const [phone, setphone] = useState('')
  const [serreq, setserreq] = useState('')
  const [date, setdate] = useState('')

  const sendtodb = ()=>{
  axios.post(`${apiurl}booking`,{
    Headers:{
      'Content-Type':'application/json'
    },
    fullname: `${firstname} ${lastmae}`,
    email,
    phone,
    serreq,
    date,
    reqdate: new Date().toLocaleDateString()
  }).then((res)=>{
    if(res.status === 200){
      setfirstname('')
      setlastmae('')
      setemail('')
      setdate('')
      setserreq('')
      setphone('')
    }
  }).catch(err => console.log(err))
  }
  return (
    <div className='m-3 p-3 md:p-10 bg-white rounded-lg shadow-lg'>
      <h1 className='text-center text-black text-4xl font-black'>Booking</h1>
      <div className='grid md:grid-cols-2 grid-cols-1 mt-5'>
        <input 
        type="text" 
        className='border-2 border-gray-400 transition-all duration-300 m-2 hover:border-gray-700 focus:border-gray-600 rounded-md p-2' 
        placeholder="First Name" 
        value={firstname} 
        onChange={(e)=> setfirstname(e.target.value)}/>
        <input 
        type="text" 
        className='border-2 border-gray-400 transition-all duration-300 m-2 hover:border-gray-700 focus:border-gray-600 rounded-md p-2' 
        placeholder="Last Name" 
        value={lastmae} onChange={(e)=> setlastmae(e.target.value)}/>
      </div>
      <input 
      type="text" 
      className='border-2 border-gray-400 transition-all duration-300 m-2 hover:border-gray-700 focus:border-gray-600 rounded-md p-2 w-full' placeholder="Phone Number" 
      value={phone}
      onChange={(e)=> setphone(e.target.value)}/>
      <input 
      type="email" 
      className='border-2 border-gray-400 transition-all duration-300 m-2 hover:border-gray-700 focus:border-gray-600 rounded-md p-2 w-full' placeholder="E-mail" 
      value={email}
      onChange={(e)=> setemail(e.target.value)}/>
      <textarea
       className='border-2 border-gray-400 transition-all duration-300 m-2 hover:border-gray-700 focus:border-gray-600 rounded-md p-2 w-full'
      cols={20}
      maxLength={300}
      value={serreq}
      onChange={(e)=> setserreq(e.target.value)}
      placeholder="Service Required"/>
      <p className='text-gray-400 ml-3'>{serreq.length} of 300 characters</p>
      <input 
      type="date" 
      className='border-2 border-gray-400 transition-all duration-300 m-2 hover:border-gray-700 focus:border-gray-600 rounded-md p-2 w-full' placeholder="E-mail" 
      value={date}
      onChange={(e)=> setdate(e.target.value)}/>
      <button onClick={sendtodb} disabled={!firstname||!lastmae||!email.includes("@") ||!phone.length>5||!serreq||!date} className='m-3 bg-blue-500 uppercase p-2 text-white px-7 transition-all duration-300 hover:bg-blue-600 shadow-lg disabled:bg-gray-500 disabled:cursor-not-allowed hover:shadow-xl'>book now</button>
    </div>
  )
}

export default BookingForm