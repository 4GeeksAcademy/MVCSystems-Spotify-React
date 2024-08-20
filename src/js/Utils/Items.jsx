import React, { useContext } from "react";
import { SongsContext } from "../Context/SongsContext";

export const Items = ({ song, index }) => {
  const { currentSong, setCurrentSong } = useContext(SongsContext);

  const handleClick = () => {
    setCurrentSong(index);
  };

  return (
    <li
      className={`list-group-item list-group-item-action d-flex align-items-center ${
        currentSong === index ? "bg-primary" : "bg-dark"
      } text-white`}
      onClick={handleClick}
    >
      <span className="font-weight-bold mx-2">{index} </span>
      <span className="font-weight-bold mx-2">{song} </span>
    </li>
  );
};
