import React from "react";
import StandButtons from "../../../components/atoms/Buttons/standart/StandButtons";

export default function AddOne({ oneData, setOneData, group, onClick, valid }) {
  return (
    <div className="text-left m-5">
      <div className="my-6">
        <input
          className="w-3/4"
          type={"text"}
          placeholder="Enter name product"
          onChange={(e) => setOneData({ ...oneData, name: e.target.value })}
        ></input>
        Enter name product
      </div>
      <div className="my-6">
        <input
          className="w-1/4"
          type={"number"}
          placeholder="Enter product price"
          onChange={(e) => setOneData({ ...oneData, price: +e.target.value })}
        ></input>
        Enter price in USD
      </div>
      <div className="my-6">
        <input
          className="w-1/4"
          type={"text"}
          placeholder="Enter measurement"
          onChange={(e) =>
            setOneData({ ...oneData, measurement: e.target.value })
          }
        ></input>
        Enter measurement
      </div>
      <div className="my-6">
        <input
          className="w-1/4"
          type={"number"}
          placeholder="Enter Stock "
          onChange={(e) =>
            setOneData({ ...oneData, leftovers: +e.target.value })
          }
        ></input>
        Enter Stock
      </div>
      <div className="my-6">
        <input
          className="w-1/4"
          type={"text"}
          placeholder="Enter barcode "
          onChange={(e) => setOneData({ ...oneData, id: e.target.value })}
        ></input>
        Enter barcode
      </div>
      <div className="my-6">
        <select
          value={oneData.group}
          className="w-28"
          onChange={(e) =>
            setOneData({ ...oneData, group: e.target.value.toLowerCase() })
          }
        >
          {group.map((item) => (
            <option key={item.name} value={item.name.toLowerCase()}>
              {item.name}
            </option>
          ))}
        </select>
        Enter group
      </div>
      <div className="my-6 text-right items-end">
        <StandButtons
          disabled={!valid}
          color={`${!valid ? "dark" : "lime"}`}
          value={"Add"}
          onClick={onClick}
        />
      </div>
    </div>
  );
}
