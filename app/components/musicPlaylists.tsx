"use client";

import React, { useState, useRef, useEffect } from "react";
import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Volume2,
  Volume1,
  VolumeX,
  Shuffle,
  Repeat,
} from "lucide-react";

interface Song {
  title: string;
  artist: string;
  duration: number;
  albumArt: string;
  src: string;
}

const songs: Song[] = [
  {
    title: "Die with a smile",
    artist: "Bruno Mars and Lady Gaga",
    duration: 180,
    albumArt: "/DWS.png",
    src: "/Die-With-A-Smile(PagalNew.Com.Se).mp3",
  },
  {
    title: "Mockingbird",
    artist: "Eminem",
    duration: 242,
    albumArt: "/mockinbird.jpg",
    src: "/Eminem-Mockingbird-.mp3",
  },
];

export default function FullScreenMusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentSong, setCurrentSong] = useState(0);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.7);
  const [isShuffled, setIsShuffled] = useState(false);
  const [repeatMode, setRepeatMode] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.src = songs[currentSong].src;
      audioRef.current.load();
      if (isPlaying) audioRef.current.play();
    }
  }, [currentSong]);

  const togglePlay = () => {
    if (audioRef.current) {
      isPlaying ? audioRef.current.pause() : audioRef.current.play();
      setIsPlaying(!isPlaying);
    }
  };

  const nextSong = () => {
    setCurrentSong((currentSong + 1) % songs.length);
    setIsPlaying(true);
  };

  const prevSong = () => {
    setCurrentSong((currentSong - 1 + songs.length) % songs.length);
    setIsPlaying(true);
  };

  const formatTime = (seconds: number) => {
    if (isNaN(seconds) || seconds < 0) return "0:00";
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const VolumeIcon = () => {
    if (volume === 0) return <VolumeX size={20} className="text-gray-400" />;
    if (volume < 0.5) return <Volume1 size={20} className="text-gray-400" />;
    return <Volume2 size={20} className="text-gray-400" />;
  };

  return (
    <div className="fixed inset-0 flex flex-col justify-center items-center p-4 sm:p-8 text-white space-y-6">
      {/* Time Display */}
      <div className="w-full max-w-lg p-6 bg-white bg-opacity-10 rounded-xl shadow-lg text-center">
        <h1 className="text-5xl sm:text-6xl font-bold">
          {new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </h1>
        <p className="text-lg text-gray-300">
          {new Date().toLocaleDateString(undefined, {
            weekday: "long",
            month: "long",
            day: "numeric",
          })}
        </p>
      </div>

      {/* Music Player */}
      <div className="w-full max-w-lg p-6 bg-white bg-opacity-20 rounded-xl shadow-2xl backdrop-blur-md flex flex-col items-center">
        <div className="text-xl font-semibold mb-4">Now Playing</div>

        {/* Song Info */}
        <div className="flex flex-col items-center">
          <img
            src={songs[currentSong].albumArt}
            alt="Album Art"
            className="w-32 h-32 sm:w-40 sm:h-40 rounded-lg shadow-md"
          />
          <div className="text-center mt-4">
            <h2 className="text-xl sm:text-2xl font-bold">{songs[currentSong].title}</h2>
            <p className="text-gray-300 text-md">{songs[currentSong].artist}</p>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full mt-6">
          <input
            type="range"
            min="0"
            max="100"
            value={isNaN(progress) ? 0 : progress}
            className="w-full cursor-pointer h-2 bg-blue-400 rounded-lg"
            onChange={(e) => {
              if (audioRef.current && !isNaN(duration) && duration > 0) {
                const newTime = (parseFloat(e.target.value) / 100) * duration;
                audioRef.current.currentTime = newTime;
              }
            }}
          />
          <div className="flex justify-between text-sm text-gray-300 mt-1">
            <span>{formatTime(audioRef.current?.currentTime || 0)}</span>
            <span>{formatTime(duration)}</span>
          </div>
        </div>

        {/* Controls */}
        <div className="flex justify-center items-center mt-4 space-x-4">
          <Shuffle
            size={20}
            className={`cursor-pointer ${isShuffled ? "text-blue-400" : "text-gray-400"}`}
            onClick={() => setIsShuffled(!isShuffled)}
          />
          <SkipBack size={28} className="cursor-pointer text-gray-300 hover:text-white" onClick={prevSong} />
          <button
            className="bg-white bg-opacity-30 p-3 rounded-full hover:scale-110 transition"
            onClick={togglePlay}
          >
            {isPlaying ? <Pause size={28} className="text-white" /> : <Play size={28} className="text-white" />}
          </button>
          <SkipForward size={28} className="cursor-pointer text-gray-300 hover:text-white" onClick={nextSong} />
          <Repeat
            size={20}
            className={`cursor-pointer ${repeatMode > 0 ? "text-blue-400" : "text-gray-400"}`}
            onClick={() => setRepeatMode((prev) => (prev + 1) % 3)}
          />
        </div>

        {/* Volume Control */}
        <div className="flex items-center w-full mt-4">
          <VolumeIcon />
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={isNaN(volume) ? 0.7 : volume}
            className="w-full ml-2 cursor-pointer h-2 bg-blue-400 rounded-lg"
            onChange={(e) => {
              const newVolume = parseFloat(e.target.value);
              if (!isNaN(newVolume)) {
                setVolume(newVolume);
                if (audioRef.current) audioRef.current.volume = newVolume;
              }
            }}
          />
        </div>
      </div>

      {/* Audio Element */}
      <audio
        ref={audioRef}
        onTimeUpdate={() => {
          if (audioRef.current && !isNaN(duration) && duration > 0) {
            setProgress((audioRef.current.currentTime / duration) * 100);
          }
        }}
        onLoadedMetadata={() => {
          if (audioRef.current && !isNaN(audioRef.current.duration)) {
            setDuration(audioRef.current.duration);
          }
        }}
        onEnded={() => (repeatMode === 2 ? audioRef.current!.play() : nextSong())}
      />
    </div>
  );
}
