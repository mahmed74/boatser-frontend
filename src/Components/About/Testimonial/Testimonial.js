import React, { useEffect } from 'react'
import TestimonialCarousel from './TestimonialCarousel/TestimonialCarousel'
import TestimonialUpload from './TestiMonialUpload/TestimonialUpload'
import logo from '../../../img/logo.svg'
import { useState } from 'react'
const Testimonial = () => {
  const [loaded, setloaded] = useState(false)
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])
  
  return (
    <div>
      <div className={`fixed ${loaded ? 'loaded':'flex'} top-0 left-0 right-0 bottom-0 bg-white items-center justify-center`}>
        <img src={logo} className="h-20 w-20"/>
      </div>
      <h1 className='text-center text-blue-600 text-5xl  mt-5'>Client's Testimonial</h1>
      <TestimonialCarousel setloaded={setloaded}/>
      <TestimonialUpload/>
    </div>
  )
}

export default Testimonial