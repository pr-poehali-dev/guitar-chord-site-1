import { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import ChordDiagram from "@/components/ChordDiagram";
import StrummingPattern from "@/components/StrummingPattern";
import Icon from "@/components/ui/icon";
import { SONGS, CHORDS_DATA, DIFFICULTY_LABELS } from "@/data/songs";
import { useFavorites } from "@/hooks/useFavorites";

export default function Song() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { isFavorite, toggle } = useFavorites();
  const [activeChord, setActiveChord] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<"chords" | "strumming" | "lyrics">("chords");
  const [transposition, setTransposition] = useState(0);

  const song = SONGS.find((s) => s.id === id);

  if (!song) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <p className="text-white/50 text-lg mb-4">Песня не найдена</p>
        <Link to="/" className="text-[var(--neon-orange)] hover:underline">← Назад в каталог</Link>
      </div>
    );
  }

  const isFav = isFavorite(song.id);

  const NOTES = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];

  const transposeChord = (chord: string, steps: number): string => {
    if (steps === 0) return chord;
    const minor = chord.endsWith("m") && !chord.endsWith("em");
    const base = minor ? chord.slice(0, -1) : chord;
    const idx = NOTES.indexOf(base);
    if (idx === -1) return chord;
    const newIdx = (idx + steps + 12) % 12;
    return NOTES[newIdx] + (minor ? "m" : "");
  };

  const tabs = [
    { key: "chords", label: "Аккорды", icon: "Grid3X3" },
    { key: "strumming", label: "Бои", icon: "Music2" },
    { key: "lyrics", label: "Текст", icon: "FileText" },
  ] as const;

  return (
    <div className="min-h-screen chord-grid">
      <Navbar />

      <div className="max-w-5xl mx-auto px-4 py-8">
        {/* Back */}
        <button onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-white/40 hover:text-white/70 text-sm mb-6 transition-colors group">
          <Icon name="ArrowLeft" size={16} className="group-hover:-translate-x-1 transition-transform" />
          Назад
        </button>

        {/* Song header */}
        <div className="rounded-2xl border border-white/10 bg-card p-6 mb-6 relative overflow-hidden animate-fade-in">
          <div className="absolute inset-0 pointer-events-none"
            style={{ background: "radial-gradient(ellipse at 0% 0%, rgba(255,122,26,0.08) 0%, transparent 60%)" }} />

          <div className="flex items-start justify-between gap-4 relative z-10">
            <div className="flex-1">
              <div className="flex flex-wrap gap-2 mb-3">
                <span className="text-xs px-2.5 py-1 rounded-full border border-white/10 bg-white/5 text-white/50">
                  {song.genre}
                </span>
                <span className="text-xs px-2.5 py-1 rounded-full border border-[var(--neon-orange)]/30 bg-[var(--neon-orange)]/10 text-[var(--neon-orange)]">
                  {DIFFICULTY_LABELS[song.difficulty]}
                </span>
                <span className="text-xs px-2.5 py-1 rounded-full border border-white/10 bg-white/5 text-white/50">
                  Тональность {song.key}
                </span>
                {song.capo && (
                  <span className="text-xs px-2.5 py-1 rounded-full border border-[var(--neon-cyan)]/30 bg-[var(--neon-cyan)]/10 text-[var(--neon-cyan)]">
                    Капо {song.capo}
                  </span>
                )}
              </div>
              <h1 className="font-oswald text-3xl sm:text-4xl font-bold text-white mb-1 text-glow-orange">
                {song.title}
              </h1>
              <p className="text-white/50 text-lg">{song.artist}</p>
            </div>

            <button
              onClick={() => toggle(song.id)}
              className={`flex-shrink-0 flex items-center gap-2 px-4 py-2 rounded-xl border transition-all duration-300
                ${isFav
                  ? "border-red-400/30 bg-red-400/10 text-red-400"
                  : "border-white/10 bg-white/5 text-white/50 hover:border-white/20 hover:text-white"
                }`}
            >
              <Icon name="Heart" size={18} className={isFav ? "fill-red-400" : ""} />
              <span className="text-sm font-medium hidden sm:block">
                {isFav ? "В избранном" : "В избранное"}
              </span>
            </button>
          </div>

          {/* Song info */}
          <div className="flex flex-wrap gap-4 mt-5 pt-5 border-t border-white/8 relative z-10">
            <div className="flex items-center gap-1.5 text-sm text-white/40">
              <Icon name="Music" size={14} />
              <span>{song.tempo} BPM</span>
            </div>
            <div className="flex items-center gap-1.5 text-sm text-white/40">
              <Icon name="Guitar" size={14} />
              <span>{song.chords.length} аккорда</span>
            </div>
            <div className="flex items-center gap-1.5 text-sm text-white/40">
              <Icon name="Layers" size={14} />
              <span>{song.strumming.length} схемы боёв</span>
            </div>
          </div>
        </div>

        {/* Transposition */}
        <div className="flex items-center gap-3 mb-6 p-4 rounded-xl border border-white/8 bg-white/3 animate-fade-in delay-100">
          <Icon name="SlidersHorizontal" size={16} className="text-white/40 flex-shrink-0" />
          <span className="text-sm text-white/50 flex-shrink-0">Транспозиция:</span>
          <div className="flex items-center gap-2">
            <button onClick={() => setTransposition(Math.max(-6, transposition - 1))}
              className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-white/60 hover:bg-white/10 hover:text-white transition-all text-lg font-bold">
              −
            </button>
            <span className={`w-10 text-center font-oswald font-bold text-lg ${transposition !== 0 ? "text-[var(--neon-orange)]" : "text-white/40"}`}>
              {transposition > 0 ? `+${transposition}` : transposition}
            </span>
            <button onClick={() => setTransposition(Math.min(6, transposition + 1))}
              className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-white/60 hover:bg-white/10 hover:text-white transition-all text-lg font-bold">
              +
            </button>
          </div>
          {transposition !== 0 && (
            <button onClick={() => setTransposition(0)}
              className="ml-1 text-xs text-white/30 hover:text-white/60 transition-colors">
              Сбросить
            </button>
          )}
        </div>

        {/* Tabs */}
        <div className="flex gap-1 mb-6 p-1 rounded-xl bg-white/5 border border-white/8 animate-fade-in delay-200">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg text-sm font-medium transition-all duration-200 ${
                activeTab === tab.key
                  ? "tab-active"
                  : "text-white/50 hover:text-white hover:bg-white/5"
              }`}
            >
              <Icon name={tab.icon} size={15} />
              <span className="hidden sm:inline">{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Chords tab */}
        {activeTab === "chords" && (
          <div className="animate-scale-in">
            <div className="rounded-2xl border border-white/10 bg-card p-6">
              <h2 className="font-oswald text-xl text-white mb-5 flex items-center gap-2">
                <Icon name="Grid3X3" size={18} className="text-[var(--neon-orange)]" />
                Аккорды песни
              </h2>
              <div className="flex flex-wrap gap-5 mb-6">
                {song.chords.map((chord) => {
                  const transposed = transposeChord(chord, transposition);
                  const isActive = activeChord === chord;
                  return (
                    <button
                      key={chord}
                      onClick={() => setActiveChord(isActive ? null : chord)}
                      className="flex flex-col items-center gap-2 group"
                    >
                      <ChordDiagram chordName={transposed} size="md" highlighted={isActive} />
                      {!CHORDS_DATA[transposed] && (
                        <span className="text-xs text-white/30">{transposed}</span>
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Chord fingering tip */}
              {activeChord && (
                <div className="mt-4 p-4 rounded-xl border border-[var(--neon-orange)]/20 bg-[var(--neon-orange)]/5 animate-scale-in">
                  <p className="text-sm text-[var(--neon-orange)] font-medium mb-1">
                    Аккорд {transposeChord(activeChord, transposition)}
                  </p>
                  <p className="text-sm text-white/50">
                    Нажмите на схему, чтобы увидеть детали. Числа на точках — номера пальцев (1 — указательный).
                  </p>
                </div>
              )}

              {/* Large chord view */}
              {activeChord && (
                <div className="mt-6 flex justify-center animate-scale-in">
                  <ChordDiagram chordName={transposeChord(activeChord, transposition)} size="lg" highlighted />
                </div>
              )}
            </div>
          </div>
        )}

        {/* Strumming tab */}
        {activeTab === "strumming" && (
          <div className="animate-scale-in">
            <div className="rounded-2xl border border-white/10 bg-card p-6">
              <h2 className="font-oswald text-xl text-white mb-5 flex items-center gap-2">
                <Icon name="Music2" size={18} className="text-[var(--neon-orange)]" />
                Схемы боёв
              </h2>
              <StrummingPattern patterns={song.strumming} />

              {/* Guitar strings visual */}
              <div className="mt-8 p-5 rounded-xl border border-white/8 bg-white/3">
                <p className="text-xs text-white/30 mb-4 uppercase tracking-wider">Гитарные струны</p>
                <div className="space-y-2">
                  {["E₂ (6)", "A (5)", "D (4)", "G (3)", "B (2)", "E₁ (1)"].map((str, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <span className="text-xs text-white/30 w-12 text-right">{str}</span>
                      <div className="flex-1 h-px string-line opacity-60" style={{ height: `${1 + (5 - i) * 0.3}px` }} />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Lyrics tab */}
        {activeTab === "lyrics" && (
          <div className="animate-scale-in">
            <div className="rounded-2xl border border-white/10 bg-card p-6">
              <h2 className="font-oswald text-xl text-white mb-5 flex items-center gap-2">
                <Icon name="FileText" size={18} className="text-[var(--neon-orange)]" />
                Текст с аккордами
              </h2>
              <div className="space-y-3 font-mono text-base leading-relaxed">
                {song.lyrics.map((line, idx) => (
                  <div key={idx} className="group hover:bg-white/3 rounded-lg px-2 py-1 transition-colors -mx-2">
                    {line.chord && (
                      <div className="text-sm font-oswald font-bold text-[var(--neon-orange)] mb-0.5">
                        {transposeChord(line.chord, transposition)}
                      </div>
                    )}
                    <div className="text-white/80">{line.text}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Related songs */}
        <div className="mt-6 animate-fade-in delay-300">
          <h3 className="font-oswald text-lg text-white mb-4">Похожие песни</h3>
          <div className="flex gap-3 flex-wrap">
            {SONGS.filter((s) => s.id !== song.id && s.genre === song.genre).slice(0, 3).map((s) => (
              <Link
                key={s.id}
                to={`/song/${s.id}`}
                className="flex items-center gap-3 px-4 py-3 rounded-xl border border-white/10 bg-card hover:border-[var(--neon-orange)]/30 hover:bg-[var(--neon-orange)]/5 transition-all group"
              >
                <Icon name="Music" size={14} className="text-white/30 group-hover:text-[var(--neon-orange)] transition-colors" />
                <div>
                  <p className="text-sm text-white font-medium">{s.title}</p>
                  <p className="text-xs text-white/40">{s.artist}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
