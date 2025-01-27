import jakarta.servlet.*;
import jakarta.servlet.annotation.WebFilter;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.ArrayList;

/**
 * Servlet Filter implementation class LoginFilter
 */
@WebFilter(filterName = "LoginFilter", urlPatterns = "/*")
public class LoginFilter implements Filter {
    private final ArrayList<String> allowedURIs = new ArrayList<>();

    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain)
            throws IOException, ServletException {
        HttpServletRequest httpRequest = (HttpServletRequest) request;
        HttpServletResponse httpResponse = (HttpServletResponse) response;


        // Check if this URL is allowed to access without logging in
        if (isUrlAllowedWithoutLogin(httpRequest)) {
            chain.doFilter(request, response); // Allow access
            return;
        }

        // Redirect to login page if "user" attribute is missing in the session
        if (httpRequest.getSession().getAttribute("user") == null) {
            httpResponse.sendRedirect(httpRequest.getContextPath() + "/login");
        } else {
            chain.doFilter(request, response); // Allow access for authenticated users
        }
    }

    private boolean isUrlAllowedWithoutLogin(HttpServletRequest request) {
        String requestURI = request.getRequestURI();
        // Context path = /fabflix
        String contextPath = request.getContextPath();
        // Check if the URI starts with any allowed URI
        return allowedURIs.stream().anyMatch(uri -> requestURI.startsWith(contextPath + uri));
    }

    public void init(FilterConfig fConfig) {
        // Add allowed routes
        allowedURIs.add("/login");          // React login route
        allowedURIs.add("/api/login");      // API for login
        allowedURIs.add("/assets/");        // Static files like JS, CSS, images
    }

    public void destroy() {
        // No specific cleanup necessary
    }
}
