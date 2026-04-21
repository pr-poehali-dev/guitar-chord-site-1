import { useState, useMemo } from "react";
import Navbar from "@/components/Navbar";
import SongCard from "@/components/SongCard";
import Icon from "@/components/ui/icon";
import { SONGS, GENRES, DIFFICULTIES, DIFFICULTY_LABELS } from "@/data/songs";

export default function Index() {
  const [search, setSearch] = useState("");
  const [genre, setGenre] = useState("Все");
  const [difficulty, setDifficulty] = useState("Все");

  const filtered = useMemo(() => {
    return SONGS.filter((song) => {
      const matchSearch =
        search === "" ||
        song.title.toLowerCase().includes(search.toLowerCase()) ||
        song.artist.toLowerCase().includes(search.toLowerCase());
      const matchGenre = genre === "Все" || song.genre === genre;
      const matchDiff = difficulty === "Все" || song.difficulty === difficulty;
      return matchSearch && matchGenre && matchDiff;
    });
  }, [search, genre, difficulty]);

  return (
    <div className="min-h-screen chord-grid">
      <Navbar />

      {/* Hero */}
      <section className="relative overflow-hidden py-16 px-4">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 rounded-full opacity-20 blur-3xl"
            style={{ background: "radial-gradient(circle, var(--neon-orange) 0%, transparent 70%)" }} />
        </div>
        <div className="max-w-6xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[var(--neon-orange)]/30 bg-[var(--neon-orange)]/10 text-[var(--neon-orange)] text-sm font-medium mb-6 animate-fade-in">
            <Icon name="Zap" size={14} />
            Аккорды и бои для гитары
          </div>
          <h1 className="font-oswald text-5xl sm:text-6xl font-bold text-white mb-4 animate-fade-in delay-100">
            Играй любимые<br />
            <span className="text-[var(--neon-orange)] text-glow-orange">песни</span> на гитаре
          </h1>
          <p className="text-white/50 text-lg max-w-xl mx-auto animate-fade-in delay-200">
            Интерактивные аккорды, схемы боёв и тексты песен для начинающих и опытных гитаристов
          </p>
        </div>
      </section>

      {/* Filters */}
      <section className="max-w-6xl mx-auto px-4 pb-8">
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          {/* Search */}
          <div className="relative flex-1">
            <Icon name="Search" size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/30" />
            <input
              type="text"
              placeholder="Поиск по названию или исполнителю..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/30 outline-none focus:border-[var(--neon-orange)]/50 focus:bg-white/8 transition-all text-sm"
            />
            {search && (
              <button onClick={() => setSearch("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-white/30 hover:text-white">
                <Icon name="X" size={16} />
              </button>
            )}
          </div>

          {/* Genre filter */}
          <div className="flex gap-2 flex-wrap">
            {GENRES.map((g) => (
              <button
                key={g}
                onClick={() => setGenre(g)}
                className={`px-3 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                  genre === g
                    ? "tab-active"
                    : "bg-white/5 text-white/50 hover:bg-white/10 hover:text-white border border-white/10"
                }`}
              >
                {g}
              </button>
            ))}
          </div>
        </div>

        {/* Difficulty filter */}
        <div className="flex gap-2 mb-8 flex-wrap">
          <span className="text-sm text-white/30 self-center mr-1">Уровень:</span>
          {DIFFICULTIES.map((d) => (
            <button
              key={d}
              onClick={() => setDifficulty(d)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 ${
                difficulty === d
                  ? "tab-active"
                  : "bg-white/5 text-white/50 hover:bg-white/10 hover:text-white border border-white/10"
              }`}
            >
              {d === "Все" ? "Все" : DIFFICULTY_LABELS[d]}
            </button>
          ))}
        </div>

        {/* Results count */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-oswald text-xl text-white">
            {filtered.length > 0 ? (
              <>Найдено <span className="text-[var(--neon-orange)]">{filtered.length}</span> песен</>
            ) : (
              "Ничего не найдено"
            )}
          </h2>
        </div>

        {/* Songs grid */}
        {filtered.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filtered.map((song, i) => (
              <div key={song.id} className="animate-fade-in" style={{ animationDelay: `${i * 60}ms` }}>
                <SongCard song={song} />
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-4">
              <Icon name="SearchX" size={28} className="text-white/20" />
            </div>
            <p className="text-white/40 text-lg">Песни не найдены</p>
            <p className="text-white/20 text-sm mt-1">Попробуйте изменить фильтры</p>
            <button
              onClick={() => { setSearch(""); setGenre("Все"); setDifficulty("Все"); }}
              className="mt-4 px-4 py-2 rounded-xl bg-[var(--neon-orange)]/10 text-[var(--neon-orange)] text-sm hover:bg-[var(--neon-orange)]/20 transition-all"
            >
              Сбросить фильтры
            </button>
          </div>
        )}
      </section>
    </div>
  );
}
