import React, { useEffect, useState } from "react";
import { CartTable } from "../components/CartTable";

export default function Cart() {
  const [movieId, setMovieId] = useState("");
  const [movieTitle, setMovieTitle] = useState("");
  const [quantity, setQuantity] = useState("");
  const [cart, setCart] = useState([]);

  const getCart = async () => {
    const response = await fetch("/fabflix/api/cart");
    const data = await response.json();
    console.log(data);
    setCart(data);
  };

  useEffect(() => {
    getCart();
  }, []);

  return (
    <div className="text-white">
      {cart.length === 0 ? (
        <h1>Nothing in your cart! Add movies to checkout.</h1>
      ) : (
        <CartTable cartData={cart} />
      )}
    </div>
  );
}
