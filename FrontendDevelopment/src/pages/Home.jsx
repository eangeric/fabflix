import React from "react";
/*import { useParams } from "react-router-dom"; */
import { MovieTable } from "../components/MovieTable.jsx";
import { useFetch } from "../hooks/useFetch";

export default function Home() {
    const { data, loading, error } = useFetch(
        '/fabflix/api/movies');

    const movieData = data || null;
    //console.log(data);
    return (
        <div className = "text-white">
            {/* If data is still loading */}
            {loading && <h1>Loading movie data...</h1>}

            {/* If error */}
            {error && <h1>Error: {error}</h1>}

            {/* If movieData loaded display information */}
            {movieData && (
                <>
                    <h1>Movie List</h1>
                    <MovieTable movieData={movieData}/>
                </>
            )}

            {/* Fallback for unexpected states */}
            {!loading && !error && !movieData && <h1>No movie data available</h1>}
        </div>
    );
}
