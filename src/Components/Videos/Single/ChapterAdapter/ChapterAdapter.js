import React, { useState } from 'react'

const ChapterAdapter = ({data,player}) => {
  const [active, setactive] = useState(false)
  const gotoChapter = () =>{
    player.seekTo(data.start,'seconds')
  }
  setInterval(() => {
    if(player){
    if(player.getCurrentTime()>data.start && player.getCurrentTime()<data.last){
      setactive(true)
    }
    else{
      setactive(false)
    }
    }
  }, 100);
  return (
    <div className={`p-3 rounded-lg transition-all ease-in-out duration-300 cursor-pointer my-2 select-none ${active ? 'ring-1 bg-blue-600': 'ring-1 ring-gray-400'}`} onClick={gotoChapter}>
        <p className={`text-xl ${active ? 'text-white':'text-blue-600'}`}>{data.title}</p>
        <p className='text-sm mt-3 text-gray-400'>{Number(data.start/60).toFixed(0)}:{Number(data.start).toFixed()}</p>
    </div>
  )
}

export default ChapterAdapter