import React from "react";
import { useFetch } from "../../hooks/useFetch";
import { Genres } from "../../components/Browse/Genres";
import { MovieTitle } from "../../components/Browse/MovieTitle";

export default function Browse() {
  const { data } = useFetch("/fabflix/api/genres");

  console.log(data);

  return (
    <div className="text-white">
      <h1>Genres</h1>
      <Genres data={data} />
      <MovieTitle />
    </div>
  );
}
