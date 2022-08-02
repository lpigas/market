import React, { useState } from "react";

export default function EnterProduct({ data }) {
  const [modalAtcart, setModalAtcart] = useState(true);
  const [cart, setCart] = useState([]);

  const addtoCart = (item) => {
    setModalAtcart(true);
    setCart([item]);
  };

  return (
    <div
      className="flex min-w-full my-4 flex-wrap"
      style={{
        backgroundImage:
          "url('https://thumbs.dreamstime.com/z/simple-concept-buyer-seller-interaction-white-background-simple-concept-buyer-seller-interaction-115943622.jpg')",
      }}
    >
      {data.map((item) => (
        <div
          onClick={() => addtoCart(item)}
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
    </div>
  );
}
