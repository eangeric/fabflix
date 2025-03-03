import javax.naming.InitialContext;
import javax.sql.DataSource;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.SQLException;
import java.util.Map;

public class MainParse {

    private static final String ADD_MOVIE_QUERY = "{CALL add_movie(?, ?, ?, ?, ?, ?)}";

    private static DataSource dataSource;

    public static void main(String[] args) {
        try {
            // Lookup the DataSource
            dataSource = (DataSource) new InitialContext().lookup("java:comp/env/jdbc/moviedbWrite"); // Use Write
                                                                                                      // DataSource
            // Get connection from DataSource
            try (Connection conn = dataSource.getConnection()) {
                // Parse movies from XML
                MovieParser parser = new MovieParser();
                // Map<String, Movie> movies = parser.movies;
                // Map<String, Star> stars = parser.sp.stars;

                insertMoviesIntoDatabase(conn, parser.movies, parser.sp.stars);

                System.out.println("New movies added to the database!");
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    private static void insertMoviesIntoDatabase(Connection conn, Map<String, Movie> movies, Map<String, Star> stars) {
        String s;
        try (PreparedStatement stmt = conn.prepareStatement(ADD_MOVIE_QUERY)) {
            for (Movie movie : movies.values()) {
                stmt.setString(1, movie.getTitle());
                stmt.setInt(2, movie.getYear());
                stmt.setString(3, movie.getDirector());

                if (movie.getStars().size() > 0) {
                    s = movie.getStars().get(0);
                } else {
                    s = "NULL";
                }
                stmt.setString(4, s);

                if (!stars.containsKey(s)) {
                    stmt.setNull(5, java.sql.Types.INTEGER);
                } else {
                    stmt.setInt(5, stars.get(s).getBirthYear());
                }
                stmt.setString(6, movie.getGenres().get(0));
                stmt.executeUpdate();
                // System.out.println("Added " + movie.getTitle());
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }

}
