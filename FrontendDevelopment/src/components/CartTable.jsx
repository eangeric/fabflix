import React from "react";

export const CartTable = ({ cartData, setCart }) => {
  const updateQuantity = async (movieId, operation) => {
    console.log("updating");
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
        console.log("refetch");
        // Refetch the updated cart
        const updatedCart = await fetch("/fabflix/api/cart");
        const data = await updatedCart.json();
        setCart(data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const deleteFromCart = async (movieId) => {
    console.log("deleting");
    try {
      const response = await fetch("/fabflix/api/cart", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({
          movieId: movieId,
          operation: "delete",
        }),
      });

      const data = await response.json();
      if (data.status === "success") {
        console.log("refetch");
        // Refetch the updated cart after deleting an item
        const updatedCart = await fetch("/fabflix/api/cart");
        const data = await updatedCart.json();
        setCart(data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="max-w-screen-xl flex items-center justify-between mx-auto p-4 relative overflow-x-auto shadow-md sm:rounded-lg">
      <table className="w-full text-lg text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-lg text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-1">
              Title
            </th>
            <th scope="col" className="px-6 py-1">
              Quantity
            </th>
            <th scope="col" className="px-6 py-1">
              Price
            </th>
            <th scope="col" className="px-6 py-1">
              Total Price
            </th>
            <th scope="col" className="px-6 py-1">
              Delete
            </th>
          </tr>
        </thead>
        <tbody>
          {cartData.map((movie) => {
            return (
              <tr key={movie.id}>
                {/* Use a unique key here */}
                <td className="px-6 py-1">{movie.title}</td>
                <td className="px-6 py-1">
                  <button
                    className="bg-gray-700 p-1"
                    onClick={() => {
                      updateQuantity(movie.id, "decrease");
                    }}
                  >
                    -
                  </button>
                  <span className="mx-1">{movie.quantity}</span>
                  <button
                    className="bg-gray-700 p-1"
                    onClick={() => {
                      updateQuantity(movie.id, "increase");
                    }}
                  >
                    +
                  </button>
                </td>
                <td className="px-6 py-1">{movie.price}</td>
                <td className="px-6 py-1">
                  {(movie.quantity * movie.price).toFixed(2)}
                </td>
                <td className="px-6 py-1">
                  <button
                    className="bg-gray-700 p-1"
                    onClick={() => {
                      updateQuantity(movie.id, "delete");
                    }}
                  >
                    {" "}
                    Delete
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
