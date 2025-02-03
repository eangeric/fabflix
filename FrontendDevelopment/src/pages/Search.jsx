import React, { useState } from "react";
import { SearchBar } from "../components/SearchBar.jsx";
import { MovieTable } from "../components/MovieTable.jsx";
import { useFetchPages } from "../hooks/useFetchPages.js";
import {PageControls} from "../components/Browse/PageControls.jsx";

export default function Search() {
  const [searchUrl, setSearchUrl] = useState(null);
  const [page, setPage] = useState(1);
  const [numResults, setNumResults] = useState(10);
  const { data, maxResults, loading, error } = useFetchPages(searchUrl);

  const handleSearch = (url) => {
    setPage(1);
    setSearchUrl(`${url}&page=1&num_results=${numResults}`);
  };

  return (
    <div className="text-white">
      <SearchBar onSearchUrl={handleSearch} onNumResultsChange={setNumResults} />

      {data && <MovieTable movieData={data} />}

      {data && data.length > 0 && (
        <PageControls
          page={page}
          setPage={setPage}
          maxResults={maxResults}
          numResults={numResults}
          setSearchUrl={setSearchUrl} // Pass this for URL updates
          searchUrl={searchUrl} // Current search URL
        />
      )}

      {/* Change loading text to a loading animation later */}
      {loading && searchUrl && <p className="text-white text-center">Loading...</p>}

      {error && <p className="text-white text-center">Error: {error}</p>}
      {!loading && !error && !data && <h1 className="text-white text-center">No results</h1>}
    </div>
  );
}