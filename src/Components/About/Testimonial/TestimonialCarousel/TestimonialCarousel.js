import React, { useEffect, useState } from 'react'
import { Navigation, A11y } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import TestimonialCarouselItem from './TestimonialCarouselItem/TestimonialCarouselItem';
import apiurl from '../../../../apiurl'
import axios from 'axios'
const TestimonialCarousel = ({setloaded}) => {
  const [testi, settesti] = useState([])
  useEffect(() => {
    axios.get(`${apiurl}testimoinial`).then((res)=>{
      settesti(res.data.result.filter((v,i)=> v.approved))
      setloaded(true)
    }).catch((err)=> console.log(err))
  }, [])
  
  return (
    <div className='bg-blue-500 mt-5 text-white p-3 md:p-10'>
        <Swiper
            modules={[Navigation,A11y]}
            spaceBetween={50}
            slidesPerView={1}
            autoplay
            navigation
            loop={true}
            pagination={{ clickable: true }}>
              {testi.map((v,i)=> <SwiperSlide>
             <TestimonialCarouselItem obj={v}/>
            </SwiperSlide>)}
        </Swiper>
    </div>
  )
}

export default TestimonialCarousel