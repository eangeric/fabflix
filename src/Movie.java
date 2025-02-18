import java.util.ArrayList;

/**
 * Movie class: used in store and parsing
 */
public class Movie {

    private String id = "null";
    private String title = "null";
    private int quantity = 0;
    private double price;
    private ArrayList<String> genres;
    private int year = -1;
    private String director = "null";
    public ArrayList<String> stars;

    public Movie() {
        genres = new ArrayList<String>();
        stars = new ArrayList<String>();
    }

    // Used in the Store
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
        genres.add(genre);
    }

    public void addStar(String star) {
        stars.add(star);
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

    public String toString() {
        return String.format("Id: %6s, Title: '%s', Year: %4s, Director: %s", id, title, year, director);
    }

    public ArrayList<String> getStars() {
        return stars;
    }

}