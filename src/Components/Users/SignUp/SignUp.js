import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import account from '../../../img/account.png'
import {getAuth,createUserWithEmailAndPassword} from 'firebase/auth'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import app from '../../../fireconf'
import apiurl from '../../../apiurl'
const SignUp = () => {
  const [fname, setfname] = useState()
  const [lname, setlname] = useState()
  const [username, setusername] = useState()
  const [email, setemail] = useState('')
  const [phone, setphone] = useState()
  const [password, setpassword] = useState('')
  const [custext, setcustext] = useState('')
  const [cusopen, setcusopen] = useState(false)
  const router = useNavigate()
  const cusal = (v)=>{
    setcusopen(true)
    setcustext(v)
  }
  useEffect(() => {
    window.scrollTo(0, 0)
    if(getAuth().currentUser != null){
      router(`/profile/${getAuth().currentUser.uid}`)
    }
  }, [])
  
  const createUser = ()=>{
    if(!email.includes('@')){
      cusal('Please Provide a valid email address')
    }
    else if(password.length<6){
      cusal('Password Must contain more than 6 characters')
    }
    else{
      createUserWithEmailAndPassword(getAuth(app),email,password).then((user)=>{
        axios.post(`${apiurl}users`,{
          Headers:{
            'Content-Type':'application/json'
          },
          displayName: `${fname} ${lname}`,
          username,
          email,
          phone,
          uid:user.user.uid
        }).then((res)=>{
          if(res.status===200){
          cusal(`Congratulations ${fname}, Your account has been created Successfully`)
          setemail('')
          setfname('')
          setlname('')
          setpassword('')
          setphone('')
          setusername('')
          setTimeout(() => {
            router(`/profile/${user.user.uid}`)
          }, 2000);
          }
        }).catch((err)=>{
          cusal(err.message)
        })
      }).catch((err)=>{
        cusal(err.message)
      })
    }
  }
  return (
    <div className='m-3 md:p-10 ring-1 ring-gray-400 rounded-md'>
     {cusopen ?<div className='fixed top-0 bottom-0 left-0 right-0 bg-black bg-opacity-20 flex items-center justify-center'>
        <div className='bg-white rounded-md p-3'>
          <h1 className='text-center text-theme text-xl font-bold'>{custext}</h1>
          <center><button onClick={e => setcusopen(false)} className="text-white bg-blue-700 px-3 py-2 mt-3 rounded-md shadow-black shadow-sm">Close</button></center>
        </div>
      </div>: null}
      <div className='grid md:grid-cols-6 grid-cols-1'>
        <div className='flex items-center justify-center col-span-2'>
          <img src={account} className='md:w-60 w-52 md:my-0 my-3 h-50 md:m-10'/>
        </div>
  
      <div className='grid md:grid-cols-12 grid-cols-1 p-3 col-span-4'>
        <p className='text-center col-span-12 text-theme uppercase text-3xl'>Sign Up</p>
        <div className='col-span-12 md:col-span-6 p-2'><input type="text" className='ring-1 ring-gray-400 w-full  rounded-md p-2' value={fname} onChange={(e)=> setfname(e.target.value)} placeholder='First Name'/></div>
        <div className='col-span-12 md:col-span-6 p-2'><input type="text" className='ring-1 ring-gray-400 w-full  rounded-md p-2' value={lname} onChange={(e)=> setlname(e.target.value)} placeholder="Last Name"/></div>
        <div className='col-span-12 md:col-span-6 p-2'><input type="text" className='ring-1 ring-gray-400 w-full  rounded-md p-2' value={username} onChange={(e)=> setusername(e.target.value)} placeholder='User Name'/></div>
        <div className='col-span-12 md:col-span-6 p-2'><input type="email" className='ring-1 ring-gray-400 w-full rounded-md p-2' value={email} onChange={(e)=> setemail(e.target.value)} placeholder='Email'/></div>
        <div className='col-span-12 md:col-span-6 p-2'><input type="tel" className='ring-1 ring-gray-400 w-full col-span-5 rounded-md p-2' value={phone} onChange={(e)=> setphone(e.target.value)} placeholder='Phone Number'/></div>
        <div className='col-span-12 md:col-span-6 p-2'><input type="password" className='ring-1 ring-gray-400 w-full col-span-5 rounded-md p-2' value={password} onChange={(e)=> setpassword(e.target.value)} placeholder='Password'/></div>
        <div className='col-span-12 md:col-span-12 flex items-center justify-center my-2'><button disabled={!fname || !lname ||!username || !email || !phone || !password} className='rounded-md p-3 disabled:bg-gray-400 text-white bg-theme' onClick={createUser}>Create Account</button></div> 
        <div className='col-span-12 md:col-span-12'>
        <center>
          <p className='text-gray-600 text-sm'>Already Have An Account?</p>
          <Link to="/login"><p className='text-lg  text-theme'>Login</p></Link>
        </center>
        </div>
      </div>
      </div>
    </div>
  )
}

export default SignUp