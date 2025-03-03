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
@WebServlet(name = "FullTextServlet", urlPatterns = "/api/fulltext")
public class FullTextServlet extends HttpServlet {
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
    PrintWriter out = response.getWriter();

    // Get a connection from dataSource and let resource manager close the
    // connection after usage.
    try (Connection conn = dataSource.getConnection()) {
      // Create query string for movies
      StringBuilder queryBuilder = new StringBuilder(
          "SELECT m.id, m.title, m.year " +
              "FROM movies m " +
              "LEFT JOIN ratings r ON m.id = r.movieId " +
              "WHERE MATCH(m.title) AGAINST(? IN BOOLEAN MODE) " +
              "LIMIT ? OFFSET ?");

      String requestedSearch = request.getParameter("search");
      String limitParam = request.getParameter("limit");
      String pageParam = request.getParameter("page");

      // Convert query to string
      String query = queryBuilder.toString();
      // Create statement to execute
      PreparedStatement statement = conn.prepareStatement(query);

      // If search parameter is provided, format it properly
      if (requestedSearch != null && !requestedSearch.trim().isEmpty()) {
        // Convert query into full-text format by adding `*` to each keyword
        String[] tokens = requestedSearch.split(" ");

        for (int i = 0; i < tokens.length; i++) {
          tokens[i] = "+" + tokens[i] + "*";
        }

        String formattedSearch = String.join(" ", tokens);

        statement.setString(1, formattedSearch);
      } else {
        statement.setString(1, "");
      }

      int limit = 10; // Default limit

      if (limitParam != null && limitParam.matches("\\d+")) {
        int parsedLimit = Integer.parseInt(limitParam);
        if (parsedLimit == 10 || parsedLimit == 25 || parsedLimit == 50 || parsedLimit == 100) {
          limit = parsedLimit;
        }
      }

      int page = 1; // Default page
      if (pageParam != null && pageParam.matches("\\d+")) {
        page = Math.max(1, Integer.parseInt(pageParam));
      }

      int offset = (page - 1) * limit;

      // Set limit and offset parameters
      statement.setInt(2, limit);
      statement.setInt(3, offset);

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
        // Create a JsonObject based on the data we retrieve from rs
        JsonObject jsonObject = new JsonObject();
        jsonObject.addProperty("movies_id", moviesId);
        jsonObject.addProperty("movie_title", movieTitle);
        jsonObject.addProperty("movie_year", movieYear);

        jsonArray.add(jsonObject);
      }

      // Write to response
      out.write(jsonArray.toString());

    } catch (Exception e) {

      // Write error message JSON object to output
      request.getServletContext().log("Error: ", e);
      JsonObject errorResponse = new JsonObject();
      errorResponse.addProperty("errorMessage", e.getMessage());
      out.write(errorResponse.toString());

      response.setStatus(500);
    } finally {
      out.close();
    }

  }
}
