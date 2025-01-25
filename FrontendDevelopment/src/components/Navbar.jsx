import React from "react";
import { Link } from "react-router-dom";

export const Navbar = () => {
  return (
    <nav className="flex items-center text-white bg-fabflix-primary shadow-xl shadow-black/30">
      <h1
        style={{ textShadow: "#1f2126 2px 2px 10px" }}
        className="animate-dissolve-right text-[85px] pl-[4dvw] font-logo font-bold"
      >
        <Link to="/">Fabflix</Link>
      </h1>
    </nav>
  );
};
