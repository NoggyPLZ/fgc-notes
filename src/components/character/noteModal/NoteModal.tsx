"use client";

import Modal from "@/components/ui/Modal";
import { PenBox } from "lucide-react";
import { useState } from "react";

export default function NoteModal({ children }: { children: React.ReactNode }) {
  const [modal, setModal] = useState(false);

  const clickHandler = () => {
    setModal(false);
  };

  return (
    <>
      <button
        className="bg-rose-600 text-gray-100 p-2 md:bottom-10 md:right-10 md:absolute rounded-2xl shadow-md/50 border-2 border-gray-900 hover:bg-rose-700 cursor-pointer hover:p-2 hover:border-0 ml-auto fixed bottom-2 right-2"
        onClick={() => setModal((prev) => !prev)}
      >
        <PenBox size={50} />
      </button>
      {modal && (
        <Modal type="note" direction="bottomRight" clickHandler={clickHandler}>
          {children}
        </Modal>
      )}
    </>
  );
}
