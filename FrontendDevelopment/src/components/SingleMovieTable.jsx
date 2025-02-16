import React from "react";
import { Link } from "react-router-dom";

export const SingleMovieTable = ({ movieData }) => {
  return (
    <table className="w-full text-lg text-left rtl:text-right  text-gray-400">
      <tbody>
        <tr>
          <td className="text-lg  uppercase  bg-gray-700 text-gray-400 px-6 py-1">
            Year Released
          </td>
          <td className="px-6 py-1">{movieData.movie_year}</td>
        </tr>
        <tr>
          <td className="text-lg  uppercase  bg-gray-700 text-gray-400 px-6 py-1">
            Director
          </td>
          <td className="px-6 py-1">{movieData.movie_director}</td>
        </tr>
        <tr>
          <td className="text-lg  uppercase bg-gray-700 text-gray-400 px-6 py-1">
            Genres
          </td>
          <td className="px-6 py-1">
            {movieData.movie_genres.map((genre, index) => (
              <React.Fragment key={genre.id}>
                <Link
                  to={`/browse/genre/${genre.name}`}
                  className="hover:text-blue-700 transition duration-300 ease-in-out"
                >
                  {genre.name}
                </Link>
                {index < movieData.movie_genres.length - 1 && ", "}
              </React.Fragment>
            ))}
          </td>
        </tr>

        {(() => {
          // Formats the stars into rows of 3 to prevent overextension of width
          const starsPerRow = 5;
          const starChunks = [];

          for (let i = 0; i < movieData.movie_stars.length; i += starsPerRow) {
            starChunks.push(movieData.movie_stars.slice(i, i + starsPerRow));
          }

          return starChunks.map((chunk, rowIndex) => (
            <tr key={rowIndex}>
              <td className="text-lg  uppercase bg-gray-700 text-gray-400 px-6 py-1">
                {rowIndex === 0 ? "Stars" : ""}
              </td>
              <td className="px-6 py-1">
                {chunk.map((star, index) => (
                  <React.Fragment key={star.id}>
                    <Link
                      to={`/star/${star.id}`}
                      className="hover:text-fabflix-primary transition duration-300 ease-in-out"
                    >
                      {star.name}
                    </Link>
                    {index < chunk.length - 1 && ", "}
                  </React.Fragment>
                ))}
              </td>
            </tr>
          ));
        })()}

        <tr>
          <td className="text-lg  uppercase bg-gray-700 text-gray-400 px-6 py-1">
            Rating
          </td>
          <td className="px-6 py-1">{movieData.movie_rating}</td>
        </tr>
      </tbody>
    </table>
  );
};
