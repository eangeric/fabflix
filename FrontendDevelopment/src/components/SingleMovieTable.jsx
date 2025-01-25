import React from "react";

export const SingleMovieTable = ({ movieData }) => {
  return (
    <table>
      <tbody>
        <tr>
          <td>Year Released</td>
          <td>{movieData.movie_year}</td>
        </tr>
        <tr>
          <td>Director</td>
          <td>{movieData.movie_director}</td>
        </tr>
        <tr>
          <td>Genres</td>
          <td>
            {movieData.movie_genres.map((genre) => genre.name).join(", ")}
          </td>
        </tr>
        <tr>
          <td>Stars</td>
          <td>{movieData.movie_stars.map((star) => star.name).join(", ")}</td>
        </tr>
        <tr>
          <td>Rating</td>
          <td>{movieData.movie_rating}</td>
        </tr>
      </tbody>
    </table>
  );
};
