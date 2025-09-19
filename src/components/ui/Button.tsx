"use client";

type ButtonProps = {
  children: React.ReactNode;
  onClick?: (e: any) => void;
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
        ${style === "primary" && "bg-rose-500 hover:bg-rose-600"}
        ${style === "secondary" && "bg-cyan-500 hover:bg-cyan-600"}
        ${style === "cancel" && "bg-neutral-500 hover:bg-neutral-600"}
        `}
    >
      {children}
    </button>
  );
}
