import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import axios from 'axios'
import { getAuth } from 'firebase/auth'
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import apiurl from '../../../apiurl'
import CommentAdapter from './CommentAdapter/CommentAdapter'
const BlogView = () => {
    const {id} = useParams()
    const [main, setmain] = useState({})
    const [user, setuser] = useState({})
    const [mycomment, setmycomment] = useState('')
    const [myuser, setmyuser] = useState('')
    const [comment, setcomment] = useState([])


    const loadData = ()=>{
        axios.get(`${apiurl}blog/${id}`).then((res)=>{
            setmain(res.data.result)
            setcomment(res.data.result.comment)
        }).catch((err)=>{
            console.log(err)
        })
        axios.get(`${apiurl}users/${main.author}`).then((res)=>{
            setuser(res.data.result)
            console.log(res.data.result)
        }).catch((err)=>{
            console.log(err)
        })
        axios.get(`${apiurl}users/${getAuth().currentUser ? getAuth().currentUser.uid : null}`).then((res)=>{
            setmyuser(res.data.result)
        })
    }
    useEffect(() => {
     loadData()
    }, [])
    
    const pushComments = ()=>{
        const date = new Date()
        axios.patch(`${apiurl}blog/${main._id}`,{
            Headers:{
                'Content-type':'application/json'
            },
            comment:[...main.comment,{name:myuser.displayName,comment:mycomment,date:`${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`}]
        }).then((res)=>{
            console.log(res.data)
            if(res.status===200){
            setmycomment('')
            alert('comment posted...')
            }
            loadData()
        }).catch((err)=>{
            console.log(err)
        })
    }


  return (
    <div>
        <Link to="/shop"><button className='text-white bg-theme py-2 px-5 my-2 mx-2 shadow-md shadow-black rounded-md'><FontAwesomeIcon icon={faArrowLeft} className='text-white'/> Go Back</button></Link>
        <center>
        <img src={main? main.thumb: null} alt="Not found...."/>
        </center>
        <h1 className='text-left m-3 text-black text-5xl'>{main? main.title : null}</h1>
        <p className='text-gray-800 my-3 mx-3'>Uploaded by: {user? user.displayName:null}</p>
        <p className='m-3'>{main ? main.desc : null}</p>

        <div className='mt-5'>
            <h1 className='m-2 text-black text-2xl'>Comments</h1>
            {getAuth().currentUser === null ? <div className='flex items-center justify-center flex-col'>
                <p className='text-gray-600'>You should be logged in to comment in blogs</p>
                <Link to="/login">
                    <button className='px-5 py-2 bg-theme rounded-md text-white shadow-sm shadow-black my-2'>
                        Login
                    </button>
                </Link>
            </div>:<div className='p-3'>
                <p className='my-1 text-gray-600'>Comment as : {myuser.displayName}</p>
                <textarea inputMode='text'
                placeholder='Your comment here...'
                className='w-full p-2 ring-1 ring-gray-600 rounded-md'
                value={mycomment}
                onChange={e=> setmycomment(e.target.value)}
                rows={3}/>
                <center>
                    <button disabled={!mycomment} onClick={pushComments} className='text-white px-5 py-2 mt-3 disabled:bg-gray-600 bg-theme rounded-md shadow-sm shadow-black'>Post comment</button>
                </center>
                </div>}
                
         {comment.length>1 ?  comment.map((v,i)=>{
              return <CommentAdapter obj={v}/>
          }) : <div>
          <p className='text-center text-gray-600'>No comments to show</p>
      </div> }
        </div>
    </div>
  )
}

export default BlogView