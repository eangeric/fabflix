import React from "react";
import { useParams } from "react-router-dom";
import { useFetch } from "../hooks/useFetch";
import { SingleStarTable } from "../components/SingleStarTable";
import {useImageSearch} from "../hooks/useImageSearch.js";
import {BgMain} from "../components/Assets/BgMain.jsx";

export default function Movie() {
  // Get star id from link
  const { id: starID } = useParams();

  // Make API call using custom hook function
  const { data: starData, loading, error } = useFetch(
    `/fabflix/api/single-star?id=${starID}`
  );

  // Grabbing image thru Google Search API
  const star = starData?.[0] || null;
  const { data: imageData, loading: imageLoading, error: imageError}
    = useImageSearch(star);

  return (
    <BgMain>
      <div className="relative p-4 flex justify-center"> {/* This is the star photo */}
        <figure className="relative">
          {imageData ? (
            <img className="rounded-lg" src={imageData} alt="star photo"
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

        {star && (
          <div className="absolute tm-xl bottom-4 left-1 text-white p-4 rounded-lg">
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
        <div className = "p-4">
          <SingleStarTable starData={starData}/>
        </div>
      ) : (
        !loading && !error && <h1>No star data available</h1>
      )}
    </BgMain>
  );
}
