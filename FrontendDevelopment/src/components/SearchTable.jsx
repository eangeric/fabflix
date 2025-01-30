import React from "react";
import { Link } from "react-router-dom";

// DEPRECATED FOR NOW

export const SearchTable = ({ movieData }) => {
  return (
    <table>
      <thead>
        <tr>
          <th>Title</th>
          <th>Year</th>
          <th>Director</th>
          <th>Stars</th>
          <th>Genres</th>
          <th>Rating</th>
        </tr>
      </thead>
      <tbody>
        {movieData.map((movie) => {
          //console.log(movie.movie_title, movie.movie_year, movie.movie_director);
          //console.log(movie.movie_genres[0].name, movie.movie_stars[0].name, movie.movie_rating);

          return (
            <tr key={movie.movie_id}>
              {/* Use a unique key here */}
              <td >
                <Link to={`/movie/${movie.movie_id}`}>{movie.movie_title}</Link>
              </td>
              <td>{movie.movie_year}</td>
              <td>{movie.movie_director}</td>
              <td>{movie.movie_stars}</td>
              <td>{movie.movie_genres}</td>
              <td>{movie.movie_rating}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
