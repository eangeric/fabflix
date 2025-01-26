import React, { useState } from "react";

export const SearchBar = ({ onSearchUrl }) => {
    const [title, setTitle] = useState("");
    const [star, setStar] = useState("");
    const [year, setYear] = useState("");
    const [director, setDirector] = useState("");

    const searchHandler = (event) => {
        event.preventDefault(); // Prevent default form submission behavior

        // Build the query string
        const queryParams = new URLSearchParams();
        if (title) queryParams.append("title", title);
        if (star) queryParams.append("star", star);
        if (year) queryParams.append("year", year);
        if (director) queryParams.append("director", director);

        // Call the parent function with the query string
        const queryString = `?${queryParams.toString()}`;
        console.log("Generated Query String:", queryString);
        onSearchUrl(queryString); // Pass query string to parent component
    };

    return (
        <form id="Search" className="flex items-center text-white" onSubmit={searchHandler}>
            <h2>Search</h2>
            <input
                type="text"
                placeholder="Movie Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />
            <input
                type="text"
                placeholder="Star Name"
                value={star}
                onChange={(e) => setStar(e.target.value)}
            />
            <input
                type="number"
                placeholder="Year Released"
                value={year}
                onChange={(e) => setYear(e.target.value)}
            />
            <input
                type="text"
                placeholder="Director"
                value={director}
                onChange={(e) => setDirector(e.target.value)}
            />
            <button type="submit">Search</button>
        </form>
    );
};
