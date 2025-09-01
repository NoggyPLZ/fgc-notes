"use client";

import Button from "@/components/ui/Button";
import { useState } from "react";

export default function ChangeName() {
  const [isOpen, setIsOpen] = useState(false);
  const [newName, setNewName] = useState("");

  const handleToggle = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <>
      <Button style="primary" type="button" onClick={handleToggle}>
        Change Name
      </Button>
      {isOpen && (
        <form className="flex flex-row items-center gap-5 mt-5">
          <label htmlFor="newName">New Name:</label>
          <input
            name="newName"
            className="border-1 border-gray-300 rounded-2xl p-2"
          />
          <Button style="primary" type="submit">
            Submit
          </Button>
        </form>
      )}
    </>
  );
}
