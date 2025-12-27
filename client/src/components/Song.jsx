import React, { useContext } from 'react'
import { PlayerContext } from '../context/PlayerContext'

const Song = ({id, image, name, artist}) => {

  const {playWithId} = useContext(PlayerContext)
  
  return (
    <div onClick={() => playWithId(id)} className='min-w-[180px] p-2 px-3 rounded cursor-pointer hover:bg-[#242424]'>
        <img src={image} className='rounded' alt=''></img>
        <p className='font-bold mt-2'>{name}</p>
        <p className='text-gray-400 text-sm'>{artist}</p>
    </div>
  )
}

export default Song
