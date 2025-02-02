import React, { useState } from "react";
import { SearchBar } from "../components/SearchBar.jsx";
import { useFetch } from "../hooks/useFetch.js";
import { MovieTable } from "../components/MovieTable.jsx";
import { useFetchPages } from "../hooks/useFetchPages.js";

export default function Search() {
  const [searchUrl, setSearchUrl] = useState(null);
  const [page, setPage] = useState(1);
  const { data, maxResults, loading, error } = useFetchPages(searchUrl);

  const handleSearch = (url) => {
    setPage(1); // Reset page on new search
    setSearchUrl(url + "&page=1"); // Ensure page 1 on initial search
    console.log(data);
  };

  const updatePage = (newPage) => {
    if (newPage > 0 && newPage <= Math.ceil(maxResults / 10)) {
      setPage(newPage);
      setSearchUrl(searchUrl.replace(/page=\d+/, `page=${newPage}`)); // Update page param
    }
  };

  return (
    <div className="text-white">
      <SearchBar onSearchUrl={handleSearch} />

      {loading && <p className="text-white text-center">Loading...</p>}
      {error && <p className="text-white text-center">Error: {error}</p>}
      {data && <MovieTable movieData={data} />}

      {/* Pagination Controls */}
      {data && data.length > 0 && (
        <div className="flex justify-between mt-4">
          <button
            onClick={() => updatePage(page - 1)}
            disabled={page === 1}
            className={`px-5 py-2 text-sm font-medium rounded-lg ${
              page === 1
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-700 hover:bg-blue-800"
            } text-white`}
          >
            Previous
          </button>
          <span>
            Page {page} of {Math.ceil(maxResults / 10)}
          </span>
          <button
            onClick={() => updatePage(page + 1)}
            disabled={page >= Math.ceil(maxResults / 10)}
            className={`px-5 py-2 text-sm font-medium rounded-lg ${
              page >= Math.ceil(maxResults / 10)
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-700 hover:bg-blue-800"
            } text-white`}
          >
            Next
          </button>
        </div>
      )}

      {!loading && !error && !data && (
        <h1 className="text-white text-center">No results</h1>
      )}
    </div>
  );
}
