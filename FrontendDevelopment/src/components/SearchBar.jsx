import React, { useState } from "react";

export const SearchBar = ({ onSearchUrl }) => {
  const [title, setTitle] = useState("");
  const [star, setStar] = useState("");
  const [year, setYear] = useState("");
  const [director, setDirector] = useState("");

  const searchHandler = (event) => {
    event.preventDefault(); // Prevent default form submission behavior

    // Preventing empty query
    //console.log("Empty query check");
    //console.log(title, star, year, director);
    //console.log(typeof(title), typeof(star),typeof(year),typeof(director));
    if (title === "" && star === "" && year === "" && director === "") {
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
    <div className="relative">
      {/* Background Wrapper */}
      <div
        className="absolute inset-0 -z-10 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://img.goodfon.com/original/5500x3200/c/af/sssssss-aaaaaaaaaaa-ddddddddd-fffffffff-rrrrrrr.jpg')",
          filter: "blur(4px)",
          WebkitFilter: "blur(4px)",
        }}
      ></div>

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
