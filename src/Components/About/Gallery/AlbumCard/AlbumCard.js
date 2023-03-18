import React from 'react'
import { Link } from 'react-router-dom'

const AlbumCard = ({obj}) => {
  return (
    <div className='m-2 rounded-md ring-1 ring-gray-400 flex md:block'>
        <img src={obj.thumb} className='w-auto p-10 md:p-0 h-44 md:h-auto md:w-full' alt="Couldn't load"/>
        <div className='m-2'>
            <p className='text-xl text-black'>{obj.title}</p>
            <p className='text-md text-gray-600'>{obj.sub}</p>
            <Link to={`/gallery/album/${obj._id}`}><button className='p-2 rounded-md text-white mt-3 bg-theme'>Open Album</button></Link> 
        </div>
    </div>
  )
}

export default AlbumCard