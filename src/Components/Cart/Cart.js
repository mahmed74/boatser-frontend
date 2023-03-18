import { faTimes } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Order from '../../Contexts/Orders'
import Cartmini from './Cartmini/Cartmini'
const Cart = ({open, setopen}) => {
    useEffect(() => {
        if(open){
         setmargin('right-0')   
        }
        else{
            setmargin('-right-80')
        }
    }, [open])
    const cart = useContext(Order)
    
  const [margin, setmargin] = useState('right-0')

  
  return (
    <div className={`fixed h-full w-auto  bg-white transition-all duration-300 ease-in-out p-3 rounded-tl-lg rounded-bl-lg top-0 bottom-0 ${margin}`} style={{zIndex:9999999999999999999999999999999999}}>
       <div className='flex items-center'><h1 className='text-xl flex-1 mr-5'>Cart</h1><FontAwesomeIcon onClick={()=> setopen(!open)} icon={faTimes} className="text-2xl"/></div>
       <div className={`h-full flex flex-col ${cart.cart<1 ? 'justify-center items-center':'justify-start items-start'}`}>
         {Object.values(cart.cart).length<1 ? <div><p className='text-gray-400'>No Items to show</p></div>: <div className='overflow-y-scroll noscroll'>
           {cart.cart.map((v,i)=> <Cartmini obj={v} id={i} key={i}/>)}
           <div className='flex fixed bottom-2'>
             <button className='text-white bg-theme p-3 rounded-md shadow-sm flex-2 m-1 shadow-neutral-800' onClick={e=> cart.setcart([])}>Clear Cart</button>
             <Link to="/checkout"><button className='text-white bg-theme p-3 rounded-md shadow-sm flex-2 m-1 shadow-neutral-800'>Checkout</button></Link>
           </div>
           </div>}
       </div>
    </div>
  )
}

export default Cart