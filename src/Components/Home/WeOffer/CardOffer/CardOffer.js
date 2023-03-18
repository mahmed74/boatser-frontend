import React from 'react'

const CardOffer = ({title, decs, img}) => {
  return (
    <div className='bg-white p-3 rounded-lg shadow-md m-2 shadow-gray-500'>
      <center>
        <img src={img} className='h-20 w-20'/>
      </center>
        <h1 className='text-black text-bold text-2xl text-center'>{title}</h1>
        <p className='text-gray-500 m-2 text-justify'>{decs}</p>
    </div>
  )
}

export default CardOffer