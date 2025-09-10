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
        type === "report" && `right-0 top-16 rounded-l-2xl rounded-br-2xl`
      } p-5 dark:bg-gray-900 bg-gray-100 shadow-xl/30 z-10`}
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
