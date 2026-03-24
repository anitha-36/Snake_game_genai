import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, SkipForward, SkipBack, Volume2, Music } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Track } from '../types';

const DUMMY_TRACKS: Track[] = [
  {
    id: '1',
    title: 'SYNTH_WAVE_01',
    artist: 'NEON_AI',
    url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
    color: '#00f3ff',
  },
  {
    id: '2',
    title: 'GLITCH_CORE_02',
    artist: 'CYBER_GEN',
    url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3',
    color: '#ff00ff',
  },
  {
    id: '3',
    title: 'DATA_STREAM_03',
    artist: 'BIT_BOT',
    url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3',
    color: '#fff200',
  },
];

export const MusicPlayer: React.FC = () => {
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null);

  const currentTrack = DUMMY_TRACKS[currentTrackIndex];

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const skipTrack = (direction: 'next' | 'prev') => {
    let newIndex = direction === 'next' ? currentTrackIndex + 1 : currentTrackIndex - 1;
    if (newIndex >= DUMMY_TRACKS.length) newIndex = 0;
    if (newIndex < 0) newIndex = DUMMY_TRACKS.length - 1;
    setCurrentTrackIndex(newIndex);
    setIsPlaying(true);
  };

  useEffect(() => {
    if (audioRef.current && isPlaying) {
      audioRef.current.play();
    }
  }, [currentTrackIndex]);

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      const current = audioRef.current.currentTime;
      const duration = audioRef.current.duration;
      setProgress((current / duration) * 100);
    }
  };

  return (
    <div className="w-full max-w-md p-6 neon-border-magenta bg-black/40 backdrop-blur-md rounded-lg flex flex-col gap-6">
      <div className="flex items-center gap-4">
        <div className="w-20 h-20 neon-border flex items-center justify-center bg-black/60 relative overflow-hidden group">
          <motion.div
            animate={isPlaying ? { rotate: 360 } : { rotate: 0 }}
            transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
            className="text-neon-cyan"
          >
            <Music size={40} />
          </motion.div>
          <div className="absolute inset-0 bg-neon-magenta/10 opacity-0 group-hover:opacity-100 transition-opacity" />
        </div>
        
        <div className="flex flex-col flex-1 overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentTrack.id}
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -20, opacity: 0 }}
              className="flex flex-col"
            >
              <h3 className="text-xl font-bold glitch-text truncate" style={{ color: currentTrack.color }}>
                {currentTrack.title}
              </h3>
              <p className="text-xs font-mono text-neon-cyan/60 tracking-widest">
                {currentTrack.artist}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <div className="h-1 w-full bg-white/10 rounded-full overflow-hidden relative">
          <motion.div
            className="h-full bg-neon-magenta"
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.1 }}
          />
          <div className="absolute inset-0 scanline opacity-30" />
        </div>
        <div className="flex justify-between font-mono text-[10px] text-neon-cyan/40">
          <span>{Math.floor((audioRef.current?.currentTime || 0) / 60)}:{(Math.floor((audioRef.current?.currentTime || 0) % 60)).toString().padStart(2, '0')}</span>
          <span>{Math.floor((audioRef.current?.duration || 0) / 60)}:{(Math.floor((audioRef.current?.duration || 0) % 60)).toString().padStart(2, '0')}</span>
        </div>
      </div>

      <div className="flex justify-center items-center gap-8">
        <button
          onClick={() => skipTrack('prev')}
          className="text-neon-cyan hover:text-neon-magenta transition-colors"
        >
          <SkipBack size={24} />
        </button>
        
        <button
          onClick={togglePlay}
          className="w-16 h-16 rounded-full neon-border-magenta flex items-center justify-center bg-black/60 hover:bg-neon-magenta/20 transition-all group"
        >
          {isPlaying ? (
            <Pause size={32} className="text-neon-magenta group-hover:scale-110 transition-transform" />
          ) : (
            <Play size={32} className="text-neon-magenta group-hover:scale-110 transition-transform ml-1" />
          )}
        </button>

        <button
          onClick={() => skipTrack('next')}
          className="text-neon-cyan hover:text-neon-magenta transition-colors"
        >
          <SkipForward size={24} />
        </button>
      </div>

      <div className="flex items-center gap-3 px-4 py-2 bg-black/40 neon-border border-neon-cyan/20 rounded font-mono text-[10px]">
        <Volume2 size={12} className="text-neon-cyan" />
        <div className="flex-1 h-0.5 bg-white/10 rounded-full">
          <div className="w-3/4 h-full bg-neon-cyan/40" />
        </div>
        <span className="text-neon-cyan/60">75%</span>
      </div>

      <audio
        ref={audioRef}
        src={currentTrack.url}
        onTimeUpdate={handleTimeUpdate}
        onEnded={() => skipTrack('next')}
      />
    </div>
  );
};
