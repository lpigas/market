import React from "react";

export default function MyModal({
  children,
  visible,
  setVisible,
  zindex = 100,
  width = 750,
}) {
  const changeClasses = ["MyModal"];

  if (visible) {
    changeClasses.push("active");
  }

  return (
    <div
      className={changeClasses.join(" ")}
      style={{ zIndex: zindex }}
      onClick={() => setVisible(false)}
    >
      <div
        style={{ width: width }}
        className="MyModalContent"
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
}
