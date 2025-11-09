type GameNotation = {
  name: string;
  inputs: string[];
  styles: Record<string, string>;
  rows: string;
  cols: string;
};

export const notationBank: GameNotation[] = [
  {
    name: "sf6",
    inputs: [
      "DRC",
      "DR",
      "SJC",
      "DI",
      "LP",
      "MP",
      "HP",
      "PP",
      "LK",
      "MK",
      "HK",
      "KK",
    ],
    styles: {
      LK: "bg-sky-400",
      LP: "bg-sky-400",
      MP: "bg-yellow-400",
      MK: "bg-yellow-400",
      HP: "bg-red-400",
      HK: "bg-red-400",
    },
    rows: "grid-rows-3",
    cols: "grid-cols-4",
  },
  {
    name: "cotw",
    inputs: ["A", "C", "A+C", "REV+C", "B", "D", "B+D", "REV+D"],
    styles: {
      A: "bg-red-500",
      B: "bg-yellow-500",
      C: "bg-green-500",
      D: "bg-blue-500",
    },
    rows: "grid-rows-2",
    cols: "grid-cols-4",
  },
  {
    name: "2xko",
    inputs: ["IAD", "SJ", "SJC", "L", "M", "H", "S1", "S2", "T"],
    styles: {
      L: "bg-purple-400",
      M: "bg-purple-500",
      H: "bg-purple-600",
      S1: "bg-sky-400",
      S2: "bg-red-500",
      T: "bg-lime-400",
    },
    rows: "grid-rows-3",
    cols: "grid-cols-3",
  },
];
