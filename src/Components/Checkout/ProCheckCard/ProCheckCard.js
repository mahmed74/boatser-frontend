import React, { useContext} from 'react'
import Order from '../../../Contexts/Orders'
const ProCheckCard = ({obj,id}) => {
    const cart = useContext(Order)
  return (
    <div className='flex items-center p-2 border-gray-300 border-b-2'>
        <img src={obj? obj.thumb : null} alt="Didn't get data" className='flex-2 h-20 w-auto'/>
        <div className='ml-2 items-end flex-1'>
            <p className='text-right text-lg text-theme'>{obj.name}</p>
            <p className='text-md text-right text-rose-600'>{obj.price}$</p>
           <p className='text-right text-sm text-gray-600'>Qty: {obj.amount}</p>
        </div>
    </div>
  )
}

export default ProCheckCard