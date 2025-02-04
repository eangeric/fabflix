import React from "react";
import { useFetch } from "../../hooks/useFetch";
import { Genres } from "../../components/Browse/Genres";
import { MovieTitle } from "../../components/Browse/MovieTitle";
import { BgMain } from "../../components/Assets/BgMain.jsx";

export default function Browse() {
  const { data } = useFetch("/fabflix/api/genres");

  return (
    <BgMain>
      <div className="text-white w-full">
        <h1 className="text-center font-bold text-[2.75rem]">
          Browse by genre / title
        </h1>
        <div className="flex gap-x-24 justify-center items-center mt-24">
          <Genres data={data} />
          <MovieTitle />
        </div>
      </div>
    </BgMain>
  );
}
