import { useState } from "react";
import { Link } from "react-router-dom";
import Icon from "@/components/ui/icon";
import type { Song } from "@/data/songs";
import { DIFFICULTY_LABELS } from "@/data/songs";
import { useFavorites } from "@/hooks/useFavorites";

interface SongCardProps {
  song: Song;
}

const DIFFICULTY_COLORS = {
  easy: "text-[var(--neon-green)] border-[var(--neon-green)]/30 bg-[var(--neon-green)]/10",
  medium: "text-[var(--neon-orange)] border-[var(--neon-orange)]/30 bg-[var(--neon-orange)]/10",
  hard: "text-red-400 border-red-400/30 bg-red-400/10",
};

export default function SongCard({ song }: SongCardProps) {
  const { isFavorite, toggle } = useFavorites();
  const [heartAnim, setHeartAnim] = useState(false);

  const handleFav = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggle(song.id);
    setHeartAnim(true);
    setTimeout(() => setHeartAnim(false), 400);
  };

  return (
    <Link to={`/song/${song.id}`} className="block group">
      <div className="card-hover relative rounded-2xl border border-white/10 bg-card p-5 h-full flex flex-col gap-3 overflow-hidden">
        {/* Ambient glow */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
          style={{ background: "radial-gradient(ellipse at 50% 0%, rgba(255,122,26,0.06) 0%, transparent 70%)" }}
        />

        {/* Header */}
        <div className="flex items-start justify-between gap-2">
          <div className="flex-1 min-w-0">
            <h3 className="font-oswald text-lg font-semibold text-white leading-tight truncate group-hover:text-[var(--neon-orange)] transition-colors">
              {song.title}
            </h3>
            <p className="text-sm text-white/50 mt-0.5">{song.artist}</p>
          </div>
          <button
            onClick={handleFav}
            className={`flex-shrink-0 p-1.5 rounded-full transition-all duration-200 hover:bg-white/10
              ${isFavorite(song.id) ? "text-red-400" : "text-white/30 hover:text-white/60"}`}
          >
            <Icon
              name={isFavorite(song.id) ? "Heart" : "Heart"}
              size={18}
              className={`transition-transform ${heartAnim ? "scale-125" : "scale-100"} ${isFavorite(song.id) ? "fill-red-400" : ""}`}
            />
          </button>
        </div>

        {/* Badges */}
        <div className="flex items-center gap-2 flex-wrap">
          <span className={`text-xs px-2 py-0.5 rounded-full border font-medium ${DIFFICULTY_COLORS[song.difficulty]}`}>
            {DIFFICULTY_LABELS[song.difficulty]}
          </span>
          <span className="text-xs px-2 py-0.5 rounded-full border border-white/10 bg-white/5 text-white/50">
            {song.genre}
          </span>
          <span className="text-xs px-2 py-0.5 rounded-full border border-white/10 bg-white/5 text-white/50">
            {song.key}
          </span>
        </div>

        {/* Chords preview */}
        <div className="flex items-center gap-1.5 flex-wrap">
          {song.chords.map((chord) => (
            <span
              key={chord}
              className="text-sm font-oswald font-bold px-2.5 py-1 rounded-lg bg-[var(--neon-orange)]/10 text-[var(--neon-orange)] border border-[var(--neon-orange)]/20"
            >
              {chord}
            </span>
          ))}
        </div>

        {/* Footer */}
        <div className="mt-auto flex items-center justify-between pt-2 border-t border-white/5">
          <div className="flex items-center gap-1 text-xs text-white/30">
            <Icon name="Music" size={12} />
            <span>{song.tempo} BPM</span>
          </div>
          {song.capo && (
            <div className="flex items-center gap-1 text-xs text-[var(--neon-cyan)]/70">
              <Icon name="Captions" size={12} />
              <span>Капо {song.capo}</span>
            </div>
          )}
          <div className="flex items-center gap-1 text-xs text-white/30">
            <Icon name="ChevronRight" size={12} />
            <span>Открыть</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
