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
        rowHTML += "<tr>";
        rowHTML += `<td>${resultData[i].movie_title}</td>`;
        rowHTML += `<td>${resultData[i].movie_year}</td>`;
        rowHTML += `<td>${resultData[i].movie_director}</td>`;
        let genres = resultData[i].movie_genres.map(genre => genre.name).join(", ");
        rowHTML += `<td>${genres}</td>`;
        let stars = resultData[i].movie_stars.map(star => star.name).join(", ");
        rowHTML += `<td>${stars}</td>`;
        rowHTML += `<td>${resultData[i].movie_rating}</td>`;
        rowHTML += "</tr>";
        movieTableBodyElement.append(rowHTML);
    }



    // Iterate through resultData, no more than 10 entries
    // for (let i = 0; i < Math.min(10, resultData.length); i++) {
    //
    //     // Concatenate the html tags with resultData jsonObject
    //     let rowHTML = "";
    //     rowHTML += "<tr>";
    //     rowHTML +=
    //         "<th>" +
    //         // Add a link to single-star.html with id passed with GET url parameter
    //         '<a href="single-star.html?id=' + resultData[i]['star_id'] + '">'
    //         + resultData[i]["star_name"] +     // display star_name for the link text
    //         '</a>' +
    //         "</th>";
    //     rowHTML += "<th>" + resultData[i]["star_dob"] + "</th>";
    //     rowHTML += "</tr>";
    //
    //     // Append the row created to the table body, which will refresh the page
    //     starTableBodyElement.append(rowHTML);
    // }
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