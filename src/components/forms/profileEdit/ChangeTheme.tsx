"use client";
import { Moon, Sun } from "lucide-react";
import { useState, useEffect } from "react";
import { useTheme } from "next-themes";

export default function ChangeTheme() {
  const [mounted, setMounted] = useState(false);
  const { setTheme, resolvedTheme } = useTheme();

  useEffect(() => setMounted(true), []);

  if (!mounted) {
    return null;
  }

  return (
    <div className="flex flex-row mr-auto bg-gray-900 p-1 rounded-xl">
      <button
        onClick={() => setTheme("light")}
        className={`p-2 cursor-pointer rounded-lg ${
          resolvedTheme === "light"
            ? "bg-gray-100 text-gray-900"
            : "text-gray-100 bg-gray-900"
        }`}
      >
        <Sun size={20} />
      </button>
      <button
        onClick={() => setTheme("dark")}
        className={`p-2 cursor-pointer rounded-lg ${
          resolvedTheme === "dark"
            ? "bg-gray-100 text-gray-900"
            : "text-gray-100 bg-gray-900"
        }`}
      >
        <Moon size={20} />
      </button>
    </div>
  );
}
