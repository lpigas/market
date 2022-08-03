import React, { useState, useEffect } from "react";
import MyModal from "../../components/atoms/Modals/modal/MyModal";
import Image from "next/image";
import Cart from "./Cart";
import { createCart } from "../../constants/functions/createCart";
import StandButtons from "../../components/atoms/Buttons/standart/StandButtons";
import { useRouter } from "next/router";

export default function EnterProduct({ data }) {
  const [modalAtcart, setModalAtcart] = useState(false);
  const [modalCart, setModalCart] = useState(false);
  const [modalEndOrder, setModalEndOrder] = useState(false);
  const [cart, setCart] = useState([]);
  const [transit, setTransit] = useState([]);
  const [cartlength, setCartlength] = useState(0);
  const [focus, setFocus] = useState();
  const [totalOrder, setTotalorder] = useState(0);
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== "undefined") {
      const dataCart = JSON.parse(window.localStorage.getItem("Cart"));
      dataCart && setCart(dataCart);
    }
  }, []);
  const changeValueCart = (item, newValue) => {
    let index = cart.findIndex((carts) => {
      if (carts._id === item._id) {
        return carts;
      }
    });
    const cart2 = cart;
    cart2[index].pcs = newValue;
    setCart([...cart2]);
    setFocus(item);
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

  useEffect(() => {
    if (typeof window !== "undefined") {
      const data = window.localStorage.setItem("Cart", JSON.stringify(cart));
    }
    const length = cart.reduce((a, b) => a + b.pcs, 0);
    setCartlength(length);
    const totalprice = cart.reduce((a, b) => a + +b.pcs * +b.price, 0);
    setTotalorder(totalprice);
  }, [cart]);

  const addOrderdb = async (newOrder) => {
    try {
      // add post
      await fetch(`${process.env.API_HOST}orders`, {
        method: "POST",
        body: JSON.stringify(newOrder),
      });
    } catch (error) {
      // stop deleting state
      // alert(error);
    }
  };

  const agreeOrder = () => {
    const date = new Date();
    const now = date.toLocaleString();
    const newOrder = { date: now, cart: cart, totalSum: totalOrder };
    addOrderdb(newOrder);
    changeStock();
    if (typeof window !== "undefined") {
      const data = window.localStorage.setItem("Cart", JSON.stringify([]));
    }
    router.push(`/buyer`);
  };
  const changeStock = async () => {
    setModalEndOrder(true);
    try {
      await fetch(`${process.env.API_HOST}productdata`, {
        method: "PUT",
        body: JSON.stringify(cart),
      });
      setModalEndOrder(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex justify-center min-w-full my-4 flex-wrap ">
      <div className="w-full">
        <Image
          src="/images/12.png"
          width={75}
          height={75}
          onClick={() => setModalCart(true)}
        />
        {cartlength}
      </div>
      {data.map((item) => (
        <div
          disabled={item.leftovers === 0}
          onClick={() => transitProduct(item)}
          key={item._id}
          style={{ background: `#${Math.ceil(Math.random() * 10000)}` }}
          className={` w-2/5 h-48 flex border-2 m-2 items-center justify-center border-black flex-col hover:border-red-500 ${
            item.leftovers === 0 && "opacity-50 hover:border-black"
          }`}
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
            agree={agreeOrder}
            totalOrder={totalOrder}
          />
        </div>
      </MyModal>
      <MyModal visible={modalEndOrder} setVisible={setModalEndOrder}>
        <div className="text-3xl text-center m-6">Order is Accepted !</div>
      </MyModal>
    </div>
  );
}
