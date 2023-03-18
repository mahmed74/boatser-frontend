import React, { useState } from 'react'
import apiurl from '../../../../apiurl'
import axios from 'axios'
const TestimonialUpload = () => {
    const [first, setfirst] = useState('')
    const [last, setlast] = useState('')
    const [email, setemail] = useState('')
    const [boat, setboat] = useState('')
    const [testi, settesti] = useState('')
    const uploadTesti = () =>{
      axios.post(`${apiurl}testimoinial`,{
        Headers:{
          'Content-Type':'application/json'
        },
        testimonial: testi,
        name: first+" "+last,
        position:boat
      }).then((res)=>{
        console.log(res)
        if(res.status === 200){
          setfirst('')
          setlast('')
          setemail('')
          setboat('')
          settesti('')
          alert("Thanks for submitting...")
        }
      }).catch((err)=>{
        alert(err)
      })
    }
  return (
    <div className='bg-sky-200 p-3 md:p-5'>
        <div className='mt-5 bg-blue-500 p-3 md:p-10 rounded-lg '>
            <h1 className='text-center text-white text-5xl'>Client's Testimonial</h1>
            <center>
            <div className='grid md:grid-cols-2 grid-cols-1 mt-5'>
                <input type="text" value={first} onChange={(e)=> setfirst(e.target.value)} placeholder="First Name" required
                className='rounded-md p-2 w-98 m-2'/>
                <input type="text" value={last} onChange={(e)=> setlast(e.target.value)} placeholder="Last Name" required
                className='rounded-md p-2 w-98 m-2'/>
                <input type="email" value={email} onChange={(e)=> setemail(e.target.value)} placeholder="E-mail" required
                className='rounded-md p-2 w-98 m-2'/>
                <input type="text" value={boat} onChange={(e)=> setboat(e.target.value)} placeholder="Company/Boat Name" required
                className='rounded-md p-2 w-98 m-2'/>
            
            </div>
            <textarea className='rounded-md p-2 m-2 ' style={{width:'98%'}}
            placeholder="Testimonial"
            value={testi}
            onChange={e => settesti(e.target.value)}
            rows={6}/>
            <button className='px-10 py-2 text-white
            transition-all
            duration-300
            bg-blue-700
            rounded-md
            hover:bg-blue-900 disabled:bg-gray-400' onClick={uploadTesti} disabled={!first || !last || !email || !boat ||!testi}>Submit</button>
            </center>
        </div>
    </div>
  )
}

export default TestimonialUpload