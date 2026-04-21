import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import SongCard from "@/components/SongCard";
import Icon from "@/components/ui/icon";
import { SONGS } from "@/data/songs";
import { useFavorites } from "@/hooks/useFavorites";

export default function Favorites() {
  const { favorites, toggle } = useFavorites();
  const favSongs = SONGS.filter((s) => favorites.includes(s.id));

  return (
    <div className="min-h-screen chord-grid">
      <Navbar />

      <div className="max-w-6xl mx-auto px-4 py-10">
        {/* Header */}
        <div className="mb-8 animate-fade-in">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center"
              style={{ background: "linear-gradient(135deg, #ef4444, #dc2626)" }}>
              <Icon name="Heart" size={20} className="text-white fill-white" />
            </div>
            <div>
              <h1 className="font-oswald text-3xl font-bold text-white">Избранное</h1>
              <p className="text-white/40 text-sm">Личный кабинет гитариста</p>
            </div>
          </div>
        </div>

        {favSongs.length > 0 ? (
          <>
            {/* Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-8 animate-fade-in delay-100">
              <div className="p-4 rounded-xl border border-white/10 bg-card text-center">
                <div className="font-oswald text-3xl font-bold text-[var(--neon-orange)]">{favSongs.length}</div>
                <div className="text-xs text-white/40 mt-1">Сохранённых песен</div>
              </div>
              <div className="p-4 rounded-xl border border-white/10 bg-card text-center">
                <div className="font-oswald text-3xl font-bold text-[var(--neon-cyan)]">
                  {[...new Set(favSongs.map((s) => s.genre))].length}
                </div>
                <div className="text-xs text-white/40 mt-1">Жанров</div>
              </div>
              <div className="p-4 rounded-xl border border-white/10 bg-card text-center col-span-2 sm:col-span-1">
                <div className="font-oswald text-3xl font-bold text-[var(--neon-green)]">
                  {[...new Set(favSongs.flatMap((s) => s.chords))].length}
                </div>
                <div className="text-xs text-white/40 mt-1">Уникальных аккордов</div>
              </div>
            </div>

            {/* Unique chords */}
            <div className="mb-8 p-5 rounded-2xl border border-white/10 bg-card animate-fade-in delay-200">
              <h2 className="font-oswald text-lg text-white mb-4 flex items-center gap-2">
                <Icon name="Grid3X3" size={16} className="text-[var(--neon-orange)]" />
                Аккорды из твоих песен
              </h2>
              <div className="flex flex-wrap gap-2">
                {[...new Set(favSongs.flatMap((s) => s.chords))].map((chord) => (
                  <span key={chord}
                    className="font-oswald font-bold text-sm px-3 py-1.5 rounded-lg bg-[var(--neon-orange)]/10 text-[var(--neon-orange)] border border-[var(--neon-orange)]/20">
                    {chord}
                  </span>
                ))}
              </div>
            </div>

            {/* Songs grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {favSongs.map((song, i) => (
                <div key={song.id} className="animate-fade-in" style={{ animationDelay: `${i * 60}ms` }}>
                  <SongCard song={song} />
                </div>
              ))}
            </div>

            {/* Clear all */}
            <div className="mt-8 flex justify-center">
              <button
                onClick={() => favorites.forEach((id) => toggle(id))}
                className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm text-white/30 hover:text-red-400 hover:bg-red-400/10 border border-white/10 hover:border-red-400/20 transition-all"
              >
                <Icon name="Trash2" size={14} />
                Очистить избранное
              </button>
            </div>
          </>
        ) : (
          /* Empty state */
          <div className="flex flex-col items-center justify-center py-24 text-center animate-fade-in">
            <div className="relative mb-6">
              <div className="w-24 h-24 rounded-3xl bg-white/5 border border-white/10 flex items-center justify-center">
                <Icon name="Heart" size={40} className="text-white/15" />
              </div>
              <div className="absolute -bottom-2 -right-2 w-10 h-10 rounded-2xl flex items-center justify-center"
                style={{ background: "linear-gradient(135deg, var(--neon-orange), #ff4500)" }}>
                <Icon name="Guitar" size={18} className="text-black" />
              </div>
            </div>
            <h2 className="font-oswald text-2xl font-bold text-white mb-2">Избранное пустое</h2>
            <p className="text-white/40 max-w-sm mb-6">
              Добавляй понравившиеся песни в избранное, нажав на сердечко в карточке или на странице песни
            </p>
            <Link
              to="/"
              className="flex items-center gap-2 px-6 py-3 rounded-xl font-medium text-black transition-all hover:opacity-90 glow-orange"
              style={{ background: "linear-gradient(135deg, var(--neon-orange), #ff4500)" }}
            >
              <Icon name="Music" size={16} />
              Перейти в каталог
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
