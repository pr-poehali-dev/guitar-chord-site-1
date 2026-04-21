import { CHORDS_DATA } from "@/data/songs";

interface ChordDiagramProps {
  chordName: string;
  size?: "sm" | "md" | "lg";
  highlighted?: boolean;
}

const FRETS = 5;
const STRINGS = 6;

export default function ChordDiagram({ chordName, size = "md", highlighted = false }: ChordDiagramProps) {
  const chord = CHORDS_DATA[chordName];

  const sizes = {
    sm: { width: 80, height: 95, cellW: 12, cellH: 13, dotR: 5, fontSize: 10, labelSize: 12 },
    md: { width: 110, height: 130, cellW: 16, cellH: 17, dotR: 7, fontSize: 13, labelSize: 16 },
    lg: { width: 150, height: 175, cellW: 22, cellH: 23, dotR: 9, fontSize: 16, labelSize: 22 },
  };

  const s = sizes[size];
  const padLeft = 22;
  const padTop = 28;
  const gridW = (STRINGS - 1) * s.cellW;
  const gridH = (FRETS) * s.cellH;

  if (!chord) {
    return (
      <div
        className="flex flex-col items-center justify-center rounded-xl border border-white/10 bg-white/5"
        style={{ width: s.width, height: s.height }}
      >
        <span style={{ fontSize: s.labelSize }} className="font-oswald text-white/50">{chordName}</span>
        <span className="text-xs text-white/30 mt-1">?</span>
      </div>
    );
  }

  return (
    <div
      className={`flex flex-col items-center transition-all duration-300 ${highlighted ? "scale-105" : ""}`}
    >
      <svg width={s.width} height={s.height} viewBox={`0 0 ${s.width} ${s.height}`}>
        {/* Chord name */}
        <text
          x={s.width / 2}
          y={s.labelSize + 2}
          textAnchor="middle"
          fontSize={s.labelSize}
          fontFamily="Oswald, sans-serif"
          fontWeight="bold"
          fill={highlighted ? "var(--neon-orange)" : "#e0d5c5"}
        >
          {chord.name}
        </text>

        {/* Nut (top bar) */}
        <rect
          x={padLeft}
          y={padTop}
          width={gridW}
          height={3}
          fill={highlighted ? "var(--neon-orange)" : "#c8a96e"}
          rx={1}
        />

        {/* Fret lines */}
        {Array.from({ length: FRETS }).map((_, i) => (
          <line
            key={`fret-${i}`}
            x1={padLeft}
            y1={padTop + (i + 1) * s.cellH}
            x2={padLeft + gridW}
            y2={padTop + (i + 1) * s.cellH}
            stroke="rgba(200,169,110,0.25)"
            strokeWidth={1}
          />
        ))}

        {/* String lines */}
        {Array.from({ length: STRINGS }).map((_, i) => (
          <line
            key={`str-${i}`}
            x1={padLeft + i * s.cellW}
            y1={padTop}
            x2={padLeft + i * s.cellW}
            y2={padTop + gridH}
            stroke="rgba(200,169,110,0.4)"
            strokeWidth={i === 0 || i === STRINGS - 1 ? 1.5 : 1}
          />
        ))}

        {/* Barre */}
        {chord.barre && (
          <rect
            x={padLeft + (chord.barre.from - 1) * s.cellW - s.dotR}
            y={padTop + (chord.barre.fret - 1) * s.cellH + s.cellH / 2 - s.dotR}
            width={(chord.barre.to - chord.barre.from) * s.cellW + s.dotR * 2}
            height={s.dotR * 2}
            rx={s.dotR}
            fill={highlighted ? "var(--neon-orange)" : "#ff7a1a"}
            opacity={0.9}
          />
        )}

        {/* Finger dots */}
        {chord.fingers?.map((finger, idx) => {
          if (!finger) return null;
          const x = padLeft + (finger.string - 1) * s.cellW;
          const y = padTop + (finger.fret - 0.5) * s.cellH;
          return (
            <g key={`f-${idx}`}>
              <circle
                cx={x}
                cy={y}
                r={s.dotR}
                fill={highlighted ? "var(--neon-orange)" : "#ff7a1a"}
              />
              <text
                x={x}
                y={y + s.dotR * 0.4}
                textAnchor="middle"
                fontSize={s.dotR * 1.1}
                fill="#0a0e15"
                fontWeight="bold"
              >
                {finger.finger}
              </text>
            </g>
          );
        })}

        {/* Open & Muted string indicators */}
        {Array.from({ length: STRINGS }).map((_, i) => {
          const strNum = i + 1;
          const x = padLeft + i * s.cellW;
          const y = padTop - 8;
          const isOpen = chord.openStrings?.includes(strNum);
          const isMuted = chord.mutedStrings?.includes(strNum);
          if (isOpen) {
            return (
              <circle key={`o-${i}`} cx={x} cy={y} r={4} stroke="#c8a96e" strokeWidth={1.5} fill="none" />
            );
          }
          if (isMuted) {
            return (
              <g key={`x-${i}`}>
                <line x1={x - 4} y1={y - 4} x2={x + 4} y2={y + 4} stroke="#666" strokeWidth={1.5} />
                <line x1={x + 4} y1={y - 4} x2={x - 4} y2={y + 4} stroke="#666" strokeWidth={1.5} />
              </g>
            );
          }
          return null;
        })}
      </svg>
    </div>
  );
}
