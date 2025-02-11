import React from "react";
import { Link, useLocation } from "react-router-dom";
import OrderTable from "../components/OrderTable";

export default function Success() {
  const location = useLocation();
  const paymentData = location.state?.paymentData;
  if (paymentData) {
    console.log(paymentData);
    return (
      <div className="flex flex-col justify-center items-center text-white text-2xl h-[80vh]">
        <p className="flex flex-col justify-center items-center bg-fabflix-primary rounded-lg p-6 w-96 mx-auto shadow-lg">
          Your order has been placed!
          <span className="text-lg mt-2 text-center">
            View it below or continue to{" "}
            <Link to="/" className="text-blue-400 hover:underline">
              Browse
            </Link>{" "}
            or{" "}
            <Link to="/search" className="text-blue-400 hover:underline">
              search
            </Link>{" "}
            more movies.
          </span>
        </p>
        <OrderTable paymentData={paymentData} />
      </div>
    );
  }
}
