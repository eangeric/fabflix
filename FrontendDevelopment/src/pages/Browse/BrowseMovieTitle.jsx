import React from "react";
import { useParams } from "react-router-dom";
import { useFetch } from "../../hooks/useFetch";
import { MovieTable } from "../../components/MovieTable";
import {BgMain} from "../../components/Assets/BgMain.jsx";

export default function BrowseMovieTitle() {
  const { char } = useParams();

  const { data, loading, error } = useFetch(`/fabflix/api/search?char=${char}`);

  //console.log(data);

  return (
    <BgMain>
      <div className="text-white">
        <h1 className="flex text-4xl font-bold text-gray-900
                         dark:text-white justify-center">
          {char.toUpperCase()}
        </h1>
        {data && <MovieTable movieData={data}/>}
      </div>
    </BgMain>
  );
}
