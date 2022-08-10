import React, { useState } from "react";
import StandButtons from "../../components/atoms/Buttons/standart/StandButtons";

export default function Tablereport({ data, totalSum }) {
  console.log(data);
  return (
    <div className="text-center" id="top">
      <div className="text-left">
        <a href="#down" className="w-12 block">
          <StandButtons value={"Down"} />
        </a>
      </div>
      <table className="border-2 border-black w-full m-4">
        <thead className="border-2 border-black h-12">
          <tr className="border-2 border-black h-12 text-xl font-bold">
            <td className="w-1/6 border-4 border-black">Date</td>
            <td className="w-4/6 border-4 border-black">Products in cart</td>
            <td className="w-1/6 border-4 border-black">Total sum</td>
          </tr>
        </thead>
        <tbody className="border-2 border-black w-full ">
          {data ? (
            data.map((item) => (
              <tr key={Math.random()}>
                <td className="border-2 border-black">{item.date}</td>
                <td className="border-2 border-black">
                  {item.cart.map((cartItem) => (
                    <div
                      key={Math.random()}
                      className="flex border-2 w-full flex-wrap"
                    >
                      <div className="w-1/3">{cartItem.name}- </div>
                      <div className="w-1/3">{cartItem.pcs}pcs- </div>
                      <div className="w-1/3">{cartItem.price}USD </div>
                    </div>
                  ))}
                </td>
                <td className="border-2 border-black">{item.totalSum}</td>
              </tr>
            ))
          ) : (
            <tr className="w-full">
              <td colSpan={3}>No orders yet</td>
            </tr>
          )}
        </tbody>
      </table>
      <div id="down" className="text-right m-4 text-3xl">
        Total sum per: {totalSum}
      </div>
      <div className="flex justify-end m-4">
        <div>
          <a href="#top" className="w-12 block">
            <StandButtons value={"UP"} />
          </a>
        </div>
      </div>
    </div>
  );
}
