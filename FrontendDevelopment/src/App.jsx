import React from "react";
import { Route, Routes } from "react-router-dom";
import { Navbar } from "./components/Navbar";
import Home from "./pages/Home";
import Movie from "./pages/Movie";
import Star from "./pages/Star";
import Login from "./pages/Login";

export default function App() {
  return (
    <>
      <Navbar />
      {/* Define routes for app */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/movie/:id" element={<Movie />} />
        <Route path="/star/:id" element={<Star />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </>
  );
}
