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

@WebServlet(name = "AddStarServlet", urlPatterns = "/api/add-star")
public class AddStarServlet extends HttpServlet {
  // Create a dataSource which registered in web.
  private DataSource dataSource;

  public void init(ServletConfig config) {
    try {
      dataSource = (DataSource) new InitialContext().lookup("java:comp/env/jdbc/moviedbWrite"); // Use Write DataSource
    } catch (NamingException e) {
      e.printStackTrace();
    }
  }

  /**
   * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse
   *      response)
   */
  protected void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException {
    String starName = request.getParameter("starName");
    String starYear = request.getParameter("starYear");

    response.setContentType("application/json"); // Set content type
    JsonObject responseJsonObject = new JsonObject(); // JSON object for response

    // Validate inputs
    if (starName == null || starName.trim().isEmpty()) {
      responseJsonObject.addProperty("status", "failed");
      responseJsonObject.addProperty("message", "Missing star name");
      response.getWriter().write(responseJsonObject.toString());
      return;
    }

    // Get a connection from dataSource and let resource manager close the
    // connection after usage.
    try (Connection conn = dataSource.getConnection()) {
      // Work on connecting to db
      // Create query string for movies

      String procedure = "{CALL add_star(?, ?)}";

      // Prepare the statement
      PreparedStatement statement = conn.prepareStatement(procedure);
      // Set email parameter
      statement.setString(1, starName);

      // Handle optional birth year
      if (starYear == null || starYear.trim().isEmpty()) {
        statement.setNull(2, java.sql.Types.INTEGER);
      } else {
        statement.setInt(2, Integer.parseInt(starYear));
      }

      // Execute the query
      ResultSet rs = statement.executeQuery();

      if (rs.next()) {
        String starId = rs.getString("star_id");

        responseJsonObject.addProperty("status", "success");
        responseJsonObject.addProperty("message", "Star added successfully with ID: " + starId);
      } else {
        responseJsonObject.addProperty("status", "error");
        responseJsonObject.addProperty("message", "Failed to add star.");
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