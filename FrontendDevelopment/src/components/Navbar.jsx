import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";

export const Navbar = () => {
  const [search, setSearch] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();

  // Cache to store previous queries
  const cache = JSON.parse(sessionStorage.getItem("autocompleteCache")) || {};
  const suggestionRefs = useRef([]); // Stores refs for list items

  useEffect(() => {
    if (search.length < 3) {
      setSuggestions([]);
      setShowDropdown(false);
      return;
    }

    console.log(`Autocomplete search initiated for query: "${search}"`);

    const fetchSuggestions = async () => {
      if (cache[search]) {
        console.log(`Using cached results for autocomplete: "${search}"`);
        setSuggestions(cache[search]);
        setShowDropdown(true);
        console.log("Used suggestion list (from cache):", cache[search]);
        return;
      }

      console.log(
        `Using AJAX request to server results for autocomplete: "${search}"`
      );
      try {
        const response = await fetch(
          `/fabflix/api/search?fulltext=true&title=${encodeURIComponent(
            search
          )}&num_results=10`
        );
        const data = await response.json();
        const movies = data.movies;

        setSuggestions(movies);
        setShowDropdown(true);
        console.log("Used suggestion list (from server):", movies);
        // Cache the result
        cache[search] = movies;
        sessionStorage.setItem("autocompleteCache", JSON.stringify(cache));
      } catch (error) {
        console.error("Error fetching autocomplete results:", error);
      }
    };

    const delay = setTimeout(fetchSuggestions, 300); // Debounce time

    return () => clearTimeout(delay);
  }, [search]);

  // Handle keyboard navigation
  const handleKeyDown = (event) => {
    if (event.key === "ArrowDown") {
      setSelectedIndex((prev) => {
        const newIndex = Math.min(prev + 1, suggestions.length - 1);
        scrollToHighlighted(newIndex);
        return newIndex;
      });
    } else if (event.key === "ArrowUp") {
      setSelectedIndex((prev) => {
        const newIndex = Math.max(prev - 1, 0);
        scrollToHighlighted(newIndex);
        return newIndex;
      });
    } else if (event.key === "Enter" && selectedIndex !== -1) {
      navigateToMovie(suggestions[selectedIndex]);
    }
  };

  // Scroll to the highlighted item
  const scrollToHighlighted = (index) => {
    if (suggestionRefs.current[index]) {
      suggestionRefs.current[index].scrollIntoView({ block: "nearest" });
    }
  };

  // Navigate to single movie page
  const navigateToMovie = (movie) => {
    setSearch("");
    setShowDropdown(false);
    navigate(`/movie/${movie.movie_id}`);
  };

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
                setSearch("");
                navigate(`/fulltext?search=${encodeURIComponent(search)}`);
              }
            }}
          >
            <input
              type="text"
              placeholder="Title Search"
              className="input w-[15rem] bg-white text-black"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              onKeyDown={handleKeyDown}
              onBlur={() => setTimeout(() => setShowDropdown(false), 200)} // Delay hiding dropdown
              onFocus={() => search.length >= 3 && setShowDropdown(true)}
            />
          </form>
          {/* Autocomplete Dropdown */}
          {showDropdown && suggestions.length > 0 && (
            <ul className="absolute w-full bg-white text-black rounded-md shadow-md max-h-60 overflow-y-auto">
              {suggestions.map((movie, index) => (
                <li
                  key={movie.movie_id}
                  ref={(el) => (suggestionRefs.current[index] = el)}
                  className={`px-3 py-2 cursor-pointer ${
                    index === selectedIndex
                      ? "bg-gray-300"
                      : "hover:bg-gray-200"
                  }`}
                  onMouseDown={() => navigateToMovie(movie)}
                  onMouseEnter={() => setSelectedIndex(index)}
                >
                  {movie.movie_title}
                </li>
              ))}
            </ul>
          )}
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
