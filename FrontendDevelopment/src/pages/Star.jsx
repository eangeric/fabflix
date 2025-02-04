import React from "react";
import { useParams } from "react-router-dom";
import { useFetch } from "../hooks/useFetch";
import { SingleStarTable } from "../components/SingleStarTable";
import { useImageSearch } from "../hooks/useImageSearch.js";
import { BgMain } from "../components/Assets/BgMain.jsx";
import { Link } from "react-router-dom";

export default function Star() {
  // Get star id from link
  const { id: starID } = useParams();

  const returnPage = sessionStorage.getItem("returnPage") || "/search";

  // Make API call using custom hook function
  const {
    data: starData,
    loading,
    error,
  } = useFetch(`/fabflix/api/single-star?id=${starID}`);

  // Grabbing image thru Google Search API
  const star = starData?.[0] || null;
  const {
    data: imageData,
    loading: imageLoading,
    error: imageError,
  } = useImageSearch(star);

  return (
    <BgMain>
      <div className="p-4 flex flex-col items-center">
        {/* This is the star photo */}
        <figure>
          {imageData ? (
            <img
              className="rounded-lg"
              src={imageData}
              alt="star photo"
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

        {star && (
          <div className="text-white text-center mt-4">
            <h1 className="text-2xl font-bold">{star.star_name}</h1>
            <h2 className="text-lg">Born: {star.star_dob || "N/A"}</h2>
          </div>
        )}
      </div>

      {/* If data is still loading */}
      {loading && <h1>Loading star data...</h1>}
      {/* If error */}
      {error && <h1>Error: {error}</h1>}

      {/* If data loaded display information */}
      {star ? (
        <div className="p-4 flex flex-col gap-4">
          <SingleStarTable starData={starData} />
          <button className="hover:text-fabflix-primary">
            <Link to={returnPage}>Return to Movie Listings</Link>
          </button>
        </div>
      ) : (
        !loading && !error && <h1>No star data available</h1>
      )}
    </BgMain>
  );
}
