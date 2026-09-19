"use client";
import CreateNewsForm from "@/components/forms/createNews/CreateNewsForm";
import Button from "@/components/ui/Button";
import { Pen } from "lucide-react";
import { useState } from "react";

export default function CreateNews() {
  const [newsToggle, setNewsToggle] = useState(false);
  return (
    <div>
      <Button onClick={() => setNewsToggle((prev) => !prev)} style="secondary">
        Create News Post
        <Pen size={15} />
      </Button>
      {newsToggle && <CreateNewsForm onSuccess={() => setNewsToggle(false)} />}
    </div>
  );
}
