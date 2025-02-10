import React, { useState } from "react";
import { Link } from "react-router-dom";
import { MovieTableLinks } from "./Browse/MovieTableLinks";

export const MovieTable = ({ movieData }) => {
  const [addedMovie, setAddedMovie] = useState("");
  const [showMessage, setShowMessage] = useState(false);

  const addToCart = async (movieId, movieTitle, moviePrice) => {
    try {
      const response = await fetch("/fabflix/api/cart", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({
          movieId: movieId,
          movieTitle: movieTitle,
          moviePrice: moviePrice,
        }),
      });

      const data = await response.json();

      if (data.status === "success") {
        setAddedMovie(movieTitle);
        setShowMessage(true);
        setTimeout(() => {
          setShowMessage(false);
        }, 3000);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="max-w-screen-xl flex flex-col items-between justify-center mx-auto p-4 relative overflow-x-auto shadow-md sm:rounded-lg">
      {showMessage && (
        <div className="toast">
          <div className="alert bg-fabflix-primary">
            <span>Added {addedMovie} to the cart.</span>
          </div>
        </div>
      )}
      <table className="w-full text-lg text-left rtl:text-right text-white">
        <thead className="text-lg  uppercase  bg-gray-700 text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-1">
              Title
            </th>
            <th scope="col" className="px-6 py-1">
              Year
            </th>
            <th scope="col" className="px-6 py-1">
              Director
            </th>
            <th scope="col" className="px-6 py-1">
              Genres
            </th>
            <th scope="col" className="px-6 py-1">
              Stars
            </th>
            <th scope="col" className="px-6 py-1">
              Rating
            </th>
            <th scope="col" className="px-6 py-1">
              Cart
            </th>
          </tr>
        </thead>
        <tbody>
          {movieData.map((movie) => (
            <tr key={movie.movie_id}>
              <td className="px-6 py-1">
                <Link
                  to={`/movie/${movie.movie_id}`}
                  className="hover:text-fabflix-primary transition duration-300 ease-in-out"
                >
                  {movie.movie_title}
                </Link>
              </td>
              <td className="px-6 py-1">{movie.movie_year}</td>
              <td className="px-6 py-1">{movie.movie_director}</td>
              <td className="px-6 py-1">
                <MovieTableLinks
                  items={movie.movie_genres}
                  basePath="/browse/genre"
                />
              </td>
              <td className="px-6 py-1">
                <MovieTableLinks
                  items={movie.movie_stars}
                  itemIds={movie.movie_starsId}
                  basePath="/star"
                />
              </td>
              <td className="px-6 py-1">{movie.movie_rating}</td>
              <td className="px-6 py-1">
                <button
                  className="bg-fabflix-primary px-4 cursor-pointer rounded-sm hover:bg-blue-600"
                  onClick={() =>
                    addToCart(
                      movie.movie_id,
                      movie.movie_title,
                      movie.movie_price
                    )
                  }
                >
                  Add
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
