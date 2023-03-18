import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import banner from '../../../img/account.png'
import apiurl from '../../../apiurl'
import axios from 'axios'
import { getAuth,signInWithEmailAndPassword } from 'firebase/auth'
import { useNavigate } from 'react-router-dom'
const Login = () => {
  const [email , setemail ] = useState('')
  const [pass, setpass] = useState('')
  const [custext, setcustext] = useState('')
  const [cusopen, setcusopen] = useState(false)
  const router = useNavigate()
  const cusal = (v)=>{
    setcusopen(true)
    setcustext(v)
  }
  useEffect(() => {
    window.scrollTo(0, 0)
    if(getAuth().currentUser !== null){
      router(`/profile/${getAuth().currentUser.uid}`)
    }
  }, [])
  
  const login = ()=>{
    signInWithEmailAndPassword(getAuth(),email,pass).then((res)=>{
      console.log(res.user)
      axios.get(`${apiurl}users/${res.user.uid}`).then((result)=>{
        if(result.data.result == null){
          cusal('No user found with these Email/Password')
        }
        else{
          router(`/profile/${getAuth().currentUser.uid}`)
        }
      }).catch((err)=> console.log(err))
    }).catch((err)=>{
      cusal(err.message)
    })
  }
  return (
    <div className='flex flex-col items-center justify-center p-3 md:p-10'>
      {cusopen ?<div className='fixed top-0 bottom-0 left-0 right-0 bg-black bg-opacity-20 flex items-center justify-center'>
        <div className='bg-white rounded-md p-3'>
          <h1 className='text-center text-theme text-xl font-bold'>{custext}</h1>
          <center><button onClick={e => setcusopen(false)} className="text-white bg-blue-700 px-3 py-2 mt-3 rounded-md shadow-black shadow-sm">Close</button></center>
        </div>
      </div>: null}
      <div className='rounded-md ring-1 ring-gray-400 p-3 grid md:grid-cols-3 grid-cols-1 items-center'>
        <center>
        <img src={banner} className='w-40 h-40 md:m-20'/></center>
        <div className='col-span-2 flex flex-col items-center justify-center'>
          <p className='text-theme text-3xl uppercase'>Login</p>
          <p className='text-gray-400'>Login with your email and password</p>
          <div className='md:mt-5 mt-3 flex flex-col items-center justify-center'>
            <input type="email" value={email} onChange={(e)=> setemail(e.target.value)} required placeholder='E-mail' className='ring-1 ring-slate-700 p-3 rounded-md w-80 md:w-96'/> <br/>
            <input type="password" value={pass} onChange={(e)=> setpass(e.target.value)} required placeholder='Password' className='ring-1 ring-slate-700 p-3 rounded-md w-80 md:w-96 mt-3'/>
            <button onClick={login} disabled={!email.includes('@') || pass.length<6} className='py-2 px-5 transition-all duration-300 disabled:bg-gray-500 rounded-lg bg-theme text-white mt-3'>Login</button>
          </div>
          <p className='text-center mt-5 text-gray-600'>Don't have an account Yet?<br/><Link className='text-lg text-theme' to="/signup">Create a new Account</Link> </p>
        </div>
      </div>
    </div>
  )
}

export default Login