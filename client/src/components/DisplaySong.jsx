import React, { useContext } from "react"
import { useNavigate, useParams } from "react-router-dom";
import { songsData, assets } from "../assets/assets";
import { PlayerContext } from "../context/PlayerContext";

const DisplaySong = () => {
  const { id } = useParams();
  const navigate = useNavigate()
  const { playStatus, play, pause, playWithId, track } = useContext(PlayerContext);

  return (
    <div>
      <div className="mt-10 flex flex-row gap-5">
        <img className="w-50 rounded" src={track.image}></img>
        <div className="flex flex-col gap-3">
          <p className="text-4xl font-bold">{track.name}</p>
          <p className="text-md font-semibold">{track.artist}</p>
          <br></br>
          <div>
            {playStatus ? (
              <img
                src={assets.pauseGreen}
                className="w-15 cursor-pointer rounded-full"
                onClick={pause}
              ></img>
            ) : (
              <img
                src={assets.playGreen}
                onClick={play}
                className="w-15 cursor-pointer rounded-full"
              ></img>
            )}
          </div>
        </div>
      </div>
      <div className="mt-10">
        <p className="text-4xl font-bold text-[#00d3e5] mb-5">
          Popular songs by {track.artist}
        </p>
        <div className="flex flex-col gap-5">
          {songsData.filter((s) => s.artist === track.artist).map((song, index) => (
              <div
                key={index}
                onClick={() => {
                  playWithId(song.id)
                  navigate(`/song/${song.id}`)
                }}
                className="flex flex-row items-center gap-5 py-3 hover:bg-[#242424] cursor-pointer px-4"
              >
                <img src={song.image} className="w-14"></img>
                <p>{song.name}</p>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default DisplaySong;
