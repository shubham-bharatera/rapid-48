"use client";

import React, { useState } from "react";
import { X, CheckCircle, Shield } from "lucide-react";

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function BookingModal({ isOpen, onClose }: BookingModalProps) {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    concept: "",
    weekend: "upcoming-weekend",
  });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setIsSubmitted(true);
    }, 800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
      <div className="bg-slate-900 border border-slate-700/80 rounded-2xl max-w-lg w-full p-6 sm:p-8 relative shadow-2xl overflow-y-auto max-h-[90vh]">
        <button
          onClick={onClose}
          aria-label="Close modal"
          className="absolute top-4 right-4 w-8 h-8 rounded-full bg-slate-800 text-slate-400 hover:text-white flex items-center justify-center"
        >
          <X className="w-4 h-4" />
        </button>

        {!isSubmitted ? (
          <>
            <div className="mb-6">
              <span className="text-xs font-mono text-teal-400 uppercase tracking-wider font-semibold">
                Sprint Reservation
              </span>
              <h3 className="text-xl sm:text-2xl font-extrabold text-white mt-1">
                Book 15-Min Scoping Call
              </h3>
              <p className="text-xs sm:text-sm text-slate-400 mt-1">
                Strict 2-slot cap per weekend. $500 deposit required to lock slot; 100% refunded if technical scope cannot be verified on the call.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Founder Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Alex Rivera"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-teal-400"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Email Address</label>
                <input
                  type="email"
                  required
                  placeholder="alex@startup.io"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-teal-400"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  Briefly Describe Your AI Prototype Idea
                </label>
                <textarea
                  rows={3}
                  required
                  placeholder="e.g. A web app that ingests legal contracts, identifies risky indemnity clauses, and suggests redlines using Claude 3.5 Sonnet."
                  value={formData.concept}
                  onChange={(e) => setFormData({ ...formData, concept: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-teal-400"
                ></textarea>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Target Weekend Sprint</label>
                <select
                  value={formData.weekend}
                  onChange={(e) => setFormData({ ...formData, weekend: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-teal-400"
                >
                  <option value="upcoming-weekend">This Coming Weekend (1 Slot Left)</option>
                  <option value="next-weekend">Next Weekend Sprint</option>
                  <option value="custom">Custom Timing (Discuss on Call)</option>
                </select>
              </div>

              {/* Deposit Terms Card */}
              <div className="p-3.5 rounded-xl bg-slate-950 border border-teal-500/30 text-xs text-slate-300 space-y-1">
                <div className="flex justify-between font-medium">
                  <span>Sprint Deposit Required:</span>
                  <span className="text-teal-400 font-bold">$500.00 USD</span>
                </div>
                <div className="flex justify-between text-slate-400">
                  <span>Delivery Balance (Due Sunday night):</span>
                  <span>$500.00 USD</span>
                </div>
                <div className="text-[11px] text-teal-300 pt-1 border-t border-slate-800/80 flex items-center gap-1">
                  <Shield className="w-3.5 h-3.5" />
                  <span>100% money-back guarantee if scope is infeasible</span>
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3.5 rounded-xl text-sm font-bold text-slate-950 bg-gradient-to-r from-teal-400 to-cyan-400 hover:from-teal-300 hover:to-cyan-300 shadow-lg shadow-teal-500/20 active:scale-[0.99] transition-all"
              >
                {isLoading ? "Securing Sprint Slot..." : "Confirm 15-Min Scoping & Deposit Review"}
              </button>
            </form>
          </>
        ) : (
          <div className="text-center py-6">
            <CheckCircle className="w-12 h-12 text-teal-400 mx-auto mb-3" />
            <h4 className="text-xl font-bold text-white">Sprint Slot Tentatively Held!</h4>
            <p className="text-sm text-slate-300 mt-2">
              We&apos;ve sent a calendar invitation and scoping questionnaire to <strong>{formData.email}</strong>. Check your inbox for the Google Meet / Zoom link.
            </p>
            <button
              onClick={onClose}
              className="mt-6 px-6 py-2.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-sm font-medium text-white transition-colors"
            >
              Close Window
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
