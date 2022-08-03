import React, { useState, useEffect } from "react";
import MyModal from "../../components/atoms/Modals/modal/MyModal";
import Image from "next/image";
import Cart from "./Cart";
import { createCart } from "../../constants/functions/createCart";

export default function EnterProduct({ data }) {
  const [modalAtcart, setModalAtcart] = useState(false);
  const [modalCart, setModalCart] = useState(false);
  const [cart, setCart] = useState([]);
  const [transit, setTransit] = useState([]);
  const [cartlength, setCartlength] = useState(0);
  const [focus, setFocus] = useState()
  useEffect(() => {
    if (typeof window !== "undefined") {
      const dataCart = JSON.parse(window.localStorage.getItem("Cart"));
      dataCart && setCart(dataCart);
    }
  }, []);
  const changeValueCart = (item, newValue) => {
    let index = cart.findIndex((carts) => {
      if(carts._id===item._id){
        return carts
      }
    })
    const cart2 = cart;
    cart2[index].pcs = newValue;
    setCart([...cart2]);
    setFocus(item)
  };
  const deleteProdCart = (item) => {
    const del = cart.filter((i) => i._id !== item._id);
    setCart(del);
  };

  const transitProduct = (item) => {
    setModalAtcart(true);
    setTransit(item);
  };
  const cancelAdd = () => {
    setTransit([]);
    setModalAtcart(false);
  };
  const addCart = () => {
    setModalAtcart(false);
    const newProdCart = createCart(cart, transit);
    setCart([...newProdCart]);
  };
  console.log(cart);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const data = window.localStorage.setItem("Cart", JSON.stringify(cart));
    }
    const length = cart.reduce((a, b) => a + b.pcs, 0);
    setCartlength(length);
  }, [cart]);

  return (
    <div
      className="flex min-w-full my-4 flex-wrap "
      style={{
        backgroundImage:
          "url('https://thumbs.dreamstime.com/z/simple-concept-buyer-seller-interaction-white-background-simple-concept-buyer-seller-interaction-115943622.jpg')",
      }}
    >
      <div className="w-full" onClick={() => setModalCart(true)}>
        <Image src="/images/12.png" width={75} height={75} />
        {cartlength}
      </div>
      {data.map((item) => (
        <div
          onClick={() => transitProduct(item)}
          key={item._id}
          style={{ background: `#${Math.ceil(Math.random() * 10000)}` }}
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
        <div className="text-center m-4">Add in a cart?</div>
        <div className="flex p-2">
          <button
            onClick={cancelAdd}
            className="w-1/2 text-center border-2 mx-2"
          >
            {" "}
            No{" "}
          </button>
          <button onClick={addCart} className="w-1/2 text-center border-2 mx-2">
            {" "}
            Yes
          </button>
        </div>
      </MyModal>
      <MyModal visible={modalCart} setVisible={setModalCart}>
        <div className="m-4">
          <Cart
            data={cart}
            deleteProdCart={deleteProdCart}
            setVisible={setModalCart}
            change={changeValueCart}
            focus={focus}
          />
        </div>
      </MyModal>
    </div>
  );
}
