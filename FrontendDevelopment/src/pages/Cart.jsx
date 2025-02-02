import React, { useEffect, useState } from "react";
import { CartTable } from "../components/CartTable";

export default function Cart() {
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);

  const getCart = async () => {
    const response = await fetch("/fabflix/api/cart");
    const data = await response.json();
    console.log(data);
    setCart(data);
  };

  const getTotal = async () => {
    const response = await fetch("/fabflix/api/cart/total");
    const data = await response.json();
    console.log(data);
    setTotal(data);
  };

  useEffect(() => {
    getCart();
    getTotal();
  }, []);

  return (
    <div className="text-white">
      {cart.length === 0 ? (
        <h1>Nothing in your cart! Add movies to checkout.</h1>
      ) : (
        <CartTable
          cartData={cart}
          setCart={setCart}
          total={total}
          setTotal={setTotal}
        />
      )}
    </div>
  );
}
