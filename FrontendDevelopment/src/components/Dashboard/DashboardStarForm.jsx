import React, { useState } from "react";

export default function DashboardStarForm() {
  const [starName, setStarName] = useState("");
  const [starYear, setStarYear] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Validation: Ensure username and password are filled in
    if (!starName) {
      setMessage("Please enter a star name.");
      return;
    }

    try {
      const response = await fetch("/fabflix/api/add-star", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({
          starName: starName,
          starYear: starYear,
        }),
      });

      const data = await response.json();

      if (data.status === "success") {
        setMessage(data.message);
      }
      setStarName("");
      setStarYear("");
    } catch (error) {
      setMessage("An error occurred. Please try again.");
      console.log("Error:", error);
    }
  };

  return (
    <div className="flex flex-col bg-fabflix-primary w-[300px] p-8 rounded-sm h-full">
      <h1 className="text-center text-xl mb-2">Add a new star</h1>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-0.5"
        autoComplete="off"
      >
        <label htmlFor="name">Star Name</label>
        <input
          id="name"
          value={starName}
          onChange={(event) => {
            setStarName(event.target.value);
          }}
        ></input>
        <label htmlFor="year">Star Birth Year</label>
        <input
          id="year"
          value={starYear}
          onChange={(event) => {
            setStarYear(event.target.value);
          }}
        ></input>
        <button
          type="submit"
          className="cursor-pointer me-2 mb-2 rounded-lg bg-fabflix-secondary hover:bg-gray-700 p-4 text-sm font-medium text-white w-full mt-8"
        >
          Add
        </button>
      </form>
      {message && <p className="text-red-500">{message}</p>}
    </div>
  );
}
