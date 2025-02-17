import java.util.ArrayList;

/**
 * Movie class
 */
public class Movie {

  private String id;
  private String title;
  private int quantity;
  private double price;
  private ArrayList<String> genres;
  private int year;
  private String director;

  public Movie(){
    genres = new ArrayList<String>();
  }

  public Movie(String id, String title, int quantity, double price) {
    this.id = id;
    this.title = title;
    this.quantity = quantity;
    this.price = price;
    genres = new ArrayList<String>();
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

  public void setId(String id) {
    this.id = id;
  }
  public void setTitle(String title) {
    this.title = title;
  }
  public void setPrice(double price) {
    this.price = price;
  }
  public ArrayList<String> getGenres() {
    return genres;
  }
  public void addGenre(String genre) {
    this.genres.add(genre);
  }
  public int getYear() {
    return year;
  }
  public void setYear(int year) {
    this.year = year;
  }
  public String getDirector() {
    return director;
  }
  public void setDirector(String director) {
    this.director = director;
  }

  public String toString(){
    return (this.id + " " + this.title + " " + this.director + " " + this.genres.toString() + " " + this.year);
  }

}