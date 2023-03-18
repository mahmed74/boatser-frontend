import React, { useEffect, useState } from 'react'
import {faPhone, faEnvelope, faLocation} from '@fortawesome/free-solid-svg-icons'
import TeamCard from './TeamCard/TeamCard'
import ContactForm from './ContactForm/ContactForm'
import axios from 'axios'
import apiurl from '../../apiurl'
import logo from '../../img/logo.svg'
const Contact = () => {
  const [contdata, setcontdata] = useState({})
  const [loaded, setloaded] = useState(false)
  useEffect(() => {
    axios.get(`${apiurl}sitedata`).then((res)=>{
      setcontdata(res.data.result[0])
      setloaded(true)
    }).catch(err => console.log(err))
  }, [])
  
  return (
    <div className='pt-5 bg-sky-100'>
      <div className={`fixed ${loaded ? 'loaded':'flex'} top-0 left-0 right-0 bottom-0 bg-white items-center justify-center`}>
        <img src={logo} className="h-20 w-20"/>
      </div>
      <h1 className='text-center uppercase text-black text-3xl md:text-5xl my-3 font-bold'>contact us</h1>
      <div className='grid md:grid-cols-3 grid-cols-1 sm:grid-cols-2 mt-3'>
        <div className='p-3 md:p-5'>
          <p className='text-2xl uppercase font-bold text-blue-900'>contact our experienced team</p>
          <p className='text-gray-500'>We love hearing from you, our customers. Let us know your queries, needed support and interests.</p>
          <TeamCard icon={faLocation} text="address" desc={contdata.address}/>
          <TeamCard icon={faPhone} text="phone" desc={contdata.phone}/>
          <TeamCard icon={faEnvelope} text="email " desc={contdata.email}/>
        </div>
        <div className='col-span-2'>
        <ContactForm/>
        </div>
      </div>
      <iframe src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d495363.7160696565!2d-60.947779!3d14.075463!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8c40429b610146a1%3A0xd7ae5a2f4253962!2sRodney%20Bay%20Marina%2C%20St%20Lucia!5e0!3m2!1sen!2sus!4v1649188561845!5m2!1sen!2sus" width="100%" height="450" style={{border:0}} allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
    </div>
  )
}

export default Contact