import React from "react";
import { Link } from "react-router-dom";

export const Navbar = () => {
  const data = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K"];

  return (
    <nav className="bg-fabflix-primary fixed w-full z-20 top-0 start-0">
      <div className="max-w-screen-xl-2 mx-auto flex items-center justify-between px-4 relative">
        {/* Logo Left Section */}
        <Link to="/" className="flex items-center space-x-2">
          <img
            src="/fabflix/images/1.png"
            style={{ height: "50px", width: "auto" }} // Custom size
            alt="Fabflix Logo"
          />
          <h1 className="text-4xl font-bold text-white">Fabflix</h1>
        </Link>

        {/* Middle */}
        <div className="relative">
          <input
            type="text"
            placeholder="Type here"
            className="input w-[15rem] bg-white text-black"
          />
          <div className="hidden absolute w-full max-h-50 overflow-y-scroll bg-white text-black rounded-md divide-y-2">
            {data.map((d, i) => {
              return (
                <div key={i} className="flex items-center h-10">
                  {d}
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Section */}
        <div className="flex gap-4">
          <Link
            to="/"
            className="flex items-center px-4 hover:text-blue-400
                text-white
                border-gray-700
                transition duration-300 ease-in-out"
          >
            Browse
          </Link>
          <Link
            to="/search"
            className="flex items-center space-x-3 rtl:space-x-reverse"
          >
            <img
              src="/fabflix/images/2.png"
              alt="Search"
              style={{ width: "40px", marginRight: "10px" }}
            />
          </Link>
          <Link
            to="/cart"
            className="flex items-center space-x-3 rtl:space-x-reverse"
          >
            <img
              src="/fabflix/images/3.png"
              alt="Cart"
              style={{ width: "40px" }}
            />
          </Link>
        </div>
      </div>
    </nav>
  );
};
