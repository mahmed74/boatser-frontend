import React, { useEffect, useState } from 'react'
import Lightbox from 'react-image-lightbox';
import Masonry from 'react-masonry-css';
import 'react-image-lightbox/style.css';
import { Link, useParams } from 'react-router-dom';
import apiurl from '../../../../apiurl'
import axios from 'axios';


const GalleryPhotos = () => {
    const [ind, setind] = useState(0)
    const [open, setopen] = useState(false)
    let {id} = useParams()
    const [data, setdata] = useState([])
    useEffect(() => {
      axios.get(`${apiurl}gallery/album/${id}`).then((res)=>{
        setdata(res.data.result.elems)
      }).catch((err)=>{
        console.log(err)
      })
    }, [])
  return (
    <div>
    <div className='p-3 md:px-20'>
      <Link to="/gallery"><button className='flex text-white bg-theme py-2 px-5 rounded-md'>
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mx-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
       <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
       </svg>Back to Gallery</button></Link>
      <Masonry
      breakpointCols={{default: 4,
        1100: 3,
        700: 2,
        500: 1}}
      className="my-masonry-grid"
      columnClassName="my-masonry-grid_column">
      {data.map((v,i)=> v.type === "Image" ? <img src={v.url} className='py-3' onClick={()=> {setind(i); setopen(!open)}}/> : <video autoPlay={false} controls src={v.url}/>)}
    </Masonry>
    </div>
      {open ? <Lightbox mainSrc={data[ind].url}
      imageCaption={data[ind].caption}
      imageTitle={'Image Viewer'}
      loader
      nextSrc={"https://static.remove.bg/remove-bg-web/588fbfdd2324490a4329d4ad22d1bd436e1d384a/s/start_remove-c851bdf8d3127a24e2d137a55b1b427378cd17385b01aec6e59d5d4b5f39d2ec.png"}
      prevSrc={data[(ind + data.length - 1) % data.length].url}
      onCloseRequest={() => setopen(!open)}
      onMovePrevRequest={() =>
        setind((ind + data.length - 1) % data.length)
      }
      onMoveNextRequest={() =>
        setind((ind + data.length + 1) % data.length)
      }/> : null}
    </div>
  )
}

export default GalleryPhotos