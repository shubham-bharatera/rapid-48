"use client";

import React, { useState } from "react";
import { Plus, Minus } from "lucide-react";

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      q: "How do I build an AI MVP fast without hiring a full engineering team?",
      a: "The fastest way to build an AI MVP is through a focused, single-core 48-hour prototype sprint. Instead of waiting months for agency quotes or attempting to hire full-time developers, our sprint locks in one critical user flow and builds a production-grade web application (Next.js, TypeScript, Tailwind, and LLM APIs) over the weekend for a flat $1,000 fee with complete IP ownership.",
    },
    {
      q: "Why is an interactive AI prototype better than a Figma mockup for investors?",
      a: "Investors are flooded with static Figma decks. Clicking through pre-rendered mockups fails to prove that your AI workflow actually works, handles prompt latency, or generates accurate outputs. An interactive prototype lets angels and VCs test their own inputs in real-time, instantly elevating you from 'another founder with an idea' to an executed, de-risked startup.",
    },
    {
      q: "What can realistically be built in a 48-hour sprint?",
      a: "We focus on one high-value 'aha!' moment: multi-modal AI chatbots, contract analyzers, synthetic document generators, dynamic workflow agents, or personalized recommendation engines with vector search. We build the full stack: responsive UI, API authentication, LLM prompt pipeline with streaming, and cloud deployment. We deliberately exclude non-essential fluff so your core demo shines.",
    },
    {
      q: "How does the $500 deposit and payment schedule work?",
      a: "We only take 2 projects per weekend to maintain rigorous technical quality. To reserve your spot, you place a $500 upfront deposit. During our Friday 15-minute scoping call, we evaluate your technical requirements. If we decide your scope isn't feasible for 48 hours, your $500 is refunded immediately on the call. The remaining $500 balance is paid on Sunday after you inspect the live demo and accept code transfer.",
    },
    {
      q: "Who owns the code and intellectual property?",
      a: "You do, 100%. Upon Sunday evening handover, we transfer repository ownership directly to your GitHub account. All intellectual property, assets, prompts, and database schemas belong entirely to you with standard open-source or custom licensing.",
    },
  ];

  return (
    <section id="faq" className="py-20 bg-slate-900/40 border-t border-slate-800/80">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="text-xs font-bold uppercase tracking-wider text-teal-400 bg-teal-950/60 border border-teal-800/50 px-3 py-1 rounded-full">
            Search & Answer Engine Knowledge Base (AEO)
          </span>
          <h2 className="mt-4 text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
            Frequently Asked Questions by Founders
          </h2>
          <p className="mt-3 text-slate-400 text-sm sm:text-base">
            Direct, transparent answers optimized for AI engines and founder evaluations.
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <article
                key={index}
                className="border border-slate-800 rounded-xl bg-slate-900/60 overflow-hidden"
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="w-full text-left p-5 flex items-center justify-between font-semibold text-white hover:text-teal-400 transition-colors"
                >
                  <span>{faq.q}</span>
                  {isOpen ? (
                    <Minus className="w-5 h-5 text-teal-400 shrink-0 ml-4" />
                  ) : (
                    <Plus className="w-5 h-5 text-teal-400 shrink-0 ml-4" />
                  )}
                </button>
                {isOpen && (
                  <div className="px-5 pb-5 text-sm text-slate-300 leading-relaxed border-t border-slate-800/60 pt-3">
                    {faq.a}
                  </div>
                )}
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
