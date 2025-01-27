import React, { useState } from "react";
import { SearchBar } from "../components/SearchBar.jsx";
import { SearchTable } from "../components/SearchTable.jsx";
import { useFetch } from "../hooks/useFetch.js";

export default function Browse() {
    const [browseUrl, setBrowseUrl] = useState(null); // URL for the API call
    //const [movieData, setMovieData] = useState(null); // Handling old and new movieData
    const { data, loading, error } = useFetch(browseUrl); // Call the fetchData function

    // Clear the old stuff first (buffer)
    /*
    React.useEffect(() => {
        if (data) {
            setMovieData(data);
        }
    }, [data]);
    */
    // When BrowseDirectory provides a new URL, trigger the fetch
    //const handleSearch = (url) => {
    //    setMovieData(null);
    //    setBrowseUrl(url); // Trigger `useFetch` by updating the `searchUrl`
    //};

    return (
        <div className="text-white">
            <h1>PLACEHOLDER</h1>
        </div>
    );
}