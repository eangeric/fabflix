import React from "react";
import { Link } from "react-router-dom";

export const MovieTitle = () => {
  // Generate an array of letters from A to Z
  const letters = Array.from({ length: 26 }, (_, i) =>
    String.fromCharCode(65 + i)
  );
  // Generate an array of numbers 0-9
  const numbers = Array.from({ length: 10 }, (_, i) => i.toString());
  // TODO:
  // In backend configure this symbol to get movies starting with nonalphanumerical characters
  numbers.push("*");

  return (
    <>
      <ul className="flex gap-2">
        {letters.map((letter) => {
          return (
            <li key={letter}>
              <Link
                to={`/browse/title/${letter.toLowerCase()}`}
                className="hover:text-fabflix-primary"
              >
                {letter}
              </Link>
            </li>
          );
        })}
      </ul>
      <ul className="flex gap-2">
        {numbers.map((number) => {
          return (
            <li key={number}>
              <Link
                to={`/browse/title/${number === "*" ? "other" : number}`}
                className="hover:text-fabflix-primary"
              >
                {number}
              </Link>
            </li>
          );
        })}
      </ul>
    </>
  );
};
