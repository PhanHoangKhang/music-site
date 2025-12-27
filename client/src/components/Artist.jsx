import React from 'react'
import { useNavigate } from 'react-router-dom'

const Artist = ({id, name, image}) => {
    const navigate = useNavigate()
  return (
    <div onClick={() => navigate(`/artist/${id}`)} className='min-w-[180px] p-2 px-3 rounded cursor-pointer hover:bg-[#242424]'>
        <img src={image} alt='' className='rounded w-40 h-40'></img>
        <p className='font-bold mt-2 text-white'>{name}</p>
    </div>
  )
}

export default Artist