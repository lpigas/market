import { useRouter } from "next/router";
import React from "react";
import StandButtons from "../../components/atoms/Buttons/standart/StandButtons";

export default function FullReportsBlock() {
  const router = useRouter();
  return (
    <div className="w-1/4 h-3/4 bg-blue-500 flex p-4 rounded-3xl justify-center flex-wrap border-2 border-black">
      <StandButtons size="xxl" value="Reports from orders" />
      {/* <StandButtons
        size="xxl"
        value="Change balances"
        onClick={() => router.push("/finteh/balance")}
      />
      <StandButtons size="xxl" value="Reports from cash" />
      <StandButtons
        size="xxl"
        value="Add new product"
        onClick={() => router.push("/finteh/newproduct")}
      /> */}
      <StandButtons size="xxl" value="Add new group" />
    </div>
  );
}
