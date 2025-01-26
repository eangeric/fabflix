import React, { useState } from "react";
import { SearchBar } from "../components/SearchBar.jsx";
import { SearchTable } from "../components/SearchTable.jsx";
import { useFetchSearch } from "../hooks/useFetchSearch";

export default function Search() {
    const [searchUrl, setSearchUrl] = useState(null); // URL for the API call
    const { data: movieData, loading, error, fetchData } = useFetchSearch();

    // When SearchBar provides a new URL, trigger the fetch
    const handleSearch = (url) => {
        setSearchUrl(url);
        fetchData(url); // Call the fetchData function
    };

    return (
        <div className="text-white">
            <SearchBar onSearchUrl={handleSearch} />

            {/* Loading State */}
            {loading && <p>Loading...</p>}

            {/* Error State */}
            {error && <p>Error: {error}</p>}

            {/* Display Movie Data */}
            {movieData && <SearchTable movieData={movieData} />}

            {/* Fallback for unexpected states */}
            {!loading && !error && !movieData && <h1>No movie data available</h1>}
        </div>
    );
}