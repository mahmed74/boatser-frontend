import React, { useEffect, useState } from 'react'
import BlogCard from './BlogCard/BlogCard'
import apirul from '../../apiurl'
import axios from 'axios'
import logo from '../../img/logo.svg'
const Blog = () => {
  const [blogs, setblogs] = useState([])
  const [cats, setcats] = useState([])
  const [mode, setmode] = useState(0)
  const [loaded, setloaded] = useState(false)
  const loadData = ()=>{
    axios.get(`${apirul}blog`).then((res)=>{
      setblogs(res.data.result)
        let temp =[]
        res.data.result.map((v,i)=>{
          if(!temp.includes(v.cat)){
            temp.push(v.cat)
        }
      })
      setcats(temp)
      setloaded(true)
    }).catch((err)=>{
      console.log(err)
    })
  }
  useEffect(() => {
    loadData()
  }, [])
  
  return (
    <div className='bg-sky-100'>
        <div className={`fixed ${loaded ? 'loaded':'flex'} top-0 left-0 right-0 bottom-0 bg-white items-center justify-center`}>
        <img src={logo} className="h-20 w-20"/>
      </div>
      <h1 className='text-center text-black font-bold uppercase text-5xl pt-5'>Blogs</h1>
      <div className='w-full bg-theme flex items-center justify-center'>
        {cats.map((v,i)=> {
          return mode === i ?<button className='p-3 text-theme rounded-lg border-2 bg-white my-3 mx-1' onClick={()=> {setmode(i)}}>{v}</button> : <button className='p-3 text-white rounded-lg border-2 border-white my-3 mx-1' onClick={()=> {setmode(i)}}>{v}</button>
        })}
      </div>
      <div className='grid md:grid-cols-4 grid-cols-1 sm:grid-cols-2 p-1'>
        {blogs.map((v,i)=>{
          if(v.cat === cats[mode]){
            return <BlogCard obj={v} key={i}/> 
          }
        })}
      </div>
    </div>
  )
}

export default Blog