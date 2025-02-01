import com.google.gson.JsonArray;
import com.google.gson.JsonObject;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.List;

// Declaring a WebServlet called ShoppingCartServlet, which maps to url "/api/shopping"
@WebServlet(name = "CartServlet", urlPatterns = "/api/cart")
public class CartServlet extends HttpServlet {

  // // Create a dataSource which registered in web.
  // private DataSource dataSource;

  // public void init(ServletConfig config) {
  // try {
  // dataSource = (DataSource) new
  // InitialContext().lookup("java:comp/env/jdbc/moviedb");
  // } catch (NamingException e) {
  // e.printStackTrace();
  // }
  // }

  /**
   * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse
   *      response)
   */
  protected void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException {
    response.setContentType("application/json"); // Response mime type
    PrintWriter out = response.getWriter();
    // Get user from session
    User user = (User) request.getSession().getAttribute("user");
    // Retrieve the shopping cart from the user.
    List<Movie> shoppingCart = user.getShoppingCart();

    // Build a JSON array of items.
    JsonArray cartArray = new JsonArray();
    for (Movie movie : shoppingCart) {
      JsonObject movieJson = new JsonObject();
      movieJson.addProperty("id", movie.getId());
      movieJson.addProperty("title", movie.getTitle());
      movieJson.addProperty("quantity", movie.getQuantity());
      movieJson.addProperty("price", movie.getPrice());
      cartArray.add(movieJson);
    }

    // Write the JSON response.
    out.write(cartArray.toString());
    out.close();
  }

  protected void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException {
    response.setContentType("application/json");
    PrintWriter out = response.getWriter();

    // Retrieve the user from the session.
    User user = (User) request.getSession().getAttribute("user");

    // Check params
    String movieId = request.getParameter("movieId");
    String movieTitle = request.getParameter("movieTitle");
    String moviePrice = request.getParameter("moviePrice");
    String operation = request.getParameter("operation");

    // Get shopping cart
    List<Movie> shoppingCart = user.getShoppingCart();
    boolean movieExists = false;

    for (Movie movie : shoppingCart) {
      if (movie.getId().equals(movieId)) {
        // If movie exists, apply operation or default to increasing quantity
        if (operation == null || operation.equals("increase")) {
          movie.setQuantity(movie.getQuantity() + 1);
        } else if (operation.equals("decrease")) {
          if (movie.getQuantity() <= 1) {
            shoppingCart.remove(movie); // Remove if quantity reaches 1
          } else {
            movie.setQuantity(movie.getQuantity() - 1);
          }
        } else if (operation.equals("delete")) {
          shoppingCart.remove(movie);
        }
        movieExists = true;
        break;
      }
    }

    // If the movie wasn't found, add it as a new entry
    double price = Double.parseDouble(moviePrice);
    if (!movieExists) {
      Movie newMovie = new Movie(movieId, movieTitle, 1, price);
      shoppingCart.add(newMovie);
    }

    JsonObject message = new JsonObject();
    message.addProperty("status", "success");

    out.write(message.toString());
    out.close();
  }

}
