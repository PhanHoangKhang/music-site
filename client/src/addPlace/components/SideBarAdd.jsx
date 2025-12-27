import React from 'react'
import { assets } from '../../assets/assets'
import { useNavigate } from 'react-router-dom'

const SideBarAdd = () => {
    const navigate = useNavigate()
    
  return (
    <>
        <div className='w-[25%] flex-col h-full p-2 gap-2 text-white hidden lg:flex mt-10'>
            <div className='rounded flex flex-col gap-5 w-full'>
                <div onClick={() => navigate('/')} 
                className='bg-[#121212] w-full flex items-center gap-3 cursor-pointer pl-8 hover:bg-[#242424] py-4'>
                    <img src={assets.add_song} className='w-6' alt=''></img>
                    <p className='font-bold'>Home Page</p>
                </div>
                
                <div onClick={() => navigate('/add-place/add-song')} 
                className='bg-[#121212] w-full flex items-center gap-3 cursor-pointer pl-8 hover:bg-[#242424] py-4'>
                    <img src={assets.add_song} className='w-6' alt=''></img>
                    <p className='font-bold'>Add Song</p>
                </div>

                <div onClick={() => navigate('/add-place/song-list')} 
                className='bg-[#121212] w-full flex items-center gap-3 cursor-pointer pl-8 hover:bg-[#242424] py-4'>
                    <img src={assets.add_song} className='w-6' alt=''></img>
                    <p className='font-bold'>Song list</p>
                </div>

                <div onClick={() => navigate('/add-place/addalbum')} 
                className='bg-[#121212] w-full flex items-center gap-3 cursor-pointer pl-8 py-4 hover:bg-[#242424]'>
                    <img src={assets.add_song} className='w-6' alt=''></img>
                    <p className='font-bold'>Add Album</p>
                </div>
            </div>
        </div>
    </>
  )
}

export default SideBarAdd