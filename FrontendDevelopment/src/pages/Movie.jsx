import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { SingleMovieTable } from "../components/SingleMovieTable";
import { useFetch } from "../hooks/useFetch";

export default function Movie() {
  // Get movie id from link
  const { id: movieID } = useParams();

  // Make API call using custom hook function
  const { data, loading, error } = useFetch(
    `/fabflix/api/movies?id=${movieID}`
  );

  // Set movieData if data is avaliable else set to null
  const movieData = data?.[0] || null;

  return (
    <div className="text-white">
      {/* If data is still loading */}
      {loading && <h1>Loading movie data...</h1>}

      {/* If error */}
      {error && <h1>Error: {error}</h1>}

      {/* If movieData loaded display information */}
      {movieData && (
        <>
          <h1>Movie Title: {movieData.movie_title}</h1>
          <SingleMovieTable movieData={movieData} />
        </>
      )}

      {/* Fallback for unexpected states */}
      {!loading && !error && !movieData && <h1>No movie data available</h1>}
    </div>
  );
}
