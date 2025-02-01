/**
 * Movie class
 */
public class Movie {

  private String id;
  private String title;
  private int quantity;
  private double price;

  public Movie(String id, String title, int quantity, double price) {
    this.id = id;
    this.title = title;
    this.quantity = quantity;
    this.price = price;
  }

  public String getId() {
    return id;
  }

  public String getTitle() {
    return title;
  }

  public int getQuantity() {
    return quantity;
  }

  public void setQuantity(int newQuantity) {
    this.quantity = newQuantity;
  }

  public double getPrice() {
    return price;
  }

}