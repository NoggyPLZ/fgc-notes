"use client";
import CreateNewsForm from "@/components/forms/createNews/CreateNewsForm";
import { Pen } from "lucide-react";
import { useState } from "react";

export default function CreateNews() {
  const [newsToggle, setNewsToggle] = useState(false);
  return (
    <div>
      <button
        onClick={() => setNewsToggle((prev) => !prev)}
        className="bg-rose-500 text-gray-100 px-4 py-2 rounded-2xl hover:bg-rose-600 cursor-pointer flex gap-2 items-center ml-auto"
      >
        Create News Post
        <Pen size={15} />
      </button>
      {newsToggle && <CreateNewsForm onSuccess={() => setNewsToggle(false)} />}
    </div>
  );
}
