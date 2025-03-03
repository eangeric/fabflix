import React from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import { Navbar } from "./components/Navbar";
import { LoginNavbar } from "./components/Login/LoginNavbar";
import Movie from "./pages/Movie";
import Star from "./pages/Star";
import Search from "./pages/Search";
import Login from "./pages/Login";
import Browse from "./pages/Browse/Browse";
import BrowseGenres from "./pages/Browse/BrowseGenres";
import BrowseMovieTitle from "./pages/Browse/BrowseMovieTitle";
import Cart from "./pages/Cart";
import Payment from "./pages/Payment";
import Success from "./pages/Success";
import Dashboard from "./pages/Dashboard";
import FullText from "./pages/FullText";

export default function App() {
  const location = useLocation();

  // Check if the current path is "/login"
  const isLoginPage = location.pathname === "/login";

  return (
    <>
      {/* Render the login navbar if login page */}
      {isLoginPage ? <LoginNavbar /> : <Navbar />}
      {/* Define routes for app */}
      <Routes>
        <Route path="/" element={<Browse />} />
        <Route path="/login" element={<Login />} />
        <Route path="/_dashboard" element={<Dashboard />} />
        <Route path="/movie/:id" element={<Movie />} />
        <Route path="/star/:id" element={<Star />} />
        <Route path="/browse/genre/:genre" element={<BrowseGenres />} />
        <Route path="/browse/title/:char" element={<BrowseMovieTitle />} />
        <Route path="/search" element={<Search />} />
        <Route path="/cart" element={<Cart />}></Route>
        <Route path="/payment" element={<Payment />}></Route>
        <Route path="/success" element={<Success />}></Route>
        <Route path="/fulltext" element={<FullText />}></Route>
      </Routes>
    </>
  );
}
