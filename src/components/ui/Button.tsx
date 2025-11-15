"use client";

type ButtonProps = {
  children: React.ReactNode;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  value?: string;
  style: "primary" | "secondary" | "cancel";
};

export default function Button({
  children,
  onClick,
  type = "button",
  disabled = false,
  value,
  style = "primary",
}: ButtonProps) {
  return (
    <button
      onClick={onClick}
      type={type}
      disabled={disabled}
      value={value}
      className={`rounded-2xl text-gray-100 p-3 cursor-pointer disabled:bg-gray-500 disabled:cursor-default font-bold
        ${style === "secondary" && "bg-rose-600 hover:bg-rose-700"}
        ${style === "primary" && "bg-cyan-600 hover:bg-cyan-700"}
        ${style === "cancel" && "bg-neutral-600 hover:bg-neutral-700"}
        `}
    >
      {children}
    </button>
  );
}
