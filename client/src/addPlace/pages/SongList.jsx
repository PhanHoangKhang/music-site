import React, { useContext } from 'react'
import { useState, useEffect, useRef } from 'react'
import { PlayerContext } from '../../context/PlayerContext'

const SongList = () => {
    const [songs, setSongs] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const { playSongDbWithId} = useContext(PlayerContext)

    useEffect(() => {
        setLoading(true);
        const fetchSongs = async () => {
            try {
                const res = await fetch("http://localhost:4000/song/list");
                const data = await res.json();

                if (data.success) {
                setSongs(data.songs);
                } else {
                setError("Failed to load songs");
                }
            } catch (err) {
                setError("Server error");
            } finally {
                setLoading(false);
            }
        };

        fetchSongs();
    }, [])

    if (loading) {
        return <p className="text-white text-center">Loading songs...</p>;
    }

    if (error) {
        return <p className="text-red-500 text-center">{error}</p>;
    }

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold text-white mb-6">
        🎵 Song List
      </h2>
      
        <div className="mt-10 flex flex-col gap-5">
          {songs.map((song, index) => (
              <div
                key={index}
                onClick={() => {
                  playSongDbWithId(song)
                }}
                className="flex flex-row items-center gap-5 py-3 hover:bg-[#242424] cursor-pointer px-4"
              >
                <img src={`http://localhost:4000${song.image}`} className="w-14"></img>
                <p>{song.name}</p>
                <p>{song.album}</p>
                <p>{song.category}</p>
              </div>
            ))}
        </div>
    </div>
  )
}

export default SongList