import React from "react";

const sizes = {
  sm: "w-12 h-12",
  xl: "w-24 h-12",
  xxl: "w-48 h-12",
};
const colors = {
  blue: "bg-blue-400 border-2 rounded-xl border-white active:bg-gray-500",
  red: "bg-red-700 border-2 rounded-xl border-white active:bg-gray-500 ",
  orange: "bg-orange-600 border-2 rounded-xl border-white active:bg-gray-500",
  amber: "bg-amber-400 border-2 rounded-xl border-white active:bg-gray-500",
  lime: "bg-lime-600 border-2 rounded-xl border-white active:bg-gray-500 drop-shadow-[0_15px_15px_rgba(0,5,0,0.6)]",
  dark: "bg-gray-600 border-2 rounded-xl border-white text-white",
};

export default function StandButtons({
  value,
  size = "xl",
  color = "blue",
  onClick,
  disabled = false,
}) {
  return (
    <div>
      <button
        disabled={disabled}
        className={
          disabled
            ? `${sizes[size]} ${colors["dark"]}`
            : `${sizes[size]} ${colors[color]}`
        }
        onClick={onClick}
      >
        {value}
      </button>
    </div>
  );
}
