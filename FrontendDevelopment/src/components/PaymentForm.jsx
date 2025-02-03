import React, { useEffect, useState } from "react";

export const PaymentForm = () => {
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const getTotal = async () => {
      const response = await fetch("/fabflix/api/cart/total");
      const data = await response.json();
      setTotal(data);
    };
    getTotal();
  }, []);

  return (
    <form className="bg-fabflix-primary rounded-lg p-6 w-96 mx-auto shadow-lg">
      <p>
        Total $
        {total &&
          // @ts-ignore
          total.total.toFixed(2)}
      </p>
      <div>
        {/* First and last name */}
        <label htmlFor="first">First Name</label>
        <input id="first"></input>
        <br />
        <label htmlFor="last">Last Name</label>
        <input id="last"></input>
        <br />
        {/* Credit card info */}
        <label htmlFor="credit">Credit Card Number</label>
        <input id="credit"></input>
        <br />
        <label htmlFor="date">Expiration Date</label>
        <input id="date"></input>
      </div>
    </form>
  );
};
