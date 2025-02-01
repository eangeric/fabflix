import React, { useState } from "react";
import { Link } from "react-router-dom";

export const MovieTable = ({ movieData }) => {
  const [addedMovie, setAddedMovie] = useState("");
  const [showMessage, setShowMessage] = useState(false);

  const addToCart = async (movieId, movieTitle, quantity) => {
    try {
      const response = await fetch("/fabflix/api/cart", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({
          movieId: movieId,
          movieTitle: movieTitle,
          quantity: quantity,
        }),
      });

      const data = await response.json();
      if (data.status === "success") {
        setAddedMovie(movieTitle);
        setShowMessage(true);
        // Hide message after 2 seconds
        setTimeout(() => {
          setShowMessage(false);
        }, 2000);
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
      <table className="w-full text-lg text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-lg text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
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
          {movieData.map((movie) => {
            //console.log(movie.movie_title, movie.movie_year, movie.movie_director);
            //console.log(movie.movie_genres[0].name, movie.movie_stars[0].name, movie.movie_rating);

            return (
              <tr key={movie.movie_id}>
                {/* Use a unique key here */}
                <td className="px-6 py-1">
                  <Link
                    to={`/movie/${movie.movie_id}`}
                    className="hover:text-blue-700 transition duration-300 ease-in-out"
                  >
                    {movie.movie_title}
                  </Link>
                </td>
                <td className="px-6 py-1">{movie.movie_year}</td>
                <td className="px-6 py-1">{movie.movie_director}</td>
                <td className="px-6 py-1">{movie.movie_genres}</td>
                <td className="px-6 py-1">
                  {movie.movie_stars
                    .split(", ")
                    .slice(0, 3)
                    .map((star, index) => {
                      const starIds = movie.movie_starsId.split(", ");
                      const starId = starIds[index];
                      {
                        /* Put comma except for last item */
                      }
                      return (
                        <Link
                          to={`/star/${starId}`}
                          className="hover:text-blue-700 transition duration-300 ease-in-out"
                        >
                          {star}
                          {index <
                            movie.movie_stars.split(", ").slice(0, 3).length -
                              1 && ", "}
                        </Link>
                      );
                    })}
                </td>
                <td className="px-6 py-1">{movie.movie_rating}</td>
                <td className="px-6 py-1">
                  <button
                    onClick={() => {
                      addToCart(movie.movie_id, movie.movie_title);
                    }}
                  >
                    Add
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
