import com.google.gson.JsonArray;
import com.google.gson.JsonObject;

import javax.naming.InitialContext;
import javax.naming.NamingException;
import jakarta.servlet.ServletConfig;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import javax.sql.DataSource;
import java.io.IOException;
import java.io.PrintWriter;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.Statement;

// Declaring a WebServlet called MoviesServlet, which maps to url "/api/movies"
@WebServlet(name = "MoviesServlet", urlPatterns = "/api/movies")
public class MoviesServlet extends HttpServlet {
    private static final long serialVersionUID = 1L;

    // Create a dataSource which registered in web.
    private DataSource dataSource;

    public void init(ServletConfig config) {
        try {
            dataSource = (DataSource) new InitialContext().lookup("java:comp/env/jdbc/moviedb");
        } catch (NamingException e) {
            e.printStackTrace();
        }
    }

    /**
     * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
     */
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException {

        response.setContentType("application/json"); // Response mime type

        // Output stream to STDOUT
        PrintWriter out = response.getWriter();

        // Get request parameter (?id=movieId)
        String requestedMovieId = request.getParameter("id");

        // Get a connection from dataSource and let resource manager close the connection after usage.
        try (Connection conn = dataSource.getConnection()) {
            // Create query string for movies
            StringBuilder queryBuilder = new StringBuilder(
                    "SELECT m.id, m.title, m.year, m.director, r.rating " +
                            "FROM movies m " +
                            "JOIN ratings r ON m.id = r.movieId "
            );

            if (requestedMovieId != null && !requestedMovieId.isEmpty()) {
                queryBuilder.append("WHERE m.id = ?");
            } else {
                queryBuilder.append("ORDER BY r.rating DESC LIMIT 20");
            }

            String query = queryBuilder.toString();
            PreparedStatement statement = conn.prepareStatement(query);
            if (requestedMovieId != null && !requestedMovieId.isEmpty()) {
                statement.setString(1, requestedMovieId);
            }

            // Get results
            ResultSet rs = statement.executeQuery();
            // json array to hold our json object
            JsonArray jsonArray = new JsonArray();

            // Iterate through each row of rs
            while (rs.next()) {
                // Get from query results for movies
                String moviesId = rs.getString("m.id");
                String movieTitle = rs.getString("m.title");
                String movieYear = rs.getString("m.year");
                String movieDirector = rs.getString("m.director");
                String movieRating = rs.getString("r.rating");
                // Create a JsonObject based on the data we retrieve from rs
                JsonObject jsonObject = new JsonObject();
                jsonObject.addProperty("movies_id", moviesId);
                jsonObject.addProperty("movie_title", movieTitle);
                jsonObject.addProperty("movie_year", movieYear);
                jsonObject.addProperty("movie_director", movieDirector);
                jsonObject.addProperty("movie_rating", movieRating);

                // QUERY TO GET STARS
                // query string
                String starsQuery = "SELECT s.id, s.name, s.birthyear " +
                        "FROM stars s " +
                        "JOIN stars_in_movies sim ON s.id = sim.starId " +
                        "WHERE sim.movieId = ?";
                // Declare the query statement for stars
                // PreparedStatement accepts ? vs Statement is just regular query string
                PreparedStatement starsStatement = conn.prepareStatement(starsQuery);
                // Set the parameter represented by "?" in the query to the id we get from url,
                // num 1 indicates the first "?" in the query
                starsStatement.setString(1, moviesId);
                // Perform the query
                ResultSet rsStars = starsStatement.executeQuery();
                // json array to hold each star
                JsonArray jsonStars = new JsonArray();
                while (rsStars.next()) {
                    // json object to hold star information
                    JsonObject jsonStar = new JsonObject();
                    jsonStar.addProperty("id", rsStars.getString("s.id"));
                    jsonStar.addProperty("name", rsStars.getString("s.name"));
                    jsonStar.addProperty("birthyear", rsStars.getString("s.birthyear"));
                    jsonStars.add(jsonStar);
                }
                rsStars.close();
                starsStatement.close();
                // Add stars list to main json object
                jsonObject.add("movie_stars", jsonStars);

                // QUERY TO GET GENRES
                // query string
                String genresQuery = "SELECT g.id, g.name " +
                        "FROM genres g " +
                        "JOIN genres_in_movies gim ON g.id = gim.genreId " +
                        "WHERE gim.movieId = ?";

                // Declare the statement
                PreparedStatement genresStatement = conn.prepareStatement(genresQuery);
                // Set the parameter represented by "?" in the query to the id we get from url,
                // num 1 indicates the first "?" in the query
                genresStatement.setString(1, moviesId);
                // Perform the query
                ResultSet rsGenres = genresStatement.executeQuery();

                // json array to hold each star
                JsonArray jsonGenres = new JsonArray();
                while (rsGenres.next()) {
                    // json object to hold star information
                    JsonObject jsonGenre = new JsonObject();
                    jsonGenre.addProperty("id", rsGenres.getString("g.id"));
                    jsonGenre.addProperty("name", rsGenres.getString("g.name"));
                    jsonGenres.add(jsonGenre);
                }
                rsGenres.close();
                genresStatement.close();
                // Add genres list to main json object
                jsonObject.add("movie_genres", jsonGenres);


                // Add all json objects into json array
                jsonArray.add(jsonObject);
            }
            rs.close();
            statement.close();

            // Log to localhost log
            request.getServletContext().log("getting " + jsonArray.size() + " results");

            // Write JSON string to output
            out.write(jsonArray.toString());
            // Set response status to 200 (OK)
            response.setStatus(200);

        } catch (Exception e) {

            // Write error message JSON object to output
            JsonObject jsonObject = new JsonObject();
            jsonObject.addProperty("errorMessage", e.getMessage());
            out.write(jsonObject.toString());

            // Set response status to 500 (Internal Server Error)
            response.setStatus(500);
        } finally {
            out.close();
        }

        // Always remember to close db connection after usage. Here it's done by try-with-resources

    }
}
