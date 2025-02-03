import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useFetchPages } from "../../hooks/useFetchPages";
import { MovieTable } from "../../components/MovieTable";
import { BgMain } from "../../components/Assets/BgMain";

export default function BrowseMovieTitle() {
  const { char } = useParams();
  const [page, setPage] = useState(1);
  const [pageInput, setPageInput] = useState("1");
  const [numResults, setNumResults] = useState(10);
  const [searchUrl, setSearchUrl] = useState(
    `/fabflix/api/search?char=${char}&page=1&num_results=${numResults}`
  );

  const { data, maxResults, loading, error } = useFetchPages(searchUrl);

  useEffect(() => {
    setPageInput(page.toString());
  }, [page]);

  useEffect(() => {
    setSearchUrl(`/fabflix/api/search?char=${char}&page=${page}&num_results=${numResults}`);
  }, [char, page, numResults]);

  const updatePage = (newPage) => {
    const maxPages = Math.ceil(maxResults / numResults);
    if (newPage > 0 && newPage <= maxPages) {
      setPage(newPage);
      setPageInput(page.toString());
    }
  };

  return (
    <BgMain>
      <div className="text-white">
        <h1 className="flex text-4xl font-bold text-gray-900 dark:text-white justify-center">
          {char.toUpperCase()}
        </h1>

        <div className="flex items-center space-x-2 justify-center mt-4">
          <label htmlFor="num_results" className="text-white">Results per page:</label>
          <select name="num_results" id="num_results"
                  value={numResults}
                  onChange={(e) => setNumResults(parseInt(e.target.value, 10))}
                  className="rounded-lg border border-gray-300 bg-gray-100 p-2.5 text-sm text-black">
            <option value="10">10</option>
            <option value="25">25</option>
            <option value="50">50</option>
            <option value="100">100</option>
          </select>
        </div>

        {data && <MovieTable movieData={data} />}

        {data && data.length > 0 && (
          <div className="flex justify-center mt-4 mb-4">
            <button
              onClick={() => updatePage(page - 1)}
              disabled={page === 1}
              className={`px-5 py-2 text-sm font-medium rounded-lg ${
                page === 1 ? "bg-gray-400 cursor-not-allowed" : "bg-blue-700 hover:bg-blue-800"
              } text-white`}
            >
              Previous
            </button>

            <h2 className="px-5 py-2 text-sm">
              Page
              <input
                type="text"
                value={pageInput}
                placeholder={page.toString()}
                onChange={(e) => setPageInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    const newPage = parseInt(pageInput, 10);
                    if (!isNaN(newPage) && newPage >= 1 && newPage <= Math.ceil(maxResults / numResults)) {
                      updatePage(newPage);
                    } else {
                      setPageInput(page.toString());
                    }
                  }
                }}
                onBlur={() => setPageInput(page.toString())}
                className="px-5 py-2 mb-2 rounded-lg border border-gray-300 bg-gray-50 text-sm text-gray-400"
              />
              of {Math.ceil(maxResults / numResults)}
            </h2>

            <button
              onClick={() => updatePage(page + 1)}
              disabled={page >= Math.ceil(maxResults / numResults)}
              className={`px-5 py-2 text-sm font-medium rounded-lg ${
                page >= Math.ceil(maxResults / numResults) ? "bg-gray-400 cursor-not-allowed" : "bg-blue-700 hover:bg-blue-800"
              } text-white`}
            >
              Next
            </button>
          </div>
        )}

        {loading && searchUrl && <p className="text-white text-center">Loading...</p>}
        {error && <p className="text-white text-center">Error: {error}</p>}
        {!loading && !error && !data && <h1 className="text-white text-center">No results</h1>}
      </div>
    </BgMain>
  );
}
