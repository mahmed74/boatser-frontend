import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'

const TeamCard = ({icon,text,desc}) => {
  return (
    <div className='flex items-center my-7'>
        <FontAwesomeIcon icon={icon} className='p-3 mx-3 text-2xl text-white bg-theme rounded-full'/>
        <div>
            <p className='text-2xl font-bold text-theme uppercase'>{text}</p>
            <p className='text-gray-500 font-extralight mt-2'>{desc}</p>
        </div>
    </div>
  )
}

export default TeamCard