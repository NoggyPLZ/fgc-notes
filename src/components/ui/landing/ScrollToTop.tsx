"use client";

export default function ScrollToTop() {
  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className="rounded-sm text-gray-100 p-3 cursor-pointer disabled:bg-gray-500 disabled:cursor-default font-bold bg-rose-600 hover:bg-rose-700 border-1 border-rose-400 mt-5"
    >
      <p>Head to Sign Up</p>
    </button>
  );
}
