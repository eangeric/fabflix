import React, { useState } from "react";
import { SearchBar } from "../components/SearchBar.jsx";
import { MovieTable } from "../components/MovieTable.jsx";
import { useFetchPages } from "../hooks/useFetchPages.js";

export default function Search() {
  const [searchUrl, setSearchUrl] = useState(null);
  const [page, setPage] = useState(1);
  const [pageInput, setPageInput] = useState("1"); // Initialize with string
  const [numResults, setNumResults] = useState(10);
  const { data, maxResults, loading, error } = useFetchPages(searchUrl);

  React.useEffect(() => {
    setPageInput(page.toString());
  }, [page]);

  const handleSearch = (url) => {
    setPage(1);
    setSearchUrl(`${url}&page=1&num_results=${numResults}`);
  };

  const updatePage = (newPage) => {
    const maxPages = Math.ceil(maxResults / numResults);
    if (newPage > 0 && newPage <= maxPages) {
      setPage(newPage);
      setSearchUrl(searchUrl.replace(/page=\d+/, `page=${newPage}`));
    }
  };

  return (
    <div className="text-white">
      <SearchBar onSearchUrl={handleSearch} onNumResultsChange={setNumResults} />

      {data && <MovieTable movieData={data} />}

      {data && data.length > 0 && (
        <div className="flex justify-center mt-4 mb-4">
          <button
            onClick={() => updatePage(page - 1)}
            disabled={page === 1}
            className={`px-5 py-2 text-sm font-medium rounded-lg ${
              page === 1 ? "bg-gray-400 cursor-not-allowed" : "bg-blue-700 hover:bg-blue-800"
            } text-white`}
          > Previous </button>

          <h2 className="px-5 py-2 text-sm">
            Page
            <input
              type="text" value={pageInput}
              placeholder={page.toString()}
              onChange={(e) => setPageInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") { // Only update when user presses enter
                  const newPage = parseInt(pageInput, 10);
                  if (!isNaN(newPage) && newPage >= 1 && newPage <= Math.ceil(maxResults / numResults)) {
                    updatePage(newPage);
                  } else {
                    setPageInput(page.toString()); // Reset back to current page if invalid input
                  }
                }
              }}
              onBlur={() => setPageInput(page.toString())} // Reset on losing focus
              className="px-5 py-2 mb-2 rounded-lg border border-gray-300 bg-gray-50 text-sm text-gray-400"
            /> of {Math.ceil(maxResults / numResults)} </h2>

          <button
            onClick={() => updatePage(page + 1)}
            disabled={page >= Math.ceil(maxResults / numResults)}
            className={`px-5 py-2 text-sm font-medium rounded-lg ${
              page >= Math.ceil(maxResults / numResults) ? 
                          "bg-gray-400 cursor-not-allowed" : "bg-blue-700 hover:bg-blue-800"
            } text-white`}
          >
            Next
          </button>
        </div>
      )}

      {/* Change loading text to a loading animation later */}
      {loading && searchUrl && <p className="text-white text-center">Loading...</p>}

      {error && <p className="text-white text-center">Error: {error}</p>}
      {!loading && !error && !data && <h1 className="text-white text-center">No results</h1>}
    </div>
  );
}