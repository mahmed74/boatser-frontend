import React, { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import ReactPlayer from 'react-player'
import ChapterAdapter from './ChapterAdapter/ChapterAdapter'
import PlayCircleSharpIcon from '@mui/icons-material/PlayCircleSharp';
import PauseCircleFilledSharpIcon from '@mui/icons-material/PauseCircleFilledSharp';
import RepeatSharpIcon from '@mui/icons-material/RepeatSharp';
import RepeatOneSharpIcon from '@mui/icons-material/RepeatOneSharp';
import VolumeOffSharpIcon from '@mui/icons-material/VolumeOffSharp';
import VolumeUpSharpIcon from '@mui/icons-material/VolumeUpSharp';
import error from '../../../img/error.png'
import app from '../../../fireconf'
import {getAuth} from 'firebase/auth'
import { useParams } from 'react-router-dom';
import axios from 'axios'
import apiurl from '../../../apiurl'
import './style/Single.css'
import DoubleArrowSharp from '@mui/icons-material/DoubleArrowSharp';
const SingleVideo = () => {
  const [playing, setplaying] = useState(false)
  const [loop, setloop] = useState(false)
  const player = useRef()
  const bar = useRef()
  const seekPrev = useRef()
  const seekNext = useRef()
  const [progress, setprogress] = useState(0)
  const [duration, setduration] = useState(0)
  const [volume, setvolume] = useState(1)
  const [loggedIn, setloggedIn] = useState(true)
  const [data, setdata] = useState({})
  const param = useParams()

  const changeDuration = (durat)=>{
    setduration(durat)
  }
  const changeProgress = (prog)=>{
    setprogress(prog)
    bar.current.style.backgroundSize = (prog.playedSeconds-0)*100/(duration-0)+ '100%'
  }
  const seekNextTen = ()=>{
    if(player.current!=null){
      if(seekNext.current!=null){
        seekNext.current.classList.add('showSeek')
        setTimeout(() => {
          seekNext.current.classList.remove('showSeek')
        }, 500);
      }
      player.current.seekTo(player.current.getCurrentTime()+10,'seconds')
    }
  }
  const seekPrevTen = ()=>{
    if(player.current!=null){
      if(seekPrev.current!=null){
        seekPrev.current.classList.add('showSeek')
        setTimeout(() => {
          seekPrev.current.classList.remove('showSeek')
        }, 500);
      }
      player.current.seekTo(player.current.getCurrentTime()-10,'seconds')
    }
  }
  const setVolume = ()=>{
    if(volume === 1){
      setvolume(0)
    }
    else{
      setvolume(1)
    }
  }
  const setLoop = ()=>{
    setloop((p)=> !p)
  }
  useEffect(() => {
    window.scrollTo(0,0)
    axios.get(`${apiurl}videos/single/${param.id}`).then((data)=>{
      const result = data.data.result
      setdata(result)
      if(!result.public){
        getAuth(app).onAuthStateChanged((user)=>{
          if(!user){
              setloggedIn(false)
            }else{
              setloggedIn(true)
            }
        })
      }
    }).catch((err)=>{
      console.log(err)
    })
    console.log(param)
  
    bar.current.style.backgroundSize = '0% 100%'
    window.addEventListener('keydown',(event)=>{
      switch(event.key){
        case " ":
          setplaying((p)=> !p)
          break;
        case "ArrowLeft":
          seekPrevTen()
          break;
        case "ArrowRight":
          seekNextTen()
          break;
        case "m":
          setVolume()
          break;
      }
    })
  }, [])
  

  return (
    <>
     {!loggedIn ? <div className='fixed top-0 left-0 right-0 bottom-0 bg-black bg-opacity-30 flex items-center justify-center'>
            <div className='bg-white p-3 rounded-md'>
                <center>
                    <img src={error} className="h-20" alt='error'/>
                    <p className='text-red-600 text-xl'>Login is must to access this</p>
                    <p className='mt-2 text-gray-600'>Please Login to continue</p>
                    <Link to="/login">
                        <button className='bg-theme px-5 py-2 rounded-md text-white mt-3'>Login</button>
                    </Link>
                </center>
            </div>
            
        </div> : null}
    <Link to="/videos">
    <button className='py-2 px-4 bg-theme text-white mt-5 ml-3 rounded-md flex'><svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
  <path strokeLinecap="round" strokeLinejoin="round" d="M7 16l-4-4m0 0l4-4m-4 4h18" />
</svg>Go Back</button>
    </Link>
    <div className='flex flex-col lg:flex-row-reverse my-3'>
      <div className='p-3 flex-1'>
        <div className=''>
          <div className='-z-10'>
            {data &&
            <ReactPlayer 
            ref={player} 
            url={`${data.vid_url}`}
            playsinline 
            playing={playing} 
            loop={loop}
            onDuration={changeDuration}
            onProgress={changeProgress}
            volume={volume}
            width="100%"
            height="100%"
            />}
            <div className="flex">
              <div className='select-none flex items-center justify-center -mt-40 h-36 w-32 sm:w-72 sm:-mt-72 sm:h-64 absolute text-white' onDoubleClick={seekPrevTen}><div className='transition-all duration-700 ease-in-out opacity-0' ref={seekPrev}><DoubleArrowSharp style={{transform:'rotate(180deg)'}}/> 10s</div></div>
              <div className='select-none flex items-center justify-center -mt-40 right-3 h-36 w-32 sm:w-72 sm:-mt-72 sm:h-64 absolute text-white' onDoubleClick={seekNextTen}><div className='transition-all duration-700 ease-in-out opacity-0' ref={seekNext}>10s <DoubleArrowSharp/> </div></div>
            </div>
          </div>
        <div className='w-full flex bg-opacity-70 -mt-6 z-50'>
          <div className='bg-sky-600 bg-opacity-70 w-full flex px-3 items-center justify-center'>
          {/* Play Button */}
          <button className='text-white' onClick={e=> setplaying(!playing)}>{playing ? <PauseCircleFilledSharpIcon/> : <PlayCircleSharpIcon/>}</button>
         
          <div>
            <input type="range" step="0.001" min="0" max={duration} value={progress.playedSeconds} onChange={e=> player.current.seekTo(e.target.value,'second')} className="w-54 md:w-96 mx-1" ref={bar} />
          </div>
          <div>
          </div>
            <button className='text-white text-sm' onClick={setLoop}>{loop? <RepeatOneSharpIcon/> : <RepeatSharpIcon/>}</button>
            <button className='text-white' onClick={setVolume}>{volume===0 ? <VolumeOffSharpIcon/>: <VolumeUpSharpIcon/>}</button>
        </div>
        </div>
        </div>
      </div>
      <div className='p-3 flex-1'>
        <p className='text-center text-blue-600 uppercase text-xl'>Chapters</p>
        
        <div className='overflow-y-auto px-2 h-full'>
          {player.current!== null ?
          <>
          {data.chapters && data.chapters.map((v,i)=> <ChapterAdapter data={v} player={player.current} key={i}/>)}
          </> : null}
        </div>
      </div>
    </div>
    </>
  )
}

export default SingleVideo