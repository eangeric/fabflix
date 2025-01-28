import React from "react";
import { Link } from "react-router-dom";

export const Genres = ({ data }) => {
  return (
    <ul className="flex gap-2">
      {data &&
        data.map((genre) => {
          return (
            <li key={genre.id}>
              <Link
                to={`/browse/genre/${genre.name.toLowerCase()}`}
                className="hover:text-fabflix-primary"
              >
                {genre.name}
              </Link>
            </li>
          );
        })}
    </ul>
  );
};
