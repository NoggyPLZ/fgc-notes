"use client";

import { notationBank } from "@/lib/notationBank";

export default function NotationInputHelper({
  game,
  notationHelper,
}: {
  game: string;
  notationHelper: (symbol: string) => void;
}) {
  const gameInputs = notationBank.filter((notation) => notation.name === game);

  const { rows, cols, inputs, styles } = gameInputs[0];
  const gameRows = gameInputs[0].rows;
  const gameCols = gameInputs[0].cols;
  const notations = gameInputs[0].inputs;
  const notationStyle = gameInputs[0].styles;

  return (
    <div className="flex gap-2">
      <div className="grid grid-rows-3 grid-cols-3 gap-1">
        {["↖", "↑", "↗", "←", "", "→", "↙", "↓", "↘"].map((symbol, i) => (
          <button
            type="button"
            className={`${
              symbol.length === 0
                ? "bg-gray-100 dark:bg-gray-900 cursor-none"
                : "bg-neutral-900 dark:bg-gray-300 dark:text-gray-800 cursor-pointer hover:bg-rose-500"
            } py-2 px-3 font-black text-lg  text-gray-100 font-sans`}
            onClick={() => notationHelper(symbol)}
            key={i}
          >
            {symbol}
          </button>
        ))}
      </div>

      <div className={`grid ${rows} ${cols} gap-1`}>
        {inputs.map((notation, i) => (
          <button
            className={`${
              !styles[notation]
                ? `bg-neutral-900 dark:bg-gray-300 dark:text-gray-800 text-gray-100`
                : `${styles[notation]} text-neutral-900`
            }  p-3 rounded-2xl cursor-pointer hover:bg-rose-500 font-black`}
            type="button"
            key={i}
            onClick={() => notationHelper(notation)}
          >
            {notation}
          </button>
        ))}
      </div>
    </div>
  );
}
