import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import AnimatedNumber from 'animated-number-react'
import apiurl from '../../apiurl'
import axios from 'axios'
import logo from '../../img/logo.svg'
const About = () => {
  const [act, setact] = useState(0)
  const [about, setabout] = useState('')
  const [toggle, settoggle] = useState([{title:"Example",desc:"Exaample"}])
  const [other, setother] = useState({
    user:0,
    projects:0,
    charters:0,
    testi:0
  }) 
  const [loaded, setloaded] = useState(false)
  useEffect(() => {
    window.scrollTo(0, 0)
    axios.get(`${apiurl}aboutpage`).then((res)=>{
      const target = res.data.result[0]
      setabout(target.about)
      
      setloaded(true)
      setother({
        user: target.user,
        projects:target.projects,
        charters:target.charters,
        testi:target.testi
      })
      settoggle(target.toggle)
    }).catch(err=> console.log(err))

  }, [])
  
  return (
    <div className='bg-sky-100 p-3 md:p-7'>
      <div className={`fixed ${loaded ? 'loaded':'flex'} top-0 left-0 right-0 bottom-0 bg-white items-center justify-center`}>
        <img src={logo} className="h-20 w-20"/>
      </div>
      <h1 className='text-center uppercase text-black font-bold text-4xl'>About Us</h1>
      <div className='mt-5 md:mt-10'>
        <p className='text-center md:mx-10 m-2 mt-5 text-gray-600 font-extralight'>{about}</p>
        <p className='text-center md:mx-10 m-2 mt-5 text-gray-600 font-extralight'>Fill out the <Link to="/periodic-checks" className='text-black font-bold underline-offset-4 underline'>Periodic Checks</Link> Form to create custom packages. Within 48hours, you will surely get a response. We provide daily, weekly, monthly or yearly reports, based on length of project or package plan.</p>
      </div>
      <div className='w-full flex items-center justify-center'>
        <Link to="/periodic-checks">
        <button className='uppercase text-md text-blue-600 border-2 border-blue-600 p-3 m-2
        tranisiton-all duration-300 hover:bg-blue-600 hover:text-white'>Periodic Checks</button>
        </Link>
        <Link to="/shop">
        <button className='uppercase text-md text-blue-600 border-2 border-blue-600 p-3 m-2
        tranisiton-all duration-300 hover:bg-blue-600 hover:text-white'>make a purchase</button>
        </Link>
      </div>
      <div className='p-3 mt-5 grid md:grid-cols-4 grid-cols-1 sm:grid-cols-2'>
        <div className='bg-sky-500 flex flex-col items-center justify-center rounded-lg p-2 m-2'>
        <AnimatedNumber className='text-white text-7xl font-bold'
          value={other.user}
          duration={3000}
          formatValue={(val)=> val.toFixed(0)}
          />           
          <p className='text-white text-md'>Users</p>
        </div>
        <div className='bg-sky-500 flex flex-col items-center justify-center rounded-lg p-2 m-2'>
        <AnimatedNumber className='text-white text-7xl font-bold'
          value={other.testi}
          duration={3000}
          formatValue={(val)=> val.toFixed(0)}
          />           
          <p className='text-white text-md'>Testimonials</p>
        </div>
        <div className='bg-sky-500 flex flex-col items-center justify-center rounded-lg p-2 m-2'>
          <AnimatedNumber className='text-white text-7xl font-bold'
          value={other.projects}
          duration={3000}
          formatValue={(val)=> val.toFixed(0)}
          />          
          <p className='text-white text-md'>Projects Done</p>
        </div>
        <div className='bg-sky-500 flex flex-col items-center justify-center rounded-lg p-2 m-2'>
        <AnimatedNumber className='text-white text-7xl font-bold'
          value={other.charters}
          duration={3000}
          formatValue={(val)=> val.toFixed(0)}
          />           
          <p className='text-white text-md'>Charters</p>
        </div>
        
      </div>
      <p className='text-center text-md text-gray-600 my-5'>Bonaventure Yacht Services prides itself in offering a full spectrum of services <br/> to help boat owners and individuals and companies.</p>
      <div className='flex items-center justify-center mt-10'>
      {toggle.map((v,i)=>{
        return <button className='text-blue-600 border-2 border-blue-600 p-3 focus:bg-blue-600 focus:text-white transition-all duration-150 ease-in-out rounded-lg m-2' onClick={()=> setact(i)}>{v.title}</button>
      })}
     
      </div>
      <p className='text-gray-600 my-5 m-3'>{toggle[act].desc}</p>
    </div>
  )
}

export default About