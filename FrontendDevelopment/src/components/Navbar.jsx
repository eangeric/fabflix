import React from "react";
import { Link } from "react-router-dom";

export const Navbar = () => {
  return (
    <nav className="bg-fabflix-primary fixed w-full z-20 top-0 start-0">
      <div className="max-w-screen-xl-2 mx-auto flex items-center justify-between px-4 md:px-6 relative">
        {/* Logo Left Section */}
        <Link to="/" className="flex items-center space-x-2">
          <img
            src="/fabflix/images/1.png"
            style={{ height: "50px", width: "auto" }} // Custom size
            alt="Fabflix Logo"
          />
          <h1 className="text-4xl font-bold text-white">Fabflix</h1>
        </Link>

        {/* Right Section */}
        <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
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

        {/* Centered Browse Section */}
        <div
          className="absolute left-1/2 transform -translate-x-1/2 md:static md:transform-none"
          id="navbar-sticky"
        >
          <ul
            className="flex flex-col p-4  font-medium
            border-gray-700 items-center"
          >
            <li>
              <Link
                to="/"
                className="block py-2 px-3 md:p-0 hover:text-blue-500
                text-white
                border-gray-700
                transition duration-300 ease-in-out"
              >
                Browse
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};
