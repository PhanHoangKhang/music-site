import React from 'react'
import { assets } from '../assets/assets'
import { Link, useNavigate } from 'react-router-dom'

const Navbar = () => {
  const navigate = useNavigate()
  return (
    <>
        <div className='flex justify-between items-center font-semibold w-full'>
            <div className='flex items-center gap-2'>
                <img onClick={() => navigate(-1)} className='w-8 bg-black p-2 
                rounded-2xl cursor-pointer' src={assets.arrow_left}></img>
                <img onClick={() => navigate(1)} className='w-8 bg-black p-2 
                rounded-2xl cursor-pointer' src={assets.arrow_right}></img>
            </div>

            <div>
              <Link to='/add-place'>Add music</Link>
            </div>
        </div>

        <div className='flex items-center gap-2 mt-4'>
            <p className='rounded-2xl bg-white text-black py-1 px-4'>All</p>
            <p className='rounded-2xl bg-black text-white py-1 px-4'>Music</p>
            <p className='rounded-2xl bg-black text-white py-1 px-4'>Podcast</p>
        </div>
    </>
  )
}

export default Navbar