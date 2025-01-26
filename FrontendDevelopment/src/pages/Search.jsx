import React from "react";
/*import { useParams } from "react-router-dom"; */
import { MovieTable } from "../components/MovieTable.jsx";
import { SearchBar } from "../components/SearchBar.jsx";
import { useFetch } from "../hooks/useFetch";

export default function Search() {

    return (
        <SearchBar searchbar></SearchBar>
    );

}
