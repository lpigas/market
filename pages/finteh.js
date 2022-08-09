import React from "react";

import LayoutFinteh from "../components/layout/finteh/LayoutFinteh";
import { useRouter } from "next/router";
import StandButtons from "../components/atoms/Buttons/standart/StandButtons";

export default function finteh() {
  const router = useRouter()
  return (
    <LayoutFinteh>
      <div className="h-screen flex items-center justify-center flex-col">
        <div className=" bg-cyan-500 flex flex-col h-96 item-center justify-center px-14 rounded-2xl drop-shadow-[0_15px_15px_rgba(0,5,0,0.6)]">
          <div className="my-2">
      <StandButtons size="xxl" value="Reports from orders" onClick={()=> router.push('/finteh/reportorders')} />
          </div>
          <div className="my-2">
      <StandButtons
        size="xxl"
        value="Change balances"
        onClick={() => router.push("/finteh/balance")}
      />
      </div>
      <div className="my-2">
      <StandButtons size="xxl" value="Reports from cash" />
      </div>
      <div className="my-2">
      <StandButtons
        size="xxl"
        value="Add new product"
        onClick={() => router.push("/finteh/newproduct")}
      />
      </div>
      <div className="my-2">
      <StandButtons size="xxl" value="Add new group" />
      </div>
      </div>
      </div>
    </LayoutFinteh>
  );
}
