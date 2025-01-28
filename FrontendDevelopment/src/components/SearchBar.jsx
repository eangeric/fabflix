import React, { useState } from "react";

export const SearchBar = ({ onSearchUrl }) => {
  const [title, setTitle] = useState("");
  const [star, setStar] = useState("");
  const [year, setYear] = useState("");
  const [director, setDirector] = useState("");

  const searchHandler = (event) => {
    event.preventDefault(); // Prevent default form submission behavior
    console.log("Form submitted");

    // Preventing empty query
    if (title === "" && star === "" && year === "" && director === "") {
      console.log("Empty search")
      return;
    }

    // Build the query string
    const queryParams = new URLSearchParams();
    if (title) queryParams.append("title", title);
    if (star) queryParams.append("star", star);
    if (year) queryParams.append("year", year);
    if (director) queryParams.append("director", director);

    // Call the parent function with the query string
    const queryString = `/fabflix/api/search?${queryParams.toString()}`;
    console.log("Generated Query String:", queryString);
    onSearchUrl(queryString); // Pass query string to parent component
  };

  return (
    <div className="relative bg-cover" style={{
      backgroundImage:
        "linear-gradient(rgba(3, 20, 50, 0.9), rgba(31, 33, 38, 1))," +
        "url(/fabflix/images/movieBg.jpg)"
    }}>

      <div className="flex justify-center">
        <div className="relative mx-10 my-8 max-w-xl items-center justify-between overflow-x-auto bg-fabflix-primary p-6 text-white shadow-md sm:rounded-lg">
          <h2 className="mb-4 text-lg font-medium text-gray-900 dark:text-white text-center">
            Search by title / stars / year / director
          </h2>
          <form
            id="Search"
            className="flex flex-col text-white"
            onSubmit={searchHandler}
          >
            <div className="max-w-full">
              <input
                className="mb-2 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-400 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-100 dark:text-black dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                type="text"
                placeholder="Movie Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
              <input
                className="mb-2 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-400 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-100 dark:text-black dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                type="text"
                placeholder="Star Name"
                value={star}
                onChange={(e) => setStar(e.target.value)}
              />
              <input
                className="mb-2 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-400 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-100 dark:text-black dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                type="number"
                placeholder="Year Released"
                value={year}
                onChange={(e) => setYear(e.target.value)}
              />
              <input
                className="mb-2 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-400 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-100 dark:text-black dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                type="text"
                placeholder="Director"
                value={director}
                onChange={(e) => setDirector(e.target.value)}
              />
              <button
                className="me-2 mb-2 rounded-lg bg-blue-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                type="submit"
              >
                Search
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
