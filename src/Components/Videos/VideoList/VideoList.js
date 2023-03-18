import React, { useEffect, useState } from 'react'
import VideoListItem from './VideListItem/VideoListItem'
import axios from 'axios'
import apiurl from '../../../apiurl'
const VideoList = ({setloaded}) => {
  const [search, setsearch] = useState('')
  const [mainarr, setmainarr] = useState([])
  const [oarr, setoarr] = useState([])
  useEffect(() => {
    setoarr(mainarr.filter((v,i)=> v.name.toLowerCase().includes(search.toLowerCase())))
  }, [search])

  useEffect(() => {
    axios.get(`${apiurl}videos`).then((data)=>{
      setmainarr(data.data.result)
      setloaded((p)=> p+1)
    }).catch((err)=> console.log(err))
  }, [])

  useEffect(() => {
    setoarr(mainarr)
  }, [mainarr])
  
  
  
  return (
    <div>
      <p className='text-center font-semibold text-3xl uppercase my-3'>Videos</p>
      <div className='flex items-center justify-center'>
        <input type="text" className='ring-1 ring-gray-400 px-5 py-3 rounded-md w-full mx-7 md:w-1/4' value={search} onChange={e=> setsearch(e.target.value)} placeholder='Search...' />
      </div>
      <div className='mt-5 h-50 scroll-m-10'>
        {oarr && oarr.map((v,i)=> <VideoListItem data={v} key={i}/>)}
      </div>
    </div>
  )
}

export default VideoList