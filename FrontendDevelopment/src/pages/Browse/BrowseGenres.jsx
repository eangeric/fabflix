import React from "react";
import { useParams } from "react-router-dom";
import { useFetch } from "../../hooks/useFetch";
import { MovieTable } from "../../components/MovieTable";

export default function BrowseGenres() {
  const { genre } = useParams();

  const { data, loading, error } = useFetch(
    `/fabflix/api/search?genre=${genre}`
  );

  console.log(data);

  return (
    <div className="text-white">
      <h1>{genre}</h1>
      {data && <MovieTable movieData={data} />}
    </div>
  );
}
