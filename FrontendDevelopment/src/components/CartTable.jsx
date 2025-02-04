import React from "react";
import { Link } from "react-router-dom";

export const CartTable = ({ cartData, setCart, total, setTotal }) => {
  const updateQuantity = async (movieId, operation) => {
    try {
      const response = await fetch("/fabflix/api/cart", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({
          movieId: movieId,
          operation: operation,
        }),
      });

      const data = await response.json();
      if (data.status === "success") {
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
    <section className="w-full flex justify-center py-20">
      <div className="max-w-7xl w-4/5 bg-fabflix-primary backdrop-blur-lg rounded-lg shadow-lg p-6">
        <div className="grid grid-cols-12 gap-8">
          {/* Left Cart Items */}
          <div className="col-span-12 xl:col-span-8 p-6 bg-white rounded-lg shadow-md">
            <div className="flex items-center justify-between pb-6 border-b border-fabflix-secondary">
              <h2 className="font-bold text-3xl text-black">Shopping Cart</h2>
            </div>

            {cartData.map((movie) => (
              <div
                key={movie.id}
                className="flex flex-col md:flex-row items-center justify-between gap-5 py-6 border-b border-gray-300"
              >
                {/* Movie Info */}
                <div className="flex flex-col items-start md:w-1/3">
                  <h6 className="font-semibold text-base text-black">
                    {movie.title}
                  </h6>
                  <h6 className="font-medium text-base text-gray-700">
                    ${movie.price.toFixed(2)}
                  </h6>
                </div>

                {/* Quantity Controls */}
                <div className="flex items-center justify-center bg-white p-2 rounded-lg shadow">
                  {movie.quantity > 1 && (
                    <button
                      className="bg-fabflix-secondary text-white px-3 py-1 rounded-l-lg hover:bg-gray-700"
                      onClick={() => updateQuantity(movie.id, "decrease")}
                    >
                      -
                    </button>
                  )}
                  <input
                    type="text"
                    className="border-y border-gray-300 text-gray-900 font-semibold text-lg w-12 text-center bg-white"
                    value={movie.quantity}
                    readOnly
                  />
                  <button
                    className="bg-fabflix-secondary text-white px-3 py-1 rounded-r-lg hover:bg-gray-700"
                    onClick={() => updateQuantity(movie.id, "increase")}
                  >
                    +
                  </button>
                </div>

                {/* Total Price */}
                <div className="flex items-center gap-4">
                  <p className="font-bold text-lg text-gray-800">
                    Total: ${(movie.quantity * movie.price).toFixed(2)}
                  </p>
                  <button
                    className="bg-red-400 text-white px-3 py-1 rounded hover:bg-red-500"
                    onClick={() => updateQuantity(movie.id, "delete")}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Right Order Summary */}
          <div className="col-span-12 xl:col-span-4 bg-white px-8 py-10 rounded-lg shadow-lg">
            <h2 className="font-bold text-3xl text-black pb-6 border-b border-fabflix-secondary">
              Order Summary
            </h2>
            <div className="mt-6">
              <div className="flex items-center justify-between pb-4">
                <p className="text-lg text-black">Order Total</p>
                <p className="font-medium text-lg text-black">
                  $
                  {typeof total?.total === "number"
                    ? total.total.toFixed(2)
                    : "0.00"}
                </p>
              </div>
              <button className="w-full bg-fabflix-secondary rounded py-3 text-lg text-white hover:bg-gray-700">
                <Link to="/payment">Proceed to Payment</Link>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
