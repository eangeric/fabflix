import com.google.gson.JsonObject;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;

// Declaring a WebServlet called ShoppingCartServlet, which maps to url "/api/shopping"
@WebServlet(name = "TotalServlet", urlPatterns = "/api/cart/total")
public class TotalServlet extends HttpServlet {

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
    double total = user.getTotalPrice();
    JsonObject totalJson = new JsonObject();
    totalJson.addProperty("total", total);

    // Write the JSON response.
    out.write(totalJson.toString());
    out.close();
  }

}
