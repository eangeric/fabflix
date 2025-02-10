// Template taken from: https://flowbite.com/docs/components/navbar/

import React from "react";
import { Link } from "react-router-dom";
//<img src="logo.png" alt="logo"/> for later

export const LoginNavbar = () => {
  return (
    <nav className="bg-fabflix-primary fixed w-full z-20 top-0 start-0 border-b border-gray-600">
      <div className="max-w-screen-xl-2 mx-auto flex items-center justify-between px-4 md:px-6 relative">
        <Link to="/login" className="flex items-center space-x-2">
          <img
            src="/fabflix/images/1.png"
            style={{ height: "50px", width: "auto" }}
            alt="Fabflix Logo"
          />
          <h1 className="text-4xl font-bold text-white">Fabflix</h1>
        </Link>
      </div>
    </nav>
  );
};
