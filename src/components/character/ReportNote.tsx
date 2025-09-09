"use client";
import { NoteWithUserSafe } from "@/lib/types";
import { TriangleAlert } from "lucide-react";
import { useState } from "react";
import Modal from "../ui/Modal";
import ReportForm from "../forms/report/ReportForm";

export default function ReportNote({ note }: { note: NoteWithUserSafe }) {
  const [modal, setModal] = useState(false);

  const closeHandler = () => {
    setModal(false);
  };

  return (
    <>
      {modal && (
        <Modal type="report" direction="center" clickHandler={closeHandler}>
          <ReportForm note={note} clickHandler={closeHandler} />
        </Modal>
      )}
      <button
        onClick={() => setModal((prev) => !prev)}
        className={`text-xs ml-auto cursor-pointer flex flex-row items-center gap-2 rounded-md p-1 text-gray-200 bg-gray-900 hover:bg-gray-950 }`}
      >
        <span className="bg-red-500 p-1 rounded-md">
          <TriangleAlert size={15} />
        </span>
      </button>
    </>
  );
}
