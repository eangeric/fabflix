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
    <div>
      <ul>
        {letters.map((letter) => {
          return (
            <li key={letter}>
              <Link to={`/browse/title/${letter.toLowerCase()}`}>{letter}</Link>
            </li>
          );
        })}
      </ul>
      <ul>
        {numbers.map((number) => {
          return (
            <li key={number}>
              <Link to={`/browse/title/${number === "*" ? "other" : number}`}>
                {number}
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
