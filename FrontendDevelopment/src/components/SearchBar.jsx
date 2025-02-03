import React, { useState } from "react";

export const SearchBar = ({ onSearchUrl, onNumResultsChange }) => {
  const [title, setTitle] = useState("");
  const [star, setStar] = useState("");
  const [year, setYear] = useState("");
  const [director, setDirector] = useState("");
  const [sortOrder, setSortOrder] = useState("");
  const [tempNumResults, setTempNumResults] = useState("10"); // Stores temporary user selection

  const searchHandler = (event) => {
    event.preventDefault();

    if (title === "" && star === "" && year === "" && director === "") {
      console.log("Empty search");
      return;
    }

    const queryParams = new URLSearchParams();
    if (title) queryParams.append("title", title);
    if (star) queryParams.append("star", star);
    if (year) queryParams.append("year", year);
    if (director) queryParams.append("director", director);
    if (sortOrder) {
      if (sortOrder === "t-r-asc") {
        queryParams.append("sort", "title");
        queryParams.append("order", "ASC");
      } else if (sortOrder === "t-r-desc") {
        queryParams.append("sort", "title");
        queryParams.append("order", "DESC");
      } else if (sortOrder === "r-t-asc") {
        queryParams.append("sort", "rating");
        queryParams.append("order", "ASC");
      } else if (sortOrder === "r-t-desc") {
        queryParams.append("sort", "rating");
        queryParams.append("order", "DESC");
      }
    }
    queryParams.append("num_results", tempNumResults); // Use pendingNumResults

    const queryString = `/fabflix/api/search?${queryParams.toString()}`;
    console.log(queryString);
    onSearchUrl(queryString);
    onNumResultsChange(parseInt(tempNumResults, 10)); // Only update on Submit
  };

  return (
    <div
      className="relative bg-cover"
      style={{
        backgroundImage:
          "linear-gradient(rgba(3, 20, 50, 0.9), rgba(31, 33, 38, 1))," +
          "url(/fabflix/images/movieBg.jpg)",
      }}
    >
      <div className="flex justify-center">
        <div
          className="relative mx-10 my-8 max-w-xl items-center justify-between
                      overflow-x-auto bg-fabflix-primary p-6 text-white shadow-md sm:rounded-lg"
        >
          <h2 className="mb-4 text-lg font-medium text-gray-900 dark:text-white text-center">
            Search by title / stars / year / director
          </h2>
          <form
            id="Search"
            className="flex flex-col text-white"
            onSubmit={searchHandler}
          >
            <div className="max-w-full">
              {" "}
              {/* I don't know why input text is now gray, fix later */}
              <input
                type="text"
                placeholder="Movie Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="mb-2 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-400"
              />
              <input
                type="text"
                placeholder="Star Name"
                value={star}
                onChange={(e) => setStar(e.target.value)}
                className="mb-2 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-400"
              />
              <input
                type="number"
                placeholder="Year Released"
                value={year}
                onChange={(e) => setYear(e.target.value)}
                className="mb-2 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-400"
              />
              <input
                type="text"
                placeholder="Director"
                value={director}
                onChange={(e) => setDirector(e.target.value)}
                className="mb-2 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-400"
              />
              <div className="flex justify-between items-center mt-4">
                <button
                  className="rounded-lg bg-blue-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-800"
                  type="submit"
                >
                  Search
                </button>

                <div className="flex items-center space-x-2">
                  <label htmlFor="num_results" className="text-white">
                    Results per page:
                  </label>
                  <select
                    name="num_results"
                    id="num_results"
                    value={tempNumResults} // Use buffer state to prevent live updates
                    onChange={(e) => setTempNumResults(e.target.value)}
                    className="rounded-lg border border-gray-300 bg-gray-100 p-2.5 text-sm text-black"
                  >
                    <option value="10">10</option>
                    <option value="25">25</option>
                    <option value="50">50</option>
                    <option value="100">100</option>
                  </select>
                </div>
                <div className="flex items-center space-x-2">
                  <label htmlFor="sortOrder" className="text-white">
                    Sort by
                  </label>
                  <select
                    id="sortOrder"
                    onChange={(e) => setSortOrder(e.target.value)}
                    className="rounded-lg border border-gray-300 bg-gray-100 p-2.5 text-sm text-black"
                  >
                    <option value="t-r-asc">Title ASC</option>
                    <option value="t-r-desc">Title DESC</option>
                    <option value="r-t-asc">Rating ASC</option>
                    <option value="r-t-desc">Rating DESC</option>
                  </select>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
