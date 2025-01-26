import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useFetch } from "../hooks/useFetch";
import { SingleStarTable } from "../components/SingleStarTable";

export default function Movie() {
  // Get star id from link
  const { id: starID } = useParams();

  // Make API call using custom hook function
  const { data, loading, error } = useFetch(
    `/fabflix/api/single-star?id=${starID}`
  );

  // Set the data if data is avaliable else set to null
  const starData = data || null;
  console.log(starData);

  return (
    <div className="text-white">
      {/* If data is still loading */}
      {loading && <h1>Loading star data...</h1>}

      {/* If error */}
      {error && <h1>Error: {error}</h1>}

      {/* If data loaded display information */}
      {starData && (
        <>
          <h1>Star: {starData[0].star_name}</h1>
          <h2>
            Date of Birth:{" "}
            {starData[0].star_dob === null ? "N/A" : starData[0].star_dob}
          </h2>
          <SingleStarTable starData={starData} />
        </>
      )}

      {/* Fallback for unexpected states */}
      {!loading && !error && !starData && <h1>No star data available</h1>}
    </div>
  );
}
