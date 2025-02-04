import { useState, useEffect } from "react";

export const useFetchPages = (
  searchKey,
  searchValue,
  sortOrder,
  page,
  numResults
) => {
  const [data, setData] = useState(null);
  const [maxResults, setMaxResults] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const queryParams = new URLSearchParams();
        const sortParams = sortOrder.split("-");

        queryParams.append("sort", sortParams[0]);
        queryParams.append("order1", sortParams[1]);
        queryParams.append("order2", sortParams[3]);

        const updatedUrl = `/fabflix/api/search?${searchKey}=${searchValue}&page=${page}&num_results=${numResults}&${queryParams.toString()}`;
        console.log(updatedUrl);

        const response = await fetch(updatedUrl);
        sessionStorage.setItem(
          "browseState",
          JSON.stringify({
            savedSortOrder: sortOrder,
            savedPage: page,
            savedNumResults: numResults,
          })
        );
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const result = await response.json();

        setMaxResults(result.max_results || 0);
        setData(result.movies);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [searchValue, sortOrder, page, numResults]);

  return { data, maxResults, loading, error };
};
