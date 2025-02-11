import React from "react";

export default function OrderTable({ paymentData }) {
  return (
    <div className="flex flex-col items-center bg-fabflix-primary p-6 mt-16 rounded-lg shadow-lg">
      <p className="text-2xl font-semibold text-white mb-4">
        Total: {paymentData.salesInfo.totalPrice}
      </p>
      <table className="table-fixed border-collapse border border-gray-500 text-white w-[75vw]">
        <thead>
          <tr className="bg-gray-700">
            <th className="border border-gray-500 px-4 py-2">Sale ID</th>
            <th className="border border-gray-500 px-4 py-2">Movie Title</th>
            <th className="border border-gray-500 px-4 py-2">Quantity</th>
          </tr>
        </thead>
        <tbody>
          {paymentData.salesInfo.movies.map((movie) => {
            return (
              <tr key={movie.saleId} className="bg-gray-900 text-center">
                <td className="border border-gray-500 px-4 py-2">
                  {movie.saleId}
                </td>
                <td className="border border-gray-500 px-4 py-2">
                  {movie.title}
                </td>
                <td className="border border-gray-500 px-4 py-2">
                  {movie.quantity}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
