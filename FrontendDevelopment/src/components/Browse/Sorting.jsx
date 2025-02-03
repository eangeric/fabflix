import React from "react";

export function Sorting({ setSortOrder }) {
  return (
    <div className="flex items-center space-x-2 justify-center mt-4">
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
  );
}
