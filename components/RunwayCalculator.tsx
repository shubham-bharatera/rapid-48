"use client";

import React, { useState } from "react";

export default function RunwayCalculator() {
  const [agencyQuote, setAgencyQuote] = useState(25000);
  const [agencyMonths, setAgencyMonths] = useState(3);

  const flatSprintCost = 1000;
  const cashSaved = Math.max(0, agencyQuote - flatSprintCost);
  const weeksAhead = agencyMonths * 4 - 0.5; // 48h is ~0.5 weeks

  return (
    <section className="py-16 bg-slate-950 border-t border-slate-800/80">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-b from-slate-900 to-slate-950 rounded-2xl border border-slate-800 p-6 sm:p-8">
          <div className="text-center mb-8">
            <h3 className="text-xl sm:text-2xl font-bold text-white">
              Calculate Your Runway Savings
            </h3>
            <p className="text-sm text-slate-400 mt-1">
              Compare a traditional agency quote against a 48-Hour Rapid AI Sprint
            </p>
          </div>

          <div className="space-y-6">
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-slate-300 font-medium">Agency Quote You're Considering:</span>
                <span className="font-bold text-teal-400 font-mono">${agencyQuote.toLocaleString()}</span>
              </div>
              <input
                type="range"
                min="5000"
                max="60000"
                step="1000"
                value={agencyQuote}
                onChange={(e) => setAgencyQuote(Number(e.target.value))}
                className="w-full accent-teal-400 cursor-pointer"
              />
              <div className="flex justify-between text-[11px] text-slate-500 font-mono mt-1">
                <span>$5,000 (Freelancer)</span>
                <span>$25,000 (Boutique)</span>
                <span>$60,000 (Full Agency)</span>
              </div>
            </div>

            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-slate-300 font-medium">Estimated Months to Delivery:</span>
                <span className="font-bold text-teal-400 font-mono">
                  {agencyMonths} Month{agencyMonths > 1 ? "s" : ""} ({agencyMonths * 4} Weeks)
                </span>
              </div>
              <input
                type="range"
                min="1"
                max="6"
                step="1"
                value={agencyMonths}
                onChange={(e) => setAgencyMonths(Number(e.target.value))}
                className="w-full accent-teal-400 cursor-pointer"
              />
              <div className="flex justify-between text-[11px] text-slate-500 font-mono mt-1">
                <span>1 Month</span>
                <span>3 Months</span>
                <span>6 Months</span>
              </div>
            </div>

            <div className="pt-6 border-t border-slate-800 grid grid-cols-2 gap-4 text-center">
              <div className="bg-slate-900 p-4 rounded-xl border border-slate-800">
                <div className="text-xs font-mono text-slate-400 uppercase">Cash Savings</div>
                <div className="text-2xl sm:text-3xl font-extrabold text-emerald-400 mt-1">
                  ${cashSaved.toLocaleString()}
                </div>
                <div className="text-[11px] text-slate-400 mt-0.5">Vs flat $1,000 Sprint</div>
              </div>
              <div className="bg-slate-900 p-4 rounded-xl border border-slate-800">
                <div className="text-xs font-mono text-slate-400 uppercase">Time Gained Ahead</div>
                <div className="text-2xl sm:text-3xl font-extrabold text-cyan-400 mt-1">
                  {weeksAhead.toFixed(1)} Weeks
                </div>
                <div className="text-[11px] text-slate-400 mt-0.5">48 Hours vs Agency wait</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
