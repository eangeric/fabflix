import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useFetchPages } from "../../hooks/useFetchPages";
import { MovieTable } from "../../components/MovieTable";
import { BgMain } from "../../components/Assets/BgMain";
import { PageControls } from "../../components/Browse/PageControls";
import { ResultsPerPage } from "../../components/Browse/ResultsPerPage.jsx";
import { Sorting } from "../../components/Browse/Sorting.jsx";

export default function BrowseGenres() {
  const { genre } = useParams();
  const [page, setPage] = useState(1);
  const [numResults, setNumResults] = useState(10);
  const [sortOrder, setSortOrder] = useState("title-asc-rating-asc");
  const [searchUrl, setSearchUrl] = useState(
    `/fabflix/api/search?genre=${genre}&page=1&num_results=${numResults}`
  );

  const { data, maxResults, loading, error } = useFetchPages(searchUrl);

  useEffect(() => {
    const queryParams = new URLSearchParams();

    if (sortOrder) {
      const sortParams = sortOrder.split("-");
      queryParams.append("sort", sortParams[0]);
      queryParams.append("order1", sortParams[1]);
      queryParams.append("order2", sortParams[3]);
    }

    setSearchUrl(
      `/fabflix/api/search?genre=${genre}&page=${page}&num_results=${numResults}&${queryParams.toString()}`
    );
  }, [genre, page, numResults, sortOrder]);

  return (
    <BgMain>
      <div className="text-white">
        <h1 className="flex text-4xl font-bold text-gray-900 dark:text-white justify-center">
          {genre.charAt(0).toUpperCase() + genre.slice(1)}
        </h1>

        <Sorting setSortOrder={setSortOrder} />
        <ResultsPerPage numResults={numResults} setNumResults={setNumResults} />

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

        {loading && searchUrl && (
          <p className="text-white text-center">Loading...</p>
        )}
        {error && <p className="text-white text-center">Error: {error}</p>}
        {!loading && !error && !data && (
          <h1 className="text-white text-center">No results</h1>
        )}
      </div>
    </BgMain>
  );
}
