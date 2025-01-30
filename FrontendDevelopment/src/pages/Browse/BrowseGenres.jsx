import React from "react";
import { useParams } from "react-router-dom";
import { useFetch } from "../../hooks/useFetch";
import { MovieTable } from "../../components/MovieTable";
import { BgMain } from "../../components/Assets/BgMain"

export default function BrowseGenres() {
  const { genre } = useParams();

  const { data, loading, error } = useFetch(
    `/fabflix/api/search?genre=${genre}`
  );

  console.log(data);

  return (
    <BgMain>
      <div className="text-white">
        <h1 className = "flex text-4xl font-bold text-gray-900
                         dark:text-white justify-center">
          {genre.charAt(0).toUpperCase() + genre.slice(1)}
        </h1>
        {data && <MovieTable movieData={data} />}
      </div>
    </BgMain>
  );
}
