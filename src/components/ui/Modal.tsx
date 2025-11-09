import { CircleX } from "lucide-react";

type DirectionType = "center" | "bottomRight";
type ModalType = "report" | "note";

export default function Modal({
  children,
  direction,
  type,
  clickHandler,
}: {
  children: React.ReactNode;
  direction: DirectionType;
  type: ModalType;
  clickHandler: () => void;
}) {
  return (
    <div
      className={`absolute flex flex-col gap-2 ${
        type === "report" &&
        `right-0 top-8 border-l-10 border-l-rose-500 shadow-xl/30`
      } ${
        type === "note" &&
        `right-0 bottom-30 md:bottom-30 md:right-10 border-l-10 border-l-rose-500 fixed w-[96%] md:w-[600px]`
      } p-5 dark:bg-gray-900 bg-gray-300 z-10 shadow-lg/80`}
    >
      {children}
      <button
        onClick={clickHandler}
        className="px-2 py-1 mr-auto text-gray-100 font-bold cursor-pointer hover:bg-neutral-700 bg-neutral-600 flex  items-center gap-2 rounded-lg"
      >
        <CircleX size={20} strokeWidth={3} /> close
      </button>
    </div>
  );
}
