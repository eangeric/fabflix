import React, { useState, useEffect } from "react";

export function PageControls({
  page,
  setPage,
  maxResults,
  numResults,
  setSearchUrl,
  searchUrl,
}) {
  const [pageInput, setPageInput] = useState(page.toString());

  useEffect(() => {
    setPageInput(page.toString());
  }, [page]);

  const updatePage = (newPage) => {
    const maxPages = Math.ceil(maxResults / numResults);
    if (newPage > 0 && newPage <= maxPages) {
      setPage(newPage);
      const newUrl = searchUrl.replace(/page=\d+/, `page=${newPage}`);
      setSearchUrl(newUrl); // Ensure URL updates

      const savedState = sessionStorage.getItem("movieSearchState");
      if (savedState) {
        const movieSearchState = JSON.parse(savedState);
        sessionStorage.setItem(
          "movieSearchState",
          JSON.stringify({
            ...movieSearchState,
            page: newPage,
            searchUrl: newUrl,
          })
        );
      }
    }
  };

  return (
    <div className="flex justify-center mt-4 mb-4">
      <button
        onClick={() => {
          updatePage(page - 1);
          window.scrollTo({ top: 0, behavior: "smooth" });
        }}
        disabled={page === 1}
        className={`px-5 py-2 text-sm font-medium rounded-lg ${
          page === 1
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-fabflix-primary hover:bg-blue-600 cursor-pointer"
        } text-white`}
      >
        Previous
      </button>

      <h2 className="px-5 py-2 text-sm space-x-3">
        <span>Page </span>
        <input
          type="text"
          value={pageInput}
          onChange={(e) => setPageInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              const newPage = parseInt(pageInput, 10);
              if (
                !isNaN(newPage) &&
                newPage >= 1 &&
                newPage <= Math.ceil(maxResults / numResults)
              ) {
                updatePage(newPage);
              } else {
                setPageInput(page.toString());
              }
            }
          }}
          onBlur={() => setPageInput(page.toString())}
          className="px-5 py-2 text-sm font-medium rounded-lg"
          style={{
            width: "40px",
            padding: "5px 4px",
            textAlign: "center",
            border: "1px",
            backgroundColor: "#f9f9f9",
            color: "#666",
          }}
        />
        <span>of {Math.ceil(maxResults / numResults)}</span>
      </h2>

      <button
        onClick={() => {
          updatePage(page + 1);
          window.scrollTo({ top: 0, behavior: "smooth" });
        }}
        disabled={page >= Math.ceil(maxResults / numResults)}
        className={`px-5 py-2 text-sm font-medium rounded-lg ${
          page >= Math.ceil(maxResults / numResults)
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-fabflix-primary hover:bg-blue-600 cursor-pointer"
        } text-white`}
      >
        Next
      </button>
    </div>
  );
}
