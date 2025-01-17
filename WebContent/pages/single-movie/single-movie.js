/**
 * This example is following frontend and backend separation.
 *
 * Before this .js is loaded, the html skeleton is created.
 *
 * This .js performs three steps:
 *      1. Get parameter from request URL so it know which id to look for
 *      2. Use jQuery to talk to backend API to get the json data.
 *      3. Populate the data to correct html elements.
 */


/**
 * Retrieve parameter from request URL, matching by parameter name
 * @param target String
 * @returns {*}
 */
function getParameterByName(target) {
    // Get request URL
    let url = window.location.href;
    // Encode target parameter name to url encoding
    target = target.replace(/[\[\]]/g, "\\$&");

    // Ues regular expression to find matched parameter value
    let regex = new RegExp("[?&]" + target + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';

    // Return the decoded parameter value
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}

/**
 * Handles the data returned by the API, read the jsonObject and populate data into html elements
 * @param resultData jsonObject
 */

function handleResult(resultData) {

    console.log("handleResult: populating movie info from resultData");
    console.log(resultData);

    // populate the star info h3
    // find the empty h3 body by id "star_info"
    let movieInfoElement = jQuery("#movie_info");
    movieInfoElement.append(`<p id='singleName'>${resultData[0].movie_title}</p>`)

    document.title = "Fabflix | " + resultData[0].movie_title;

    console.log("handleResult: populating movie table from resultData");
    let movieTableBodyElement = jQuery("#movie_table_body");
    let rowHTML = "";
    rowHTML += `<tr class='table_info_alternate'><td class="table_info_header">Year Released</td><td>${resultData[0].movie_year}</td></tr>`;

    rowHTML += `<tr class='table_info_alternate'><td class="table_info_header">Director</td><td>${resultData[0].movie_director}</td></tr>`;

    let genres = resultData[0].movie_genres.map(genre => genre.name).join(", ");
    rowHTML += `<tr class='table_info_alternate'><td class="table_info_header">Genres</td><td>${genres}</td></tr>`;

    let stars = resultData[0].movie_stars.map((star) => {
        const starId = star.id;
        const starName = star.name;
        return `<a href="../single-star/single-star.html?id=${starId}">${starName}</a>`
    }).join(", ");
    rowHTML += `<tr class='table_info_alternate'><td class="table_info_header">Stars</td><td>${stars}</td></tr>`;

    rowHTML += `<tr class='table_info_alternate'><td class="table_info_header">Rating</td><td>${resultData[0].movie_rating}</td></tr>`;

    movieTableBodyElement.append(rowHTML);
}

/**
 * Once this .js is loaded, following scripts will be executed by the browser\
 */

// Get id from URL
let movieId = getParameterByName('id');

console.log(movieId);

// Makes the HTTP GET request and registers on success callback function handleResult
jQuery.ajax({
    dataType: "json",  // Setting return data type
    method: "GET",// Setting request method
    url: "/cs122b_project1_api_example_war/api/movies?id=" + movieId, // Setting request url, which is mapped by StarsServlet in Stars.java
    success: (resultData) => handleResult(resultData) // Setting callback function to handle data returned successfully by the SingleStarServlet
});