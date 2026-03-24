import React, { useState, useEffect } from 'react';
import { SnakeGame } from './components/SnakeGame';
import { MusicPlayer } from './components/MusicPlayer';
import { Terminal, Cpu, Zap, Activity, Shield, Hash } from 'lucide-react';
import { motion } from 'motion/react';

export default function App() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen w-full flex flex-col bg-dark-bg selection:bg-neon-magenta selection:text-black">
      {/* Header */}
      <header className="h-16 border-b border-neon-cyan/20 flex items-center justify-between px-8 bg-black/40 backdrop-blur-md z-10">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 neon-border flex items-center justify-center bg-neon-cyan/10">
            <Cpu size={20} className="text-neon-cyan animate-pulse" />
          </div>
          <div className="flex flex-col">
            <h1 className="text-xl font-bold tracking-tighter glitch-text">NEON_SNAKE_OS</h1>
            <span className="text-[10px] font-mono text-neon-cyan/40 tracking-widest uppercase">Kernel_v2.4.5_stable</span>
          </div>
        </div>

        <div className="flex items-center gap-8 font-mono text-xs">
          <div className="flex flex-col items-end">
            <span className="text-neon-cyan/40">SYSTEM_TIME</span>
            <span className="text-neon-cyan">{time.toLocaleTimeString()}</span>
          </div>
          <div className="flex flex-col items-end">
            <span className="text-neon-cyan/40">UPLINK_STATUS</span>
            <span className="text-neon-magenta animate-pulse">ENCRYPTED</span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex overflow-hidden relative">
        {/* Left Sidebar - Decorative */}
        <aside className="w-20 border-r border-neon-cyan/10 flex flex-col items-center py-8 gap-8 bg-black/20">
          {[Terminal, Zap, Activity, Shield, Hash].map((Icon, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.2, color: '#ff00ff' }}
              className="text-neon-cyan/40 cursor-pointer transition-colors"
            >
              <Icon size={24} />
            </motion.div>
          ))}
          <div className="flex-1" />
          <div className="writing-vertical-rl text-[10px] font-mono text-neon-cyan/20 tracking-[0.5em] uppercase py-4">
            Authorized_Personnel_Only
          </div>
        </aside>

        {/* Center Game Area */}
        <section className="flex-1 flex flex-col items-center justify-center p-8 relative overflow-y-auto">
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-neon-cyan/5 rounded-full blur-[100px]" />
            <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-neon-magenta/5 rounded-full blur-[100px]" />
          </div>
          
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="z-10"
          >
            <SnakeGame />
          </motion.div>
        </section>

        {/* Right Sidebar - Music Player */}
        <aside className="w-96 border-l border-neon-cyan/10 p-8 bg-black/40 backdrop-blur-md flex flex-col gap-8 z-10">
          <div className="flex flex-col gap-2">
            <h2 className="text-sm font-mono text-neon-magenta tracking-widest uppercase">Audio_Subsystem</h2>
            <div className="h-px w-full bg-gradient-to-r from-neon-magenta to-transparent opacity-30" />
          </div>
          
          <MusicPlayer />

          <div className="flex-1 flex flex-col gap-4 overflow-hidden">
            <h2 className="text-sm font-mono text-neon-cyan tracking-widest uppercase">System_Logs</h2>
            <div className="flex-1 bg-black/60 neon-border border-neon-cyan/10 p-4 font-mono text-[10px] text-neon-cyan/40 overflow-y-auto space-y-2">
              <p className="text-neon-cyan/60">[08:45:19] Initializing neural_link...</p>
              <p className="text-neon-cyan/60">[08:45:20] Audio_buffer_ready</p>
              <p className="text-neon-magenta/60">[08:45:21] WARNING: Glitch_detected_in_sector_7</p>
              <p className="text-neon-cyan/60">[08:45:22] Snake_protocol_active</p>
              <p className="text-neon-cyan/60">[08:45:23] Waiting_for_user_input...</p>
              <p className="text-neon-cyan/60">[08:45:24] System_stable_at_300K</p>
              <p className="text-neon-cyan/60">[08:45:25] Memory_allocation_complete</p>
              <p className="text-neon-cyan/60">[08:45:26] Scanning_for_threats...</p>
              <p className="text-neon-cyan/60">[08:45:27] No_threats_found</p>
            </div>
          </div>
        </aside>

        <div className="scanline" />
      </main>

      {/* Footer */}
      <footer className="h-8 border-t border-neon-cyan/10 bg-black/60 flex items-center justify-between px-8 font-mono text-[10px] text-neon-cyan/40 z-10">
        <div className="flex gap-6">
          <span>CPU_LOAD: 12%</span>
          <span>MEM_USE: 456MB</span>
          <span>NET_LAT: 12MS</span>
        </div>
        <div className="flex gap-6">
          <span className="animate-pulse">● LIVE_FEED</span>
          <span>© 2026 NEON_SNAKE_CORP</span>
        </div>
      </footer>
    </div>
  );
}
