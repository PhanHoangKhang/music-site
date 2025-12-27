import React, { useState } from "react"
import { songsData } from "../../assets/assets";

import { useContext } from "react";
import { PlayerContext } from "../../context/PlayerContext";

const SearchPage = () => {
  const [query, setQuery] = useState("");
  const {playWithId} = useContext(PlayerContext)

  const filteredSongs = songsData.filter(song =>
    song.name.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="text-white mt-5">
      {/* Search Input */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="What do you want to listen to?"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full p-3 rounded bg-[#242424] outline-none text-white"
        />
      </div>

      {/* Songs */}
      {filteredSongs.length > 0 && (
        <>
          <h2 className="text-xl font-bold mb-3">Songs</h2>
          <div className="flex flex-col gap-2 mb-8 w-full">
            {filteredSongs.map(song => (
              <div onClick={() => playWithId(song.id)} className="flex flex-row items-center gap-5 py-3 hover:bg-[#242424] cursor-pointer px-4">
                <img src={song.image} className="w-14"></img>
                <p>{song.name}</p>
              </div>
            ))}
          </div>
        </>
      )}

      {/* No result */}
      {query && 
        filteredSongs.length === 0 && (
          <p className="text-gray-400 mt-6">No results found</p>
      )}
    </div>
  );
};

export default SearchPage;
