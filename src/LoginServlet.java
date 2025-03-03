import com.google.gson.JsonObject;

import jakarta.servlet.ServletConfig;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.jasypt.util.password.StrongPasswordEncryptor;

import java.io.IOException;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;

import javax.naming.InitialContext;
import javax.naming.NamingException;
import javax.sql.DataSource;

@WebServlet(name = "LoginServlet", urlPatterns = "/api/login")
public class LoginServlet extends HttpServlet {
    // Create a dataSource which registered in web.
    private DataSource dataSource;

    public void init(ServletConfig config) {
        try {
            dataSource = (DataSource) new InitialContext().lookup("java:comp/env/jdbc/moviedbRead"); // Use Read
                                                                                                     // DataSource
        } catch (NamingException e) {
            e.printStackTrace();
        }
    }

    /**
     * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse
     *      response)
     */
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException {
        String email = request.getParameter("email");
        String password = request.getParameter("password");

        response.setContentType("application/json"); // Set content type
        JsonObject responseJsonObject = new JsonObject(); // JSON object for response

        // Validate inputs
        if (email == null || password == null || email.isEmpty() || password.isEmpty()) {
            responseJsonObject.addProperty("status", "failed");
            responseJsonObject.addProperty("message", "Missing email or password");
            response.getWriter().write(responseJsonObject.toString());
            return;
        }

        // Get a connection from dataSource and let resource manager close the
        // connection after usage.
        try (Connection conn = dataSource.getConnection()) {
            // Work on connecting to db
            // Create query string for movies

            String query = "SELECT * FROM customers WHERE email = ? ";

            // Prepare the statement
            PreparedStatement statement = conn.prepareStatement(query);
            // Set email parameter
            statement.setString(1, email);

            // Execute the query
            ResultSet rs = statement.executeQuery();

            boolean success = false;
            if (rs.next()) {
                // get the encrypted password from the database
                String encryptedPassword = rs.getString("password");

                // use the same encryptor to compare the user input password with encrypted
                // password stored in DB
                success = new StrongPasswordEncryptor().checkPassword(password, encryptedPassword);
            }

            if (success) {
                // Login success:
                // set this user into the session
                request.getSession().setAttribute("user", new User(email));
                System.out.println("User added to session: " + email);
                // Write to json object
                responseJsonObject.addProperty("status", "success");
                responseJsonObject.addProperty("message", "Logged in");
            } else {
                // Login failed:
                // Log to localhost log
                request.getServletContext().log("Login failed");
                // Write to json object
                responseJsonObject.addProperty("status", "failed");
                responseJsonObject.addProperty("message", "Invalid email or password");
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