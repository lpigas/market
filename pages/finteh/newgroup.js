import React, { useState } from "react";
import LayoutFinteh from "../../components/layout/finteh/LayoutFinteh";
import NewGroup from "../../scenes/finteh/NewGroup";

export default function newgroup() {
  const [newGroupData, setNewGroupData] = useState();

  return (
    <LayoutFinteh>
      <div className="flex justify-center mt-20">
        <div className="bg-blue-500 w-1/2 p-6 rounded-2xl drop-shadow-[0_15px_15px_rgba(0,5,0,0.6)]">
          <NewGroup data={newGroupData} setData={setNewGroupData} />
        </div>
      </div>
    </LayoutFinteh>
  );
}
