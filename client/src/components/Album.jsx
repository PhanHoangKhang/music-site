import React from 'react'
import { useNavigate } from 'react-router-dom'

const Album = ({id, image, name, desc}) => {

  const navigate = useNavigate()
  
  return (
    <div onClick={() => navigate(`/album/${id}`)} className='min-w-[180px] p-2 px-3 rounded cursor-pointer hover:bg-[#242424]'>
        <img src={image} className='rounded' alt=''></img>
        <p className='font-bold mt-2'>{name}</p>
        <p className='text-gray-400 text-sm'>{desc}</p>
    </div>
  )
}

export default Album