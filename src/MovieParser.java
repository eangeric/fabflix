import java.io.IOException;
import java.util.ArrayList;
import java.util.LinkedHashSet;
import java.util.Set;

import javax.xml.parsers.ParserConfigurationException;
import javax.xml.parsers.SAXParser;
import javax.xml.parsers.SAXParserFactory;

import org.xml.sax.Attributes;
import org.xml.sax.SAXException;

import org.xml.sax.helpers.DefaultHandler;
public class MovieParser extends DefaultHandler {
    Set<Movie> movies;
    Set<String> genres;
    private String tempVal;
    private Movie tempMovie;
    private String uri = "src/stanfordmovies/mains243.xml"; // change this to wherever the mains243.xml is

    public MovieParser() {
        movies = new LinkedHashSet<Movie>();
        genres = new LinkedHashSet<String>();
        parseDocument();
    }

    public MovieParser(String uri) {
        movies = new LinkedHashSet<Movie>();
        genres = new LinkedHashSet<String>();
        this.uri = uri;
        parseDocument();
    }

    public ArrayList<Movie> getMovies() {
        return new ArrayList<Movie>(movies);
    }

    private void parseDocument() {
        SAXParserFactory factory = SAXParserFactory.newInstance();
        try {
            SAXParser parser = factory.newSAXParser();
            parser.parse(uri, this);
        } catch (SAXException | ParserConfigurationException | IOException se) {
            se.printStackTrace();
        }
    }

    private void inconsistencyReport() {

        System.out.println("\n\n---- MovieParser Inconsistency Report ----");
        int i = 0;
        for (Movie movie : movies) {
            if (movie.getId().equals("null")) System.out.println(uri + "\nIdError : movies[i=" +i+  "] {\n" + movie + "\n}\n");
            if (movie.getDirector().equals("null")) System.out.println(uri + "\nDirectorError : movies[i=" +i+ "] {\n" + movie + "\n}\n");
            if (movie.getYear() == -1) System.out.println(uri + "\nYearError : movies[i=" +i+ "] {\n" + movie+ "\n}\n");
            i++;
        }
        System.out.println("Number of movies: " + movies.size());
    }


    public void startElement(String uri, String localName, String qName, Attributes attributes) throws SAXException {
        tempVal = "";
        if (qName.equalsIgnoreCase("film")) {
            tempMovie = new Movie();
        }
    }

    public void characters(char[] ch, int start, int length) throws SAXException {
        tempVal = new String(ch, start, length);
    }

    public void endElement(String uri, String localName, String qName) throws SAXException {

        if (qName.equalsIgnoreCase("film")) {
            if (tempMovie.getGenres().isEmpty()){
                tempMovie.addGenre("Uncategorized");
            }
            movies.add(tempMovie);
        }
        else if (qName.equalsIgnoreCase("fid")) {
            tempMovie.setId(tempVal);
        }
        else if (qName.equalsIgnoreCase("year")) {
            try {
                tempMovie.setYear(Integer.parseInt(tempVal));
            } catch (NumberFormatException ne){
                tempMovie.setYear(-1); // During insertion into database, use NULL
            }
        }
        else if (qName.equalsIgnoreCase("t")) {
            tempMovie.setTitle(tempVal);
        }
        else if (qName.equalsIgnoreCase("dir")) {
            tempMovie.setDirector(tempVal);
        }
        else if (qName.equalsIgnoreCase("cat")) {
            genreSelector(tempVal);

        }
        //System.out.println(qName+ " " + tempVal);
    }

    public void genreSelector(String g){
        g = g.toLowerCase();
        if (g.contains("dram") || g.contains("draam") || g.contains("rfp") || g.contains("road")){
            g = "Drama";
        } else if (g.contains("susp") || (g.contains("scat")) || (g.contains("h**"))){
            g = "Thriller";
        } else if (g.contains("romt") || g.contains("ram") || g.equals("h") || g.equals("ront")){
            g = "Romance";
        } else if (g.contains("musc") || g.contains("musical") || g.contains("muusc")){
            g = "Musical";
        } else if (g.contains("myst") || (g.contains("psyc"))){
            g = "Mystery";
        } else if (g.contains("comd") || g.contains("cond") || g.contains("homo")
                || g.contains("h0") || g.contains("undr")){
            g = "Comedy";
        } else if (g.contains("docu") || g.contains("ducu") || g.contains("duco") || g.contains("dicu") ||
                    g.equals("natu")){
            g = "Documentary";
        } else if (g.contains("advt") || g.contains("adct")){
            g = "Adventure";
        } else if (g.contains("actn") || g.contains("sctn") || g.equals("act")
                || g.equals("cnr") || g.equals("viol")
                || g.equals("ca") || g.equals("axtn")){
            g = "Action";
        } else if (g.contains("west")){
            g = "Western";
        } else if (g.contains("fant")){
            g = "Fantasy";
        } else if (g.contains("cart")){
            g = "Animation";
        } else if (g.contains("scfi") || g.contains("scif") || g.contains("sxfi") || g.contains("s.f.")){
            g = "Sci-Fi";
        } else if (g.contains("hor") || g.equals("expm")){
            g = "Horror";
        } else if (g.contains("bio")){
            g = "Biography";
        } else if (g.contains("hist") || g.contains("epic") || g.contains("sati") || g.contains("allegory")){
            g = "History";
        } else if (g.contains("cnrb") || g.contains("crim") || g.contains("cmr")){
            g = "Crime";
        } else if (g.contains("surr") || g.contains("camp") || g.contains("surl")
                    || g.contains("weird") || g.contains ("avant garde") || g.contains("cult")
                    || g.contains("dream") || g.contains("art") || g.contains("avga")
                    || g.contains("verite")){
            g = "Surreal";
        } else if (g.contains("porn") || g.contains("porb") || g.equals("kinky")){
            g = "Adult";
        } else if (g.contains("ctxx") || g.contains("txx") || g.contains("ctxxx")
                    || g.contains("ctcxx") || g.isEmpty() || g.equals(" ")){
            g = "Uncategorized";
        } else if (g.contains("disa")){
            g = "Disaster";
        } else if (g.contains("noir") || g.contains("h*")){
            g = "Noir";
        } else if (g.contains("tv")){
            g = "TV-Movie";
        } else if (g.contains("dist") || g.contains("sport")){
            g = "Sport";
        } else if (g.contains("faml")){
            g = "Family";
        }
        tempMovie.addGenre(g);
        genres.add(g);
    }

    public static void main(String[] args){
        MovieParser parser = new MovieParser();
        //System.out.println("Parsing movies!");
        parser.inconsistencyReport();
        //System.out.println(parser.genres.toString());
    }

}