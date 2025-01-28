import React from "react";
import {useFetch} from "../../hooks/useFetch";
import {Genres} from "../../components/Browse/Genres";
import {MovieTitle} from "../../components/Browse/MovieTitle";

export default function Browse() {
  const {data} = useFetch("/fabflix/api/genres");

  console.log(data);

  return (
    <div className="text-4xl" style={{
      backgroundImage:
        "linear-gradient(rgba(3, 20, 50, 0.9), rgba(31, 33, 38, 1))," +
        "url(/fabflix/images/movieBg.jpg)"
    }}>
      <div>
        <table className="flex justify-center">
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
    </div>
  );
}
