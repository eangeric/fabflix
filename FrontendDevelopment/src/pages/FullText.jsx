import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useFetch } from "../hooks/useFetch";
import { MovieTable } from "../components/MovieTable";

export default function FullText() {
  const [searchParams] = useSearchParams();
  const search = searchParams.get("search");
  const [movies, setMovies] = useState();
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
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
      }
    };

    getData();
  }, [search, limit, page, sort, orderOne, orderTwo]);

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
    </div>
  );
}
