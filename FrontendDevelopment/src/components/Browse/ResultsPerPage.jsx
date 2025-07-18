import React from "react";

export function ResultsPerPage({ numResults, setNumResults }) {
  return (
    <div className="flex items-center space-x-2 justify-center">
      <label htmlFor="num_results" className="text-white">
        Results:
      </label>
      <select
        name="num_results"
        id="num_results"
        value={numResults}
        onChange={(e) => setNumResults(parseInt(e.target.value, 10))}
        className="rounded-lg border border-gray-300 bg-gray-100 p-1 text-sm font-medium text-black"
      >
        <option value="10">10</option>
        <option value="25">25</option>
        <option value="50">50</option>
        <option value="100">100</option>
      </select>
    </div>
  );
}
