import React, { useContext } from "react";
import { useParams } from "react-router-dom";
import { PlayerContext } from "../context/PlayerContext";
import Navbar from "./Navbar";
import { artistData, assets } from "../assets/assets";

const DisplayArtist = () => {
  const { id } = useParams();
  const { playWithId } = useContext(PlayerContext);
  return (
    <div className="">
      <div className="mt-10 flex flex-col md:flex-row gap-5 md:items-end">
        <img className="w-50 rounded" src={artistData[id].image}></img>
        <div className="flex flex-col">
          <p>Artist</p>
          <p className="text-4xl font-bold mb-4">{artistData[id].name}</p>
        </div>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 mt-10 mb-4 pl-2 text-[#a7a7a7]">
        <p>Title</p>
        <p>Date Added</p>
        <img className="m-auto w-4" src={assets.clock_icon}></img>
      </div>
    </div>
  );
};

export default DisplayArtist;
