import React, { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPhone, faEnvelope } from '@fortawesome/free-solid-svg-icons'
import BlogCard from '../../Blog/BlogCard/BlogCard'
import { getAuth } from 'firebase/auth'
import { useNavigate, useParams } from 'react-router-dom'
import apiurl from '../../../apiurl'
import axios from 'axios'
import logo from '../../../img/logo.svg'
const Profile = () => {
  const [show, setshow] = useState(true)
  const [btitle, setbtitle] = useState('')
  const [btext, setbtext] = useState('')
  const [bfile, setbfile] = useState('')
  const [cat, setcat] = useState([])
  const [blogs, setblogs] = useState([])
  const [user, setuser] = useState({})
  const [selcat, setselcat] = useState('')
  const [loaded, setloaded] = useState(false)
  const {id} = useParams()
  const router = useNavigate()

  const loadData = ()=>{
    axios.get(`${apiurl}blog`).then((res)=>{
      setblogs(res.data.result)
    }).catch((err)=>{
      console.log(err)
    })
    axios.get(`${apiurl}cats`).then((res)=>{
      setcat(res.data.result[1].cats)
    })
    if(getAuth().currentUser !== null){
    axios.get(`${apiurl}users/${getAuth().currentUser.uid}`).then((res)=>{
      setuser(res.data.result)
      setloaded(true)
    }).catch((err)=>{
      console.log(err)
    })
    }
    else{
      axios.get(`${apiurl}users/${id}`).then((res)=>{
        setuser(res.data.result)
      }).catch((err)=>{
        console.log(err)
      })
    }
  }
  useEffect(() => {
    window.scrollTo(0, 0)
    loadData()
  }, [])
  

  const logout = ()=>{
    getAuth().signOut().then(()=>{
      router(`/login`)
    }).catch((err)=>{
      alert(err.message)
    })
  }

  const uploadblog = async ()=>{
    let data = new FormData()
    data.append("avatar",bfile)
    const response = await axios({
        method: 'post',
        url: 'https://fileapi.byachtservices.com/upload.php',
        data: data,
        headers: {
            'Content-Type': `multipart/form-data; boundary=${data._boundary}`,
        },
    });
    if(response.status === 200){
      const date = new Date()
       axios.post(`${apiurl}blog`,{
      Headers:{
        'Content-type':'application/json'
      },
      title:btitle,
      desc:btext,
      thumb:`https://fileapi.byachtservices.com/image/${response.data.data}`,
      author:getAuth().currentUser.uid,
      comment:[],
      cat:selcat,
      date:`${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`
    }).then((res)=>{
      setbtitle('')
      setbtext('')
      setbfile('')
      loadData()
      alert('posted...')
    }).catch((err)=>{
      console.log(err)
    })
    }
   
  }
  
  
  return (
    <div>
      <div className={`fixed ${loaded ? 'loaded':'flex'} top-0 left-0 right-0 bottom-0 bg-white items-center justify-center`}>
        <img src={logo} className="h-20 w-20"/>
      </div>
      <div className='grid md:grid-cols-4 grid-cols-1 p-3'>
        <div className='border-r-2 border-gray-400 p-3'>
          <h1 className='text-2xl text-center text-theme'>{user ? user.displayName:null}</h1>
          {show ?<><ul className='md:visible ml-5 mt-5'>
            {getAuth().currentUser !== null ? (getAuth().currentUser.uid === id ? <li><FontAwesomeIcon icon={faPhone} className="mr-2"/>{user? user.phone:null}</li> : null):null}
            <li><FontAwesomeIcon icon={faEnvelope} className="mr-2"/>{user? user.email : null}</li>
          </ul><center> {getAuth().currentUser !==null ? (getAuth().currentUser.uid === id ? <button onClick={logout} className='mt-3 rounded-md bg-theme shadow-md text-white px-5 py-2 uppercase'>logout</button>:null):null}
           </center></> : null}
          <center>
            <button className='uppercase bg-theme text-white p-3 rounded-md mt-5 text-sm md:invisible isible' onClick={e => setshow(!show)}>
              {!show ? 'Show more details':'Hide extra details'}
            </button>
          </center>
        </div>
        <div className='col-span-3'>
          {getAuth().currentUser !== null ? (getAuth().currentUser.uid === id ? <><h1 className='text-center text-theme uppercase text-3xl my-3'>Write A Blog</h1>
          <center>
            <p className='text-gray-600 mb-3'>Selected Image: {bfile.name}</p>
            <label className='text-center px-5 py-2 bg-theme rounded-md shadow-sm shadow-black text-white'>Select a thumbnail<input type="file" hidden onChange={e=> setbfile(e.target.files[0])}/></label>
          </center>
          <input type="text" 
          placeholder='Here is the title....' 
          className='w-full ring-1 ring-gray-600 m-1 mt-5 rounded-md p-3 hover:ring-blue-600 my-2' 
          value={btitle} 
          onChange={e=> setbtitle(e.target.value)}/>
          <p className='text-gray-600'>Select Category:</p>
          <select className='p-2 m-2 ring-1 ring-slate-900 rounded-md w-full bg-slate-100'  onChange={e=> setselcat(e.target.value)}>
            {cat.map((v,i)=> <option value={v.key}>{v.display}</option>)}
          </select>
          <textarea type="text"
          placeholder='Here is the body...'
          className='w-full ring-1 ring-gray-600 m-1 rounded-md p-3 hover:ring-blue-600 my-2'
          value={btext}
          rows={10}
          onChange={e=> setbtext(e.target.value)}/>
          <p className='text-gray-600 px-2'>{btext.length} characters</p>
          <center>
            <button disabled={!btitle || !btext || !bfile || !selcat} onClick={uploadblog} className='bg-theme shadow-sm text-white px-5 py-2 rounded-md mb-10 disabled:bg-gray-600 disabled:cursor-not-allowed hover:bg-slate-900 shadow-black'>Post</button>
          </center></> :null):null}
          
          <h1 className='uppercase text-3xl text-theme text-center'>{getAuth().currentUser !== null ? (getAuth().currentUser.uid === id ? 'Your Blogs':`${user.displayName}'s Blogs`):`${user.displayName}'s Blogs`}</h1>
          <div className='grid md:grid-cols-3 grid-cols-1 sm:grid-cols-2'>
          {blogs.map((v,i)=>{
            if(v.author == id){
              return <BlogCard obj={v}/>
            }
            })}          
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile