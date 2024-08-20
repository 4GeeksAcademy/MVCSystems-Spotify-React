import React, { useEffect, useState } from "react";
import { SongsContext } from "./SongsContext";

export const SongsProvider = ({ children }) => {
  const [playlist, setPlaylist] = useState([]);
  const [currentSong, setCurrentSong] = useState(0);
  const [currentUrl, setCurrentUrl] = useState("");

  const getPlaylist = async () => {
    const request = await fetch("https://playground.4geeks.com/sound/songs", {
      method: "GET",
    });
    const response = await request.json();
    setPlaylist(response.songs);
  };

  const updateUrl = () => {
    const filteredSound = playlist.filter((song) => song.id === currentSong);
    currentSong !== 0
      ? setCurrentUrl(filteredSound[0].url)
      : console.log("Aun no has seleccionado una cancion");
  };

  const nextSong = () => {
    currentSong === playlist.length
      ? setCurrentSong(1)
      : setCurrentSong(currentSong + 1);
  };

  const previousSong = () => {
    currentSong === 1
      ? setCurrentSong(playlist.length)
      : setCurrentSong(currentSong - 1);
  };

  useEffect(() => {
    getPlaylist();
  }, []);

  useEffect(() => {
    updateUrl();
  }, [currentSong]);

  return (
    <SongsContext.Provider
      value={{
        playlist,
        setPlaylist,
        currentSong,
        setCurrentSong,
        currentUrl,
        setCurrentUrl,
        nextSong,
        previousSong,
      }}
    >
      {children}
    </SongsContext.Provider>
  );
};
