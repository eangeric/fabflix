import React from "react";
import { Link } from "react-router-dom";

export const Navbar = () => {
  return (
    <nav className="bg-fabflix-primary fixed w-full z-20 top-0 start-0">
      <div className="max-w-screen-xl-2 mx-auto flex items-center justify-between px-4 md:px-6 relative">
        {/* Logo Section */}
        <Link to="/" className="flex items-center space-x-2">
          <img
            src="/fabflix/images/logo.png"
            style={{ height: "50px", width: "auto" }} // Custom size
            alt="Fabflix Logo"
          />
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
            Fabflix
          </h1>
        </Link>

        {/* Search Section */}
        <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
          <Link
            to="/search"
            className="flex items-center space-x-3 rtl:space-x-reverse"
          >
            <img
              src="https://img.icons8.com/m_outlined/512/FFFFFF/search.png"
              className="h-8"
              alt="Search"
            />
          </Link>
        </div>

        {/* Centered Browse Section */}
        <div
          className="absolute left-1/2 transform -translate-x-1/2 md:static md:transform-none"
          id="navbar-sticky"
        >
          <ul
            className="flex flex-col p-4 md:p-0 mt-4 font-medium
                md:flex-row md:mt-0 dark:bg-fabflix-primary dark:border-gray-700 items-center"
          >
            <li>
              <Link
                to="/"
                className="block py-2 px-3 md:p-0 md:dark:hover:text-blue-500
                dark:text-white dark:hover:text-white
                dark:border-gray-700
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
