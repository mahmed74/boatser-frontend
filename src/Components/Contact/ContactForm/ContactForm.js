import React, { useState } from 'react'
import apiurl from '../../../apiurl'
import axios from 'axios'
const ContactForm = () => {
    const [name, setname] = useState('')
    const [email, setemail] = useState('')
    const [department, setdepartment] = useState()
    const [subject, setsubject] = useState()
    const [message, setmessage] = useState('')
    const [rand1, setrand1] = useState(Math.floor(Math.random()*10)+1)
    const [rand2, setrand2] = useState(Math.floor(Math.random()*10)+1)
    const [answer, setanswer] = useState()

    const sendtodb = () =>{
      if(answer == rand1+rand2){
      axios.post(`${apiurl}contact`,{
        Headers:{
          'Content-Type':'application/json'
        },
        fullname:name,
        email,
        department,
        subject,
        reason:message,
        date:new Date().toLocaleString()
      }).then((res)=>{
        if(res.status === 200){
          setname('')
          setemail('')
          setmessage('')
          setsubject('')
          setanswer('')
          setrand1(Math.floor(Math.random()*10)+1)
          setrand2(Math.floor(Math.random()*10)+1)
        }
      }).catch(err => console.log(err))
    }
    else{
      alert('The mathmatical answer is incorrect')
    }
    }
  return (
    <div className='p-3 md:p-5 bg-white rounded-lg shadow-lg shadow-gray-400'>
        <h1 className='text-center text-theme uppercase text-3xl font-bold'>contact us form</h1>
        <div className='grid md:grid-cols-2 grid-col-1 mt-3'>
        <input type="text" className='p-2 m-2 ring-1 ring-slate-900 rounded-md w-98 bg-slate-100' placeholder='Full Name' value={name} onChange={(e)=> setname(e.target.value)} required/>
        <input type="email" className='p-2 m-2 ring-1 ring-slate-900 rounded-md w-98 bg-slate-100' placeholder='E-mail' value={email} onChange={(e)=> setemail(e.target.value)} required/>
        <select className='p-2 m-2 ring-1 ring-slate-900 rounded-md w-98 bg-slate-100' onChange={(e)=> setdepartment(e.target.value)} value={department}>
            <option value="No Department">Select Department</option>
            <option value="Support">Support</option>
            <option value="Service">Services</option>
            <option value="Query/Request">Query / Request</option>
            <option value="Other">Other</option>
        </select>
        <input type="text" className='p-2 m-2 ring-1 ring-slate-900 rounded-md w-98 bg-slate-100' placeholder='Subject' value={subject} onChange={(e)=> setsubject(e.target.value)} required/>
        </div>
        <textarea placeholder='Reason for Contacting us' className='p-2 m-2 ring-1 ring-slate-900 rounded-md w-full bg-slate-100' rows={6} value={message} onChange={(e)=> setmessage(e.target.value)}/>
        <div className="p-2"><label>Please Answer the Question: {rand1}+{rand2}=</label><input value={answer} onChange={(e)=> setanswer(e.target.value)} className="w-10 ring-1 ring-gray-600 mx-2"/></div>
        <center>
          <button onClick={sendtodb} className='bg-theme py-2 px-7 transition-all duration-300 hover:bg-transparent hover:ring-2 hover:text-blue-900  disabled:cursor-not-allowed disabled:bg-gray-400 disabled:hover:ring-0 disabled:hover:text-white hover:ring-blue-900 rounded-md text-white' disabled={!name || !email || !subject}>Submit</button>
        </center>
    </div>
  )
}

export default ContactForm