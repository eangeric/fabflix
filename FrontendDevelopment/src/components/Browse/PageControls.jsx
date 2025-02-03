import React, { useState, useEffect } from "react";

export function PageControls({ page, setPage, maxResults, numResults, setSearchUrl, searchUrl }) {
  const [pageInput, setPageInput] = useState(page.toString());

  useEffect(() => {
    setPageInput(page.toString());
  }, [page]);

  const updatePage = (newPage) => {
    const maxPages = Math.ceil(maxResults / numResults);
    if (newPage > 0 && newPage <= maxPages) {
      setPage(newPage);
      setSearchUrl(searchUrl.replace(/page=\d+/, `page=${newPage}`)); // Ensure URL updates
    }
  };

  return (
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
  );
}
