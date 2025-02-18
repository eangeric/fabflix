import java.util.ArrayList;

// Star class used in parsing

public class Star {
    private ArrayList<String> movieIds;
    private String id = "null";
    private String name = "null";
    private int birthYear = -1;

    public Star() {
        movieIds = new ArrayList<String>();
    }

    public void addMovieId(String movieId) {
        movieIds.add(movieId);
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public int getBirthYear() {
        return birthYear;
    }

    public void setBirthYear(int birthYear) {
        this.birthYear = birthYear;
    }

    public ArrayList<String> getMovieIds() {
        return movieIds;
    }

    public String toString() {
        return String.format("Id: %6s, Name: '%s', DOB: %4s", id, name, birthYear);
    }


}
