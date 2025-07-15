import { useState, useEffect } from "react";

export const useImageSearch = (item, options = {}) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!item) return;

    // Determine if we're looking for the star, or the movie
    const query = item.star_name || item.movie_title;
    if (!query) return;

    // Note: Limited to 100 searches a day
    const url =
      `https://www.googleapis.com/customsearch/v1?` +
      `key=${process.env.GOOGLE_API_KEY}` +
      `&cx=d6d3e229fed4a4942` +
      `&q=${encodeURIComponent(query)}` +
      `&searchType=image&num=1`;

    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(url, options);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const result = await response.json();
        setData(result);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [item]);

  if (data) return { data: data.items[0].link, loading, error };
  else return { data, loading, error };
};
