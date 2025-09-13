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
        className={`text-xs ml-auto cursor-pointer flex flex-row items-center gap-1 rounded-md p-1 text-red-500 }`}
      >
        <TriangleAlert size={15} />
        Report
      </button>
    </>
  );
}
