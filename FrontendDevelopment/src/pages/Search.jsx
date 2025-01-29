import React, { useState } from "react";
import { SearchBar } from "../components/SearchBar.jsx";
import { useFetch } from "../hooks/useFetch.js";
import { MovieTable } from "../components/MovieTable.jsx";

export default function Search() {
  const [searchUrl, setSearchUrl] = useState(null); // URL for the API call
  const [movieData, setMovieData] = useState(null); // Handling old and new movieData
  const { data, loading, error } = useFetch(searchUrl); // Call the fetchData function

  // Clear the old stuff first (buffer)
  React.useEffect(() => {
    if (data) {
      setMovieData(data);
    }
  }, [data]);

  // When SearchBar provides a new URL, trigger the fetch
  const handleSearch = (url) => {
    setMovieData(null);
    setSearchUrl(url); // Trigger `useFetch` by updating the `searchUrl`
  };

  return (
    <div className="text-white">
      <SearchBar onSearchUrl={handleSearch} />

      {/* Loading State */}
      {/*loading && <p className="text-white justify-center">Loading results...</p>}

      {/* Error State */}
      {/*error && <p className="text-white justify-center">Error: {error}</p>}

      {/* Display Movie Data */}
      {movieData && <MovieTable movieData={movieData} />}

      {/* Fallback for unexpected states */}
      {/*!movieData && <h1 className="text-white justify-center">Please enter a field</h1>*/}
      {!loading && !error && !movieData && <h1 className="text-white justify-center">No movie data available</h1>}
    </div>
  );
}
