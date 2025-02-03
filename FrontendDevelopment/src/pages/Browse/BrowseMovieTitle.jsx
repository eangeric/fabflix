import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useFetchPages } from "../../hooks/useFetchPages";
import { MovieTable } from "../../components/MovieTable";
import { BgMain } from "../../components/Assets/BgMain";
import { ResultsPerPage } from "../../components/Browse/ResultsPerPage.jsx";
import { PageControls } from "../../components/Browse/PageControls.jsx";
import { Sorting } from "../../components/Browse/Sorting.jsx";

export default function BrowseMovieTitle() {
  const { char } = useParams();
  const [page, setPage] = useState(1);
  const [sortOrder, setSortOrder] = useState("t-r-asc");
  const [numResults, setNumResults] = useState(10);
  const [searchUrl, setSearchUrl] = useState(
    `/fabflix/api/search?char=${char}&page=1&num_results=${numResults}`
  );

  if (char) {
    sessionStorage.setItem("returnPage", `/browse/title/${char}`);
  }

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
      `/fabflix/api/search?char=${char}&page=${page}&num_results=${numResults}&${queryParams.toString()}`
    );
  }, [char, page, numResults, sortOrder]);

  return (
    <BgMain>
      <div className="text-white">
        <h1 className="flex text-4xl font-bold text-gray-900 dark:text-white justify-center">
          {char.toUpperCase()}
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
