import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAdd } from '@fortawesome/free-solid-svg-icons'
const CollapsedPrivacy = ({title,text}) => {
    const [open, setopen] = useState(false)
  return (
    <div className='ring-1 ring-gray-400 p-3 mt-2'>
      <div className='flex items-center cursor-pointer' onClick={()=> setopen(!open)}>
            <FontAwesomeIcon icon={faAdd}/>
            <p className='mx-4'>{title}</p>
      </div>
      {open ?  <div className='block  p-5 mt-3'>
     {text}
      </div> : <div></div>}
    </div>
  )
}

export default CollapsedPrivacy