import { faCheckCircle, faShoppingBag } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { PayPalButtons, PayPalScriptProvider } from '@paypal/react-paypal-js'
import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import Order from '../../Contexts/Orders'
import ProCheckCard from './ProCheckCard/ProCheckCard'
import apiurl from '../../apiurl'
import {v4 as uuid4} from 'uuid'
const Checkout = () => {
    const cart = useContext(Order)
    const [first, setfirst] = useState('')
    const [last, setlast] = useState('')
    const [address, setaddress] = useState('')
    const [email, setemail] = useState('')
    const [phone, setphone] = useState('')
    const [city, setcity] = useState('')
    const [status, setstatus] = useState(false)
    const [paypalName, setpaypalName] = useState('')
    const [paypalEmail, setpaypalEmail] = useState('')
    const [paypalAddress, setpaypalAddress] = useState('')
    const [paypalID, setpaypalID] = useState('random')
    const [done, setdone] = useState(false)
    const [total, settotal] = useState(0)
    useEffect(() => {
    settotal(0)
      cart.cart.map((v,i)=>{
          settotal((p)=> p+parseInt(v.price))
      })
    }, [])
   
    

    const placeOrder = async (method)=>{
        let date = new Date()
        
       await axios.post(`${apiurl}orders`,{
            Headers:{
                'Content-type':'application/json'
            },
            fullName:`${first} ${last}`,
            email:email,
            phone:phone,
            address:address,
            city:city,
            method,
            products:cart.cart,
            status,
            total,
            paypalName,
            paypalEmail,
            paypalAddress,
            time:`${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`,
            paypalID,
            orderID:uuid4()
        }).then((res)=>{
                console.log(res.data)
                setfirst('')
                setlast('')
                setemail('')
                setphone('')
                setaddress('')
                setcity('')
                setstatus(false)
                settotal('')
                cart.setcart([])
                setpaypalName('')
                setpaypalEmail('')
                setpaypalAddress('')
                setpaypalID('')
                setdone(true)
        }).catch((err)=>{
            console.log(err)
        })
    }

    useEffect(() => {
        if(status){
            placeOrder("PayPal").then(()=> setstatus(false)) 
        }
    }, [status])
    
  return (
    <div>
        {done ? <div className='fixed top-0 left-0 right-0 bottom-0 bg-black bg-opacity-30 flex items-center justify-center'>
            <div className='rounded-md p-3 bg-white m-3'>
                <center>
                    <FontAwesomeIcon icon={faCheckCircle} className="text-green-600" fontSize={100}/>
                    <p className='my-3'>We have received your order. Please check your Mail Inbox</p>
                    <button className='bg-theme py-2 px-5 rounded-md shadow-sm shadow-black text-white' onClick={e=> setdone(false)}>Okay</button>
                </center>
            </div>
        </div>:null}
        <p className='uppercase text-center text-black text-5xl my-3 font-bold'>checkout</p>
        <div className='grid grid-cols-1 md:grid-cols-3'>
            <div className='col-span-2'>
                <p className='col-span-2 text-center text-lg uppercase'>Fill The form to place order</p>
                <div className='grid grid-cols-1 md:grid-cols-2'>
                    <div className='p-2'>
                        <input type="text" placeholder='First Name' className='rounded-md p-2 ring-1 ring-gray-600 hover:ring-slate-900 w-full' value={first} onChange={e=> setfirst(e.target.value)}/>
                    </div>
                    <div className='p-2'>
                        <input type="text" placeholder='Last Name' className='rounded-md p-2 ring-1 ring-gray-600 hover:ring-slate-900 w-full' value={last} onChange={e=> setlast(e.target.value)}/>
                    </div>

                    <div className='p-2'>
                        <input type="email" placeholder='E-mail' className='rounded-md p-2 ring-1 ring-gray-600 hover:ring-slate-900 w-full' value={email} onChange={e=> setemail(e.target.value)}/>
                    </div>
                    <div className='p-2'>
                        <input type="tel" placeholder='Phone Number' className='rounded-md p-2 ring-1 ring-gray-600 hover:ring-slate-900 w-full' value={phone} onChange={e=> setphone(e.target.value)}/>
                    </div>
                    <div className='p-2'>
                        <input type="text" placeholder='Address' className='rounded-md p-2 ring-1 ring-gray-600 hover:ring-slate-900 w-full' value={address} onChange={e=> setaddress(e.target.value)}/>
                    </div>
                    <div className='p-2'>
                        <input type="text" placeholder='City' className='rounded-md p-2 ring-1 ring-gray-600 hover:ring-slate-900 w-full' value={city} onChange={e=> setcity(e.target.value)}/>
                    </div>
                    <div>
                    <div>
                    <p className='text-xl ml-2 mt-5'>Total : <span className='text-rose-600'>{total}$</span></p>
                    </div>
                    <p className='p-2 text-gray-600'>Payment Method:</p>
                    </div>
                    <div></div>
                    <div className='p-1'>
                        <button className='rounded-md bg-theme shadow-sm shadow-black px-5 py-2 text-white w-full disabled:bg-gray-600' disabled={!first || !last || !email.includes("@") || !phone || !city ||!address || total<1} onClick={e=> placeOrder("COD")}><FontAwesomeIcon icon={faShoppingBag} color="white"/> Cash on Delivery</button>
                    </div>
                    <div className='p-1'>
                        <PayPalScriptProvider options={{ "client-id": "AUckiHkQHQv6Hc3Faq5LyeijgPTw10-per7oKOc2Pz8UR03KkHWlJpa24o_E1rTVC02TmtqAy7lDSbeP",currency:"USD"}}>
                            <PayPalButtons style={{layout:'horizontal'}} disabled={!first || !last || !email.includes("@") || !phone ||!address || !city || total<1} createOrder={(data,actions,error)=>{
                                return actions.order.create({
                                    intent:"CAPTURE",
                                    purchase_units: [
                                        {
                                            description :"",
                                            amount: {
                                                value: total,
                                            },
                                        },
                                    ],
                                })
                            }}
                            onApprove={async(data,actions)=>{
                                const order= await actions.order.capture()
                                console.log(order) 
                                setpaypalID(order.payer.payer_id)
                                setpaypalName(`${order.payer.name.given_name} ${order.payer.name.surname}`)
                                setpaypalEmail(order.payer.email_address)
                                setstatus(true)      
                            }}
                            onError={(err)=>{
                                console.log(err)
                            }}
                            />
                        </PayPalScriptProvider>
                    </div>
                </div>
                
            </div>
            
            <div className='col-span-1'>
                <p className='text-center text-lg'>Ordered Products</p>
                {cart.cart.length<1 ? <div>
                    <p className='text-center text-gray-600'>No product added</p>
                </div>:cart.cart.map((v,i)=> {
                    return <ProCheckCard obj={v} key={i} id={i}/>
                })}
                <div>
                    <p className='text-xl text-right mr-2 mt-5'>Total : <span className='text-rose-600'>{total}$</span></p>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Checkout