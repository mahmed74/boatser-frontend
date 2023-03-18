import React from 'react'
import logo from '../../../../img/logo.svg'
const CatAdapter = ({data}) => {
  return (
    <div className='p-3 ring-1 ring-gray-400 transition-all ease-in-out duration-300 hover:ring-2 rounded-lg m-3'>
      <center>
      <img alt='Category Not Found' src={logo}/>
      </center>
      <p className='text-gray-600 text-xl text-center mt-2'>{data.name}</p>
    </div>
  )
}

export default CatAdapter