import React, { useEffect, useState } from "react";
import { CartTable } from "../components/CartTable";
import {Link} from "react-router-dom";
import {BgMain} from "../components/Assets/BgMain.jsx";

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
    <div
      className="relative"
      style={{
        backgroundImage:
          "linear-gradient(rgba(3, 20, 50, 0.9), rgba(31, 33, 38, 1))," +
          "url(/fabflix/images/movieBg.jpg)",
        height: "95vh"
      }}
    >
      {cart.length === 0 ? (
        <div className="flex flex-col justify-center items-center text-white text-2xl h-[80vh]">
          <p
            className="flex flex-col justify-center items-center bg-fabflix-primary rounded-lg p-6 w-96 mx-auto shadow-lg text-center">
            <img src="/fabflix/images/4.png"
                 alt="Empty Cart"
                 style={{height: "25vh"}}/>
            <span className="text-3xl font-bold">Your cart is empty!</span>
            <span className="text-lg mt-2">
          <Link to="/" className="text-blue-400 hover:underline">Browse</Link> or{" "}
              <Link to="/search" className="text-blue-400 hover:underline">search</Link> movies to get started.
        </span>
          </p>
        </div>
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
