import React, { useContext } from "react";
import { SongsContext } from "../Context/SongsContext";
import { Items } from "./Items";

export const List = () => {
  const { playlist } = useContext(SongsContext);

  return (
    <>
      <ul className="list-group">
        {playlist.length > 0
          ? playlist.map((song) => (
              <Items key={song.id} song={song.name} index={song.id} />
            ))
          : "Esperando la carga de las canciones"}
      </ul>
    </>
  );
};
