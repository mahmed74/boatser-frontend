import React, { useContext, useEffect, useState } from 'react'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import { faCartShopping,faPhone,faEnvelope} from '@fortawesome/free-solid-svg-icons'
import logo from '../../img/logo.svg'
import { Link } from 'react-router-dom'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import Cart from '../Cart/Cart'
import axios from 'axios'
import apiurl from '../../apiurl'
import Order from '../../Contexts/Orders'
import app from '../../fireconf'
const Navbar = () => {
  const [open, setopen] = useState(false)
  const [mainopen, setmainopen] = useState(false)
  const [cart, setcart] = useState(false)
  const [email, setemail] = useState('')
  const [phone, setphone] = useState('')
  const [auth, setauth] = useState({})
  const [user, setuser] = useState({})
  const [navarr, setnavarr] = useState([])
  const cartc = useContext(Order)
  useEffect(() => {
    getAuth(app).onAuthStateChanged((user)=>{
      setuser(user)
    })
    axios.get(`${apiurl}nav`).then((data)=>{
      setnavarr(data.data.result)
    }).catch((err)=>{
      console.log(err)
    })
    axios.get(`${apiurl}sitedata`).then((res)=>{
      const datas = res.data.result[0]
      setemail(datas.email)
      setphone(datas.phone)
    }).catch((err)=>{
      console.log(err)
    })
    if(user.currentUser === null || user.currentUser === undefined){
      setauth({})
      console.log('null')
    }
    else{
      axios.get(`${apiurl}users/${user.currentUser.uid}`).then((res)=>{
        setauth({name:res.data.result.displayName,uid:res.data.result.uid})
      }).catch((err)=>{
        console.log(err)
      }) 
    }
  }, [])
  
  return (
    <>
    <nav className='w-full shadow-md shadow-gray-400 bg-white z-50'>
      <div className='w-full bg-theme p-2 grid grid-cols-1 md:grid-cols-5 sm:grid-cols-4 items-start justify-start py-2'>
      <a href={`tel:${phone}`} className='text-white md:mx-10'><FontAwesomeIcon icon={faPhone} className="mx-2"/>{phone}</a>
      <a href={`mailto:${email}`} className='text-white'><FontAwesomeIcon icon={faEnvelope}  className="mx-2"/>{email}</a>
      </div>
      <div className='flex md:items-center flex-col md:flex-row items-start'>
      <Link to="/"><img src={logo} className='h-20 w-20 m-2 md:mx-10'/></Link> 
      <div className='absolute md:hidden right-2 mt-5' onClick={()=> setmainopen(!mainopen)}>
        {!mainopen ?<svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
      </svg> : <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
      </svg>}
      </div>
      {mainopen ? <ul className='list-none transition-all duration-300 ease-in-out flex flex-col ml-5 md:mt-1 md:flex-row md:absolute md:right-72 text-lg'>
        <Link onClick={()=> setmainopen(!mainopen)} to="/periodic-checks"><li className='md:mx-3 mt-5 md:mt-1 transition-all duration-300 ease-in-out hover:text-blue-600 active:text-blue-600'>Periodic Checks</li></Link> 
        <li className='md:mx-3 mt-5 md:mt-1 transition-all duration-300 ease-in-out hover:text-blue-600 active:text-blue-600'>
        <button onClick={()=> setopen(!open)} className="flex justify-between items-center py-2 pr-4 pl-3 w-full font-medium text-black  hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-theme md:p-0 md:w-auto dark:text-gray-900 dark:hover:text-black">About Us <svg class="ml-1 w-4 h-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg></button>
            {open ? <div className="absolute transition-all ease-in-out duration-300 visible z-10 w-44 bg-white rounded divide-y divide-gray-100 shadow dark:bg-slate-600 dark:divide-blue-900">
                <ul className="py-1 text-sm text-gray-700 dark:text-gray-400">
                  <li><Link onClick={()=> {setopen(!open); setmainopen(!mainopen)}} to="/about" className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-blue-800 dark:hover:text-white">About Us</Link></li>
                  <li><Link onClick={()=> {setopen(!open); setmainopen(!mainopen)}} to="/testimonial" className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-blue-800 dark:hover:text-white">Testimonial</Link></li>
                  <li><Link onClick={()=> {setopen(!open); setmainopen(!mainopen)}} to="/gallery" className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-blue-800 dark:hover:text-white">Gallery</Link></li>
                </ul>
            </div> :
            null}
        </li>
        {/* {navarr.map((v,i)=>{
          return <Link onClick={()=> setmainopen(!mainopen)} to={v.link}><li className='md:mx-3 mt-5 md:mt-1 transition-all duration-300 ease-in-out hover:text-blue-600 active:text-blue-600'>{v.title }</li></Link>
        })} */}
        <Link onClick={()=> setmainopen(!mainopen)} to="/shop"><li className='md:mx-3 mt-5 md:mt-1 transition-all duration-300 ease-in-out hover:text-blue-600 active:text-blue-600'>Shop</li></Link>
        <Link onClick={()=> setmainopen(!mainopen)} to="/blog"><li className='md:mx-3 mt-5 md:mt-1 transition-all duration-300 ease-in-out hover:text-blue-600 active:text-blue-600'>Blog</li></Link>
        <Link onClick={()=> {setmainopen(!mainopen); setopen(false)}} to="/videos"><li className='md:mx-3 mt-5 md:mt-1 transition-all duration-300 ease-in-out hover:text-blue-600 active:text-blue-600'>Videos</li></Link>
        <Link onClick={()=> {setmainopen(!mainopen); setopen(false)}} to="/contact"><li className='md:mx-3 mt-5 md:mt-1 transition-all duration-300 ease-in-out hover:text-blue-600 active:text-blue-600'>Contact Us</li></Link>
      </ul>:<ul className='list-none hidden transition-all duration-300 ease-in-out md:flex flex-col ml-5 md:mt-1 md:flex-row md:absolute md:right-72 text-lg'>
        <Link onClick={()=> {setmainopen(!mainopen); setopen(false)}} to="/periodic-checks"><li className='md:mx-3 mt-5 md:mt-1 transition-all duration-300 ease-in-out hover:text-blue-600 active:text-blue-600'>Periodic Checks</li></Link> 
        <li className='md:mx-3 mt-5 md:mt-1 transition-all duration-300 ease-in-out hover:text-blue-600 active:text-blue-600'>
        <button onClick={()=> setopen(!open)} className="flex justify-between items-center py-2 pr-4 pl-3 w-full font-medium text-black  hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-theme md:p-0 md:w-auto dark:text-gray-900 dark:hover:text-black">About Us <svg class="ml-1 w-4 h-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg></button>
            {open ? <div className="absolute transition-all ease-in-out duration-300 visible z-10 w-44 bg-white rounded divide-y divide-gray-100 shadow dark:bg-slate-600 dark:divide-blue-900">
                <ul className="py-1 text-sm text-gray-700 dark:text-gray-400">
                  <li><Link onClick={()=> {setopen(!open); setmainopen(!mainopen)}} to="/about" className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-blue-800 dark:hover:text-white">About Us</Link></li>
                  <li><Link onClick={()=> {setopen(!open); setmainopen(!mainopen)}} to="/testimonial" className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-blue-800 dark:hover:text-white">Testimonial</Link></li>
                  <li><Link onClick={()=> {setopen(!open); setmainopen(!mainopen)}} to="/gallery" className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-blue-800 dark:hover:text-white">Gallery</Link></li>
                </ul>
            </div> :
            null}
        </li>
        <Link onClick={()=> {setmainopen(!mainopen); setopen(false)}} to="/shop"><li className='md:mx-3 mt-5 md:mt-1 transition-all duration-300 ease-in-out hover:text-blue-600 active:text-blue-600'>Shop</li></Link>
        <Link onClick={()=> {setmainopen(!mainopen); setopen(false)}} to="/blog"><li className='md:mx-3 mt-5 md:mt-1 transition-all duration-300 ease-in-out hover:text-blue-600 active:text-blue-600'>Blog</li></Link>
        <Link onClick={()=> {setmainopen(!mainopen); setopen(false)}} to="/videos"><li className='md:mx-3 mt-5 md:mt-1 transition-all duration-300 ease-in-out hover:text-blue-600 active:text-blue-600'>Videos</li></Link>
        <Link onClick={()=> {setmainopen(!mainopen); setopen(false)}} to="/contact"><li className='md:mx-3 mt-5 md:mt-1 transition-all duration-300 ease-in-out hover:text-blue-600 active:text-blue-600'>Contact Us</li></Link>
      </ul>}
      {mainopen ? <div className='md:absolute right-5 w-full md:w-auto flex items-center justify-center md:items-center md:justify-end mt-3 md:mt-0'>
        <Link to={Object.values(auth).length>1 ?`profile/${auth.uid}`:'/login'} onClick={e=> {setmainopen(false); setopen(false)}}><button className='bg-theme rounded-md px-5 py-3 text-white uppercase transition-all duration-300 hover:bg-blue-900'>{Object.values(auth).length>1 ? auth.name:'Login | Signup'}</button></Link>
        <button className='cart'  onClick={()=> {setcart(!open)}}> {cartc.cart.length>0? <span>{cartc.cart.length}</span>:null} <FontAwesomeIcon icon={faCartShopping} className='text-xl mx-3 transition-all duration-300 hover:text-blue-900'/></button>
      </div>:<div className='md:absolute hidden right-5 w-full md:w-auto md:flex items-center justify-center md:items-center md:justify-end mt-3 md:mt-0'>
        <Link to={Object.values(auth).length>1 ?`profile/${auth.uid}`:'/login'} onClick={e=> {setmainopen(false); setopen(false)}}><button className='bg-theme rounded-md px-5 py-3 text-white uppercase transition-all duration-300 hover:bg-blue-900'>{Object.values(auth).length>1 ? auth.name:'Login | Signup'}</button></Link>
        <button  className='cart' onClick={()=> {setcart(!open)}}> {cartc.cart.length>0? <span>{cartc.cart.length}</span>:null} <FontAwesomeIcon icon={faCartShopping} className='text-xl mx-3 transition-all duration-300 hover:text-blue-900'/></button>
      </div>}
      </div>
    </nav>
    <Cart open={cart} setopen={setcart}/>
    </>
  )
}

export default Navbar