import React from "react";
import { useFetch } from "../../hooks/useFetch";
import { Genres } from "../../components/Browse/Genres";
import { MovieTitle } from "../../components/Browse/MovieTitle";

export default function Browse() {
  const { data } = useFetch("/fabflix/api/genres");

  console.log(data);

  return (
    <div className="text-white flex flex-col gap-2 justify-center items-center h-[80dvh]">
      <div className="flex flex-col items-center">
        <h1>Genres</h1>
        <Genres data={data} />
      </div>
      <div className="flex flex-col items-center">
        <h1>Movie Title</h1>
        <MovieTitle />
      </div>
    </div>
  );
}
