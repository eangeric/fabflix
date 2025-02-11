import com.google.gson.JsonObject;
import com.google.gson.JsonArray;

import jakarta.servlet.ServletConfig;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.List;

import javax.naming.InitialContext;
import javax.naming.NamingException;
import javax.sql.DataSource;

@WebServlet(name = "PaymentServlet", urlPatterns = "/api/payment")
public class PaymentServlet extends HttpServlet {
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
    String first = request.getParameter("first");
    String last = request.getParameter("last");
    String card = request.getParameter("card");
    String date = request.getParameter("date");

    response.setContentType("application/json"); // Set content type
    JsonObject responseJsonObject = new JsonObject(); // JSON object for response

    // Validate inputs
    if (first == null || last == null || card == null || date == null || first.isEmpty() || last.isEmpty()
        || card.isEmpty() || date.isEmpty()) {
      responseJsonObject.addProperty("status", "failed");
      responseJsonObject.addProperty("message", "Please fill out all inputs.");
      response.getWriter().write(responseJsonObject.toString());
      return;
    }

    // Get a connection from dataSource and let resource manager close the
    // connection after usage.
    try (Connection conn = dataSource.getConnection()) {
      // Create query string for creditcards
      String query = "SELECT c.id AS cardId, c.firstName, c.lastName, c.expiration, cu.id AS customerId " +
          "FROM creditcards c " +
          "JOIN customers cu ON c.id = cu.ccId " +
          "WHERE c.firstName = ? AND c.lastName = ? AND c.id = ? AND c.expiration = ? " +
          "LIMIT 1";

      // Prepare the statement
      PreparedStatement statement = conn.prepareStatement(query);
      // Set email parameter
      statement.setString(1, first);
      // Set password parameter
      statement.setString(2, last);
      // Set email parameter
      statement.setString(3, card);
      // Set email parameter
      statement.setString(4, date);

      // Execute the query
      ResultSet rs = statement.executeQuery();

      // Check if a result was returned
      if (rs.next()) {
        // Login success:
        System.out.println("Payment Successful");

        User user = (User) request.getSession().getAttribute("user");
        List<Movie> shoppingCart = user.getShoppingCart();
        int customerId = rs.getInt("customerId"); // Get customer ID

        String insertSaleQuery = "INSERT INTO sales (customerId, movieId, quantity, saleDate) VALUES (?, ?, ?, CURDATE())";
        PreparedStatement insertStatement = conn.prepareStatement(insertSaleQuery,
            PreparedStatement.RETURN_GENERATED_KEYS);

        for (Movie movie : shoppingCart) {
          insertStatement.setInt(1, customerId);
          insertStatement.setString(2, movie.getId());
          insertStatement.setInt(3, movie.getQuantity());
          insertStatement.addBatch();
        }

        insertStatement.executeBatch();

        ResultSet generatedKeys = insertStatement.getGeneratedKeys();
        JsonArray moviesArray = new JsonArray();
        int index = 0;

        while (generatedKeys.next() && index < shoppingCart.size()) {
          int saleId = generatedKeys.getInt(1);
          Movie movie = shoppingCart.get(index);

          JsonObject saleJson = new JsonObject();
          saleJson.addProperty("saleId", saleId);
          saleJson.addProperty("title", movie.getTitle());
          saleJson.addProperty("quantity", movie.getQuantity());

          moviesArray.add(saleJson);
          index++;
        }

        // Get total price from user's shopping cart
        double totalPrice = user.getTotalPrice();
        user.clearShoppingCart();

        // Construct salesInfo object
        JsonObject salesInfoJson = new JsonObject();
        salesInfoJson.addProperty("totalPrice", totalPrice);
        salesInfoJson.add("movies", moviesArray);

        // Construct final response
        responseJsonObject.addProperty("status", "success");
        responseJsonObject.addProperty("message", "Order placed!");
        responseJsonObject.add("salesInfo", salesInfoJson);
      } else {
        // Log to localhost log
        request.getServletContext().log("Payment failed");
        // Write to json object
        responseJsonObject.addProperty("status", "failed");
        responseJsonObject.addProperty("message", "Invalid payment credentials. Please try again.");
      }

    } catch (Exception e) {
      // Write error message JSON object to output
      responseJsonObject = new JsonObject();
      responseJsonObject.addProperty("errorMessage", e.getMessage());
      // Log error to localhost log
      request.getServletContext().log("Error:", e);

    }

    // Write to response
    response.getWriter().write(responseJsonObject.toString());

  }
}