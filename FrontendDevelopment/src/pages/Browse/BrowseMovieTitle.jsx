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
  const [numResults, setNumResults] = useState(10);
  const [sortOrder, setSortOrder] = useState("title-asc-rating-desc");
  const [searchUrl, setSearchUrl] = useState(
    `/fabflix/api/search?char=${char}&page=${page}&num_results=${numResults}`
  );

  if (char) {
    sessionStorage.setItem("returnPage", `/browse/title/${char}`);
  }

  const { data, maxResults, loading, error } = useFetchPages(
    "title",
    char,
    sortOrder,
    page,
    numResults
  );

  useEffect(() => {
    const titleState = sessionStorage.getItem("browseState");

    if (titleState) {
      const { savedSortOrder, savedPage, savedNumResults } =
        JSON.parse(titleState);
      setSortOrder(savedSortOrder);
      setPage(savedPage);
      setNumResults(savedNumResults);
    }
  }, []);

  return (
    <BgMain>
      <div className="text-white">
        <h1 className="flex text-4xl font-bold text-gray-900 dark:text-white justify-center">
          {
            // @ts-ignore
            char.toUpperCase()
          }
        </h1>

        <div className="flex mt-4 items-center space-x-2 justify-center text-sm">
          <ResultsPerPage numResults={numResults} setNumResults={setNumResults}/>
          <Sorting setSortOrder={setSortOrder}/>
        </div>

        {data && <MovieTable movieData={data}/>}

        {data &&
          // @ts-ignore
          data.length > 0 && (
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
