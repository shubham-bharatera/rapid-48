"use client";

import React, { useState, useEffect, useRef } from "react";
import { ArrowRight, Play, Pause, Volume2, VolumeX, Check, ShieldCheck } from "lucide-react";

export default function LandingPage() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  // Video duration: 2 minutes (120s)
  const totalDuration = 120;
  const videoRef = useRef<HTMLVideoElement>(null);

  const chapters = [
    { time: 0, label: "0:00 Scoping", title: "Friday Scoping & Architecture Lock" },
    { time: 35, label: "0:35 LLM Pipeline", title: "Real-Time Claude 3.5 Streaming" },
    { time: 75, label: "1:15 Interactive UI", title: "Full-Stack Responsive Interface" },
    { time: 110, label: "1:50 Live Deploy", title: "Vercel Deploy & GitHub Handover" },
  ];

  // The specific Lemon Squeezy Checkout URL is defined here and feeds into all buttons
  const LEMON_SQUEEZY_CHECKOUT_URL = "https://governancepulse.lemonsqueezy.com/checkout/buy/b93072a6-16b6-4d48-8918-667e57424f8d?embed=1";

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying) {
      interval = setInterval(() => {
        if (videoRef.current && !videoRef.current.paused) {
          setCurrentTime(Math.floor(videoRef.current.currentTime));
        } else {
          setCurrentTime((prev) => (prev < totalDuration ? prev + 1 : 0));
        }
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isPlaying]);

  const handlePlayToggle = () => {
    if (!isPlaying) {
      videoRef.current?.play().catch(() => {});
      setIsPlaying(true);
    } else {
      videoRef.current?.pause();
      setIsPlaying(false);
    }
  };

  const seekTo = (sec: number) => {
    setCurrentTime(sec);
    if (videoRef.current) videoRef.current.currentTime = sec;
    if (!isPlaying) handlePlayToggle();
  };

  const formatTime = (sec: number) => {
    const m = Math.floor(sec / 60);
    const s = Math.floor(sec % 60);
    return `${m}:${s < 10 ? "0" : ""}${s}`;
  };

  const currentChapter = [...chapters].reverse().find((c) => currentTime >= c.time) || chapters[0];

  return (
    <div className="min-h-screen bg-[#FAFAF9] text-[#1C1917] selection:bg-stone-900 selection:text-white flex flex-col justify-between antialiased">
      
      {/* Minimal Top Notice Bar */}
      <aside aria-label="Announcement" className="border-b border-stone-200/80 bg-white/70 backdrop-blur-sm px-4 py-2 text-center text-xs text-stone-500">
        <span>Weekend Sprint Intake: <strong className="text-stone-900 font-semibold">Friday 5:00 PM</strong> — Only 1 of 2 build slots remaining.</span>
      </aside>

      {/* Header */}
      <header className="sticky top-0 z-40 bg-[#FAFAF9]/90 backdrop-blur-md border-b border-stone-200/60">
        <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
          <a href="#hero" className="flex items-center gap-2 text-stone-950 font-bold tracking-tight text-base">
            <span className="w-6 h-6 rounded bg-stone-950 text-white flex items-center justify-center text-xs font-mono">48</span>
            <span>Rapid AI</span>
          </a>

          <nav className="hidden sm:flex items-center gap-6 text-sm text-stone-600">
            <a href="#demo" className="hover:text-stone-950 transition-colors">Demo</a>
            <a href="#process" className="hover:text-stone-950 transition-colors">Process</a>
            <a href="#pricing" className="hover:text-stone-950 transition-colors">Pricing ($1,000)</a>
            <a href="#faq" className="hover:text-stone-950 transition-colors">FAQ</a>
          </nav>

          <a
            href={LEMON_SQUEEZY_CHECKOUT_URL}
            className="lemonsqueezy-button px-3.5 py-1.5 rounded-lg text-xs sm:text-sm font-medium bg-stone-950 hover:bg-stone-800 text-white transition-all shadow-sm flex items-center gap-1.5"
          >
            <span>Book Scoping</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </a>
        </div>
      </header>

      <main>
        {/* HERO SECTION */}
        <section id="hero" className="pt-16 pb-14 sm:pt-24 sm:pb-20 text-center">
          <div className="max-w-3xl mx-auto px-6">
            
            {/* Subtle Label */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-stone-300/80 bg-white text-xs font-mono text-stone-600 mb-6">
              <span>Weekend Sprint</span>
              <span className="text-stone-300">•</span>
              <span>$1,000 Flat Fee</span>
              <span className="text-stone-300">•</span>
              <span>$500 Deposit</span>
            </div>

            {/* Obsidian Header */}
            <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-[#0B0F17] leading-[1.15]">
              Stop burning runway on spec work. Get a working AI prototype in 48 hours.
            </h1>

            {/* Sub-heading in Lighter Tone */}
            <p className="mt-5 text-base sm:text-lg text-[#52525B] max-w-2xl mx-auto leading-relaxed">
              We take your idea on Friday afternoon, build an interactive full-stack web app with real LLM inference over the weekend, and hand over the live URL and GitHub repository by Sunday night.
            </p>

            {/* CTAs */}
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
              <a
                href={LEMON_SQUEEZY_CHECKOUT_URL}
                className="lemonsqueezy-button w-full sm:w-auto px-6 py-3 rounded-lg text-sm font-semibold bg-[#0B0F17] hover:bg-black text-white shadow-sm transition-all flex items-center justify-center gap-2"
              >
                <span>Reserve Weekend Slot</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <a
                href="#demo"
                className="w-full sm:w-auto px-5 py-3 rounded-lg text-sm font-medium text-stone-700 bg-white border border-stone-200 hover:border-stone-400 transition-all flex items-center justify-center gap-2"
              >
                <Play className="w-3.5 h-3.5 fill-current" />
                <span>Watch 2-Min Demo</span>
              </a>
            </div>

            <p className="mt-4 text-xs text-stone-400">
              $500 deposit locks your slot • $500 balance upon Sunday delivery • 100% money-back scoping guarantee
            </p>

            {/* CENTERPIECE DEMO VIDEO: "Project Pro" */}
            <div id="demo" className="mt-12 text-left">
              <div className="rounded-xl overflow-hidden bg-white border border-stone-200/90 shadow-sm">
                
                {/* Clean Browser Chrome */}
                <div className="bg-stone-50/80 px-4 py-2.5 border-b border-stone-200 flex items-center justify-between text-xs text-stone-500">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-stone-300 inline-block"></span>
                    <span className="w-2.5 h-2.5 rounded-full bg-stone-300 inline-block"></span>
                    <span className="w-2.5 h-2.5 rounded-full bg-stone-300 inline-block"></span>
                    <span className="ml-2 font-mono text-[11px] text-stone-600 hidden sm:inline">Project Pro — Live Build</span>
                  </div>
                  <div className="bg-white px-2.5 py-0.5 rounded border border-stone-200 font-mono text-[11px] text-stone-600">
                    https://app.projectpro.ai/live-demo
                  </div>
                  <span className="text-[11px] font-mono text-stone-500">48H PROOF</span>
                </div>

                {/* Video Area */}
                <div className="relative aspect-video bg-stone-900 flex items-center justify-center overflow-hidden">
                  <video
                    ref={videoRef}
                    src="/project-pro-demo.mp4"
                    poster="/project-pro-thumbnail.jpg"
                    className="w-full h-full object-cover"
                    playsInline
                    muted={isMuted}
                    onEnded={() => setIsPlaying(false)}
                  />

                  {/* Minimal Chapter Indicator */}
                  <div className="absolute top-4 left-4 z-10 bg-black/60 backdrop-blur-sm text-white text-[11px] font-mono px-2.5 py-1 rounded">
                    {currentChapter.title}
                  </div>

                  {/* Play Button Overlay */}
                  {!isPlaying && (
                    <div
                      onClick={handlePlayToggle}
                      className="absolute inset-0 flex flex-col items-center justify-center z-20 bg-stone-950/20 backdrop-blur-[1px] cursor-pointer"
                    >
                      <button
                        aria-label="Play 2-Minute Demo"
                        className="w-16 h-16 rounded-full bg-white text-stone-950 flex items-center justify-center shadow-lg hover:scale-105 transition-transform"
                      >
                        <Play className="w-6 h-6 ml-0.5 fill-current" />
                      </button>
                      <span className="mt-3 text-xs font-medium text-white drop-shadow">
                        Watch 2-minute demonstration
                      </span>
                    </div>
                  )}

                  {/* Player Controls Bar */}
                  <div className="absolute bottom-0 inset-x-0 z-30 bg-stone-950/90 backdrop-blur-sm px-4 py-2.5 flex flex-col gap-1.5">
                    {/* Minimal Scrub Bar */}
                    <div
                      onClick={(e) => {
                        const rect = e.currentTarget.getBoundingClientRect();
                        const pos = (e.clientX - rect.left) / rect.width;
                        seekTo(Math.floor(pos * totalDuration));
                      }}
                      className="relative w-full h-1 bg-stone-800 rounded-full cursor-pointer"
                    >
                      <div
                        className="h-full bg-white transition-all duration-100"
                        style={{ width: `${(currentTime / totalDuration) * 100}%` }}
                      ></div>
                    </div>

                    <div className="flex items-center justify-between text-xs text-stone-300">
                      <div className="flex items-center gap-3">
                        <button onClick={handlePlayToggle} className="hover:text-white flex items-center gap-1">
                          {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 fill-current" />}
                          <span>{isPlaying ? "Pause" : "Play"}</span>
                        </button>
                        <span className="font-mono text-[11px] text-stone-400">{formatTime(currentTime)} / 2:00</span>
                        
                        <div className="hidden sm:flex items-center gap-1.5 text-[10px] font-mono text-stone-400">
                          {chapters.map((ch) => (
                            <button
                              key={ch.time}
                              onClick={() => seekTo(ch.time)}
                              className="px-1.5 py-0.5 rounded hover:bg-stone-800 hover:text-white"
                            >
                              {ch.label}
                            </button>
                          ))}
                        </div>
                      </div>

                      <button onClick={() => setIsMuted(!isMuted)} className="hover:text-white text-[11px] flex items-center gap-1">
                        {isMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
                        <span>{isMuted ? "Unmute" : "Sound"}</span>
                      </button>
                    </div>
                  </div>
                </div>

                {/* Minimal Proof Metrics */}
                <div className="bg-stone-50/50 p-4 border-t border-stone-200 grid grid-cols-2 sm:grid-cols-4 gap-4 text-center text-xs">
                  <div>
                    <span className="text-stone-400 block text-[10px] font-mono uppercase">Delivery Time</span>
                    <strong className="text-stone-900 font-semibold text-sm">46 Hours</strong>
                  </div>
                  <div>
                    <span className="text-stone-400 block text-[10px] font-mono uppercase">Total Investment</span>
                    <strong className="text-stone-900 font-semibold text-sm">$1,000 Flat</strong>
                  </div>
                  <div>
                    <span className="text-stone-400 block text-[10px] font-mono uppercase">Client Result</span>
                    <strong className="text-stone-900 font-semibold text-sm">$180k Angel Closed</strong>
                  </div>
                  <div>
                    <span className="text-stone-400 block text-[10px] font-mono uppercase">IP Rights</span>
                    <strong className="text-stone-900 font-semibold text-sm">100% Client Owned</strong>
                  </div>
                </div>

              </div>
            </div>

          </div>
        </section>

        {/* THE PROBLEM */}
        <section id="problem" className="py-16 border-t border-stone-200/70 bg-white">
          <div className="max-w-4xl mx-auto px-6">
            <div className="mb-10 text-center">
              <h2 className="text-xl sm:text-2xl font-bold text-[#0B0F17]">
                The Traditional Early-Stage Bottleneck
              </h2>
              <p className="mt-2 text-sm text-[#52525B]">
                Non-technical founders usually face three expensive traps:
              </p>
            </div>

            <div className="grid sm:grid-cols-3 gap-6">
              <div className="p-5 rounded-lg border border-stone-200 bg-[#FAFAF9]">
                <h3 className="font-semibold text-sm text-[#0B0F17]">1. Dev Agencies</h3>
                <p className="mt-2 text-xs text-[#52525B] leading-relaxed">
                  Require 12–16 weeks and $25,000–$50,000 retainers before testing a single real user interaction.
                </p>
              </div>

              <div className="p-5 rounded-lg border border-stone-200 bg-[#FAFAF9]">
                <h3 className="font-semibold text-sm text-[#0B0F17]">2. Freelancers</h3>
                <p className="mt-2 text-xs text-[#52525B] leading-relaxed">
                  High coordination friction, unproven AI architecture, and delivery delays right before critical meetings.
                </p>
              </div>

              <div className="p-5 rounded-lg border border-stone-200 bg-[#FAFAF9]">
                <h3 className="font-semibold text-sm text-[#0B0F17]">3. Static Figma Decks</h3>
                <p className="mt-2 text-xs text-[#52525B] leading-relaxed">
                  Investors want to test prompt latency and real outputs. Static slides cannot prove AI feasibility.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* THE SOLUTION & DELIVERABLES */}
        <section id="solution" className="py-16 border-t border-stone-200/70">
          <div className="max-w-4xl mx-auto px-6">
            <div className="mb-10 text-center">
              <h2 className="text-xl sm:text-2xl font-bold text-[#0B0F17]">
                What You Receive in 48 Hours
              </h2>
              <p className="mt-2 text-sm text-[#52525B]">
                Everything necessary to pitch investors or onboard initial pilot users:
              </p>
            </div>

            <div className="grid sm:grid-cols-2 gap-4 text-left">
              {[
                { title: "Live Production URL", desc: "Deployed to Vercel with SSL, ready to text to investors during a meeting." },
                { title: "Working AI / LLM Pipeline", desc: "Integrated Claude 3.5 Sonnet or GPT-4o with streaming inference and tailored prompts." },
                { title: "Full GitHub IP Transfer", desc: "Clean TypeScript and React codebase transferred directly to your organization." },
                { title: "10-Minute Video Handover", desc: "A Loom walkthrough explaining every file, API variable, and roadmap step." },
              ].map((item, idx) => (
                <div key={idx} className="p-4 rounded-lg bg-white border border-stone-200">
                  <h3 className="font-semibold text-sm text-[#0B0F17] flex items-center gap-2">
                    <Check className="w-4 h-4 text-stone-900" />
                    <span>{item.title}</span>
                  </h3>
                  <p className="mt-1.5 text-xs text-[#52525B] leading-relaxed pl-6">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* HOW IT WORKS */}
        <section id="process" className="py-16 border-t border-stone-200/70 bg-white">
          <div className="max-w-3xl mx-auto px-6 text-center">
            <h2 className="text-xl sm:text-2xl font-bold text-[#0B0F17]">
              The 48-Hour Sprint Schedule
            </h2>

            <div className="mt-8 space-y-4 text-left">
              <div className="p-4 rounded-lg border border-stone-200 bg-[#FAFAF9] flex items-start gap-4">
                <span className="font-mono text-xs font-bold text-stone-500 pt-0.5">01</span>
                <div>
                  <h3 className="text-sm font-semibold text-[#0B0F17]">Friday • 5:00 PM EST — 15-Minute Scoping</h3>
                  <p className="mt-1 text-xs text-[#52525B]">
                    Zoom call to isolate your single core AI feature and lock the schema. $500 deposit reserves your slot. 100% refunded if technical scope is infeasible.
                  </p>
                </div>
              </div>

              <div className="p-4 rounded-lg border border-stone-200 bg-[#FAFAF9] flex items-start gap-4">
                <span className="font-mono text-xs font-bold text-stone-500 pt-0.5">02</span>
                <div>
                  <h3 className="text-sm font-semibold text-[#0B0F17]">Saturday — 24-Hour Build Sprint</h3>
                  <p className="mt-1 text-xs text-[#52525B]">
                    We engineer the responsive UI, integrate the streaming AI pipeline, and configure cloud deployment. No management required on your end.
                  </p>
                </div>
              </div>

              <div className="p-4 rounded-lg border border-stone-200 bg-[#FAFAF9] flex items-start gap-4">
                <span className="font-mono text-xs font-bold text-stone-500 pt-0.5">03</span>
                <div>
                  <h3 className="text-sm font-semibold text-[#0B0F17]">Sunday • 5:00 PM EST — Live Handover</h3>
                  <p className="mt-1 text-xs text-[#52525B]">
                    Live Zoom demonstration, full GitHub repository transfer, and deployment credentials. Final $500 balance paid upon sign-off.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* TRANSPARENT PRICING */}
        <section id="pricing" className="py-16 border-t border-stone-200/70">
          <div className="max-w-md mx-auto px-6 text-center">
            <h2 className="text-2xl font-bold text-[#0B0F17]">
              Flat Pricing. Zero Surprises.
            </h2>
            <p className="mt-1 text-xs text-[#52525B]">
              Only two client slots available per weekend.
            </p>

            <div className="mt-8 p-6 rounded-xl bg-white border border-stone-300 shadow-sm text-left">
              <div className="flex items-baseline justify-between border-b border-stone-200 pb-4">
                <div>
                  <div className="text-3xl font-extrabold text-[#0B0F17]">$1,000</div>
                  <span className="text-xs text-stone-500">Total flat fee</span>
                </div>
                <div className="text-right text-xs font-mono text-stone-600">
                  <div>$500 Deposit to lock</div>
                  <div>$500 On Sunday delivery</div>
                </div>
              </div>

              <ul className="mt-5 space-y-2 text-xs text-stone-700">
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-stone-900" />
                  <span>48-Hour Weekend Sprint (Fri 5 PM – Sun 5 PM)</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-stone-900" />
                  <span>Live Production URL on Vercel with SSL</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-stone-900" />
                  <span>Working AI Inference (OpenAI / Claude 3.5 Sonnet)</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-stone-900" />
                  <span>100% GitHub Code Transfer & IP Ownership</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-stone-900" />
                  <span>10-Minute Architecture Loom Walkthrough</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-stone-900" />
                  <span>100% Deposit Feasibility Refund Guarantee</span>
                </li>
              </ul>

              <a
                href={LEMON_SQUEEZY_CHECKOUT_URL}
                className="lemonsqueezy-button mt-6 w-full py-3 rounded-lg text-sm font-semibold bg-[#0B0F17] hover:bg-black text-white transition-all text-center block"
              >
                Book 15-Minute Scoping Call
              </a>

              <div className="mt-3 flex items-center justify-center gap-1.5 text-[11px] text-stone-500">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Deposit fully refunded if scope is infeasible</span>
              </div>
            </div>
          </div>
        </section>

        {/* AEO / FAQ */}
        <section id="faq" className="py-16 border-t border-stone-200/70 bg-white">
          <div className="max-w-2xl mx-auto px-6">
            <div className="text-center mb-8">
              <h2 className="text-xl font-bold text-[#0B0F17]">Frequently Asked Questions</h2>
            </div>

            <div className="space-y-3">
              {[
                {
                  q: "How to build an AI MVP fast without hiring a dev team?",
                  a: "Focus on a single core user workflow. Our 48-hour sprint bypasses prolonged agency roadmaps by executing a working full-stack app (Next.js, LLM streaming, responsive UI) over one weekend for a flat $1,000 fee with complete GitHub ownership."
                },
                {
                  q: "Why is an interactive prototype better than a Figma deck for investors?",
                  a: "Clickable Figma designs don't test actual prompt latency, hallucination handling, or data flow. A live working app lets investors test their own inputs in real-time, validating technical feasibility."
                },
                {
                  q: "How does the $500 deposit work?",
                  a: "A $500 deposit reserves your weekend slot. During Friday's scoping call, we evaluate your technical scope. If it cannot be cleanly completed in 48 hours, your $500 is refunded immediately. The remaining $500 is paid Sunday upon handover."
                },
                {
                  q: "Who owns the code and intellectual property?",
                  a: "You own 100% of the repository, intellectual property, and assets from the moment the GitHub transfer completes on Sunday evening."
                }
              ].map((item, index) => (
                <div key={index} className="border border-stone-200 rounded-lg overflow-hidden bg-[#FAFAF9]">
                  <button
                    onClick={() => setActiveFaq(activeFaq === index ? null : index)}
                    className="w-full text-left p-4 text-xs sm:text-sm font-semibold text-[#0B0F17] flex justify-between items-center"
                  >
                    <span>{item.q}</span>
                    <span className="font-mono text-stone-400 text-sm ml-2">{activeFaq === index ? "−" : "+"}</span>
                  </button>
                  {activeFaq === index && (
                    <div className="px-4 pb-4 text-xs text-[#52525B] leading-relaxed border-t border-stone-200/60 pt-2.5">
                      {item.a}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FINAL MINIMAL CTA */}
        <section className="py-20 border-t border-stone-200/70 text-center">
          <div className="max-w-xl mx-auto px-6">
            <h2 className="text-2xl sm:text-3xl font-bold text-[#0B0F17]">
              Ready to demo your AI concept this Monday?
            </h2>
            <p className="mt-2 text-sm text-[#52525B]">
              Slots are capped at two builds per weekend. Reserve your scoping call today.
            </p>
            <a
              href={LEMON_SQUEEZY_CHECKOUT_URL}
              className="lemonsqueezy-button mt-6 px-6 py-3 rounded-lg text-sm font-semibold bg-[#0B0F17] hover:bg-black text-white transition-all shadow-sm inline-flex items-center gap-2"
            >
              <span>Book 15-Minute Scoping Call</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-stone-200/80 bg-white py-8 text-xs text-stone-500">
        <div className="max-w-5xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>© 2026 Rapid AI Prototyping. 48-Hour Builds.</div>
          <div className="flex gap-4">
            <a href="#hero" className="hover:text-stone-900">Back to Top</a>
            <a href="#demo" className="hover:text-stone-900">Demo Video</a>
            <a href="#pricing" className="hover:text-stone-900">Pricing</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
