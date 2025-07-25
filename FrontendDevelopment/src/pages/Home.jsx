import React from "react";
import { MovieTable } from "../components/MovieTable.jsx";
import { useFetch } from "../hooks/useFetch";

// --- DEPRECATED ---

export default function Home() {
  // --- BEGIN: Movie Table from Stage 1 ----
  const { data, loading, error } = useFetch("/fabflix/api/movies");
  const movieData = data || null;
  //console.log(data);
  return (
    <div className="text-white">
      {/* If data is still loading */}
      {loading && <h1>Loading movie data...</h1>}

      {/* If error */}
      {error && <h1>Error: {error}</h1>}

      {/* If movieData loaded display information */}
      {movieData && (
        <>
          <MovieTable movieData={movieData} />
        </>
      )}

      {/* Fallback for unexpected states */}
      {!loading && !error && !movieData && <h1>No movie data available</h1>}
    </div>
  );
  // --- END: Movie Table from Stage 1 ----
}
