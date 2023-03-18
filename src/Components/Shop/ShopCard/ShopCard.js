import React, { useContext } from 'react'
import {faCartPlus} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useNavigate } from 'react-router-dom'
import Order from '../../../Contexts/Orders'
const ShopCard = ({obj}) => {
  const router = useNavigate()
  const cart = useContext(Order)
  const addtoCart=()=>{
    cart.setcart([...cart.cart,{id:obj._id,name:obj.name,cat:obj.cat,thumb:obj.thumb,price:obj.price,amount:1,index:cart.cart.length}])
  }
  return (
    <div className='border-2 border-gray-300 rounded-md m-2 md:flex md:items-baseline items-center md:flex-col'>
      {obj.sale ? <div className='bg-blue-800 -mt-40 md:-mt-5 -ml-3 text-white h-16 w-16 flex items-center justify-center rounded-full absolute'>Sale!</div> : null}
        <div className='flex-1'>
        <img src={obj.thumb} onClick={e=> router(`/shop/product/${obj._id}`)} alt='Couldnt load' className='h-full md:p-3 md:w-50'/></div> 
        <div className='m-2'>
            <h1 className='text-black md:text-xl text-sm'>{obj.name}</h1>
            <h1 className='md:text-xl text-xl text-theme'>{obj.price}$ </h1>
            <p className='md:text-md text-xs text-gray-500'>{obj.desc.substr(0,10)}...</p>
            <button className='p-2 my-5 float-right text-xs md:text-md text-white bg-theme rounded-md' onClick={addtoCart}>Add to Cart <FontAwesomeIcon icon={faCartPlus}/></button>
        </div>
    </div>
  )
}

export default ShopCard