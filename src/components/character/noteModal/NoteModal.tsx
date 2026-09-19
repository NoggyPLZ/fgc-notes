"use client";

import Modal from "@/components/ui/Modal";
import { useState } from "react";
import { CirclePlus } from "lucide-react";

export default function NoteModal({ children }: { children: React.ReactNode }) {
  const [modal, setModal] = useState(false);

  const clickHandler = () => {
    setModal(false);
  };

  return (
    <>
      <div className="shadow-wrap md:right-10 md:absolute fixed bottom-2 md:bottom-10 right-2 ">
        <button
          className="bg-rose-600 text-gray-100 py-3 px-5 button-clip  shadow-md/50 hover:bg-rose-500 cursor-pointer ml-auto  flex items-center text-2xl font-black gap-2"
          onClick={() => setModal((prev) => !prev)}
        >
          New Note <CirclePlus size={30} strokeWidth={3.5} />
        </button>
      </div>
      {modal && (
        <Modal type="note" direction="bottomRight" clickHandler={clickHandler}>
          {children}
        </Modal>
      )}
    </>
  );
}
