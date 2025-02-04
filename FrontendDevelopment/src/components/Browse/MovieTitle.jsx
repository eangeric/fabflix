import React from "react";
import { Link } from "react-router-dom";

export const MovieTitle = () => {
  // Generate an array of letters from A to Z
  const letters = Array.from({ length: 26 }, (_, i) =>
    String.fromCharCode(65 + i)
  );
  // Generate an array of numbers 0-9
  const numbers = Array.from({ length: 10 }, (_, i) => i.toString());
  letters.push("*");

  const allCharacters = [...numbers, ...letters];

  // Chunk into 4 columns for readability
  const chunkSize = Math.ceil(allCharacters.length / 4);
  const chunks = Array.from({ length: 4 }, (_, i) =>
    allCharacters.slice(i * chunkSize, (i + 1) * chunkSize)
  );

  return (
    <div className="grid grid-cols-4 gap-4 p-4">
      {chunks.map((chunk, index) => (
        <ul key={index} className="space-y-2 text-center">
          {chunk.map((char) => (
            <li key={char}>
              <Link
                to={`/browse/title/${
                  char === "*" ? "other" : char.toLowerCase()
                }`}
                className="text-white hover:text-fabflix-primary transition duration-300 ease-in-out"
              >
                {char}
              </Link>
            </li>
          ))}
        </ul>
      ))}
    </div>
  );
};
