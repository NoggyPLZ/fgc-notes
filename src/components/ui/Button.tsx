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
      className={`rounded-sm text-gray-100 button-clip py-3 px-5 cursor-pointer disabled:bg-gray-500 disabled:cursor-default font-bold flex items-center gap-2
        ${style === "secondary" && "bg-rose-600 hover:bg-rose-700"}
        ${style === "primary" && "bg-cyan-600 hover:bg-cyan-700"}
        ${style === "cancel" && "bg-neutral-600 hover:bg-neutral-700"}
        `}
    >
      {children}
    </button>
  );
}
