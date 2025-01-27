import React, { useState } from "react";

export const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleLogin = async (event) => {
    event.preventDefault();
    console.log("Clicked!");
    // Validation: Ensure username and password are filled in
    if (!email || !password) {
      setMessage("Please enter both email and password.");
      return;
    }

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

      setMessage(data.message);
    } catch (error) {
      setMessage("An error occurred. Please try again.");
      console.log("Error:", error);
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <p>Email: </p>
      <input
        type="text"
        id="email"
        value={email}
        onChange={(event) => setEmail(event.target.value)}
        className="border-2 border-white"
      />
      <p>Password: </p>
      <input
        type="password"
        id="password"
        value={password}
        onChange={(event) => setPassword(event.target.value)}
        className="border-2 border-solid border-white"
      />
      <div>
        <button className="border-2 border-white">Login</button>
      </div>
      <p>{message}</p>
    </form>
  );
};
