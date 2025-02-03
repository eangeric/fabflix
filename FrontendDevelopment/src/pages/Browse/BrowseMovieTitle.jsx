import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useFetchPages } from "../../hooks/useFetchPages";
import { MovieTable } from "../../components/MovieTable";
import { BgMain } from "../../components/Assets/BgMain";
import {ResultsPerPage} from "../../components/Browse/ResultsPerPage.jsx";
import {PageControls} from "../../components/Browse/PageControls.jsx";

export default function BrowseMovieTitle() {
  const { char } = useParams();
  const [page, setPage] = useState(1);
  const [pageInput, setPageInput] = useState("1");
  const [numResults, setNumResults] = useState(10);
  const [searchUrl, setSearchUrl] = useState(
    `/fabflix/api/search?char=${char}&page=1&num_results=${numResults}`
  );

  const { data, maxResults, loading, error } = useFetchPages(searchUrl);

  useEffect(() => {
    setSearchUrl(`/fabflix/api/search?char=${char}&page=${page}&num_results=${numResults}`);
  }, [char, page, numResults]);


  return (
    <BgMain>
      <div className="text-white">
        <h1 className="flex text-4xl font-bold text-gray-900 dark:text-white justify-center">
          {char.toUpperCase()}
        </h1>

        <ResultsPerPage numResults={numResults} setNumResults={setNumResults} />

        {data && <MovieTable movieData={data} />}

        {data && data.length > 0 && (
          <PageControls
            page={page}
            setPage={setPage}
            maxResults={maxResults}
            numResults={numResults}
          />
        )}

        {loading && searchUrl && <p className="text-white text-center">Loading...</p>}
        {error && <p className="text-white text-center">Error: {error}</p>}
        {!loading && !error && !data && <h1 className="text-white text-center">No results</h1>}
      </div>
    </BgMain>
  );
}
