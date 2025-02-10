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
    `/fabflix/api/search?genre=${genre}&page=${page}&num_results=${numResults}`
  );

  const { data, maxResults, loading, error } = useFetchPages(
    "genre",
    genre,
    sortOrder,
    page,
    numResults
  );

  useEffect(() => {
    const genreState = sessionStorage.getItem("browseState");
    const prevPage = sessionStorage.getItem("returnPage");

    if (genreState) {
      if (prevPage) {
        const value = prevPage.split("/").at(-1);
        if (value !== genre) {
          setPage(1);
          setSortOrder("title-asc-rating-asc");
          setNumResults(10);
          return;
        }
      }

      const { savedSortOrder, savedPage, savedNumResults } =
        JSON.parse(genreState);
      setSortOrder(savedSortOrder);
      setPage(savedPage);
      setNumResults(savedNumResults);
    }

    if (genre) {
      sessionStorage.setItem("returnPage", `/browse/genre/${genre}`);
    }
  }, [genre]);

  return (
    <BgMain>
      <div className="text-white">
        <h1 className="flex text-4xl font-bold  text-white justify-center">
          {genre && genre.charAt(0).toUpperCase() + genre.slice(1)}
        </h1>

        <div className="flex mt-4 items-center space-x-2 justify-center text-sm">
          <ResultsPerPage
            numResults={numResults}
            setNumResults={setNumResults}
          />
          <Sorting sortOrder={sortOrder} setSortOrder={setSortOrder} />
        </div>

        {loading && searchUrl && (
          <p className="text-white text-center">Loading...</p>
        )}

        {data && <MovieTable movieData={data} />}

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

        {error && <p className="text-white text-center">Error: {error}</p>}
        {!loading && !error && !data && (
          <h1 className="text-white text-center">No results</h1>
        )}
      </div>
    </BgMain>
  );
}
