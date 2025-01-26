import React from "react";
import {Link} from "react-router-dom";

export const SearchBar = () => {
    return (
        <form id="Search" className="flex items-center text-white">
            <h2>Search</h2>
            <input
                type="text"
                placeholder="Movie Title"
            />
            <input
                type="text"
                placeholder="Star Name"
            />
            <input
                type="int"
                placeholder="Year Released"
            />
            <input
                type="text"
                placeholder="Director"
            />
            <button type="submit">Search</button>
        </form>
    );
}