import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;
import com.google.gson.JsonObject;

@WebServlet(name = "FormReCaptcha", urlPatterns = "/form-recaptcha")
public class FormRecaptcha extends HttpServlet {
    private static final long serialVersionUID = 1L;

    public void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException {
        response.setContentType("application/json");

        PrintWriter out = response.getWriter();
        JsonObject jsonResponse = new JsonObject();

        String gRecaptchaResponse = request.getParameter("captcha");
        System.out.println("gRecaptchaResponse=" + gRecaptchaResponse);

        try {
            RecaptchaVerifyUtils.verify(gRecaptchaResponse);
            jsonResponse.addProperty("success", true);
        } catch (Exception e) {
            jsonResponse.addProperty("success", false);
        }

        // Send JSON response to frontend
        out.print(jsonResponse.toString());
        out.flush();

    }
}
