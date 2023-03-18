import React, { useState } from 'react'
import CartContext from './Orders'
const Cartstate = (props) => {
    const [cart, setcart] = useState([])
  return (
    <CartContext.Provider value={{cart,setcart}}>
        {props.children}
    </CartContext.Provider>
  )
}

export default Cartstate