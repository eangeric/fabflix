import React from "react";
import {useFetch} from "../../hooks/useFetch";
import {Genres} from "../../components/Browse/Genres";
import {MovieTitle} from "../../components/Browse/MovieTitle";
import {BgMain} from "../../components/Assets/BgMain.jsx"

export default function Browse() {
  const {data} = useFetch("/fabflix/api/genres");

  console.log(data);

  return (
    <BgMain>
      <div>
        <table className="flex justify-center h-10">
          <thead className="flex justify-center">
          <tr className="text-white space-x-4">
            <th>Browse by genre / title</th>
          </tr>
          </thead>
          <tbody>
          <tr>
            <td>
              <Genres data={data}/>
            </td>
            <td>
              <MovieTitle/>
            </td>
          </tr>
          </tbody>
        </table>
      </div>
    </BgMain>
  );
}
