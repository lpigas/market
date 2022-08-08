import React, { useEffect, useState } from "react";
import StandButtons from "../../components/atoms/Buttons/standart/StandButtons";
import TableProduct from "./components/TableProduct";

export default function Balances() {
  const [group, setGroup] = useState();
  const [groupFound, setGroupFound] = useState();
  const [productData, setProductData] = useState();
  const [found, setFound] = useState();

  const getbuyerGroup = async () => {
    try {
      // Delete post
      const get = await fetch(`${process.env.API_HOST}group`, {
        method: "GET",
      });
      // reload the page
      const gets = await get.json();
      setGroup(gets.message);
    } catch (error) {
      alert(error);
    }
  };
  const getProductData = async (groupFound) => {
    try {
      // Delete post
      const get = await fetch(`${process.env.API_HOST}productdatafin`, {
        method: "GET",
        headers: { infogroup: groupFound },
      });
      // reload the page
      const gets = await get.json();
      setProductData(gets.message.data);
    } catch (error) {
      alert(error);
    }
  };

  useEffect(() => {
    getbuyerGroup();
  }, []);
  const changeData = (index, value) => {
    const data = productData;
    data[index].leftovers = value;
    setProductData(data);
  };

  useEffect(() => {
    groupFound && getProductData(groupFound);
  }, [groupFound]);

  const foundProduct = async () => {
    console.log(found);
    try {
      const get = await fetch(`${process.env.API_HOST}found`, {
        method: "GET",
        headers: { data: found, group: groupFound },
      });
      // reload the page
      const gets = await get.json();
      setProductData(gets.message.data);
    } catch (error) {
      console.log(error);
    }
  };

  const sendNewStok = async () => {
    try {
      await fetch(`${process.env.API_HOST}productdatafin`, {
        method: "PUT",
        body: JSON.stringify(productData),
      });
      window.location.reload();
    } catch (e) {
      console.log(e);
    }
  };

  const changeBalsnce = () => {
    sendNewStok();
  };
  const founds = () => {
    foundProduct();
  };

  return (
    <div className=" h-screen flex justify-center">
      <div className="w-10/12 h-5/6 m-4">
        <select
          onChange={(e) => setGroupFound(e.target.value.toLowerCase())}
          className={`border-2 p-2 border-black`}
        >
          <option>Groupe</option>
          {group &&
            group.map((item) => (
              <option key={item.name} value={item.name}>
                {item.name}
              </option>
            ))}
        </select>
        <div className="flex justify-center items-center" id="found">
          <input
            className="h-6  border-2 border-black mx-6"
            onChange={(e) => setFound(e.target.value)}
          ></input>
          <StandButtons onClick={founds} value={"Found"} />{" "}
        </div>
        {productData && (
          <div className="border-4 my-4 border-black rounded-2xl">
            <TableProduct chahgeData={changeData} data={productData} />
          </div>
        )}
        <div className=" text-right">
          <StandButtons
            value={"Change "}
            color="blue"
            onClick={changeBalsnce}
          />
        </div>
      </div>
    </div>
  );
}
