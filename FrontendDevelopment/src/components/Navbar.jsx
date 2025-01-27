// Template taken from: https://flowbite.com/docs/components/navbar/

import React from "react";
import { Link } from "react-router-dom";
import { useFetch } from "../hooks/useFetch";
//<img src="logo.png" alt="logo"/> for later

export const Navbar = () => {
  const { data, loading, error } = useFetch("/fabflix/api/auth", {
    credentials: "include", // Include cookies for session-based authentication
  });

  return (
    <nav className="bg-fabflix- dark:bg-fabflix-primary fixed w-full z-20 top-0 start-0 border-b border-gray-200 dark:border-gray-600">
      <div className="max-w-screen-xl flex items-center justify-between mx-auto p-4">
        <Link to="/" className="flex items-center space-x-2">
          <img
            src="https://images.vexels.com/media/users/3/321854/isolated/preview/412dcc4113ea66cd34d04b9789952b84-clapperboard-doodle.png"
            className="h-8"
            alt="Fabflix Logo"
          />
          <h1 className="text-4xl font-bold  text-gray-900 dark:text-white">
            Fabflix
          </h1>
        </Link>

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

        <div
          className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1"
          id="navbar-sticky"
        >
          <ul
            className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg
                                bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0
                                md:bg-white dark:bg-fabflix-primary  dark:border-gray-700"
          >
            <li>
              <Link
                to="/"
                className="block py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100
                                        md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500
                                        dark:text-white dark:hover:bg-gray-700 dark:hover:text-white
                                        md:dark:hover:bg-transparent dark:border-gray-700"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/browse"
                className="block py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100
                             md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500
                             dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent
                              dark:border-gray-700"
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
