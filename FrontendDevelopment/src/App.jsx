import React from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import { Navbar } from "./components/Navbar";
import { LoginNavbar } from "./components/LoginNavbar";
import Home from "./pages/Home";
import Movie from "./pages/Movie";
import Star from "./pages/Star";
import Search from "./pages/Search";
import Login from "./pages/Login";
import Browse from "./pages/Browse/Browse";
import BrowseGenres from "./pages/Browse/BrowseGenres";

export default function App() {
  const location = useLocation();

  // Check if the current path is "/login"
  const isLoginPage = location.pathname === "/login";

  return (
    <>
      {/* Render the login navbar is login page */}
      {isLoginPage ? <LoginNavbar /> : <Navbar />}
      {/* Define routes for app */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/movie/:id" element={<Movie />} />
        <Route path="/star/:id" element={<Star />} />
        <Route path="/search" element={<Search />} />
        <Route path="/browse" element={<Browse />} />
        <Route path="/browse/:genre" element={<BrowseGenres />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </>
  );
}
