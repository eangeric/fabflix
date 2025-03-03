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

// Declaring a WebServlet called MetadataServlet, which maps to url "/api/metadata"
@WebServlet(name = "MetadataServlet", urlPatterns = "/api/metadata")
public class MetadataServlet extends HttpServlet {
  // Create a dataSource which registered in web.
  private DataSource dataSource;

  public void init(ServletConfig config) {
    try {
      dataSource = (DataSource) new InitialContext().lookup("java:comp/env/jdbc/moviedbRead"); // Use Read DataSource
    } catch (NamingException e) {
      e.printStackTrace();
    }
  }

  /**
   * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse
   *      response)
   */
  protected void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException {

    response.setContentType("application/json");
    JsonObject responseJsonObject = new JsonObject();
    JsonArray tablesArray = new JsonArray();
    PrintWriter out = response.getWriter();

    try (Connection conn = dataSource.getConnection()) {
      String tableQuery = "SELECT table_name FROM information_schema.tables WHERE table_schema = 'moviedb'";
      PreparedStatement statement = conn.prepareStatement(tableQuery);
      ResultSet rs = statement.executeQuery();

      // Loop through each table in moviedb
      while (rs.next()) {
        JsonObject tableObject = new JsonObject();
        String tableName = rs.getString("table_name");
        tableObject.addProperty("table_name", tableName);

        // Get columns for the table
        JsonArray columnsArray = new JsonArray();
        String columnQuery = "SELECT column_name, data_type FROM information_schema.columns WHERE table_schema = 'moviedb' AND table_name = ? ORDER BY ordinal_position";
        PreparedStatement columnStatement = conn.prepareStatement(columnQuery);
        columnStatement.setString(1, tableName);
        ResultSet columnRs = columnStatement.executeQuery();

        while (columnRs.next()) {
          JsonObject columnObject = new JsonObject();
          columnObject.addProperty("columnName", columnRs.getString("column_name"));
          columnObject.addProperty("dataType", columnRs.getString("data_type"));
          columnsArray.add(columnObject);
        }
        tableObject.add("columns", columnsArray);
        tablesArray.add(tableObject);
      }
      responseJsonObject.add("tables", tablesArray);
      out.write(responseJsonObject.toString());
      response.setStatus(200);
    } catch (Exception e) {
      JsonObject jsonObject = new JsonObject();
      jsonObject.addProperty("status", "failed");
      jsonObject.addProperty("errorMessage", e.getMessage());
      out.write(jsonObject.toString());
      response.setStatus(500);
    } finally {
      out.close();
    }

  }
}
