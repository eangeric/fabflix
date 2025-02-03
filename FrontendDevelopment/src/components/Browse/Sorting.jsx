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
        <option value="title-asc-rating-asc">Title &uarr; Rating &uarr;</option>
        <option value="title-asc-rating-desc">Title &uarr; Rating &darr;</option>
        <option value="title-desc-rating-asc">Title &darr; Rating &uarr;</option>
        <option value="title-desc-rating-desc">Title &darr; Rating &darr;</option>

        <option value="rating-asc-title-asc">Rating &uarr; Title &uarr;</option>
        <option value="rating-asc-title-desc">Rating &uarr; Title &darr;</option>
        <option value="rating-desc-title-asc">Rating &darr; Title &uarr;</option>
        <option value="rating-desc-title-desc">Rating &darr; Title &darr;</option>
      </select>
    </div>
  );
}
