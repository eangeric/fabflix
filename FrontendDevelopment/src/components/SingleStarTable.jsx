import React from "react";
import { Link } from "react-router-dom";

export const SingleStarTable = ({ starData }) => {
  return (
    <table className="w-full text-lg text-left rtl:text-right text-gray-500 dark:text-gray-400">
      <thead className="text-lg text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
        <tr>
          <th scope="col" className="px-6 py-1">
            Movie Title
          </th>
          <th scope="col" className="px-6 py-1">
            Release Year
          </th>
          <th scope="col" className="px-6 py-1">
            Director
          </th>
        </tr>
      </thead>
      <tbody>
        {starData.map((star) => {
          return (
            <tr key={star.movie_title}>
              <td className="px-6 py-1">
                <Link
                  to={`/movie/${star.movie_id}`}
                  className="hover:text-blue-700 transition duration-300 ease-in-out"
                >
                  {star.movie_title}
                </Link>
              </td>
              <td className="px-6 py-1">{star.movie_year}</td>
              <td className="px-6 py-1">{star.movie_director}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
