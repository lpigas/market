import { useRouter } from "next/router";
import React from "react";
import Titels from "./components/Titels";
import StandButton from "../../atoms/Buttons/standart/StandButtons";

export default function LayoutBuy({ children }) {
  const router = useRouter();
  return (
    <Titels>
      <div className="flex justify-end m-2">
        <StandButton
          onClick={() => router.push("../buyer")}
          value="Back to Buyer Menu"
          size="xxl"
          color="lime"
        ></StandButton>
      </div>
      <div className="w-11/12 m-auto"> {children}</div>
    </Titels>
  );
}
