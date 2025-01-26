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
     * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
     */
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException {

        response.setContentType("application/json"); // Response mime type

        // Output stream to STDOUT
        PrintWriter out = response.getWriter();

        // Get a connection from dataSource and let resource manager close the connection after usage.
        try (Connection conn = dataSource.getConnection()) {
            // Create query string for movies
            StringBuilder queryBuilder = new StringBuilder(
                    "SELECT m.id, m.title, m.year, m.director, "+
                            "GROUP_CONCAT(s.name SEPARATOR ', ') AS stars , r.rating "+
                            "from movies m join stars_in_movies sim on m.id = sim.movieId "+
                            "join stars s on sim.starId = s.id "+
                            "join ratings r on m.id = r.movieId " +
                            "where 1=1"
            ); // 1=1 makes it easier to add search params

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

            // Makes sure stars are grouped together
            queryBuilder.append(" GROUP BY m.id order by r.rating desc");

            // Convert query to string
            String query = queryBuilder.toString();
            // Create statement to execute
            PreparedStatement statement = conn.prepareStatement(query);

            // Dynamically set parameters (tried to do in for loop but didn't work on year-only search)
            int paramIndex = 1;
            if (requestedTitle != null && !requestedTitle.isEmpty()) {
                statement.setString(paramIndex++, "%" + requestedTitle + "%");
            }
            if (requestedYear != null && !requestedYear.isEmpty()) {
                statement.setInt(paramIndex++, Integer.parseInt(requestedYear));
            }
            if (requestedDirector != null && !requestedDirector.isEmpty()) {
                statement.setString(paramIndex++, "%" + requestedDirector + "%");
            }
            if (requestedStar != null && !requestedStar.isEmpty()) {
                statement.setString(paramIndex++, "%" + requestedStar + "%");
            }

            System.out.println("Correct query: " + query);

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
                jsonObject.addProperty("movie_rating", rs.getString("r.rating"));
                jsonArray.add(jsonObject);
            }

            rs.close();
            statement.close();

            // Log to localhost log
            request.getServletContext().log("Returning " + jsonArray.size() + " results.");

            // Write JSON string to output
            out.write(jsonArray.toString());
            // Set response status to 200 (OK)
            response.setStatus(200);

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

        // Always remember to close db connection after usage. Here it's done by try-with-resources

    }
}
