import React from "react";
import LayoutFinteh from "../../components/layout/finteh/LayoutFinteh";
import NewProduct from "../../scenes/finteh/NewProduct";
export default function newproduct() {
  return (
    <LayoutFinteh>
      <div className="flex justify-center items-center h-screen">
        <NewProduct />
      </div>
    </LayoutFinteh>
  );
}
