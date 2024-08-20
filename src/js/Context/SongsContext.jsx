// SongsContext.js
import React, { createContext, useState } from "react";

export const SongsContext = createContext();

export const SongsProvider = ({ children }) => {
  const [songs, setSongs] = useState([
    // Lista de canciones
  ]);
  const [currentSongIndex, setCurrentSongIndex] = useState(0);

  const currentUrl = songs[currentSongIndex]?.url;

  const nextSong = () => {
    setCurrentSongIndex((prevIndex) => (prevIndex + 1) % songs.length);
  };

  const previousSong = () => {
    setCurrentSongIndex(
      (prevIndex) => (prevIndex - 1 + songs.length) % songs.length
    );
  };

  const randomSong = () => {
    const randomIndex = Math.floor(Math.random() * songs.length);
    setCurrentSongIndex(randomIndex);
  };

  return (
    <SongsContext.Provider
      value={{ currentUrl, nextSong, previousSong, randomSong }}
    >
      {children}
    </SongsContext.Provider>
  );
};
