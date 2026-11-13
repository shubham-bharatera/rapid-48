"use client";

import React, { useState, useRef } from "react";
import { Play, Pause, Volume2, VolumeX } from "lucide-react";

export default function VideoPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const totalDuration = 156; // 2:36 duration

  const chapters = [
    { time: 0, title: "0:00 • Problem & ProjectPro Origin" },
    { time: 30, title: "0:30 • Real-Time Kanban Board" },
    { time: 60, title: "1:00 • 1-Click AI Executive Summary" },
    { time: 90, title: "1:30 • Weekend Execution vs $50k Agency" },
    { time: 120, title: "2:00 • 48-Hour Sprint Offer" },
  ];

  const handlePlayToggle = () => {
    if (!videoRef.current) return;
    if (videoRef.current.paused) {
      videoRef.current.play().then(() => setIsPlaying(true)).catch(() => {});
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  const seekTo = (sec: number) => {
    if (!videoRef.current) return;
    videoRef.current.currentTime = sec;
    setCurrentTime(sec);
    if (videoRef.current.paused) {
      videoRef.current.play().then(() => setIsPlaying(true)).catch(() => {});
    }
  };

  const formatTime = (sec: number) => {
    const m = Math.floor(sec / 60);
    const s = Math.floor(sec % 60);
    return `${m}:${s < 10 ? "0" : ""}${s}`;
  };

  return (
    <div id="demo" className="mt-12 sm:mt-16 relative max-w-5xl mx-auto text-left">
      <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-teal-500/30 via-cyan-500/20 to-blue-500/30 blur-xl opacity-70"></div>

      <div className="relative rounded-2xl overflow-hidden bg-slate-950 border border-slate-700/80 shadow-2xl">
        {/* Browser Chrome Header */}
        <div className="bg-slate-900/90 px-4 py-3 border-b border-slate-800 flex items-center justify-between text-xs text-slate-400">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-rose-500 inline-block"></span>
            <span className="w-3 h-3 rounded-full bg-amber-500 inline-block"></span>
            <span className="w-3 h-3 rounded-full bg-emerald-500 inline-block"></span>
            <span className="ml-2 font-mono text-slate-300 hidden sm:inline">
              Project Pro — Live AI Prototype Demonstration
            </span>
          </div>
          <div className="flex items-center gap-2 bg-slate-950/70 px-3 py-1 rounded-md border border-slate-800 font-mono text-[11px] text-teal-400">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span>https://app.projectpro.ai/live-demo</span>
          </div>
          <span className="px-2 py-0.5 rounded bg-teal-950 text-teal-300 font-mono text-[10px] border border-teal-800">
            48H SPRINT PROOF
          </span>
        </div>

        {/* Video Frame */}
        <div className="relative aspect-video bg-black flex items-center justify-center overflow-hidden">
          <video
            ref={videoRef}
            src="/project-pro-demo.mp4"
            poster="/project-pro-thumbnail.jpg"
            className="w-full h-full object-contain"
            playsInline
            muted={isMuted}
            onTimeUpdate={() => {
              if (videoRef.current) setCurrentTime(Math.floor(videoRef.current.currentTime));
            }}
            onEnded={() => setIsPlaying(false)}
          />

          {/* Big Center Play Trigger */}
          {!isPlaying && (
            <div
              onClick={handlePlayToggle}
              className="absolute inset-0 flex flex-col items-center justify-center z-20 bg-slate-950/40 backdrop-blur-[2px] cursor-pointer"
            >
              <button
                aria-label="Play Project Pro Demo"
                className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-gradient-to-tr from-teal-400 to-cyan-400 text-slate-950 flex items-center justify-center shadow-2xl shadow-teal-500/50 hover:scale-110 active:scale-95 transition-all"
              >
                <Play className="w-10 h-10 ml-1.5 fill-slate-950 text-slate-950" />
              </button>
              <p className="mt-4 text-white font-semibold text-sm drop-shadow bg-slate-900/90 px-4 py-1.5 rounded-full border border-slate-700">
                Click to watch 48-hour build in action
              </p>
            </div>
          )}

          {/* Controls Bar */}
          <div className="absolute bottom-0 inset-x-0 z-30 bg-slate-950/95 backdrop-blur-md border-t border-slate-800 p-3 flex flex-col gap-2">
            <div
              onClick={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                const pos = (e.clientX - rect.left) / rect.width;
                const target = Math.floor(pos * (videoRef.current?.duration || totalDuration));
                seekTo(target);
              }}
              className="relative w-full h-2 bg-slate-800 rounded-full cursor-pointer overflow-hidden"
            >
              <div
                className="h-full bg-gradient-to-r from-teal-400 to-cyan-400 transition-all duration-100"
                style={{ width: `${(currentTime / (videoRef.current?.duration || totalDuration)) * 100}%` }}
              ></div>
            </div>

            <div className="flex items-center justify-between text-xs text-slate-300">
              <div className="flex items-center gap-3">
                <button
                  onClick={handlePlayToggle}
                  className="hover:text-teal-400 font-medium flex items-center gap-1"
                >
                  {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-current" />}
                  <span>{isPlaying ? "Pause" : "Play"}</span>
                </button>
                <span className="font-mono text-[11px] text-slate-400">
                  {formatTime(currentTime)} / {formatTime(videoRef.current?.duration || totalDuration)}
                </span>
                <span className="text-slate-600 hidden sm:inline">|</span>
                <div className="hidden sm:flex items-center gap-1.5 text-[11px]">
                  {chapters.map((ch) => (
                    <button
                      key={ch.time}
                      onClick={() => seekTo(ch.time)}
                      className="px-2 py-0.5 rounded bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 hover:text-teal-400"
                    >
                      {ch.title.split(" • ")[0]}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => {
                    if (videoRef.current) {
                      videoRef.current.muted = !videoRef.current.muted;
                      setIsMuted(videoRef.current.muted);
                    }
                  }}
                  className="hover:text-white flex items-center gap-1"
                >
                  {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                  <span>{isMuted ? "Unmute" : "Sound"}</span>
                </button>
                <span className="px-2 py-0.5 rounded bg-emerald-950/80 text-emerald-400 text-[10px] font-mono border border-emerald-800/60 font-semibold">
                  VERIFIED BUILD
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Removed all text saying time to complete, total cost, and client outcome below the video */}
      </div>
    </div>
  );
}
