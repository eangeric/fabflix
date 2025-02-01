import React from "react";

export const CartTable = ({ cartData }) => {
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
                <td className="px-6 py-1">{movie.quantity}</td>
                <td className="px-6 py-1">{movie.price}</td>
                <td className="px-6 py-1">
                  {(movie.quantity * movie.price).toFixed(2)}
                </td>
                <td className="px-6 py-1">Delete</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
