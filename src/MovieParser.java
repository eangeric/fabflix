import java.io.FileWriter;
import java.io.IOException;
import java.util.*;

import javax.sql.DataSource;
import javax.xml.parsers.ParserConfigurationException;
import javax.xml.parsers.SAXParser;
import javax.xml.parsers.SAXParserFactory;

import org.xml.sax.Attributes;
import org.xml.sax.SAXException;
import org.xml.sax.helpers.DefaultHandler;

public class MovieParser extends DefaultHandler {
    public Map<String, Movie> movies;
    // sp.stars.get("STARNAME").getBirthYear()
    Set<String> genres;
    Set<String> missingStars;
    Map<String, ArrayList<String>> unlinkedActors;
    private String tempVal, tempID;
    private Movie tempMovie;
    private String uri = "stanfordmovies/mains243.xml"; // change this to wherever the mains243.xml is
    private int nullIdCounter = 0;
    private String tempTitle;
    public StarParser sp;

    public MovieParser() {
        movies = new LinkedHashMap<String, Movie>();
        genres = new LinkedHashSet<String>();
        unlinkedActors = new LinkedHashMap<String, ArrayList<String>>();
        missingStars = new HashSet<>();
        parseDocument();
        uri = "stanfordmovies/casts124.xml";
        parseDocument();
        inconsistencyReport();
        sp = new StarParser();
        missingStars();
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
        StringBuilder out = new StringBuilder();
        out.append("\n\n---- MovieParser Inconsistency Report ----\n");
        out.append("src file = ").append(uri).append("\n");
        int i = 0;
        for (String s : movies.keySet()) {
            if (movies.get(s).getId().contains("NULL")) {
                out.append("\nNullId: movies[i=").append(i).append("]{\n\t").append(movies.get(s)).append("}");
            }
            if (movies.get(s).getTitle().isEmpty()) {
                out.append("\nNullTitle: movies[i=").append(i).append("]{\n\t").append(movies.get(s)).append("}");
            }
            if (movies.get(s).getDirector().equals("null")) {
                out.append("\nNullDirector: movies[i=").append(i).append("]{\n\t").append(movies.get(s)).append("}");
            }
            if (movies.get(s).getYear() == -1) {
                out.append("\nNullYear: movies[i=").append(i).append("]{\n\t").append(movies.get(s)).append("}");
            }
            i++;
        }
        out.append("\n\n -- Actors without a valid movie to attach to --\n");
        for (String s : unlinkedActors.keySet()) {
            out.append(s + " ").append(unlinkedActors.get(s)).append("\n");
        }

        out.append("\nNumber of movies: ").append(movies.size()).append("\n");

        try (FileWriter writer = new FileWriter("Report.txt")) {
            writer.write(out.toString());
            System.out.println("Null movies added to Report.txt");
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    private void missingStars() {
        StringBuilder out = new StringBuilder();
        out.append("\n\n---- Missing star information ----\n");
        for (Movie m : movies.values()) {
            for (String s : m.getStars()) {
                if (!sp.stars.containsKey(s) && !missingStars.contains(s)) {
                    out.append("\n\t").append(s);
                    missingStars.add(s);
                }
            }
        }
        try (FileWriter writer = new FileWriter("Report.txt", true)) {
            writer.write(out.toString());
            System.out.println("Missing stars added to Report.txt");
        } catch (IOException e) {
            e.printStackTrace();
        }
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
            if (tempMovie.getGenres().isEmpty()) {
                tempMovie.addGenre("Uncategorized");
            }
            if (tempMovie.getId() == null || tempMovie.getId().equals("null") || tempMovie.getId().trim().isEmpty()) {
                tempMovie.setId("NULL" + nullIdCounter++);
                // System.out.println(tempMovie);
            }

            movies.put(tempMovie.getId(), tempMovie);
        } else if (qName.equalsIgnoreCase("fid")) {
            tempMovie.setId(tempVal);
        } else if (qName.equalsIgnoreCase("year")) {
            try {
                tempMovie.setYear(Integer.parseInt(tempVal));
            } catch (NumberFormatException ne) {
                tempMovie.setYear(-1); // During insertion into database, use NULL
            }
        } else if (qName.equalsIgnoreCase("t")) {
            tempMovie.setTitle(tempVal);
            tempTitle = tempVal;
        } else if (qName.equalsIgnoreCase("dir")) {
            tempMovie.setDirector(tempVal);
        } else if (qName.equalsIgnoreCase("cat")) {
            genreSelector(tempVal);
        } else if (qName.equalsIgnoreCase("f")) {
            tempID = tempVal;
        } else if (qName.equalsIgnoreCase("a")) {
            // System.out.println(tempTitle);
            if (movies.containsKey(tempID)) {
                movies.get(tempID).addStar(tempVal);
            } else {
                // For the movies that were not processed correctly from mains243
                // Will be recorded to put into the inconsistency report
                if (!unlinkedActors.containsKey(tempVal)) {
                    unlinkedActors.put(tempVal, new ArrayList<String>());
                }
                unlinkedActors.get(tempVal).add(tempTitle);
            }
        }
    }

    public void genreSelector(String g) {
        g = g.toLowerCase();
        if (g.contains("dram") || g.contains("draam") || g.contains("rfp") || g.contains("road")) {
            g = "Drama";
        } else if (g.contains("susp") || (g.contains("scat")) || (g.contains("h**"))) {
            g = "Thriller";
        } else if (g.contains("romt") || g.contains("ram") || g.equals("h") || g.equals("ront")) {
            g = "Romance";
        } else if (g.contains("musc") || g.contains("musical") || g.contains("muusc")) {
            g = "Musical";
        } else if (g.contains("myst") || (g.contains("psyc"))) {
            g = "Mystery";
        } else if (g.contains("comd") || g.contains("cond") || g.contains("homo")
                || g.contains("h0") || g.contains("undr")) {
            g = "Comedy";
        } else if (g.contains("docu") || g.contains("ducu") || g.contains("duco") || g.contains("dicu") ||
                g.equals("natu")) {
            g = "Documentary";
        } else if (g.contains("advt") || g.contains("adct")) {
            g = "Adventure";
        } else if (g.contains("actn") || g.contains("sctn") || g.equals("act")
                || g.equals("cnr") || g.equals("viol")
                || g.equals("ca") || g.equals("axtn")) {
            g = "Action";
        } else if (g.contains("west")) {
            g = "Western";
        } else if (g.contains("fant")) {
            g = "Fantasy";
        } else if (g.contains("cart")) {
            g = "Animation";
        } else if (g.contains("scfi") || g.contains("scif") || g.contains("sxfi") || g.contains("s.f.")) {
            g = "Sci-Fi";
        } else if (g.contains("hor") || g.equals("expm")) {
            g = "Horror";
        } else if (g.contains("bio")) {
            g = "Biography";
        } else if (g.contains("hist") || g.contains("epic") || g.contains("sati") || g.contains("allegory")) {
            g = "History";
        } else if (g.contains("cnrb") || g.contains("crim") || g.contains("cmr")) {
            g = "Crime";
        } else if (g.contains("surr") || g.contains("camp") || g.contains("surl")
                || g.contains("weird") || g.contains("avant garde") || g.contains("cult")
                || g.contains("dream") || g.contains("art") || g.contains("avga")
                || g.contains("verite")) {
            g = "Surreal";
        } else if (g.contains("porn") || g.contains("porb") || g.equals("kinky")) {
            g = "Adult";
        } else if (g.contains("ctxx") || g.contains("txx") || g.contains("ctxxx")
                || g.contains("ctcxx") || g.isEmpty() || g.equals(" ")) {
            g = "Uncategorized";
        } else if (g.contains("disa")) {
            g = "Disaster";
        } else if (g.contains("noir") || g.contains("h*")) {
            g = "Noir";
        } else if (g.contains("tv")) {
            g = "TV-Movie";
        } else if (g.contains("dist") || g.contains("sport")) {
            g = "Sport";
        } else if (g.contains("faml")) {
            g = "Family";
        }
        tempMovie.addGenre(g);
        genres.add(g);
    }

    public static void main(String[] args) {
        MovieParser parser = new MovieParser();
        // Testing "The Princess Diaries"
        Movie m = parser.movies.get("GyM35");
        // System.out.println(m.getTitle());
        // System.out.println(m.getYear());
        // System.out.println(m.getDirector());
        // System.out.println(m.getStars().get(0));

    }

}