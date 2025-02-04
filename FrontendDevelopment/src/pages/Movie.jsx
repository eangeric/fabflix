import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { SingleMovieTable } from "../components/SingleMovieTable";
import { useFetch } from "../hooks/useFetch";
import { useImageSearch } from "../hooks/useImageSearch.js";
import { BgMain } from "../components/Assets/BgMain.jsx";
import { Link } from "react-router-dom";

export default function Movie() {
  // Get movie id from link
  const { id: movieID } = useParams();
  const [addedMovie, setAddedMovie] = useState("");
  const [showMessage, setShowMessage] = useState(false);

  const returnPage = sessionStorage.getItem("returnPage") || "/search";

  // Make API call using custom hook function
  const { data, loading, error } = useFetch(
    `/fabflix/api/movies?id=${movieID}`
  );

  // Set movieData if data is available else set to null
  const movieData = data?.[0] || null;

  const {
    data: imageData,
    loading: imageLoading,
    error: imageError,
  } = useImageSearch(movieData);

  const addToCart = async (movieId, movieTitle, moviePrice) => {
    console.log(movieData);
    try {
      const response = await fetch("/fabflix/api/cart", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({
          movieId: movieId,
          movieTitle: movieTitle,
          moviePrice: moviePrice,
        }),
      });

      const data = await response.json();

      if (data.status === "success") {
        setAddedMovie(movieTitle);
        setShowMessage(true);
        setTimeout(() => {
          setShowMessage(false);
        }, 3000);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <BgMain>
      {showMessage && (
        <div className="toast">
          <div className="alert bg-fabflix-primary">
            <span>Added {addedMovie} to the cart.</span>
          </div>
        </div>
      )}
      <div className="p-4 flex flex-col items-center">
        {/* Movie poster */}
        <figure>
          {imageData ? (
            <img
              className="rounded-lg"
              src={imageData}
              alt="movie poster"
              style={{
                width: "40vh",
                height: "60vh",
                objectFit: "cover",
                boxShadow: "0px 0px 100px 5px rgba(0, 153, 255, 0.1)",
              }}
            />
          ) : (
            <h1>Loading Image...</h1>
          )}
        </figure>

        {/* Movie title */}
        {movieData && (
          <div className="text-white text-center mt-4">
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
        <>
          <div className="p-4 flex flex-col gap-4">
            <SingleMovieTable movieData={movieData} />
            <div className="flex gap-2 text-2xl">
              <Link to={returnPage} className="w-64">
                <button className="bg-red-400 text-white font-semibold px-6 py-3 rounded-lg w-full shadow-md transition hover:bg-red-500 hover:shadow-lg">
                  Return to Movie Listings
                </button>
              </Link>

              <button
                className="bg-fabflix-primary text-white font-semibold px-6 py-3 rounded-lg w-64 shadow-md transition hover:bg-blue-600 hover:shadow-lg"
                onClick={() =>
                  addToCart(
                    movieData.movie_id,
                    movieData.movie_title,
                    movieData.movie_price
                  )
                }
              >
                Add to Cart
              </button>
            </div>
          </div>
        </>
      )}

      {/* Fallback for unexpected states */}
      {!loading && !error && !movieData && <h1>No movie data available</h1>}
    </BgMain>
  );
}
