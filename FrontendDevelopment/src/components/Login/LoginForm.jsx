import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ReCAPTCHA from "react-google-recaptcha";

export const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [captchaValue, setCaptchaValue] = useState(null);

  const navigate = useNavigate(); // Hook for navigation

  const handleCaptcha = (value) => {
    setCaptchaValue(value);
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    if (!captchaValue) {
      setMessage("Please complete the reCAPTCHA.");
      return;
    }

    try {
      const response = await fetch("/fabflix/form-recaptcha", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ captcha: captchaValue }),
      });

      const data = await response.json();
      if (!data.success) {
        setMessage("reCAPTCHA failed. Try again.");
      }
    } catch (error) {
      setMessage("An error occurred. Please try again.");
      console.log("Error:", error);
    }

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
      setMessage(data.message);
    } catch (error) {
      setMessage("An error occurred. Please try again.");
      console.log("Error:", error);
    }
  };

  return (
    <form
      autoComplete="off"
      onSubmit={handleLogin}
      className="bg-fabflix-primary rounded-lg w-80 mx-auto shadow-lg p-8"
    >
      <div className="flex items-center justify-center space-x-3 mb-2">
        <img
          src="/fabflix/images/logo.png"
          style={{ height: "100px", width: "auto" }} // Increased size
          alt="Fabflix Logo"
        />
        <h1 className="text-5xl font-bold text-white">Fabflix</h1>
      </div>

      <div className="mb-4">
        <input
          type="text"
          id="email"
          autoComplete="off"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          className="mb-2 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-black placeholder-gray-400"
          placeholder="Email"
        />
      </div>

      <div className="mb-4">
        <input
          type="password"
          id="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          className="mb-2 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-black  placeholder-gray-400"
          placeholder="Password"
        />
      </div>

      <div className="flex flex-col items-center scale-90 origin-center">
        <ReCAPTCHA
          sitekey="6LeyE9QqAAAAADj7Kj0xLEUGCOnH6-Hl7awjRCNB"
          onChange={handleCaptcha}
        />
      </div>

      <div className="flex flex-col justify-center mt-8">
        <button className="cursor-pointer me-2 mb-2 rounded-lg bg-fabflix-secondary hover:bg-gray-700 px-5 py-2.5 text-sm font-medium text-white">
          Login
        </button>
        <p className="text-center text-sm text-red-400">{message}</p>
      </div>
    </form>
  );
};
