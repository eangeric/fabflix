import React from "react";
import { Link } from "react-router-dom";

export const Genres = ({ data }) => {
  if (!data || data.length === 0) {
    return <p className="text-white text-center">Fetching genres...</p>;
  }

  // Chunk data into 2 columns
  const chunkSize = Math.ceil(data.length / 2);
  const chunks = Array.from({ length: 2 }, (_, i) =>
    data.slice(i * chunkSize, (i + 1) * chunkSize)
  );

  // Sanitize names for URLs
  const sanitizeName = (name) => name.toLowerCase().replace(/\s+/g, "-");

  return (
    <div className="grid grid-cols-2 gap-4 p-4">
      {chunks.map((chunk, index) => (
        <ul key={index} className="space-y-2 text-center text-lg">
          {chunk.map((genre) => (
            <li key={genre.id}>
              <Link
                to={`/browse/genre/${sanitizeName(genre.name)}`}
                className="text-white hover:text-fabflix-primary transition duration-300 ease-in-out"
              >
                {genre.name}
              </Link>
            </li>
          ))}
        </ul>
      ))}
    </div>
  );
};
