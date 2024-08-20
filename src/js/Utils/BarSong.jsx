import React, { useContext, useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCaretLeft,
  faCaretRight,
  faPlay,
  faPause,
  faVolumeUp,
  faVolumeDown,
} from "@fortawesome/free-solid-svg-icons";
import { SongsContext } from "../Context/SongsContext";

export const BarSong = () => {
  const { currentUrl, nextSong, previousSong } = useContext(SongsContext);
  const audioRef = useRef(null);
  const [playing, setPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [repeat, setRepeat] = useState(false);

  useEffect(() => {
    if (audioRef.current) {
      playing ? audioRef.current.play() : audioRef.current.pause();
    }
  }, [playing, currentUrl]);

  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      const updateTime = () => setCurrentTime(audio.currentTime);
      const setAudioData = () => setDuration(audio.duration);

      audio.addEventListener("timeupdate", updateTime);
      audio.addEventListener("loadedmetadata", setAudioData);

      return () => {
        audio.removeEventListener("timeupdate", updateTime);
        audio.removeEventListener("loadedmetadata", setAudioData);
      };
    }
  }, [audioRef]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.loop = repeat;
    }
  }, [repeat]);

  const handlePlay = () => {
    setPlaying(!playing);
  };

  const handleVolumeUp = () => {
    setVolume((prevVolume) => Math.min(prevVolume + 0.1, 1));
  };

  const handleVolumeDown = () => {
    setVolume((prevVolume) => Math.max(prevVolume - 0.1, 0));
  };

  const handleRepeatChange = () => {
    setRepeat(!repeat);
  };

  const handleProgressChange = (e) => {
    const newTime = (e.target.value / 100) * duration;
    audioRef.current.currentTime = newTime;
    setCurrentTime(newTime);
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  return (
    <div className="media-controls d-flex flex-column justify-content-center align-items-center p-3 bg-dark text-white rounded">
      <div className="progress-container w-100 mb-3">
        <div
          className="progress-bar"
          style={{ width: `${(currentTime / duration) * 100}%` }}
        ></div>
        <input
          type="range"
          className="progress-range"
          min="0"
          max="100"
          value={(currentTime / duration) * 100}
          onChange={handleProgressChange}
        />
      </div>
      <div className="d-flex justify-content-between w-100 mb-3">
        <span>{formatTime(currentTime)}</span>
        <span>{formatTime(duration)}</span>
      </div>
      <div className="d-flex justify-content-center align-items-center mb-3">
        <button
          className="btn btn-outline-light"
          aria-label="Previous"
          onClick={previousSong}
        >
          <FontAwesomeIcon icon={faCaretLeft} size="lg" />
        </button>

        {playing && audioRef ? (
          <button className="btn btn-outline-light mx-3" onClick={handlePlay}>
            <FontAwesomeIcon icon={faPause} size="lg" />
          </button>
        ) : (
          <button className="btn btn-outline-light mx-3" onClick={handlePlay}>
            <FontAwesomeIcon icon={faPlay} size="lg" />
          </button>
        )}

        <button
          className="btn btn-outline-light"
          aria-label="Next"
          onClick={nextSong}
        >
          <FontAwesomeIcon icon={faCaretRight} size="lg" />
        </button>

        <button
          className="btn btn-outline-light mx-1"
          onClick={handleVolumeDown}
        >
          <FontAwesomeIcon icon={faVolumeDown} size="lg" />
        </button>
        <button className="btn btn-outline-light mx-1" onClick={handleVolumeUp}>
          <FontAwesomeIcon icon={faVolumeUp} size="lg" />
        </button>
      </div>

      <div className="form-check mb-3">
        <input
          className="form-check-input"
          type="checkbox"
          id="repeatCheckbox"
          checked={repeat}
          onChange={handleRepeatChange}
        />
        <label className="form-check-label" htmlFor="repeatCheckbox">
          Repetir
        </label>
      </div>

      <audio
        ref={audioRef}
        src={`https://playground.4geeks.com${currentUrl}`}
        type="audio/mp3"
      />
    </div>
  );
};
