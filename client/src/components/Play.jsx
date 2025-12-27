import React from 'react'
import { assets, songsData } from '../assets/assets'
import { useContext } from 'react'
import { PlayerContext } from '../context/PlayerContext'
import { useNavigate } from 'react-router-dom'

const Play = () => {
  const {track, playStatus, play, pause, playPrevious, playNext, time, seekBg, seekBar, seekSong} = useContext(PlayerContext)
    const navigate = useNavigate()

    const formatTime = (num) => {
        return num < 10 ? `0${num}` : num
    }

  return (
    <div className='h-[10%] bg-black flex items-center text-white px-4 pb-2 mb-2'>
        <div onClick={() => navigate(`/song/${track.id}`)} className='flex items-center gap-4 cursor-pointer 
        hover:bg-[#242424] p-3 rounded-sm'>
            <img className='w-12' src={track.image} alt=''></img>
            <div>
                <p className='font-bold text-md'>{track.name}</p>
                <p className='text-sm'>{track.artist.slice(0, 12)}</p>
            </div>
        </div>
        <div className='flex flex-col gap-1 items-center m-auto'>
            <div className='flex gap-4'>
                <img className='w-4 cursor-pointer' src={assets.shuffle_icon}></img>
                <img onClick={playPrevious} className='w-4 cursor-pointer' src={assets.prev_icon}></img>
                {playStatus
                ? <img onClick={pause} className="w-4 cursor-pointer" src={assets.pause_icon} />
                : <img onClick={play} className="w-4 cursor-pointer"  src={assets.play_icon} />
                }
                <img onClick={playNext} className='w-4 cursor-pointer' src={assets.next_icon}></img>
            </div>
            <div className='flex items-center gap-4'>
                <p>{formatTime(time.currentTime.minute)}:{formatTime(time.currentTime.second)}</p>
                <div ref={seekBg} onClick={seekSong} className='cursor-pointer w-[60vw] max-w-[500px] bg-white h-2 relative rounded-full'>
                    <div ref={seekBar} className='bg-green-500 h-2 border-none rounded-full w-0 absolute left-0 top-0'></div>
                </div>
                <p>{formatTime(time.totalTime.minute)}:{formatTime(time.totalTime.second)}</p>
            </div>
        </div>
    </div>
  )
}

export default Play