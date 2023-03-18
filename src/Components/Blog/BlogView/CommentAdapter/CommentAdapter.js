import React from 'react'

const CommentAdapter = ({obj}) => {
  return (
    <div className='border-b-2 border-gray-300 p-2'>
        <p className='text-theme text-lg'>{obj.name}</p>
        <p className='text-gray-600 mt-2'>{obj.comment}</p>
        <p className='text-right text-gray-600'>Commented on: {obj.date}</p>
    </div>
  )
}

export default CommentAdapter