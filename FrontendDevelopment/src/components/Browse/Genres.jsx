import React from "react";
import { Link } from "react-router-dom";

export const Genres = ({ data }) => {
  return (
    <ul>
      {data &&
        data.map((genre) => {
          return (
            <li key={genre.id}>
              <Link to={`/browse/genre/${genre.name.toLowerCase()}`}>
                {genre.name}
              </Link>
            </li>
          );
        })}
    </ul>
  );
};
