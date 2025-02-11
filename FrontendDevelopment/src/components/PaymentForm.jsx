import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const PaymentForm = () => {
  const [total, setTotal] = useState(0);

  const [first, setFirst] = useState("");
  const [last, setLast] = useState("");
  const [card, setCard] = useState("");
  const [date, setDate] = useState("");

  const [message, setMessage] = useState("");

  const navigate = useNavigate(); // Hook for navigation

  useEffect(() => {
    const getTotal = async () => {
      const response = await fetch("/fabflix/api/cart/total");
      const data = await response.json();
      setTotal(data);
    };
    getTotal();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Validation
    if (!first || !last || !card || !date) {
      setMessage("Please fill in all payment fields.");
      return;
    }

    setMessage("Placing order...");

    try {
      const response = await fetch("/fabflix/api/payment", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({
          first: first,
          last: last,
          card: card.toString(),
          date: date,
        }),
      });

      const data = await response.json();

      // Redirect to home page
      if (data.status === "success") {
        navigate("/success", { replace: true, state: { paymentData: data } });
      }
      setMessage(data.message);
    } catch (error) {
      setMessage("An error occurred. Please try again.");
      console.log("Error:", error);
    }

    console.log(message);
  };

  return (
    <form
      autoComplete="off"
      className="bg-fabflix-primary rounded-lg p-4 w-96 mx-auto shadow-lg"
      onSubmit={handleSubmit}
    >
      <p className="text-center mb-4">
        Total $
        {total &&
          // @ts-ignore
          total.total.toFixed(2)}
      </p>

      {/* First and last name */}
      <label htmlFor="first">First Name</label>
      <input
        id="first"
        placeholder="John"
        value={first}
        onChange={(event) => {
          setFirst(event.target.value);
        }}
        className="w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-lg text-black"
      ></input>
      <br />
      <label htmlFor="last">Last Name</label>
      <input
        id="last"
        placeholder="Doe"
        value={last}
        onChange={(event) => {
          setLast(event.target.value);
        }}
        className="w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-lg text-black"
      ></input>
      <br />
      {/* Credit card info */}
      <label htmlFor="credit">Credit Card Number</label>
      <input
        id="credit"
        placeholder="xxxx-xxxx-xxxx-xxxx"
        value={card}
        onChange={(event) => {
          setCard(event.target.value);
        }}
        type="number"
        className="w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-lg text-black"
      ></input>
      <br />
      <label htmlFor="date">Expiration Date</label>
      <input
        id="date"
        value={date}
        onChange={(event) => {
          setDate(event.target.value);
        }}
        type="date"
        className="w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-lg text-black"
      ></input>
      <br />
      <button
        type="submit"
        className="cursor-pointer me-2 mb-2 rounded-lg bg-fabflix-secondary hover:bg-gray-700 p-4 text-sm font-medium text-white w-full mt-8"
      >
        Place order
      </button>
      {message && <p className="text-red-500">{message}</p>}
    </form>
  );
};
