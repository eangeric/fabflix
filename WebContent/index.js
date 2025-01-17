/**
 * This example is following frontend and backend separation.
 *
 * Before this .js is loaded, the html skeleton is created.
 *
 * This .js performs two steps:
 *      1. Use jQuery to talk to backend API to get the json data.
 *      2. Populate the data to correct html elements.
 */

/**
 * Handles the data returned by the API, read the jsonObject and populate data into html elements
 * @param resultData jsonObject
 */
function handleMovieResult(resultData) {
    console.log("handleMovieResult: populating movies table from resultData");
    // Populate the star table
    // Find the empty table body by id "star_table_body"
    let movieTableBodyElement = jQuery("#movie_table_body");
    console.log(resultData);
    for (let i = 0; i < resultData.length; i++) {
        let rowHTML = "";
        let max_entries = 3;
        let separator = ",";
        rowHTML += "<tr class='table_info_alternate'>";
        // TODO:
        // ADD LINK TO SINGLE MOVIE PAGE
        rowHTML += `<td><a href="pages/single-movie/single-movie.html?id=${resultData[i].movies_id}">${resultData[i].movie_title}</a></td>`;
        rowHTML += `<td>${resultData[i].movie_year}</td>`;
        rowHTML += `<td>${resultData[i].movie_director}</td>`;

        let genres = resultData[i].movie_genres.map(genre => genre.name).join(", ");
        genres = getMaxEntries(genres, ',', max_entries);
        rowHTML += `<td>${genres}</td>`;

        let stars = resultData[i].movie_stars.map((star) => {
            const starId = star.id;
            const starName = star.name;
            return `<a href="pages/single-star/single-star.html?id=${starId}">${starName}</a>`
        }).join(", ");
        stars = getMaxEntries(stars, separator, max_entries);
        rowHTML += `<td>${stars}</td>`;

        rowHTML += `<td>${resultData[i].movie_rating}</td>`;
        rowHTML += "</tr>";
        movieTableBodyElement.append(rowHTML);
    }

}

/**
 * Once this .js is loaded, following scripts will be executed by the browser
 */

// Makes the HTTP GET request and registers on success callback function handleStarResult
jQuery.ajax({
    dataType: "json", // Setting return data type
    method: "GET", // Setting request method
    url: "api/movies", // Setting request url, which is mapped by StarsServlet in Stars.java
    success: (resultData) => handleMovieResult(resultData) // Setting callback function to handle data returned successfully by the StarsServlet
});

function getMaxEntries(str, sep, maxEntries) {
    if (str.indexOf(sep) > 0) {
        let temp = str.split(sep);
        let new_str = "";
        for (let j = 0; j < Math.min(temp.length, maxEntries); j++) {
            new_str += temp[j] + ",";
        }
        return new_str.substring(0,new_str.length-1);
    } else {
        return str;
    }
}