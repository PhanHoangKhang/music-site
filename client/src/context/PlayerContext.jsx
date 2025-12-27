import React, { createContext, useEffect, useRef, useState } from 'react'
import { songsData } from '../assets/assets'

export const PlayerContext = createContext()

const PlayerContextProvider = ({children}) => {
  const audioRef = useRef(null)
  const seekBg = useRef(null)
  const seekBar = useRef(null)
  const [track, setTrack ] = useState(songsData[0])
  const [playStatus, setPlayStatus] = useState(false)
  const [time, setTime] = useState({
    currentTime: {
      minute: 0,
      second: 0,
    },
    totalTime: {
      minute: 0,
      second: 0,
    }
  })

  const play = () => {
    audioRef.current.play()
    setPlayStatus(true)
  }

  const pause = () => {
    audioRef.current.pause()
    setPlayStatus(false)
  }

  const playWithId = async(id) => {
    await setTrack(songsData[id])
    audioRef.current.currentTime = 0
    await audioRef.current.play()
    setPlayStatus(true)
  }
 
  const playSongDbWithId = async(song) => {
    await setTrack(song)
    audioRef.current.currentTime = 0
    await audioRef.current.play()
    setPlayStatus(true)
  }

  const playPrevious = async() => {
    if (track.id > 0) {
      await setTrack(songsData[track.id - 1])
      await audioRef.current.play()
      setPlayStatus(true)
    } 
    else {
      await setTrack(songsData[songsData.length - 1])
      await audioRef.current.play()
      setPlayStatus(true)
    }
  }

  const playNext = async() => {
    if (track.id < songsData.length - 1) {
      await setTrack(songsData[track.id + 1])
      await audioRef.current.play()
      setPlayStatus(true)
    }
    else {
      await setTrack(songsData[0])
      await audioRef.current.play()
      setPlayStatus(true)
    }
  }

  const seekSong = async(e) => {
      audioRef.current.currentTime = ((e.nativeEvent.offsetX / seekBg.current.offsetWidth) * audioRef.current.duration)
  }

  useEffect(() => {
      setTimeout(() => {
          audioRef.current.ontimeupdate = () => {
            const progress = (audioRef.current.currentTime / audioRef.current.duration) * 100
            seekBar.current.style.width = `${progress}%`

              setTime({
                currentTime: {
                  minute: Math.floor(audioRef.current.currentTime / 60),
                  second: Math.floor(audioRef.current.currentTime % 60)
                },
                totalTime: {
                  minute: Math.floor(audioRef.current.duration / 60),
                  second: Math.floor(audioRef.current.duration % 60)
                }
              })
          }
      }, 1000)

  }, [audioRef])

  useEffect(() => {
    if (!audioRef.current) return;

    const audio = audioRef.current;

    // Reset audio when metadata is loaded (but don't autoplay)
    const handleLoaded = () => {
      audio.currentTime = 0;
    };

    // Auto-switch to next track when current ends
    const handleEnded = () => {
      let nextId = track.id + 1;
      if (nextId > songsData.length - 1) nextId = 0; // loop to first track
      const nextTrack = songsData[nextId];
      setTrack(nextTrack);
      // Play next track after it updates
      setTimeout(() => {
        audioRef.current.play();
        setPlayStatus(true);
      }, 0);
    };

    audio.addEventListener("loadedmetadata", handleLoaded);
    audio.addEventListener("ended", handleEnded);

    return () => {
      audio.removeEventListener("loadedmetadata", handleLoaded);
      audio.removeEventListener("ended", handleEnded);
    };
    
  }, [track]);

  const value = {
      audioRef,
      seekBar,
      seekBg,
      track, setTrack,
      playStatus, setPlayStatus,
      time, setTime,
      play, pause,  
      playWithId,
      playPrevious, playNext,
      seekSong,
      playSongDbWithId
  }

  return (
    <PlayerContext.Provider value={value}>
        {children}
    </PlayerContext.Provider>
  )
}

export default PlayerContextProvider

