import React from "react";
import { useFetch } from "../../hooks/useFetch";
import { Genres } from "../../components/Browse/Genres";

export default function Browse() {
  const { data } = useFetch("/fabflix/api/genres");

  console.log(data);

  return (
    <div className="text-white">
      <h1>Genres</h1>
      <Genres data={data} />
    </div>
  );
}
