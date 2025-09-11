import { Ban } from "lucide-react";

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
        `right-0 top-8 rounded-l-2xl rounded-br-2xl shadow-xl/30`
      } ${
        type === "note" &&
        `right-0 bottom-40 md:bottom-10 md:right-30 rounded-2xl rounded-br-2xl fixed md:w-[600px] shadow-lg/20`
      } p-5 dark:bg-gray-900 bg-gray-100 z-10`}
    >
      {children}
      <button
        onClick={clickHandler}
        className="px-2 py-1 mr-auto text-gray-100 font-bold cursor-pointer hover:bg-red-700 bg-red-800 flex  items-center gap-2 rounded-lg"
      >
        <Ban size={15} strokeWidth={3} /> close
      </button>
    </div>
  );
}
