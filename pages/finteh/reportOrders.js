import React, { useEffect, useState } from "react";
import StandButtons from "../../components/atoms/Buttons/standart/StandButtons";
import LayoutFinteh from "../../components/layout/finteh/LayoutFinteh";
import { createDate } from "../../constants/functions/createDate";
import Tablereport from "../../scenes/finteh/Tablereport";

export default function ReportOrders() {
  const [dateOne, setDateOne] = useState();
  const [manyDays, setManyDays] = useState();
  const [orders, setOrders] = useState();
  const totalSum = orders && orders.reduce((a, b) => a + b.totalSum, 0);
  const reset = () => {
    setManyDays();
    setDateOne();
  };
  console.log(totalSum);
  const getOrdersperData = async (data) => {
    try {
      const get = await fetch(`${process.env.API_HOST}orders`, {
        method: "GET",
        headers: { infodate: data },
      });
      const gets = await get.json();

      setOrders(gets.message);
    } catch (error) {
      console.log(error);
    }
  };
  const foundOne = (e) => {
    getOrdersperData(e);
    setDateOne(e);
  };
  console.log(dateOne);

  return (
    <LayoutFinteh>
      <div className="m-8 text-center">
        <StandButtons color="lime" value={"Reset"} onClick={reset} />
      </div>
      {!manyDays && (
        <div className="text-center m-8">
          How many days you need
          <select
            className="border-2 border-black mx-4 "
            onChange={(e) => setManyDays(e.target.value)}
          >
            <option>Your choise</option>
            <option value={`1`}>1 days</option>
            <option value={`14`}>14 days</option>
            <option value={`30`}>1 month</option>
          </select>
        </div>
      )}
      {manyDays === "1" && !dateOne && (
        <div className="text-center m-8">
          <input
            className="border-2 border-black"
            type={"date"}
            onChange={(e) => foundOne(createDate(e.target.value))}
          />
        </div>
      )}
      {manyDays === "1" && dateOne && (
        <Tablereport data={orders} totalSum={totalSum} />
      )}
    </LayoutFinteh>
  );
}
