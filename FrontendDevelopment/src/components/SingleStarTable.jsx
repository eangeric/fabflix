import React from "react";

export const SingleStarTable = ({ starData }) => {
  return (
    <table>
      <thead>
        <tr>
          <th>Movie Title</th>
          <th>Release Year</th>
          <th>Director</th>
        </tr>
      </thead>
      <tbody>
        {starData.map((star) => {
          return (
            <tr key={star.movie_id}>
              <td>{star.movie_title}</td>
              <td>{star.movie_year}</td>
              <td>{star.movie_director}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
