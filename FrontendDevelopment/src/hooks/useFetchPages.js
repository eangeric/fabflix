import { useState, useEffect } from "react";

export const useFetchPages = (url, options = {}) => {
  const [data, setData] = useState(null);
  const [maxResults, setMaxResults] = useState(0); // Ensure we store max results
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!url) return;

    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch(url, options);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const result = await response.json();

        //console.log("Fetched Data:", result); // Debugging to ensure API response

        setMaxResults(result.max_results || 0);
        setData(result.movies);

      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url]);

  return { data, maxResults, loading, error };
};
