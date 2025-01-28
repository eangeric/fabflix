import React from "react";
import { useParams } from "react-router-dom";
import { useFetch } from "../../hooks/useFetch";
import { MovieTable } from "../../components/MovieTable";

export default function BrowseMovieTitle() {
  const { char } = useParams();

  const { data, loading, error } = useFetch(`/fabflix/api/search?char=${char}`);

  console.log(data);

  return (
    <div className="text-white">
      <h1>{char}</h1>
      {data && <MovieTable movieData={data} />}
    </div>
  );
}
