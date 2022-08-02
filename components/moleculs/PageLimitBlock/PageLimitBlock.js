import { useRouter } from "next/router";
import React from "react";
import StandButtons from "../../atoms/Buttons/standart/StandButtons";

export default function PageLimitBlock({ numPage, totalPage, limitPage }) {
  const router = useRouter();
  const minusPage = () => {
    if (+router.query._page > 1) {
      console.log(+router.query._page - 1 > 1);
      router.push(
        `?_limit=${router.query._limit}&_page=${+router.query._page - 1}`
      );
    }
  };
  const plusPage = () => {
    if (+router.query._page < totalPage) {
      router.push(
        `?_limit=${router.query._limit}&_page=${+router.query._page + 1}`
      );
    }
  };
  const changeLimit = (e) => {
    router.push(`?_limit=${+e}&_page=${+router.query._page}`);
  };
  return (
    <div className="block">
      <div className="flex justify-center text-4xl items-center">
        <StandButtons color="orange" value={"-"} onClick={minusPage} />
        <div className="mx-4">
          {numPage} from {totalPage}
        </div>
        <StandButtons color="orange" value={"+"} onClick={plusPage} />
      </div>
      <div className="flex justify-end p-2">
        <select
          className="border-2 p-2 border-black rounded-xl"
          defaultValue={limitPage}
          onChange={(e) => changeLimit(+e.target.value)}
        >
          <option value={10}> 10 pcs</option>
          <option value={20}> 20 pcs</option>
          <option value={50}> 50 pcs</option>
        </select>
      </div>
    </div>
  );
}
