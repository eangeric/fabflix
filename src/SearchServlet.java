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

// Declaring a WebServlet called SearchServlet, which maps to url "/api/search"
@WebServlet(name = "SearchServlet", urlPatterns = "/api/search")
public class SearchServlet extends HttpServlet {
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
     * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse
     *      response)
     */
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException {

        response.setContentType("application/json"); // Response mime type

        // Output stream to STDOUT
        PrintWriter out = response.getWriter();

        // Get a connection from dataSource and let resource manager close the
        // connection after usage.
        try (Connection conn = dataSource.getConnection()) {
            // Create query string for movies
            StringBuilder queryBuilder = new StringBuilder(
                    "SELECT m.id, m.title, m.year, m.director, m.price, " +
                            "GROUP_CONCAT(distinct s.name order by s.id SEPARATOR ', ') AS stars, " +
                            "GROUP_CONCAT(distinct s.id order by s.id SEPARATOR ', ') AS starsId, " +
                            "GROUP_CONCAT(distinct g.name SEPARATOR ', ') AS genres, r.rating " +
                            "FROM movies m " +
                            "JOIN stars_in_movies sim ON m.id = sim.movieId " +
                            "JOIN stars s ON sim.starId = s.id " +
                            "LEFT JOIN ratings r ON m.id = r.movieId " +
                            "JOIN genres_in_movies gim ON m.id = gim.movieId " +
                            "JOIN genres g ON gim.genreId = g.id " +
                            "WHERE 1=1");

            // Get title, year, director, star params
            String requestedTitle = request.getParameter("title");
            if (requestedTitle != null && !requestedTitle.isEmpty()) {
                queryBuilder.append(" AND m.title LIKE ?");
            }

            String requestedYear = request.getParameter("year");
            if (requestedYear != null && !requestedYear.isEmpty()) {
                queryBuilder.append(" AND m.year = ?"); // No partial string
            }

            String requestedDirector = request.getParameter("director");
            if (requestedDirector != null && !requestedDirector.isEmpty()) {
                queryBuilder.append(" AND m.director LIKE ?");
            }

            String requestedStar = request.getParameter("star");
            if (requestedStar != null && !requestedStar.isEmpty()) {
                queryBuilder.append(" AND s.name LIKE ?");
            }

            String requestedGenre = request.getParameter("genre");
            if (requestedGenre != null && !requestedGenre.isEmpty()) {
                queryBuilder.append(" AND m.id IN (SELECT gim.movieId FROM genres_in_movies gim " +
                        "JOIN genres g ON gim.genreId = g.id WHERE g.name LIKE ?)");
            }

            String requestedChar = request.getParameter("char");
            if (requestedChar != null && !requestedChar.isEmpty()) {
                if (!requestedChar.equals("other")) {
                    queryBuilder.append(" AND m.title LIKE ?");
                } else {
                    queryBuilder.append(" AND m.title NOT REGEXP '^[0-9a-zA-Z]'");
                }
            }

            // Makes sure stars are grouped together
            queryBuilder.append(" GROUP BY m.id ");

            String sortBy = request.getParameter("sort"); // "title" or "rating"
            String sortOrder1 = request.getParameter("order1"); // "asc" or "desc"
            String sortOrder2 = request.getParameter("order2"); // "asc" or "desc"
            boolean sorting = (sortBy != null && sortOrder1 != null && sortOrder2 != null);

            if (!sorting) {
                queryBuilder.append(" ORDER BY r.rating DESC, m.title ASC");
            } else {
                if (sortBy.equals("title")) {
                    queryBuilder.append(" ORDER BY m.title ").append(sortOrder1).append(", r.rating ")
                            .append(sortOrder2);
                } else {
                    queryBuilder.append(" ORDER BY r.rating ").append(sortOrder1).append(", m.title ")
                            .append(sortOrder2);
                }
            }

            // Create maxQuery to see how many results there are
            String maxQuery = queryBuilder.toString();
            PreparedStatement maxStatement = conn.prepareStatement(maxQuery);

            // LIMIT RESULTS PER PAGE
            String req_resultNum = request.getParameter("num_results");
            int num_results = 10; // Default value
            if (req_resultNum != null && !req_resultNum.isEmpty()) {
                try {
                    num_results = Integer.parseInt(req_resultNum);
                } catch (NumberFormatException ignored) {
                }
            }
            queryBuilder.append(" LIMIT ? ");

            // OFFSET CALCULATION
            String req_pageNum = request.getParameter("page");
            int offset = 0; // Default value
            if (req_pageNum != null && !req_pageNum.isEmpty()) {
                try {
                    offset = (Integer.parseInt(req_pageNum) - 1) * num_results;
                } catch (NumberFormatException ignored) {
                }
            }
            queryBuilder.append(" OFFSET ? ");

            // Convert query to string
            String query = queryBuilder.toString();
            // Create statement to execute
            PreparedStatement statement = conn.prepareStatement(query);

            // Dynamically set parameters
            int paramIndex = 1;
            int maxParamIndex = 1;
            if (requestedTitle != null && !requestedTitle.isEmpty()) {
                statement.setString(paramIndex++, "%" + requestedTitle + "%");
                maxStatement.setString(maxParamIndex++, "%" + requestedTitle + "%");
            }
            if (requestedYear != null && !requestedYear.isEmpty()) {
                statement.setInt(paramIndex++, Integer.parseInt(requestedYear));
                maxStatement.setInt(maxParamIndex++, Integer.parseInt(requestedYear));
            }
            if (requestedDirector != null && !requestedDirector.isEmpty()) {
                statement.setString(paramIndex++, "%" + requestedDirector + "%");
                maxStatement.setString(maxParamIndex++, "%" + requestedDirector + "%");
            }
            if (requestedStar != null && !requestedStar.isEmpty()) {
                statement.setString(paramIndex++, "%" + requestedStar + "%");
                maxStatement.setString(maxParamIndex++, "%" + requestedStar + "%");
            }
            if (requestedGenre != null && !requestedGenre.isEmpty()) {
                statement.setString(paramIndex++, "%" + requestedGenre + "%");
                maxStatement.setString(maxParamIndex++, "%" + requestedGenre + "%");
            }
            if (requestedChar != null && !requestedChar.isEmpty() && !requestedChar.equals("other")) {
                statement.setString(paramIndex++, requestedChar + "%");
                maxStatement.setString(maxParamIndex++, requestedChar + "%");
            }

            // For the max query
            ResultSet max_rs = maxStatement.executeQuery();
            int max_results = 0;
            while (max_rs.next()) {
                max_results++;
            }
            max_rs.close();

            // For the regular query
            statement.setInt(paramIndex++, num_results);
            statement.setInt(paramIndex++, offset);

            System.out.println("Correct query: " + query);
            // System.out.println(requestedChar);

            // Get results
            ResultSet rs = statement.executeQuery();
            // json array to hold our json object
            JsonArray jsonArray = new JsonArray();

            // Iterate through each row of rs
            while (rs.next()) {
                // Create a JsonObject based on the data we retrieve from rs
                JsonObject jsonObject = new JsonObject();
                jsonObject.addProperty("movie_id", rs.getString("m.id"));
                jsonObject.addProperty("movie_title", rs.getString("m.title"));
                jsonObject.addProperty("movie_year", rs.getString("m.year"));
                jsonObject.addProperty("movie_director", rs.getString("m.director"));
                jsonObject.addProperty("movie_stars", rs.getString("stars"));
                jsonObject.addProperty("movie_starsId", rs.getString("starsId"));
                jsonObject.addProperty("movie_genres", rs.getString("genres"));
                jsonObject.addProperty("movie_rating", rs.getString("r.rating"));
                jsonObject.addProperty("movie_price", rs.getDouble("m.price"));
                jsonArray.add(jsonObject);
            }
            // System.out.println(jsonArray.get(0).toString());

            rs.close();
            statement.close();

            // Log to localhost log
            System.out.println("Returning " + jsonArray.size() + " results");
            System.out.println("out of " + max_results + " results");

            // Write JSON string to output
            // Create response JSON object
            JsonObject responseJson = new JsonObject();
            responseJson.add("movies", jsonArray); // Movie list
            responseJson.addProperty("max_results", max_results); // Total number of results

            // Set response type
            response.setContentType("application/json");
            response.setCharacterEncoding("UTF-8");

            // Write the JSON object as a response
            out.write(responseJson.toString());
            out.flush(); // Ensure data is fully written
            out.close(); // Close output stream

        } catch (Exception e) {

            // Write error message JSON object to output
            request.getServletContext().log("Error: ", e);
            JsonObject errorResponse = new JsonObject();
            errorResponse.addProperty("errorMessage", e.getMessage());
            out.write(errorResponse.toString());

            // Set response status to 500 (Internal Server Error)
            response.setStatus(500);
        } finally {
            out.close();
        }

        // Always remember to close db connection after usage. Here it's done by
        // try-with-resources

    }
}
