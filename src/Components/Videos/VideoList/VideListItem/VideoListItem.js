import React from 'react'
import { Link } from 'react-router-dom'
import logo from '../../../../img/logo.svg'

const VideoListItem = ({data}) => {
  return (
    <Link to={`/videos/${data._id}`}>
    <div className='flex mx-2 md:mx-5 p-3 my-1 ring-1 ring-gray-400 rounded-md items-center cursor-pointer'>
        <img src={logo} alt='Nothing' className='h-20'/>
        <p className='ml-3 text-xl text-blue-900'>{data.name}</p>
    </div>
    </Link>
  )
}

export default VideoListItem