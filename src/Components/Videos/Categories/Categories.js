import React, { useEffect, useState } from 'react'
import CatAdapter from './CatAdapter/CatAdapter'
import apiurl from '../../../apiurl'
import axios from 'axios'

const Categories = () => {
  const [search, setsearch] = useState('')
  const [cats, setcats] = useState([])
  const [oarr, setoarr] = useState([])
  const loadData = ()=>{
      axios.get(`${apiurl}videos/cats`).then((res)=>{
        if(res.status===200){
          setcats(res.data.result)
          setoarr(res.data.result)
        }
      }).catch(err=> console.log(err))
  }
  useEffect(() => {
    loadData()
  }, [])
  useEffect(() => {
    if(search){
      setoarr(cats.filter(v=> String(v.name).toLowerCase().trim().includes(String(search).toLowerCase().trim())))
    }
    else{
      setoarr(cats)
    }
  }, [search])
  
  
  return (
    <>
    
    <p className='text-center text-3xl my-3 font-semibold uppercase'>Categories</p>
    <div className='flex justify-center'>
      <input placeholder='Search...' className='ring-1 ring-gray-400 px-5 py-3 w-full mx-5 md:w-1/4 rounded-md' value={search} onChange={e=> setsearch(e.target.value)} />
    </div>
    <div className='grid grid-cols-2 md:grid-cols-6'>
      {oarr && oarr.map((v,i)=> <CatAdapter data={v} key={i}/>)}
    </div>
    </>
  )
}

export default Categories