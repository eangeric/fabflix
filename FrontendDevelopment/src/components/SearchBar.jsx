import React, { useEffect, useState } from "react";
import { Sorting } from "./Browse/Sorting.jsx";

export const SearchBar = ({ onSearchUrl, onNumResultsChange }) => {
  const [title, setTitle] = useState("");
  const [star, setStar] = useState("");
  const [year, setYear] = useState("");
  const [director, setDirector] = useState("");
  const [sortOrder, setSortOrder] = useState("");
  const [tempNumResults, setTempNumResults] = useState("10"); // Stores temporary user selection

  useEffect(() => {
    const savedState = sessionStorage.getItem("movieSearchState");
    if (savedState) {
      const {
        savedTitle,
        savedStar,
        savedYear,
        savedDirector,
        savedSortOrder,
        savedNumResults,
      } = JSON.parse(savedState);
      setTitle(savedTitle);
      setStar(savedStar);
      setYear(savedYear);
      setDirector(savedDirector);
      setSortOrder(savedSortOrder);
      setTempNumResults(savedNumResults);
    }
  }, []);

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
      const sortParams = sortOrder.split("-");
      queryParams.append("sort", sortParams[0]);
      queryParams.append("order1", sortParams[1]);
      queryParams.append("order2", sortParams[3]);
    }
    queryParams.append("num_results", tempNumResults); // Use pendingNumResults

    const queryString = `/fabflix/api/search?${queryParams.toString()}`;
    console.log(queryString);
    onSearchUrl(queryString);
    onNumResultsChange(parseInt(tempNumResults, 10)); // Only update on Submit

    sessionStorage.setItem(
      "movieSearchState",
      JSON.stringify({
        savedTitle: title,
        savedStar: star,
        savedYear: year,
        savedDirector: director,
        savedSearchUrl: queryString,
        savedPage: 1,
        savedNumResults: tempNumResults,
        savedSortOrder: sortOrder,
      })
    );
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
          <h2 className="mb-4 text-lg font-medium text-white text-center">
            Search by title / stars / year / director
          </h2>
          <form
            id="Search"
            className="flex flex-col text-white"
            onSubmit={searchHandler}
          >
            <div className="max-w-full">
              <input
                type="text"
                placeholder="Movie Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="mb-2 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900"
              />
              <input
                type="text"
                placeholder="Star Name"
                value={star}
                onChange={(e) => setStar(e.target.value)}
                className="mb-2 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900"
              />
              <input
                type="number"
                placeholder="Year Released"
                value={year}
                onChange={(e) => setYear(e.target.value)}
                className="mb-2 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900"
              />
              <input
                type="text"
                placeholder="Director"
                value={director}
                onChange={(e) => setDirector(e.target.value)}
                className="mb-2 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900"
              />
              <div className="flex justify-between items-center mt-4 space-x-4">
                <button
                  className="rounded-lg px-5 py-2.5 text-sm font-medium text-white bg-fabflix-secondary hover:bg-gray-700"
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
                    className="rounded-lg border border-gray-300 bg-gray-100 p-1 text-sm text-black"
                  >
                    <option value="10">10</option>
                    <option value="25">25</option>
                    <option value="50">50</option>
                    <option value="100">100</option>
                  </select>
                </div>

                <Sorting sortOrder={sortOrder} setSortOrder={setSortOrder} />
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
