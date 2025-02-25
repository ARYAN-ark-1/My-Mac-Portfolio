'use client'

import React, { useState, useRef, useEffect } from 'react'
import { Play, Pause, SkipBack, SkipForward, Volume2, Volume1, VolumeX, Heart, Repeat, Shuffle, Minimize2 } from 'lucide-react'

interface Song {
  title: string
  artist: string
  album: string
  duration: number
  albumArt: string
  src: string
}

const songs: Song[] = [
  {
    title: "Die with a smile",
    artist: "Bruno Mars and Lady Gaga",
    album: "Die With A Smile",
    duration: 180,
    albumArt: "/DWS.png",
    src: "/Die-With-A-Smile(PagalNew.Com.Se).mp3"
  },
  {
    title: "MockinBird",
    artist: "Eminem",
    album: "Curtain Call",
    duration: 482,
    albumArt: "/mockinbird.jpg",
    src: "/Eminem-Mockingbird-.mp3"
  },
]

export default function MusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentSong, setCurrentSong] = useState(0)
  const [progress, setProgress] = useState(0)
  const [duration, setDuration] = useState(0)
  const [volume, setVolume] = useState(1)
  const [isLiked, setIsLiked] = useState(false)
  const [isShuffled, setIsShuffled] = useState(false)
  const [repeatMode, setRepeatMode] = useState(0)
  const audioRef = useRef<HTMLAudioElement>(null)

  const formatTime = (seconds: number) => {
    if (isNaN(seconds)) return "0:00"
    const mins = Math.floor(seconds / 60)
    const secs = Math.floor(seconds % 60)
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause()
      } else {
        audioRef.current.play()
      }
      setIsPlaying(!isPlaying)
    }
  }

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value)
    setVolume(newVolume)
    if (audioRef.current) {
      audioRef.current.volume = newVolume
    }
  }

  const VolumeIcon = () => {
    if (volume === 0) return <VolumeX size={16} className="text-yellow-400" />
    if (volume < 0.5) return <Volume1 size={16} className="text-yellow-400" />
    return <Volume2 size={16} className="text-yellow-400" />
  }

  const nextSong = () => {
    const nextIndex = (currentSong + 1) % songs.length
    setCurrentSong(nextIndex)
    if (audioRef.current) {
      audioRef.current.src = songs[nextIndex].src
      audioRef.current.play()
    }
    setIsPlaying(true)
  }

  const prevSong = () => {
    const prevIndex = (currentSong - 1 + songs.length) % songs.length
    setCurrentSong(prevIndex)
    if (audioRef.current) {
      audioRef.current.src = songs[prevIndex].src
      audioRef.current.play()
    }
    setIsPlaying(true)
  }

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.src = songs[currentSong].src
      if (isPlaying) {
        audioRef.current.play()
      }
    }
  }, [currentSong])

  const currentTime = audioRef.current ? audioRef.current.currentTime : 0
  const progressValue = duration > 0 ? (currentTime / duration) * 100 : 0

  return (
    <div className="fixed inset-0 text-gray-800 dark:text-white flex flex-col items-center justify-between p-8 px-6 md:px-20 overflow-hidden bg-gradient-to-r from-purple-700 via-pink-500 to-orange-600">
      <div className="w-[70%] flex flex-col items-center min-h-screen">
        {/* Album Art */}
        <div className="relative w-32 h-32 sm:w-64 sm:h-64 mb-4">
          <img 
            src={songs[currentSong].albumArt} 
            alt={songs[currentSong].album}
            className="w-full h-full object-cover rounded-lg shadow-2xl"
          />
          <button 
            className={`absolute top-2 right-2 p-1 rounded-full ${isLiked ? 'bg-red-600' : 'bg-white bg-opacity-30'}`}
            onClick={() => setIsLiked(!isLiked)}
          >
            <Heart size={16} className={isLiked ? 'text-white' : 'text-gray-200'} />
          </button>
        </div>
  
        {/* Song Info */}
        <div className="text-center mb-4">
          <h2 className="text-2xl font-extrabold mb-1 truncate w-48 sm:w-64">{songs[currentSong].title}</h2>
          <p className="text-md text-gray-100 dark:text-gray-300 mb-1 truncate w-48 sm:w-64">{songs[currentSong].artist}</p>
          <p className="text-sm text-gray-300 dark:text-gray-200 truncate w-48 sm:w-64">{songs[currentSong].album}</p>
        </div>
  
        {/* Progress Bar */}
        <div className="w-full flex items-center space-x-2 mb-4">
          <span className="text-xs">{formatTime(currentTime)}</span>
          <div className="flex-1">
            <input
              type="range"
              min="0"
              max="100"
              value={progressValue || 0}
              className="w-full h-1 bg-green-300 dark:bg-green-800 rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:bg-yellow-400 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full"
              style={{
                backgroundImage: `linear-gradient(to right, #fbbf24 ${progressValue}%, #fb923c ${progressValue}%)`
              }}
              onChange={(e) => {
                if (audioRef.current) {
                  const newTime = (parseFloat(e.target.value) / 100) * duration
                  audioRef.current.currentTime = newTime
                }
              }}
            />
          </div>
          <span className="text-xs">{formatTime(duration)}</span>
        </div>
  
        {/* Controls */}
        <div className="flex justify-center items-center space-x-4 mb-4">
          <Shuffle 
            size={20} 
            className={`cursor-pointer ${isShuffled ? 'text-yellow-400' : 'dark:text-gray-200 text-gray-600 dark:hover:text-white hover:text-black'}`}
            onClick={() => setIsShuffled(!isShuffled)}
          />
          <SkipBack size={22} className="cursor-pointer dark:text-gray-200 text-gray-600 dark:hover:text-white hover:text-black" onClick={prevSong} />
          <button 
            onClick={togglePlay}
            className="bg-white dark:bg-gray-700 rounded-full p-3 hover:scale-110 transition-transform"
          >
            {isPlaying ? 
              <Pause size={24} className="text-gray-800 dark:text-white hover:text-black" /> : 
              <Play size={24} className="text-gray-800 dark:text-white hover:text-black" />
            }
          </button>
          <SkipForward size={22} className="cursor-pointer dark:text-gray-200 text-gray-600 dark:hover:text-white hover:text-black" onClick={nextSong} />
          <Repeat 
            size={20} 
            className={`cursor-pointer ${repeatMode > 0 ? 'text-yellow-400' : 'dark:text-gray-200 text-gray-600 dark:hover:text-white hover:text-black'}`}
            onClick={() => setRepeatMode((prev) => (prev + 1) % 3)}
          />
        </div>
  
        {/* Volume Control */}
        <div className="flex items-center justify-center space-x-2">
          <VolumeIcon />
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={volume}
            className="w-20 h-1 bg-yellow-300 dark:bg-yellow-800 rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:bg-yellow-400 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full"
            style={{
              backgroundImage: `linear-gradient(to right, #fbbf24 ${volume * 100}%, #fb923c ${volume * 100}%)`
            }}
            onChange={handleVolumeChange}
          />
        </div>
      </div>
  
      {/* Minimize Button */}
      <button className="absolute top-2 right-2 text-gray-200 hover:text-white">
        <Minimize2 size={16} />
      </button>
  
      <audio
        ref={audioRef}
        onTimeUpdate={() => {
          if (audioRef.current) {
            setProgress((audioRef.current.currentTime / audioRef.current.duration) * 100)
          }
        }}
        onLoadedMetadata={() => {
          if (audioRef.current) {
            setDuration(audioRef.current.duration)
          }
        }}
        onEnded={() => {
          if (repeatMode === 2) {
            if (audioRef.current) {
              audioRef.current.currentTime = 0
              audioRef.current.play()
            }
          } else {
            nextSong()
          }
        }}
      />
    </div>
  );
}
