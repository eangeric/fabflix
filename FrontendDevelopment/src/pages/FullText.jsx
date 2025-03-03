import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useFetch } from "../hooks/useFetch";

export default function FullText() {
  const [searchParams] = useSearchParams();
  const search = searchParams.get("search");
  const [movies, setMovies] = useState();
  // const [limit, setLimit] = useState(10);
  // const [page, setPage] = useState(1);

  useEffect(() => {
    const getData = async () => {
      const response = await fetch(
        `/fabflix/api/search?fulltext=true&title=${search}`
      );
      const data = await response.json();
      setMovies(data);
    };

    getData();
    console.log(movies);
  }, []);

  return <div>{search}</div>;
}
