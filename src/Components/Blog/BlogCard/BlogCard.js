import React from 'react'
import { Link } from 'react-router-dom'

const BlogCard = ({obj}) => {
  return (
    <div className='p-2 m-1 bg-white rounded-lg flex'>
        <img src={obj.thumb}
        alt='Blog Image'
        className='w-full p-10 md:p-3 rounded-md flex-1'/>
        <div className='flex-1'>
        <h1 className='text-2xl font-bold my-2'>{obj.title}</h1>
        <p className='text-md text-gray-500'>{obj.desc.substr(0,17)}....</p>
        <p className='mt-3 font-extralight text-md text-theme'>Uploaded On: {obj.date}</p>
        <Link to={`/blogs/${obj._id}`}><button className='px-5 py-2 rounded-md bg-theme text-white mt-3'>Read Blog</button></Link>
        </div>
    </div>
  )
}

export default BlogCard