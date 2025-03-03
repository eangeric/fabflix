import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export const Navbar = () => {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

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
          <form
            onSubmit={(event) => {
              event.preventDefault();
              if (search.trim()) {
                navigate(`/fulltext?search=${encodeURIComponent(search)}`);
              }
            }}
          >
            <input
              type="text"
              placeholder="Type here"
              className="input w-[15rem] bg-white text-black"
              value={search}
              onChange={(event) => {
                setSearch(event.target.value);
              }}
            />
            <div className="hidden absolute w-full max-h-50 overflow-y-scroll bg-white text-black rounded-md divide-y-2">
              {/* {data.map((d, i) => {
                return (
                  <div key={i} className="flex items-center h-10">
                    {d}
                  </div>
                );
              })} */}
            </div>
          </form>
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
