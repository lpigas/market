export const createCart = (cart, transit) => {
  let modify = [];
  const newCart = cart;
  if (cart.length === 0) {
    modify = [{ ...transit, pcs: 1 }];
    console.log("cart.length === 0");
  } else {
    for (let i = 0; i < newCart.length; i++) {
      if (cart[i]._id === transit._id) {
        newCart[i].pcs = newCart[i].pcs + 1;
        console.log("++");
        return newCart;
      } else {
        console.log("add new");
      }
      modify = [...cart, { ...transit, pcs: 1 }];
    }
  }

  return modify;
};
