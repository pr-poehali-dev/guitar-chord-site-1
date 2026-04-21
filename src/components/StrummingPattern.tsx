import { useState } from "react";
import type { Strumming } from "@/data/songs";

interface StrummingPatternProps {
  patterns: Strumming[];
}

export default function StrummingPattern({ patterns }: StrummingPatternProps) {
  const [activePattern, setActivePattern] = useState(0);
  const [animating, setAnimating] = useState<number | null>(null);

  const pattern = patterns[activePattern];

  const handleAnimate = (idx: number) => {
    setAnimating(idx);
    setTimeout(() => setAnimating(null), 600);
  };

  const getArrowStyle = (arrow: string) => {
    if (arrow === "↓") return "text-[var(--neon-orange)]";
    if (arrow === "↑") return "text-[var(--neon-cyan)]";
    if (arrow === "×") return "text-white/40";
    return "text-white";
  };

  return (
    <div className="space-y-4">
      {/* Pattern tabs */}
      {patterns.length > 1 && (
        <div className="flex gap-2 flex-wrap">
          {patterns.map((p, i) => (
            <button
              key={i}
              onClick={() => setActivePattern(i)}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                activePattern === i
                  ? "tab-active"
                  : "bg-white/5 text-white/60 hover:bg-white/10 hover:text-white"
              }`}
            >
              {p.description}
            </button>
          ))}
        </div>
      )}

      {/* Description */}
      <div className="flex items-center gap-3">
        <span className="text-sm text-white/50">{pattern.description}</span>
        <span className="text-xs px-2 py-0.5 rounded-full bg-white/5 text-white/40 border border-white/10">
          {pattern.tempo}
        </span>
      </div>

      {/* Pattern visualization */}
      <div className="flex items-center gap-2 flex-wrap">
        {pattern.pattern.map((beat, idx) => (
          <button
            key={idx}
            onClick={() => handleAnimate(idx)}
            className={`relative flex flex-col items-center justify-center w-12 h-16 rounded-xl border transition-all duration-200
              ${animating === idx
                ? "border-[var(--neon-orange)] bg-[rgba(255,122,26,0.15)] scale-110"
                : beat === "×"
                ? "border-white/10 bg-white/3 hover:bg-white/8"
                : "border-white/15 bg-white/5 hover:bg-white/10 hover:border-[var(--neon-orange)]/40"
              }`}
          >
            <span className={`text-2xl font-bold leading-none transition-all ${getArrowStyle(beat)} ${animating === idx ? "animate-strum" : ""}`}>
              {beat}
            </span>
            <span className="text-xs text-white/30 mt-1">{idx + 1}</span>
          </button>
        ))}
      </div>

      {/* Legend */}
      <div className="flex gap-4 text-xs text-white/40 flex-wrap">
        <span className="flex items-center gap-1">
          <span className="text-[var(--neon-orange)]">↓</span> Удар вниз
        </span>
        <span className="flex items-center gap-1">
          <span className="text-[var(--neon-cyan)]">↑</span> Удар вверх
        </span>
        <span className="flex items-center gap-1">
          <span className="text-white/40">×</span> Заглушка
        </span>
      </div>
    </div>
  );
}
