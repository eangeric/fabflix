import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { MovieTable } from "../components/MovieTable";

export default function FullText() {
  const [searchParams] = useSearchParams();
  const search = searchParams.get("search");
  const [movies, setMovies] = useState();
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [jumpPage, setJumpPage] = useState("");
  const [sort, setSort] = useState("title");
  const [orderOne, setOrderOne] = useState("asc");
  const [orderTwo, setOrderTwo] = useState("asc");

  const sortingOptions = [
    {
      label: "Title ↑ Rating ↓",
      sort: "title",
      orderOne: "asc",
      orderTwo: "desc",
    },
    {
      label: "Title ↓ Rating ↑",
      sort: "title",
      orderOne: "desc",
      orderTwo: "asc",
    },
    {
      label: "Title ↑ Rating ↑",
      sort: "title",
      orderOne: "asc",
      orderTwo: "asc",
    },
    {
      label: "Title ↓ Rating ↓",
      sort: "title",
      orderOne: "desc",
      orderTwo: "desc",
    },
    {
      label: "Rating ↑ Title ↓",
      sort: "rating",
      orderOne: "asc",
      orderTwo: "desc",
    },
    {
      label: "Rating ↓ Title ↑",
      sort: "rating",
      orderOne: "desc",
      orderTwo: "asc",
    },
    {
      label: "Rating ↑ Title ↑",
      sort: "rating",
      orderOne: "asc",
      orderTwo: "asc",
    },
    {
      label: "Rating ↓ Title ↓",
      sort: "rating",
      orderOne: "desc",
      orderTwo: "desc",
    },
  ];

  useEffect(() => {
    const getData = async () => {
      if (search) {
        const searchURL = `/fabflix/api/search?fulltext=true&title=${encodeURIComponent(
          search
        )}&num_results=${encodeURIComponent(limit)}&page=${encodeURIComponent(
          page
        )}&sort=${encodeURIComponent(sort)}&order1=${encodeURIComponent(
          orderOne
        )}&order2=${encodeURIComponent(orderTwo)}`;
        const response = await fetch(searchURL);
        const data = await response.json();
        setMovies(data.movies);
        setTotalPages(Math.ceil(data.max_results / limit));
      }
    };

    getData();
  }, [search, limit, page, sort, orderOne, orderTwo]);

  const handlePageJump = () => {
    const numPage = parseInt(jumpPage, 10);
    if (!isNaN(numPage) && numPage >= 1 && numPage <= totalPages) {
      setPage(numPage);
    }
    setJumpPage(""); // Clear input after submission
  };

  return (
    <div className="text-white">
      <div className="text-xl text-center m-2 mb-4">
        <p>{search && `Search: ${search}`}</p>
      </div>
      <div className="flex gap-8 justify-center items-center m-2">
        {/* Results per Page */}
        <label className="block">
          <span>Results Per Page:</span>
          <select
            value={limit}
            onChange={(e) => setLimit(Number(e.target.value))}
            className="ml-2 p-1 bg-gray-700 text-white rounded"
          >
            {[10, 25, 50, 100].map((num) => (
              <option key={num} value={num}>
                {num}
              </option>
            ))}
          </select>
        </label>

        {/* Sorting Order */}
        <label className="block">
          <span>Sorting Order:</span>
          <select
            value={`${sort}-${orderOne}-${orderTwo}`}
            onChange={(e) => {
              const selectedOption = sortingOptions.find(
                (opt) =>
                  `${opt.sort}-${opt.orderOne}-${opt.orderTwo}` ===
                  e.target.value
              );
              if (selectedOption) {
                setSort(selectedOption.sort);
                setOrderOne(selectedOption.orderOne);
                setOrderTwo(selectedOption.orderTwo);
              }
            }}
            className="ml-2 p-1 bg-gray-700 text-white rounded"
          >
            {sortingOptions.map(({ label, sort, orderOne, orderTwo }) => (
              <option
                key={`${sort}-${orderOne}-${orderTwo}`}
                value={`${sort}-${orderOne}-${orderTwo}`}
              >
                {label}
              </option>
            ))}
          </select>
        </label>
      </div>
      {movies && <MovieTable movieData={movies} />}
      {/* Pagination Controls */}
      {movies && (
        <div className="flex justify-center items-center gap-4 mt-4">
          {/* Previous Button */}
          <button
            onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
            disabled={page === 1}
            className="px-4 py-2 bg-gray-700 rounded text-white disabled:opacity-50"
          >
            ← Previous
          </button>

          {/* Page Display */}
          <span>
            Page {page} of {totalPages}
          </span>

          {/* Next Button */}
          <button
            onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={page === totalPages}
            className="px-4 py-2 bg-gray-700 rounded text-white disabled:opacity-50"
          >
            Next →
          </button>
        </div>
      )}

      {/* Jump to Page Input */}
      {movies && totalPages > 1 && (
        <div className="flex justify-center m-4 gap-2">
          <input
            type="number"
            placeholder="Page"
            value={jumpPage}
            onChange={(e) => setJumpPage(e.target.value)}
            className="p-1 bg-gray-700 text-white rounded w-24 text-center"
          />
          <button
            onClick={handlePageJump}
            className="px-4 py-2 bg-blue-600 rounded text-white"
          >
            Go
          </button>
        </div>
      )}
    </div>
  );
}
