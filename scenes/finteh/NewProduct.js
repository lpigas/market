import React, { useState, useEffect } from "react";
import AddOne from "./components/AddOne";

export default function NewProduct() {
  const [addoneMany, setAddoneMany] = useState("one");
  const [groupData, setGroupData] = useState([]);
  const [newproduct, setNewproduct] = useState({
    name: "",
    price: 1,
    group: "",
    measurement: "",
    leftovers: 0,
    id: 12,
  });
  const [valid, setValid] = useState(
    newproduct.leftovers > 0 &&
      newproduct.name.length > 0 &&
      newproduct.price > 0 &&
      newproduct.group.length > 0 &&
      newproduct.measurement.length > 0 &&
      newproduct.id.length > 0
  );

  const getbuyerGroup = async () => {
    try {
      // Delete post
      const get = await fetch(`${process.env.API_HOST}group`, {
        method: "GET",
      });
      // reload the page
      const gets = await get.json();
      setGroupData(gets.message);
    } catch (error) {
      alert(error);
    }
  };
  useEffect(() => {
    getbuyerGroup();
  }, []);

  const putNewProduct = async () => {
    try {
      await fetch(`${process.env.API_HOST}productdata`, {
        method: "POST",
        body: JSON.stringify(newproduct),
      });
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    setValid(
      newproduct.leftovers > 0 &&
        newproduct.name.length > 0 &&
        newproduct.price > 0 &&
        newproduct.group.length > 0 &&
        newproduct.measurement.length > 0 &&
        newproduct.id.length > 0
    );
  }, [newproduct]);
  const aded = () => {
    valid && putNewProduct();
  };

  console.log(newproduct);
  return (
    <div
      className={`w-3/4 ${
        addoneMany === "one" ? "h-4/6" : "h-3/5"
      } bg-blue-500 rounded-3xl  border-2 block overflow-auto`}
    >
      <div className="flex">
        <div
          onClick={() => setAddoneMany("one")}
          className={`cursor-default text-center border-2 w-24 rounded-tl-3xl ${
            addoneMany === "one" && "border-b-0 bg-red-500"
          }`}
        >
          Add one
        </div>
        <div
          onClick={() => setAddoneMany("many")}
          className={`cursor-default text-center border-2 w-24 ${
            addoneMany === "many" && "border-b-0 bg-red-500"
          }`}
        >
          Add many
        </div>
      </div>
      {addoneMany === "one" && (
        <div className="h-3/5 text-center ">
          <AddOne
            oneData={newproduct}
            setOneData={setNewproduct}
            group={groupData}
            onClick={aded}
            valid={valid}
          />
        </div>
      )}
      {addoneMany === "many" && (
        <div className="h-3/5 text-center"> add many</div>
      )}
    </div>
  );
}
