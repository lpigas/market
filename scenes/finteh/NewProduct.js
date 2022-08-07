import React, { useState, useEffect } from "react";
import AddMany from "./components/AddMany";
import AddOne from "./components/AddOne";
import MyModal from '../../components/atoms/Modals/modal/MyModal'

export default function NewProduct() {
  const [modalAdd, setModalAdd] =useState(false)
  const [addoneMany, setAddoneMany] = useState("one");
  const [groupData, setGroupData] = useState([]);
  const [newproduct, setNewproduct] = useState({
    name: "",
    price: 0,
    group: "",
    measurement: "",
    leftovers: 0,
    id: 0,
  });
  const [arrayallProduct, setArrayallProduct] = useState();
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

  const putNewProduct = async (product) => {
    setModalAdd(true)
    try {
      await fetch(`${process.env.API_HOST}productdata`, {
        method: "POST",
        body: JSON.stringify(product),
      });
      setModalAdd(false)
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

  const addOne = () => {
    valid && putNewProduct(newproduct);
  };

  const addMany= ()=>{
    // console.log(arrayallProduct);
    for(let i = 0; i < arrayallProduct.length; i++){
      console.log(arrayallProduct[i])
      putNewProduct(arrayallProduct[i])
    }
  }

  return (
    <div
      className={`w-3/4 ${
        addoneMany === "one" ? "h-3/5" : "h-3/5"
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
        <div className="h-2/5 text-center ">
          <AddOne
            oneData={newproduct}
            setOneData={setNewproduct}
            group={groupData}
            onClick={addOne}
            valid={valid}
          />
        </div>
      )}
      {addoneMany === "many" && (
        <div className="text-center">
          <AddMany
            oneData={newproduct}
            group={groupData}
            onClick={addMany}
            setArrayallProduct={setArrayallProduct}
          />
        </div>
      )}
      <MyModal visible={modalAdd} setVisible={setModalAdd} width={300}>
        <div className="h-24 flex justify-center items-center">
          Please waiting, add in DB now!!!
          </div>
      </MyModal>
    </div>
  );
}
