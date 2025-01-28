// Template taken from: https://flowbite.com/docs/components/navbar/

import React from "react";
import { Link } from "react-router-dom";
//<img src="logo.png" alt="logo"/> for later

export const LoginNavbar = () => {
  return (
    <nav className="bg-fabflix-primary fixed w-full z-20 top-0 start-0 border-b border-gray-200 dark:border-gray-600">
      <div className="max-w-screen-xl flex items-center justify-between mx-auto p-4">
        <Link to="/login" className="flex items-center space-x-2">
          <img
            src="https://images.vexels.com/media/users/3/321854/isolated/preview/412dcc4113ea66cd34d04b9789952b84-clapperboard-doodle.png"
            className="h-8"
            alt="Fabflix Logo"
          />
          <h1 className="text-4xl font-bold  text-gray-900 dark:text-white">
            Fabflix
          </h1>
        </Link>
      </div>
    </nav>
  );
};
