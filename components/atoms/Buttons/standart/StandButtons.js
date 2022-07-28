import React from "react";

const sizes = {
  sm: "w-12 h-12",
  xl: "w-24 h-12",
  xxl: "w-48 h-12",
};
const colors = {
  blue: "bg-blue-700 border-2 rounded-xl border-white",
  red: "bg-red-700 border-2 rounded-xl border-white",
  orange: "bg-orange-600 border-2 rounded-xl border-white",
  amber: "bg-amber-400 border-2 rounded-xl border-white",
  lime: "bg-lime-600 border-2 rounded-xl border-white",
};

export default function StandButtons({
  value,
  size = "xl",
  color = 'blue',
  onClick,
}) {
  return (
    <div>
      <button className={`${sizes[size]} ${colors[color]}`} onClick={onClick}>
        {value}
      </button>
    </div>
  );
}
