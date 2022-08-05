import { useRouter } from "next/router";
import React from "react";
import Titels from "./components/Titels";
import StandButton from "../../atoms/Buttons/standart/StandButtons";

export default function LayoutBuy({ children }) {
  const router = useRouter();
  return (
    <Titels>
      <div className="flex justify-between m-2">
        <StandButton
          onClick={() => router.push("/")}
          value="Back to Login"
          size="xxl"
          color="lime"
        />
        <StandButton
          onClick={() => router.push("../finteh")}
          value="Back to Reports Menu"
          size="xxl"
          color="lime"
        ></StandButton>
      </div>
      <div className="w-11/12 m-auto"> {children}</div>
    </Titels>
  );
}
