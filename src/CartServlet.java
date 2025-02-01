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
import java.util.List;

// Declaring a WebServlet called ShoppingCartServlet, which maps to url "/api/shopping"
@WebServlet(name = "SearchServlet", urlPatterns = "/api/cart")
public class CartServlet extends HttpServlet {

    // // Create a dataSource which registered in web.
    // private DataSource dataSource;

    // public void init(ServletConfig config) {
    //     try {
    //         dataSource = (DataSource) new InitialContext().lookup("java:comp/env/jdbc/moviedb");
    //     } catch (NamingException e) {
    //         e.printStackTrace();
    //     }
    // }

    /**
     * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
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

      String movieId = request.getParameter("movieId");
      String movieTitle = request.getParameter("movieTitle");
      String quantity= request.getParameter("quantity");

      // Update the shopping cart.
      List<Movie> shoppingCart = user.getShoppingCart(); 
      int newQuantity = Integer.parseInt(quantity);
      boolean updated = false;

      for (int i = 0; i < shoppingCart.size(); i++) {
        Movie movie = shoppingCart.get(i);
        if (movie.getId().equals(movieId)) {
            updated = true;
            if (newQuantity <= 0) {
              // Remove the item if the quantity is zero or negative.
              shoppingCart.remove(i);
          } else {
              // Update the item's quantity.
              movie.setQuantity(newQuantity);
          }
            break;
        }
      }

      // If the movie is not found and quantity > 0, add it to the cart.
      if (!updated) {
        double randomPrice = Math.round(Math.random() * 100.0) / 100.0;
        Movie newMovie = new Movie(movieId, movieTitle, 1, randomPrice);
        newMovie.setQuantity(1);
        shoppingCart.add(newMovie);
    }

    // Build JSON response with updated shopping cart.
    // JsonArray cartArray = new JsonArray();
    // for (Movie movie : shoppingCart) {
    //     JsonObject movieJson = new JsonObject();
    //     movieJson.addProperty("id", movie.getId());
    //     movieJson.addProperty("title", movie.getTitle());
    //     movieJson.addProperty("quantity", movie.getQuantity());
    //     movieJson.addProperty("price", movie.getPrice());
    //     cartArray.add(movieJson);
    // }

    JsonObject message = new JsonObject();
    message.addProperty("status", "success");

    out.write(message.toString());
    out.close();
  }

}
