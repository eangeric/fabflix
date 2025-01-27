import com.google.gson.JsonObject;

import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;


@WebServlet(name = "AuthServlet", urlPatterns = "/api/auth")
public class AuthServlet extends HttpServlet {
  protected void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException {
    response.setContentType("application/json");

    JsonObject responseJson = new JsonObject();

    // Check if a user session exists
    if (request.getSession(false) != null && request.getSession().getAttribute("user") != null) {
        responseJson.addProperty("isAuthenticated", true);
    } else {
        responseJson.addProperty("isAuthenticated", false);
    }

    response.getWriter().write(responseJson.toString());
}
}