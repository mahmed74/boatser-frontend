import React from 'react'

const TestimonialCarouselItem = ({obj}) => {
  return (
    <div style={{height:'auto',display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center'}}>
        <center>
            <h1 className='text-white text-center my-20 italic text-3xl md:text-5xl'>"{obj.testimonial}"</h1>
            <p className='text-white text-center text-lg'>{obj.name}</p>
            <p className='text-center text-white text-md'>{obj.position}</p>
        </center>
    </div>
  )
}

export default TestimonialCarouselItem