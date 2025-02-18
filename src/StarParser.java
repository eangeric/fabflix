import java.io.FileWriter;
import java.io.IOException;
import java.util.*;

import javax.xml.parsers.ParserConfigurationException;
import javax.xml.parsers.SAXParser;
import javax.xml.parsers.SAXParserFactory;

import org.xml.sax.Attributes;
import org.xml.sax.SAXException;
import org.xml.sax.helpers.DefaultHandler;

public class StarParser extends DefaultHandler {
    public Map<String, Star> stars;
    private String tempVal;
    private Star tempStar;
    private String uri = "stanfordmovies/actors63.xml"; // change this to wherever the actors63.xml is

    public StarParser() {
        stars = new LinkedHashMap<>();
        parseDocument();
        inconsistencyReport();
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
        for (String name : stars.keySet()) {
            Star s = stars.get(name);
            if (s.getName().equals("null")) {
                out.append("\nNullName: stars[i=").append(i).append("]{\t").append(s).append("}");
            }
            i++;
        }
        out.append("\nNumber of stars: ").append(stars.size());
        try (FileWriter writer = new FileWriter("Report.txt", true)) {
            writer.write(out.toString());
            System.out.println("Stars with missing movies added to Report.txt");
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
            stars.put(tempStar.getName(), tempStar);
        }
    }

    public static void main(String[] args){
        StarParser parser = new StarParser();
        parser.inconsistencyReport();
    }
}
