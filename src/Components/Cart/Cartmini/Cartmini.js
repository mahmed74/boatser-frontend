import { faTimes } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useContext, useEffect, useState } from 'react'
import Order from '../../../Contexts/Orders'
import apiurl from '../../../apiurl'
import axios from 'axios'
const Cartmini = ({obj,id }) => {
    const [amount, setamount] = useState(obj.amount)
    const [price, setprice] = useState(parseInt(obj.price))
    const cart = useContext(Order)
    const [initprice, setinitprice] = useState(0)

    useEffect(() => {
      axios.get(`${apiurl}products/${obj.id}`).then((res)=>{
        setinitprice(parseInt(res.data.result.price))
      }).catch((err)=> console.log(err))
    }, [])
    
    const closeproduct = ()=>{
        cart.setcart(cart.cart.filter((v,i)=> v.index!==obj.index))
    }
    useEffect(() => {
       cart.cart[id].amount = amount
    }, [amount])

    useEffect(() => {
      cart.cart[id].price = price
    }, [price])

    const incAmount = ()=>{
      setamount(amount+1)
      setprice(price+initprice)
    }
    const decAmount = ()=>{
      setamount(amount-1)
      setprice(price-initprice)
    }

    
    
  return (
    <div className='p-3 flex'>
        <img src={obj.thumb} className="h-auto w-20 mr-3" alt="Loading...."/>
        <div>
            <p className='text-lg'>{obj.name}</p>
            <p className='text-sm'>{price}$</p>
            <div className='flex items-center mt-3'>
                    <button className='p-1 text-sm bg-theme text-white' onClick={incAmount}>+</button>
                    <p className='p-2 text-sm'>{amount}</p>
                    <button className='p-1 text-sm bg-theme text-white' onClick={e=> amount>1 ? decAmount() : null}>-</button>
            </div>
        </div>
        <FontAwesomeIcon className='m-2 mx-3' onClick={closeproduct} fontSize={20} icon={faTimes}/>
    </div>
  )
}

export default Cartmini