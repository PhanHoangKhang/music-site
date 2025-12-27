import React from 'react'
import { assets } from '../assets/assets'
import { useNavigate } from 'react-router-dom'

const Sidebar = () => {
    const navigate = useNavigate()
    
  return (
    <div className='w-[25%] flex-col h-full p-2 gap-2 text-white hidden lg:flex'>
        <div className='bg-[#121212] h-[15%] rounded flex flex-col justify-around'>
            <div onClick={() => navigate('/')} className='flex items-center gap-3 cursor-pointer pl-8 hover:bg-[#242424] py-4'>
                <img src={assets.home_icon} className='w-6' alt=''></img>
                <p className='font-bold'>Home</p>
            </div>

            <div onClick={() => navigate('/search')} className='flex items-center gap-3 cursor-pointer pl-8 py-4 hover:bg-[#242424]'>
                <img src={assets.search_icon} className='w-6' alt=''></img>
                <p className='font-bold'>Search</p>
            </div>
        </div>

        <div className='bg-[#121212] h-[85%] rounded'>
            <div className='flex justify-between items-center p-4'>
                <div className='flex items-center gap-3'>
                    <img src={assets.stack_icon} className='w-8' alt=''></img>
                    <p className='font-bold'>Library</p>
                </div>
            </div>
            <div className='bg-[#242424] p-4 m-2 rounded flex flex-col'>
                <h1 className='font-bold'>Create your playlist</h1>
                <button className='bg-white text-black rounded-full w-fit py-2 px-4 mt-4'>Create playlist</button>
            </div>

            <div className='bg-[#242424] p-4 m-2 rounded flex flex-col'>
                <h1 className='font-bold'>Find your podcast to follow</h1>
                <button className='bg-white text-black rounded-full w-fit py-2 px-4 mt-4'>Browse podcast</button>
            </div>
        </div>
    </div>
  )
}

export default Sidebar