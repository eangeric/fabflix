import React, { useState } from "react";
import {Link, useNavigate} from "react-router-dom";

export const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const navigate = useNavigate(); // Hook for navigation

  const handleLogin = async (event) => {
    event.preventDefault();
    // Validation: Ensure username and password are filled in
    if (!email || !password) {
      setMessage("Please enter both email and password.");
      return;
    }

    setMessage("Logging you in...");

    // Try logging in
    try {
      const response = await fetch("/fabflix/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({
          email: email,
          password: password,
        }),
      });

      const data = await response.json();

      // Redirect to home page
      if (data.status === "success") {
        navigate("/", { replace: true });
      }
    } catch (error) {
      setMessage("An error occurred. Please try again.");
      console.log("Error:", error);
    }
  };

  return (

    <form
      onSubmit={handleLogin}
      className= "bg-fabflix-primary rounded-lg p-6 w-96 mx-auto shadow-lg"
    >
      <div className="flex items-center justify-center space-x-3 mb-6">
        <img
          src="/fabflix/images/logo.png"
          style={{height: "100px", width: "auto"}} // Increased size
          alt="Fabflix Logo"
        />
        <h1 className="text-5xl font-bold text-white">Fabflix</h1>
      </div>

      <div className="mb-4">
        <input
          type="text"
          id="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          className="mb-2 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-400 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-100 dark:text-black dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
          placeholder="Email"
        />
      </div>

      <div className="mb-4">
        <input
          type="password"
          id="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          className="mb-2 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-400 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-100 dark:text-black dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
          placeholder="Password"
        />
      </div>

      <div className="flex justify-center mt-4">
        <button
          className="me-2 mb-2 rounded-lg bg-blue-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
          Login
        </button>
      </div>

      <p className="text-center text-pink-400 mt-4">{message}</p>
    </form>

  );
};
