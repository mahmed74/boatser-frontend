import axios from 'axios'
import React, { useEffect, useState } from 'react'
import ShopCard from './ShopCard/ShopCard'
import apiurl from '../../apiurl'
import logo from '../../img/logo.svg'
const Shop = () => {
  const [mode, setmode] = useState(0)
  const [data, setdata] = useState([])
  const [cats, setcats] = useState(["product"])
  const [loaded, setloaded] = useState(false)
  const loadData = ()=>{
    axios.get(`${apiurl}products`).then((res)=>{
      setdata(res.data.result)
      let temp =[]
      res.data.result.map((v,i)=>{
        if(!temp.includes(v.cat)){
          temp.push(v.cat)
        }
      })
      setcats(temp)
      setloaded(true)
    }).catch((err)=> console.log(err))
  }
  useEffect(() => {
    loadData()
  }, [])
  
  return (
    <div>
      <div className={`${loaded ? 'loaded':'flex'} h-full w-full top-0 bottom-0 left-0 right-0 bg-white fixed items-center justify-center`}>
          <img src={logo} className="h-20 w-20" />
      </div>
      <h1 className='text-center text-black text-5xl my-5'>Shop</h1>
      <div className='w-full bg-theme flex items-center justify-center'>
        {cats.map((v,i)=> {
          return mode === i ?<button className='p-3 text-theme rounded-lg border-2 bg-white my-3 mx-1' onClick={()=> {setmode(i)}}>{v}</button> : <button className='p-3 text-white rounded-lg border-2 border-white my-3 mx-1' onClick={()=> {setmode(i)}}>{v}</button>
        })}

      </div>
      <div className='my-3 p-2 grid md:grid-cols-6 grid-cols-2 sm:grid-cols-2 xl:grid-cols-6'>
        {data.map((v,i)=>{
          if(v.cat === cats[mode]){
            return <ShopCard obj={v} key={i}/> 
          }
        })}
       
      </div>
    </div>
  )
}

export default Shop