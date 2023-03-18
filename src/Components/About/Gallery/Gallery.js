import React, { useEffect, useState } from 'react'
import AlbumCard from './AlbumCard/AlbumCard'
import apiurl from '../../../apiurl'
import axios from 'axios'
const Gallery = () => {
  const [galarr, setgalarr] = useState([])
  useEffect(() => {
    window.scrollTo(0, 0)
      axios.get(`${apiurl}gallery`).then((res)=>{
        setgalarr(res.data.result)
      }).catch((err)=>{
        console.log(err)
      })
  }, [])
    
  return (
    <div className='bg-sky-100'>
      <h1 className='text-center text-5xl font-bold py-5' >Gallery</h1>
      <div className='grid md:grid-cols-4 p-2 md:p-5 grid-cols-1'>
        {galarr.map((v,i)=>{
          return <AlbumCard obj={v} key={i}/>
        })}
      </div>
    </div>
  )
}

export default Gallery