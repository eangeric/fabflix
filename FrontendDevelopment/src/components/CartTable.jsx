import React from "react";
import {Link} from "react-router-dom";

export const CartTable = ({cartData, setCart, total, setTotal}) => {
  const updateQuantity = async (movieId, operation) => {
    console.log("updating");
    try {
      const response = await fetch("/fabflix/api/cart", {
        method: "POST",
        headers: {"Content-Type": "application/x-www-form-urlencoded"},
        body: new URLSearchParams({
          movieId: movieId,
          operation: operation,
        }),
      });

      const data = await response.json();
      if (data.status === "success") {
        console.log("refetch");
        // Refetch the updated cart
        await getCart();
        await getTotal();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getCart = async () => {
    const updatedCart = await fetch("/fabflix/api/cart");
    const data = await updatedCart.json();
    setCart(data);
  };

  const getTotal = async () => {
    const response = await fetch("/fabflix/api/cart/total");
    const data = await response.json();
    setTotal(data);
  };

  return (
    <section className="relative">
      <div className="max-w-7xl px-4 mx-auto">
        <div className="grid grid-cols-12">
          <div className="col-span-12 xl:col-span-8 lg:pr-8 py-8">
            <div className="flex items-center justify-between pb-6 border-b border-gray-300">
              <h2 className="font-bold text-3xl text-black">Shopping Cart</h2>
              <h2 className="font-bold text-xl text-gray-600">{cartData.length} Items</h2>
            </div>
            {cartData.map((movie) => (
              <div key={movie.id}
                   className="flex flex-col md:flex-row items-center gap-5 py-6 border-b border-gray-200">
                <div className="w-full md:max-w-[126px]">
                  <img src={movie.image} alt={movie.title} className="mx-auto rounded-xl"/>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-4 w-full">
                  <div className="md:col-span-2 flex flex-col items-center gap-2">
                    <h6 className="font-semibold text-base text-black">{movie.title}</h6>
                    <h6 className="font-medium text-base text-gray-600">${movie.price.toFixed(2)}</h6>
                  </div>
                  <div className="flex items-center justify-center">
                    {movie.quantity > 1 && (
                      <button
                        className="bg-gray-700 px-3 py-1"
                        onClick={() => updateQuantity(movie.id, "decrease")}
                      >
                        -
                      </button>
                    )}
                    <input
                      type="text"
                      className="border-y border-gray-200 text-gray-900 font-semibold text-lg w-12 text-center bg-transparent"
                      value={movie.quantity}
                      readOnly
                    />
                    <button
                      className="bg-gray-700 px-3 py-1"
                      onClick={() => updateQuantity(movie.id, "increase")}
                    >
                      +
                    </button>
                  </div>
                  <div className="flex items-center justify-end h-full">
                    <p className="font-bold text-lg text-gray-600">${(movie.quantity * movie.price).toFixed(2)}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="col-span-12 xl:col-span-4 bg-gray-50 px-6 py-8">
            <h2 className="font-bold text-3xl text-black pb-6 border-b border-gray-300">Order Summary</h2>
            <div className="mt-6">
              <div className="flex items-center justify-between pb-4">
                <p className="text-lg text-black">{cartData.length} Items</p>
                <p className="font-medium text-lg text-black">
                  ${typeof total?.total === "number" ? total.total.toFixed(2) : "0.00"}
                </p>
              </div>
              <button className="w-full bg-gray-700 rounded py-3 text-lg text-white hover:bg-gray-800">
                <Link to="/payment">Proceed to Payment</Link>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
