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

    // populate the movie info h3
    // find the empty h3 body by id "movie_info"
    let movieInfoElement = jQuery("#movie_info");
    movieInfoElement.append(`<p id='singleName'>${resultData[0].movie_title}</p>`)

    // Set tab title
    document.title = "Fabflix | " + resultData[0].movie_title;

    // Populate the movie table
    // Find the empty table body by id "movie_table_body"
    console.log("handleResult: populating movie table from resultData");
    let movieTableBodyElement = jQuery("#movie_table_body");
    let rowHTML = "";
    rowHTML += `<tr class='table_info_alternate'><td class="table_info_header">Year Released</td><td>${resultData[0].movie_year}</td></tr>`;

    rowHTML += `<tr class='table_info_alternate'><td class="table_info_header">Director</td><td>${resultData[0].movie_director}</td></tr>`;
    // Map genres to get them all as one string
    let genres = resultData[0].movie_genres.map(genre => genre.name).join(", ");
    rowHTML += `<tr class='table_info_alternate'><td class="table_info_header">Genres</td><td>${genres}</td></tr>`;
    // Map stars to get them all as one string and as a link
    let stars = resultData[0].movie_stars.map((star) => {
        const starId = star.id;
        const starName = star.name;
        return `<a href="../single-star/single-star.html?id=${starId}">${starName}</a>`
    }).join(", ");
    rowHTML += `<tr class='table_info_alternate'><td class="table_info_header">Stars</td><td>${stars}</td></tr>`;

    rowHTML += `<tr class='table_info_alternate'><td class="table_info_header">Rating</td><td>${resultData[0].movie_rating}</td></tr>`;

    movieTableBodyElement.append(rowHTML);
}

// Get id from URL
let movieId = getParameterByName('id');
let basePath = window.location.pathname.split("/")[1];

// Makes the HTTP GET request and registers on success callback function handleResult
jQuery.ajax({
    dataType: "json",  // Setting return data type
    method: "GET",// Setting request method
    url: `/${basePath}/api/movies?id=${movieId}`, // Setting request url, which is mapped by StarsServlet in Stars.java
    success: (resultData) => handleResult(resultData) // Setting callback function to handle data returned successfully by the SingleStarServlet
});