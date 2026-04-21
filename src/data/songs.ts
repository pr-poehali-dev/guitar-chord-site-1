export interface Chord {
  name: string;
  fingers: Array<{ string: number; fret: number; finger: number } | null>;
  barre?: { fret: number; from: number; to: number };
  openStrings?: number[];
  mutedStrings?: number[];
}

export interface Strumming {
  pattern: string[];
  tempo: string;
  description: string;
}

export interface Song {
  id: string;
  title: string;
  artist: string;
  genre: string;
  difficulty: "easy" | "medium" | "hard";
  key: string;
  tempo: number;
  capo?: number;
  chords: string[];
  strumming: Strumming[];
  lyrics: Array<{ text: string; chord?: string }>;
  tags: string[];
}

export const CHORDS_DATA: Record<string, Chord> = {
  Am: {
    name: "Am",
    fingers: [
      null,
      { string: 2, fret: 1, finger: 1 },
      { string: 3, fret: 2, finger: 2 },
      { string: 4, fret: 2, finger: 3 },
      null,
      null,
    ],
    openStrings: [1, 5],
    mutedStrings: [6],
  },
  C: {
    name: "C",
    fingers: [
      null,
      { string: 2, fret: 1, finger: 1 },
      { string: 4, fret: 2, finger: 2 },
      { string: 5, fret: 3, finger: 3 },
      null,
      null,
    ],
    openStrings: [1, 3],
    mutedStrings: [6],
  },
  G: {
    name: "G",
    fingers: [
      { string: 1, fret: 3, finger: 4 },
      { string: 5, fret: 2, finger: 2 },
      { string: 6, fret: 3, finger: 3 },
      null,
      null,
      null,
    ],
    openStrings: [2, 3, 4],
  },
  F: {
    name: "F",
    fingers: [
      { string: 2, fret: 1, finger: 1 },
      { string: 3, fret: 2, finger: 2 },
      { string: 4, fret: 3, finger: 4 },
      { string: 5, fret: 3, finger: 3 },
      null,
      null,
    ],
    barre: { fret: 1, from: 1, to: 6 },
    mutedStrings: [],
  },
  E: {
    name: "E",
    fingers: [
      null,
      { string: 3, fret: 1, finger: 1 },
      { string: 4, fret: 2, finger: 3 },
      { string: 5, fret: 2, finger: 2 },
      null,
      null,
    ],
    openStrings: [1, 2, 6],
  },
  Em: {
    name: "Em",
    fingers: [
      null,
      null,
      { string: 4, fret: 2, finger: 2 },
      { string: 5, fret: 2, finger: 3 },
      null,
      null,
    ],
    openStrings: [1, 2, 3, 6],
  },
  D: {
    name: "D",
    fingers: [
      { string: 1, fret: 2, finger: 2 },
      { string: 2, fret: 3, finger: 3 },
      { string: 3, fret: 2, finger: 1 },
      null,
      null,
      null,
    ],
    openStrings: [4],
    mutedStrings: [5, 6],
  },
  Dm: {
    name: "Dm",
    fingers: [
      { string: 1, fret: 1, finger: 1 },
      { string: 2, fret: 3, finger: 3 },
      { string: 3, fret: 2, finger: 2 },
      null,
      null,
      null,
    ],
    openStrings: [4],
    mutedStrings: [5, 6],
  },
};

export const SONGS: Song[] = [
  {
    id: "1",
    title: "Звезда по имени Солнце",
    artist: "Виктор Цой",
    genre: "Рок",
    difficulty: "easy",
    key: "Am",
    tempo: 120,
    chords: ["Am", "G", "F", "E"],
    strumming: [
      {
        pattern: ["↓", "↓", "↑", "↓", "↑", "↓"],
        tempo: "медленно",
        description: "Основной бой",
      },
      {
        pattern: ["↓", "×", "↑", "×", "↓", "↑"],
        tempo: "средне",
        description: "Щипок + бой",
      },
    ],
    lyrics: [
      { text: "Белый снег, серый лёд", chord: "Am" },
      { text: "На растрескавшейся земле", chord: "G" },
      { text: "Одеялом лоскутным на ней", chord: "F" },
      { text: "Город в дорожной петле", chord: "E" },
      { text: "А над городом плывут облака", chord: "Am" },
      { text: "Закрывая небесный свет", chord: "G" },
      { text: "А над городом жёлтый дым", chord: "F" },
      { text: "Городу две тысячи лет", chord: "E" },
    ],
    tags: ["рок", "классика", "русский"],
  },
  {
    id: "2",
    title: "Группа крови",
    artist: "Виктор Цой",
    genre: "Рок",
    difficulty: "easy",
    key: "Am",
    tempo: 100,
    chords: ["Am", "F", "C", "G"],
    strumming: [
      {
        pattern: ["↓", "↓", "↑", "↑", "↓"],
        tempo: "медленно",
        description: "Основной ритм",
      },
      {
        pattern: ["↓", "×", "↑", "↓", "×", "↑"],
        tempo: "средне",
        description: "Стандартный бой",
      },
    ],
    lyrics: [
      { text: "Тёплое место, но улицы ждут", chord: "Am" },
      { text: "Отпечатков наших ног", chord: "F" },
      { text: "Звёздная пыль на сапогах", chord: "C" },
      { text: "Мягкое кресло, клетчатый плед", chord: "G" },
      { text: "Не спасут от битв", chord: "Am" },
      { text: "Я ухожу, иду вперёд", chord: "F" },
      { text: "Группа крови на рукаве", chord: "C" },
      { text: "Мой порядковый номер на рукаве", chord: "G" },
    ],
    tags: ["рок", "классика", "русский"],
  },
  {
    id: "3",
    title: "Ничего не происходит",
    artist: "Земфира",
    genre: "Рок",
    difficulty: "medium",
    key: "Em",
    tempo: 90,
    chords: ["Em", "Am", "D", "G"],
    strumming: [
      {
        pattern: ["↓", "↑", "↓", "↑", "↓", "↑"],
        tempo: "медленно",
        description: "Лёгкий перебор",
      },
      {
        pattern: ["↓", "↓", "↑", "↓", "↑"],
        tempo: "средне",
        description: "Основной бой",
      },
    ],
    lyrics: [
      { text: "Ничего не происходит, всё идёт по плану", chord: "Em" },
      { text: "Дальше полный ноль, за ним другой ноль", chord: "Am" },
      { text: "Я смотрю в окно, вижу мокрый асфальт", chord: "D" },
      { text: "В нём отражается весна", chord: "G" },
    ],
    tags: ["рок", "лирика", "русский"],
  },
  {
    id: "4",
    title: "Кукушка",
    artist: "Виктор Цой",
    genre: "Рок",
    difficulty: "easy",
    key: "Dm",
    tempo: 80,
    chords: ["Dm", "Am", "F", "C"],
    strumming: [
      {
        pattern: ["↓", "×", "×", "↑", "↓", "↑"],
        tempo: "медленно",
        description: "Перебор",
      },
      {
        pattern: ["↓", "↓", "↑", "↓"],
        tempo: "средне",
        description: "Простой бой",
      },
    ],
    lyrics: [
      { text: "Подари мне, подари хоть мгновение покоя", chord: "Dm" },
      { text: "Там в тёплом воздухе растает тихая боль", chord: "Am" },
      { text: "Сколько раз упасть придётся, вставать и снова", chord: "F" },
      { text: "И снова куда-то идти", chord: "C" },
    ],
    tags: ["рок", "классика", "лирика"],
  },
  {
    id: "5",
    title: "Чёрный бумер",
    artist: "Серёга",
    genre: "Хип-хоп",
    difficulty: "medium",
    key: "Am",
    tempo: 130,
    chords: ["Am", "E", "G", "F"],
    strumming: [
      {
        pattern: ["↓", "↓", "↑", "×", "↓", "↑"],
        tempo: "быстро",
        description: "Энергичный бой",
      },
    ],
    lyrics: [
      { text: "Чёрный бумер, чёрный бумер", chord: "Am" },
      { text: "Мчится по ночному городу", chord: "E" },
      { text: "Огни витрин мелькают", chord: "G" },
      { text: "Водитель - призрак", chord: "F" },
    ],
    tags: ["хип-хоп", "популярное"],
  },
  {
    id: "6",
    title: "Лирика",
    artist: "Noize MC",
    genre: "Рэп-рок",
    difficulty: "hard",
    key: "G",
    tempo: 140,
    capo: 2,
    chords: ["G", "Em", "C", "D"],
    strumming: [
      {
        pattern: ["↓", "↓", "↑", "↑", "↓", "↑"],
        tempo: "быстро",
        description: "Активный бой",
      },
      {
        pattern: ["↓", "×", "↑", "×", "↓", "↑"],
        tempo: "средне",
        description: "Синкопированный",
      },
    ],
    lyrics: [
      { text: "Мне надо выговориться", chord: "G" },
      { text: "Слова застряли где-то в горле", chord: "Em" },
      { text: "Слова которые боятся", chord: "C" },
      { text: "Быть произнесёнными вслух", chord: "D" },
    ],
    tags: ["рэп-рок", "современное"],
  },
];

export const GENRES = ["Все", "Рок", "Хип-хоп", "Рэп-рок", "Поп", "Блюз"];
export const DIFFICULTIES = ["Все", "easy", "medium", "hard"];
export const DIFFICULTY_LABELS: Record<string, string> = {
  easy: "Начинающий",
  medium: "Средний",
  hard: "Продвинутый",
};
