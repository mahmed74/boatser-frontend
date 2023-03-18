import { faArrowLeft, faCartPlus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import axios from 'axios'
import { getAuth } from 'firebase/auth'
import React, { useContext, useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import apiurl from '../../../apiurl'
import CommentAdapter from '../../Blog/BlogView/CommentAdapter/CommentAdapter'
import Order from '../../../Contexts/Orders'
const ProductPage = () => {
    const [data, setdata] = useState('')
    const [amount, setamount] = useState(1)
    const [mycomment, setmycomment] = useState('')
    const [myuser, setmyuser] = useState('')
    const {id} = useParams()
    const cart = useContext(Order)
    const loadData = ()=>{
        axios.get(`${apiurl}products/${id}`).then((res)=>{
            setdata(res.data.result)
        }).catch((err)=>{
            console.log(err)
        })
        axios.get(`${apiurl}users/${getAuth().currentUser ? getAuth().currentUser.uid : null}`).then((res)=>{
            setmyuser(res.data.result)
        })
    }
    useEffect(() => {
      loadData()
      if(getAuth().currentUser === null){
      //  router('/')
      }
    }, [])
    
    const pushComments = ()=>{
        const date = new Date()
        axios.patch(`${apiurl}products`,{
            Headers:{
                'Content-type':'application/json'
            },
            _id:id,
            comment:[...data.comment,{name:myuser.displayName,comment:mycomment,date:`${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`}]
        }).then((res)=>{
            if(res.status===200){
            setmycomment('')
            alert('comment posted...')
            }
            loadData()
        }).catch((err)=>{
            console.log(err)
        })
    }

    const addtoCart=()=>{
        if(!cart.cart.includes(data)){
            cart.setcart([...cart.cart,{id:data._id,name:data.name,cat:data.cat,thumb:data.thumb,price:data.price,amount,index:cart.cart.length}])
            setamount(1)
        }
    }

  return (
    <div>
        <Link to="/shop"><button className='text-white bg-theme py-2 px-5 my-2 mx-2 shadow-md shadow-black rounded-md'><FontAwesomeIcon icon={faArrowLeft} className='text-white'/> Go Back</button></Link>
        <div className='grid grid-cols-1 md:grid-cols-2'>
            <img className='p-3 ring-1 ring-gray-300 w-full' src={data ? data.thumb:null} alt={data? data.name:'No photo to show'}/>
            <div className='md:ml-5 flex justify-center flex-col'>
                <h1 className='text-5xl font-bold text-theme'>{data? data.name:null}</h1>
                <div className='flex items-center mt-3'>
                    <p>Amount:</p>
                    <button className='ml-3 p-2 text-2xl' onClick={e=> setamount(amount+1)}>+</button>
                    <p className='p-2 text-2xl'>{amount}</p>
                    <button className='p-1 text-3xl' onClick={e=> amount>1 ? setamount(amount-1) : null}>-</button>
                </div>
                <button className='p-2 my-5 float-right text-white bg-theme rounded-md' onClick={addtoCart}>Add to Cart <FontAwesomeIcon icon={faCartPlus}/></button>
            </div>
        </div>
        <div className='p-2'>
            <p className='text-gray-600'>{data? data.desc: null}</p>
            <p className='text-xl text-black my-5'>Comments</p>
            <div>
                {myuser!==null ?
                <>
            <p className='my-1 text-gray-600'>Comment as : {myuser.displayName}</p>
            <textarea inputMode='text'
                placeholder='Your comment here...'
                className='w-full p-2 ring-1 ring-gray-600 rounded-md'
                value={mycomment}
                onChange={e=> setmycomment(e.target.value)}
                rows={3}/>
                <center>
                    <button disabled={!mycomment} onClick={pushComments} className='text-white px-5 py-2 mt-3 disabled:bg-gray-600 bg-theme rounded-md shadow-sm shadow-black'>Post comment</button>
                </center></> :  <div className='flex flex-col items-center justify-center'>
                <p className='text-gray-600'>You should be logged in to give a review</p>
                <Link to="/login">
                    <button className='px-5 py-2 bg-theme rounded-md text-white shadow-sm shadow-black my-2'>
                        Login
                    </button>
                </Link>
                    </div>}
            </div>
            {data ? (data.comment.length>0 ? data.comment.map((v,i)=>{
                return <CommentAdapter obj={v} key={i}/>
            }):<p className='text-center text-gray-600'>No comment to show</p>):null}
        </div>
    </div>
  )
}

export default ProductPage