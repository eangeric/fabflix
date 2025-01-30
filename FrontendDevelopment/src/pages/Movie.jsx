import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { SingleMovieTable } from "../components/SingleMovieTable";
import { useFetch } from "../hooks/useFetch";
import {useImageSearch} from "../hooks/useImageSearch.js";
import {BgMain} from "../components/Assets/BgMain.jsx";


export default function Movie() {
  // Get movie id from link
  const { id: movieID } = useParams();

  // Make API call using custom hook function
  const { data, loading, error } = useFetch(
    `/fabflix/api/movies?id=${movieID}`
  );

  // Set movieData if data is available else set to null
  const movieData = data?.[0] || null;

  const { data: imageData, loading: imageLoading, error: imageError}
    = useImageSearch(movieData);

  return (
    <BgMain>

      <div className="relative p-4 flex justify-center"> {/* This is the star photo */}
        <figure className="relative">
          {imageData ? (
            <img className="rounded-lg" src={imageData} alt="movie poster"
                 style={{
                   width: "40vh",
                   height: "60vh",
                   objectFit: "cover",
                   boxShadow: "0px 0px 100px 5px rgba(0, 153, 255, 0.1)"
                 }}/>
          ) : (
            <h1>Loading Image...</h1>
          )}
        </figure>

        {movieData && (
          <div className="absolute tm-xl bottom-4 left-1 text-white p-4 rounded-lg">
            <h1 className="text-2xl font-bold">{movieData.movie_title}</h1>
          </div>
        )}
      </div>


        {/* If data is still loading */}
        {loading && <h1>Loading movie data...</h1>}

        {/* If error */}
        {error && <h1>Error: {error}</h1>}

        {/* If movieData loaded display information */}
        {movieData && (
          <div className = "p-4">
            <SingleMovieTable movieData={movieData}/>
          </div>
        )}

        {/* Fallback for unexpected states */}
        {!loading && !error && !movieData && <h1>No movie data available</h1>}
    </BgMain>
);
}
