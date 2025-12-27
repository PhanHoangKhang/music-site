import React, { useContext, useRef, useEffect } from "react";
import { PlayerContext } from "./context/PlayerContext";
import { Route, Routes, useLocation } from "react-router-dom";
import Home from "./components/Home";
import DisplayAlbum from "./components/DisplayAlbum";
import DisplaySong from "./components/DisplaySong";
import { albumsData } from "./assets/assets";
import DisplayArtist from "./components/DisplayArtist";
import MainLayout from "./layout/MainLayout";
import SearchPage from "./components/pages/SearchPage";
import AddLayout from "./layout/AddLayout";
import AddSong from "./addPlace/pages/addSong";
import SongList from "./addPlace/pages/SongList";
import AddAlbum from "./addPlace/pages/AddAlbum";

const App = () => {
  const { track, audioRef } = useContext(PlayerContext);
  const ref = useRef();
  const location = useLocation();
  const isAlbum = location.pathname.startsWith("/album/");
  const albumID = isAlbum ? location.pathname.slice(-1) : "";
  const bgColor = albumsData[Number(albumID)].bgColor;

  useEffect(() => {
    if (isAlbum) {
      ref.current.style.background = `linear-gradient(${bgColor}, #121212)`;
    } else {
      ref.current.style.background = "#121212";
    }
  }, [isAlbum]);

  return (
    <div className="bg-black h-screen">
        <div ref={ref}>
          <Routes>
            <Route element={<MainLayout />}>
              <Route path="/" element={<Home />} />
              <Route path="/search" element={<SearchPage></SearchPage>}></Route>
              <Route path="/album/:id" element={<DisplayAlbum />} />
              <Route path="/song/:id" element={<DisplaySong />} />
              <Route path="/artist/:id" element={<DisplayArtist />} />
            </Route>

            <Route path="/add-place/*" element={<AddLayout></AddLayout>}>
              <Route path="add-song" element={<AddSong></AddSong>}></Route>
              <Route path="addalbum" element={<AddAlbum></AddAlbum>}></Route>
              <Route path="song-list" element={<SongList></SongList>}></Route>
            </Route>
          </Routes>
        </div>
      <audio preload="auto" ref={audioRef} src={track.file}></audio>
    </div>
  );
};

export default App;
