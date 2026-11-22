"use client";

import { useEffect, useId, useRef } from "react";
import { CircleX } from "lucide-react";

type DirectionType = "center" | "bottomRight";

const positions: Record<DirectionType, string> = {
  center: "m-auto",
  bottomRight: "m-auto md:mr-10 md:mb-30 md:max-h-[calc(100dvh-9.5rem)]",
};

export default function Modal({
  children,
  title,
  direction = "center",
  clickHandler,
}: {
  children: React.ReactNode;
  title: string;
  direction?: DirectionType;
  clickHandler: () => void;
}) {
  const ref = useRef<HTMLDialogElement>(null);
  const titleId = useId();

  useEffect(() => {
    const dialog = ref.current;
    // guard: Strict Mode runs effects twice in dev
    if (dialog && !dialog.open) dialog.showModal();
  }, []);

  return (
    <dialog
      ref={ref}
      aria-labelledby={titleId}
      onClose={clickHandler}
      className={`${positions[direction]} open:flex flex-col gap-2 w-[calc(100%-2rem)] max-w-[600px] max-h-[calc(100dvh-2rem)] overflow-y-auto text-inherit  bg-gray-300 dark:bg-gray-900 shadow-lg/80 backdrop:bg-black/50 shadow-sm outer-clip relative`}
    >
      <div className="clip"></div>
      <div className="flex justify-between border-l-rose-500 bg-neutral-900 border-l-4 p-5 text-neutral-100 pr-10">
        <h2 id={titleId} className="text-2xl font-black">
          {title}
        </h2>
        <button
          type="button"
          onClick={() => ref.current?.close()}
          className="px-2 py-1 text-gray-100 font-bold cursor-pointer hover:bg-neutral-700 bg-neutral-600 flex items-center gap-2 rounded-lg"
        >
          <CircleX aria-hidden="true" size={20} strokeWidth={3} /> Close
        </button>
      </div>
      <div className="p-5">{children}</div>
    </dialog>
  );
}
