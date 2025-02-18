import java.io.FileWriter;
import java.io.IOException;
import java.util.ArrayList;
import java.util.LinkedHashSet;
import java.util.List;

import javax.xml.parsers.ParserConfigurationException;
import javax.xml.parsers.SAXParser;
import javax.xml.parsers.SAXParserFactory;

import org.xml.sax.Attributes;
import org.xml.sax.SAXException;

import org.xml.sax.helpers.DefaultHandler;
public class StarParser extends DefaultHandler {
    List<Star> stars;
    private String tempVal;
    private Star tempStar;
    private String uri = "src/stanfordmovies/actors63.xml"; // change this to wherever the actors63.xml is

    public StarParser() {
        stars = new ArrayList<Star>();
        parseDocument();
    }

    public void parseDocument() {
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
        out.append("\n\n---- StarParser Inconsistency Report ----\n");
        out.append("src file = ").append(uri).append("\n");
        int i = 0;
        for (Star s : stars) {
            //System.out.println(s);
            //if (s.getId().equals("null")) System.out.println(uri + "\nIdError : stars[i=" +i+  "] {\n" + s + "\n}\n");
            if (s.getName().equals("null"))
                out.append("\nNullName: stars[i=").append(i).append("]{\t").append(s).append("}");
            //if (s.getBirthYear() == -1)
            //    out.append("\nNullBirthYear: stars[i=").append(i).append("]{\t").append(s).append("}");
            i++;
        }
        out.append("\nNumber of stars: ").append(stars.size());
        try (FileWriter writer = new FileWriter("Star_Report.txt")) {
            writer.write(out.toString());
            System.out.println("Inconsistency report saved to Star_Report.txt");
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    public void startElement(String uri, String localName, String qName, Attributes attributes) throws SAXException {
        tempVal = "";
        if (qName.equalsIgnoreCase("actor")) {
            tempStar = new Star();
        }
    }

    public void characters(char[] ch, int start, int length) throws SAXException {
        tempVal = new String(ch, start, length);
    }

    public void endElement(String uri, String localName, String qName) throws SAXException {
        if (qName.equalsIgnoreCase("stagename")) {
            tempStar.setName(tempVal);
        } else if (qName.equalsIgnoreCase("dob")) {
            try {
                tempStar.setBirthYear(Integer.parseInt(tempVal));
            } catch (NumberFormatException ne){
                tempStar.setBirthYear(-1); // During insertion into database, use NULL
            }
        } else if (qName.equalsIgnoreCase("actor")) {
            stars.add(tempStar);
        }
    }

    public static void main(String[] args){
        StarParser parser = new StarParser();
        //System.out.println("Parsing movies!");
        parser.inconsistencyReport();
        //System.out.println(parser.genres.toString());
    }

}