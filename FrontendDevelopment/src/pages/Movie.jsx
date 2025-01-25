import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { SingleMovieTable } from "../components/SingleMovieTable";

export default function Movie() {
  // Get movie id from link
  const params = useParams();
  const movieID = params.id;

  // State to hold movie data
  const [movieData, setMovieData] = useState(null);

  // API call
  useEffect(() => {
    const getMovie = async () => {
      try {
        // Fetch the API
        const response = await fetch(`/fabflix/api/movies?id=${movieID}`);

        // Check if not successful
        if (!response.ok) {
          throw new Error(
            `HTTP error! Failed to fetch with status: ${response.status}`
          );
        }
        // Read the response
        const data = await response.json();
        // Set the movie data state
        setMovieData(data[0]);
      } catch (error) {
        console.log(`Error fetching movie: ${error}`);
      }
    };

    if (movieID) {
      getMovie();
    }
  }, [movieID]);

  return (
    <div className="text-white">
      {/* If movieData loaded display information, if not display loading text */}
      {movieData ? (
        <div>
          <h1>Movie Title: {movieData.movie_title}</h1>
          <SingleMovieTable movieData={movieData} />
        </div>
      ) : (
        <h1>Loading movie data</h1>
      )}
    </div>
  );
}
