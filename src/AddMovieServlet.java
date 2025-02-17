import com.google.gson.JsonObject;

import jakarta.servlet.ServletConfig;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import java.io.IOException;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;

import javax.naming.InitialContext;
import javax.naming.NamingException;
import javax.sql.DataSource;

@WebServlet(name = "AddMovieServlet", urlPatterns = "/api/add-movie")
public class AddMovieServlet extends HttpServlet {
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
  protected void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException {
    String title = request.getParameter("title");
    String year = request.getParameter("year");
    String director = request.getParameter("director");
    String starName = request.getParameter("starName");
    String starYear = request.getParameter("starYear");
    String genre = request.getParameter("genre");

    response.setContentType("application/json"); // Set content type
    JsonObject responseJsonObject = new JsonObject(); // JSON object for response

    // Validate inputs
    if (title == null || year == null || director == null || starName == null || genre == null) {
      responseJsonObject.addProperty("status", "failed");
      responseJsonObject.addProperty("message", "Missing request parameters");
      response.getWriter().write(responseJsonObject.toString());
      return;
    }

    try (Connection conn = dataSource.getConnection()) {
      String procedure = "{CALL add_movie(?, ?, ?, ?, ?, ?)}";
      PreparedStatement statement = conn.prepareStatement(procedure);

      statement.setString(1, title);
      statement.setInt(2, Integer.parseInt(year));
      statement.setString(3, director);
      statement.setString(4, starName);

      if (starYear == null || starYear.trim().isEmpty()) {
        statement.setNull(5, java.sql.Types.INTEGER);
      } else {
        statement.setInt(5, Integer.parseInt(starYear));
      }

      statement.setString(6, genre);
      ResultSet rs = statement.executeQuery();

      if (rs.next()) {
        String status = rs.getString("status");
        String movieId = rs.getString("movie_id");
        String starId = rs.getString("star_id");
        String genreId = rs.getString("genre_id");
        String message = rs.getString("message");

        if ("ERROR".equals(status)) {
          responseJsonObject.addProperty("status", "failed");
          responseJsonObject.addProperty("message", "Movie '" + title + "' already exists.");
          return;
        }

        responseJsonObject.addProperty("status", "success");
        responseJsonObject.addProperty("movieId", movieId);
        responseJsonObject.addProperty("starId", starId);
        responseJsonObject.addProperty("genreId", genreId);
        responseJsonObject.addProperty("message", message);
      }

    } catch (Exception e) {
      // Write error message JSON object to output
      responseJsonObject = new JsonObject();
      responseJsonObject.addProperty("status", "error");
      responseJsonObject.addProperty("errorMessage", e.getMessage());
      // Log error to localhost log
      request.getServletContext().log("Error:", e);

    }

    // Write to response
    response.getWriter().write(responseJsonObject.toString());

  }
}