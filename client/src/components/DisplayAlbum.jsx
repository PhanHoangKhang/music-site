import React, { useContext } from "react";
import Navbar from "./Navbar";
import { useParams } from "react-router-dom";
import { albumsData, assets, songsData } from "../assets/assets";
import { PlayerContext } from "../context/PlayerContext";

const DisplayAlbum = () => {
  const { id } = useParams();
  const { playWithId } = useContext(PlayerContext);

  return (
    <div>
      
      <div className="mt-10 flex flex-col md:flex-row gap-5 md:items-end">
        <img className="w-50 rounded" src={albumsData[id].image}></img>
        <div className="flex flex-col">
          <p>Playlist</p>
          <p className="text-4xl font-bold mb-4">{albumsData[id].name}</p>
        </div>
      </div>
      <div className="grid grid-cols-3 sm:grid-cols-4 mt-10 mb-4 pl-2 text-[#a7a7a7]">
        <p>Title</p>
        <p>Album</p>
        <p>Date Added</p>
        <img className="m-auto w-4" src={assets.clock_icon}></img>
      </div>
      <hr></hr>
      {songsData.map((item, index) => (
        <div
          onClick={() => playWithId(item.id)}
          key={index}
          className="grid sm:grid-cols-4 grid-cols-3 gap-2 p-2 items-center cursor-pointer hover:bg-[#242424]"
        >
          <p className="text-white">
            <b className="mr-4 text-[#a7a7a7]">{index + 1}</b>
            <img className="w-10 mr-5 inline" src={item.image}></img>
            {item.name}
          </p>
          <p className="text-[15px]">{albumsData[id].name}</p>
          <p className="text-[15px] hidden sm:block">5 days ago</p>
          <p className="text-[15px] text-center">{item.duration}</p>
        </div>
      ))}
    </div>
  );
};

export default DisplayAlbum;
