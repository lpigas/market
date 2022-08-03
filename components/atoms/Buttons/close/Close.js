import React from "react";

export default function Close({ setVisible }) {
  return (
    <button
      className="w-6 text-center border-2 border-white text-white"
      onClick={() => setVisible(false)}
    >
      X
    </button>
  );
}
