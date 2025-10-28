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
      <button
        className="bg-rose-600 text-gray-100 py-3 px-5 md:bottom-10 md:right-10 md:absolute rounded-2xl shadow-md/50 border-2 border-gray-900 hover:bg-rose-500 cursor-pointer hover:border-2 ml-auto fixed bottom-2 right-2 flex items-center text-2xl font-black gap-2"
        onClick={() => setModal((prev) => !prev)}
      >
        New Note <CirclePlus size={30} strokeWidth={3.5} />
      </button>
      {modal && (
        <Modal type="note" direction="bottomRight" clickHandler={clickHandler}>
          {children}
        </Modal>
      )}
    </>
  );
}
