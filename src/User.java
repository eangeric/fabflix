import java.util.ArrayList;
import java.util.List;

/**
 * This User class only has the username field in this example.
 * You can add more attributes such as the user's shopping cart items.
 */
public class User {

  private final String username;
  private final List<Movie> shoppingCart; // Shopping cart holds items

  public User(String username) {
    this.username = username;
    this.shoppingCart = new ArrayList<>();
  }

  // Get Shopping cart
  public String getUsername() {
    return username;
  }

  // Get Shopping cart
  public List<Movie> getShoppingCart() {
    return shoppingCart;
  }

  // Add an item to the shopping cart
  public void addMovie(Movie movie) {
    shoppingCart.add(movie);
  }

  // Remove an item from the shopping cart
  public void removeMovie(Movie movie) {
    shoppingCart.remove(movie);
  }

  public double getTotalPrice() {
    double total = 0.0;
    for (Movie movie : shoppingCart) {
      total += movie.getPrice() * movie.getQuantity(); // Multiply price by quantity
    }
    return Math.round(total * 100.0) / 100.0; // Round to 2 decimal places
  }

}