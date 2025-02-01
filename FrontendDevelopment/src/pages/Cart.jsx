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

  const submitToCart = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch("/fabflix/api/cart", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({
          movieId: movieId,
          movieTitle: movieTitle,
          quantity: quantity,
        }),
      });

      const data = await response.json();
      console.log(data);
      // After the POST completes successfully, refetch the updated cart.
      await getCart();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCart();
  }, []);

  return (
    <div className="text-white">
      <div>
        <button onClick={getCart}>Get cart</button>
        <form onSubmit={submitToCart}>
          <label htmlFor="movieid">Movie ID</label>
          <input
            id="movieid"
            value={movieId}
            onChange={(event) => setMovieId(event.target.value)}
          ></input>
          <label htmlFor="title">Movie Title</label>
          <input
            id="title"
            value={movieTitle}
            onChange={(event) => setMovieTitle(event.target.value)}
          ></input>
          <label htmlFor="quantity">Quantity</label>
          <input
            id="quantity"
            value={quantity}
            onChange={(event) => setQuantity(event.target.value)}
          ></input>
          <button>Submit</button>
        </form>
      </div>
      {cart.length === 0 ? (
        <h1>Nothing in your cart! Add movies to checkout.</h1>
      ) : (
        <CartTable cartData={cart} />
      )}
    </div>
  );
}
