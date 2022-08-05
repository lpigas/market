import React from "react";
import FullReportsBlock from "../scenes/finteh/fullReportsBlock";
import LayoutFinteh from "../components/layout/finteh/LayoutFinteh";
export default function finteh() {
  return (
    <LayoutFinteh>
      <div className="h-screen flex items-center justify-center">
        <FullReportsBlock />
      </div>
    </LayoutFinteh>
  );
}
