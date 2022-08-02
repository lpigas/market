import React, { useState } from "react";
import MyModal from "../../components/atoms/Modals/modal/MyModal";
import Image from "next/image";

export default function EnterProduct({ data }) {
  const [modalAtcart, setModalAtcart] = useState(true);
  const [cart, setCart] = useState([]);
  const [transit,setTransit] = useState([])

  const transitProduct = (item) => {
    setModalAtcart(true);
    setTransit([item]);
  };
  const cancelAdd  = () =>{
    setTransit([])
    setModalAtcart(false)
  }
  const addCart = () =>{
    setModalAtcart(false)
    setCart([...cart, ...transit])
  }


  return (
    <div
      className="flex min-w-full my-4 flex-wrap "
      style={{
        backgroundImage:
          "url('https://thumbs.dreamstime.com/z/simple-concept-buyer-seller-interaction-white-background-simple-concept-buyer-seller-interaction-115943622.jpg')",
      }}
    >
            <div className="w-full ">
            <Image src="/images/12.png" width={75} height={75}/>
            {cart.length}
              </div>  
      {data.map((item) => (
        <div
          onClick={() => transitProduct(item)}
          key={item._id}
          style={{background: `#${Math.ceil(Math.random() * 10000)}`}}
          className=" w-1/2 h-48 flex border-2 items-center opacity-70 justify-center border-black flex-col hover:opacity-100 hover:text-blue-800"
        >
          <div className="text-2xl">{item.name} </div>
          <div>
            {" "}
            {item.price}USD for 1 {item.measurement}
          </div>
        </div>
      ))}
      <MyModal visible={modalAtcart} setVisible={setModalAtcart} width={300}> 
        <div className="text-center m-4">
          Add in a cart?
        </div>
        <div className="flex p-2">
        <button onClick={cancelAdd} className="w-1/2 text-center border-2 mx-2"> No </button>
        <button onClick={addCart} className="w-1/2 text-center border-2 mx-2"> Yes</button>
        </div>
      </MyModal> 
    </div>
  );
}
