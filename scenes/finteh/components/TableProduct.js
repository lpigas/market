import React from "react";

export default function TableProduct({ data, chahgeData }) {
  return (
    <table className="border-2 bg-blue-600 border-black">
      <thead className="p-2">
        <tr>
          <td className="border-2 text-center w-1/12">Id</td>
          <td className="border-2  text-center w-4/12">Name</td>
          <td className="border-2 text-center w-1/12">Price</td>
          <td className="border-2 text-center w-1/12">Measurement</td>
          <td className="border-2 text-center w-1/12">Leftovers</td>
        </tr>
      </thead>
      <tbody>
        {data &&
          data.map((item, index) => (
            <tr key={Math.random()}>
              <td className="border-2 text-center w-1/12">{item.id}</td>
              <td className="border-2 text-center w-6/12">{item.name}</td>
              <td className="border-2 text-center w-2/12">{item.price}</td>
              <td className="border-2 text-center w-1/12">
                {item.measurement}
              </td>
              <td className="border-2 text-center w-2/12 ">
                <div className="flex justify-center">
                  {item.leftovers}
                  <input
                    type={"number"}
                    className={"w-1/2 mx-3"}
                    onChange={(e) => chahgeData(index, +e.target.value)}
                  ></input>
                </div>
              </td>
            </tr>
          ))}
      </tbody>
    </table>
  );
}
