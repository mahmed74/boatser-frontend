import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { PayPalButtons, PayPalScriptProvider } from '@paypal/react-paypal-js'
import axios from 'axios'
import apiurl from '../../apiurl'
const Footer = () => {
    const [punch, setpunch] = useState('')
    const [list, setlist] = useState([])
    const [email, setemail] = useState('')
    const [phone, setphone] = useState('')
    const [address, setaddress] = useState('')
    const [donam, setdonam] = useState(1)
    const [donopen, setdonopen] = useState(false)
    const [step, setstep] = useState(1)
    const getDatas = () =>{
        axios.get(`${apiurl}sitedata/footer`).then((res)=>{
            const data = res.data.result[0]
            setpunch(data.punch)
            setlist(data.list)
        }).catch((err)=> console.log(err))
    }
    const getContact = () =>{
        axios.get(`${apiurl}sitedata`).then((res)=>{
            const data = res.data.result[0]
            setphone(data.phone)
            setemail(data.email)
            setaddress(data.address)
        }).catch((err)=> console.log(err))
    }
    useEffect(() => {
      getDatas()
      getContact()
    }, [])
    
  return (
      <>
    <div className='w-full bg-slate-900 md:p-10 p-2'>
        <div className='grid md:grid-cols-4 sm:grid-cols-2 grid-cols-1'>
            <div>
                <h1 className='text-white font-bold text-md text-center md:text-left'>BONAVENTURE YACHT SERVICES</h1>
                <p className=' text-white text-center md:text-left'>{punch}</p>
                <ul className='text-gray-400 mt-3 md:list-disc text-center md:text-left '>
                    {list.map((v,i)=> <li>{v}</li>)}
                </ul>
            </div>
            <div>
                <h1 className='text-white uppercase text-2xl border-b-2 md:text-left text-center mt-10 md:mt-0 border-gray-600'>links</h1>
                <div className='mt-5 flex items-center justify-center md:justify-start md:items-start flex-col'>
                <Link to='/gallery' className='my-1 text-gray-400'>Gallery</Link> <br/>
                <Link to='/testimonial' className='my-1 text-gray-400'>Testimonial</Link> <br/>
                <Link to='/periodic-checks' className='my-1 text-gray-400'>Periodic Checks</Link> <br/>
                </div>
            </div>
            <div className='md:pl-3'>
                <h1 className='text-white uppercase text-2xl border-b-2 md:text-left text-center mt-10 md:mt-0 border-gray-600'>Reference</h1>
                <div className='mt-5 flex items-center justify-center md:justify-start md:items-start flex-col'>
                <Link to='/login' className='my-1 text-gray-400'>Login</Link> <br/>
                <Link to='/signup' className='my-1 text-gray-400'>Register</Link> <br/>
                <Link to='/about' className='my-1 text-gray-400'>About Us</Link> <br/>
                </div>
            </div>
            <div className={`${donopen ? 'fixed':'hidden'} h-full w-full bg-black bg-opacity-50 left-0 right-0 top-0 bottom-0 flex items-center justify-center`}>
                <div className='p-3 bg-white rounded-md'>
                    <h1 className='text-center uppercase text-black text-3xl'>Donate now</h1>
                    <div className="my-2 w-full flex items-center justify-center">
                        <button className={`mx-2 py-3 px-5 rounded-tl-full rounded-br-full ${step ===1 ? 'bg-blue-500 text-white': 'ring-1 ring-blue-500 text-blue-500'} transition-all ease-in-out duration-300`}>Amount</button>
                        <button className={`mx-2 py-3 px-5 rounded-tl-full rounded-br-full  ${step ===2 ? 'bg-blue-500 text-white': 'ring-1 ring-blue-500 text-blue-500 cursor-not-allowed'} transition-all ease-in-out duration-300`}>Donate</button>
                    </div>
                    {step == 1 ? <>
                    <span className='text-xl'>Select an Amount</span>
                    <input className="w-full mt-5 ring-1 ring-blue-500 rounded-lg py-2 px-2" type="number" value={donam} onChange={e=> setdonam(e.target.value)}/>
                    <p className='my-3'>Amount: <span className='font-bold text-xl text-blue-700'>{donam}$</span></p>
                    <center>
                        <button className="px-5 py-2 flex text-white bg-theme rounded-md disabled:bg-gray-600" disabled={donam<1} onClick={e=>setstep((p)=> p+1) }> <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg><span className='ml-2'>Donate</span></button>
                    </center>
                    </> :
                    <PayPalScriptProvider options={{ "client-id": "AUckiHkQHQv6Hc3Faq5LyeijgPTw10-per7oKOc2Pz8UR03KkHWlJpa24o_E1rTVC02TmtqAy7lDSbeP",currency:"USD"}}>
                        {donam>0 ? 
                            <>
                            <div className='w-96 flex items-center justify-center'>
                                <button className="px-5 py-2 flex text-white bg-theme rounded-md disabled:bg-gray-600 my-3" onClick={e=>setstep((p)=> p-1) }><svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M7 16l-4-4m0 0l4-4m-4 4h18" />
                                </svg><span className='ml-2'>Go Back</span></button>
                            </div>
                            <PayPalButtons style={{layout:'horizontal'}} disabled={!donam} createOrder={(data,actions,error)=>{
                            
                                return actions.order.create({
                                    intent:"CAPTURE",
                                    currency: "USD",
                                    purchase_units: [
                                        {
                                            description :"this is the tip",
                                            amount: {
                                                value: donam,
                                            },
                                        },
                                    ],
                                })
                            }}
                            onApprove={async(data,actions)=>{
                                const order= await actions.order.capture()
                                console.log(order) 
                                setdonam(0)
                            }}
                            onError={(err)=>{
                                console.log(err)
                            }}
                            /></> : null}
                        </PayPalScriptProvider>}
                        <center> 
                            <button onClick={e=> setdonopen(false)} className='px-7 py-2 mt-5 rounded-lg text-blue-200 bg-blue-500'>Close</button>
                        </center>
                </div>
            </div>
            <div className='md:pl-3 flex items-center justify-center flex-col md:justify-start md:items-start text-center md:text-left'>
            
                <h1 className='text-white uppercase text-2xl border-b-2 md:text-left text-center mt-10 md:mt-0 border-gray-600'>Contact Us</h1>
                <div className='mt-5'>
                    <p className='text-gray-400'>
                    {address}
                    </p>
  <a href={`tel:${phone}`} className='text-gray-400'>
    Phone: {phone}</a> <br/>
   <a className='text-gray-400' href={`mailto:${email}`}>Email: {email}</a> 
   <h1 className='text-white uppercase mt-5 text-lg'>tips are welcomed:</h1>
   <button className='rounded-full px-20 py-2  mt-3 transition-all duration-300 hover:bg-blue-800 text-white bg-blue-700' onClick={()=> setdonopen(!donopen)}>Paypal</button>
                </div>
            </div>
        </div>
    </div>
    <div className='bg-slate-700 md:p-5 p-3'>
        <center>
        <a className='text-white text-center text-sm'>© Copyright 2022 Bonaventure Services. All Rights Reserved | <Link to="privacy-policy">Privacy Policy</Link> 
</a>
<p className='text-gray-300 text-sm italic'>A Don and Durjoy Creation</p>
</center>
    </div>
    </>
  )
}

export default Footer