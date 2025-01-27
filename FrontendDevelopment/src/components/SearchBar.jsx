import React, { useState } from "react";

export const SearchBar = ({ onSearchUrl }) => {
    const [title, setTitle] = useState("");
    const [star, setStar] = useState("");
    const [year, setYear] = useState("");
    const [director, setDirector] = useState("");

    const searchHandler = (event) => {
        event.preventDefault(); // Prevent default form submission behavior

        // Preventing empty query
        //console.log("Empty query check");
        //console.log(title, star, year, director);
        //console.log(typeof(title), typeof(star),typeof(year),typeof(director));
        if (title === "" && star === "" && year === "" && director === ""){

            return;
        }

        // Build the query string
        const queryParams = new URLSearchParams();
        if (title) queryParams.append("title", title);
        if (star) queryParams.append("star", star);
        if (year) queryParams.append("year", year);
        if (director) queryParams.append("director", director);

        // Call the parent function with the query string
        const queryString = `/fabflix/api/search?${queryParams.toString()}`;
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
            <input
                type="text"
                placeholder="Star Name"
                value={star}
                onChange={(e) => setStar(e.target.value)}
            />
            <button type="submit"
                    className = "text-white bg-blue-700 hover:bg-blue-800 focus:ring-4
                    focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2
                    dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none
                    dark:focus:ring-blue-800">Search</button>
        </form>
    );
};
