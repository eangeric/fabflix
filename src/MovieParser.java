
import java.io.IOException;
import java.io.StringReader;
import java.util.ArrayList;
import java.util.LinkedHashSet;
import java.util.Iterator;
import java.util.Set;

import javax.xml.parsers.ParserConfigurationException;
import javax.xml.parsers.SAXParser;
import javax.xml.parsers.SAXParserFactory;

import org.xml.sax.Attributes;
import org.xml.sax.InputSource;
import org.xml.sax.SAXException;

import org.xml.sax.helpers.DefaultHandler;
public class MovieParser extends DefaultHandler {
    Set<Movie> movies;
    private String tempVal;
    private Movie tempMovie;
    private String uri = "src/stanfordmovies/mains243.xml";

    public MovieParser() {
        movies = new LinkedHashSet<Movie>();
        parseDocument();
    }

    public MovieParser(String uri) {
        movies = new LinkedHashSet<Movie>();
        this.uri = uri;
        parseDocument();
    }

    @SuppressWarnings("unchecked")
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

    private void printData() {
        for (Movie movie : getMovies()) {
            System.out.println(movie.toString());
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
            movies.add(tempMovie);
        }
        else if (qName.equalsIgnoreCase("fid")) {
            tempMovie.setId(tempVal);
        }
        else if (qName.equalsIgnoreCase("year")) {
            try {
                tempMovie.setYear(Integer.parseInt(tempVal));
            } catch (NumberFormatException ne){
                tempMovie.setYear(-1);
            }
        }
        else if (qName.equalsIgnoreCase("t")) {
            tempMovie.setTitle(tempVal);
        }
        else if (qName.equalsIgnoreCase("dir")) {
            tempMovie.setDirector(tempVal);
        }
        else if (qName.equalsIgnoreCase("cat")) {
            tempMovie.addGenre(tempVal);
        }

        //System.out.println(qName+ " " + tempVal);
    }

    public static void main(String[] args){
        MovieParser parser = new MovieParser();
        System.out.println("Parsing movies!");
        parser.printData();
    }



}