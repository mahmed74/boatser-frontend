import React, {useState } from 'react'
import Categories from './Categories/Categories'
import VideoList from './VideoList/VideoList'
import logo from '../../img/logo.svg'
const Videos = () => {
    const [selected, setselected] = useState(1)
    const [loaded, setloaded] = useState(0)
    
  return (
    <div>
        <div className={`fixed ${loaded>=1 ? 'loaded':'flex'} top-0 left-0 right-0 bottom-0 bg-white items-center justify-center`}>
        <img src={logo} className="h-20 w-20"/>
      </div>
        <div>
            <div className='flex w-full items-center justify-center my-3'>
                <button className={`px-3 py-2 mx-2 rounded-full ring-1 ring-blue-600 text-blue-600 transition-all ease-in-out duration-300 ${selected===1?'bg-blue-600 text-white':null}`} onClick={e=> setselected(1)}>Videos</button>
                <button className={`px-3 py-2 mx-2 rounded-full ring-1 ring-blue-600 text-blue-600 transition-all ease-in-out duration-300 ${selected===2?'bg-blue-600 text-white':null}`} onClick={e=> setselected(2)}>Categories</button>
            </div>
            <div className='mt-5'>
                {selected === 1 ? <VideoList setloaded={setloaded}/> : <Categories setloaded={setloaded}/>}
            </div>
        </div>
    </div>
  )
}

export default Videos