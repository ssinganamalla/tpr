package com.analysis.action.urlfetch;

import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.StringReader;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.URL;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import javax.xml.parsers.ParserConfigurationException;
import javax.xml.parsers.SAXParserFactory;

import org.htmlparser.NodeFilter;
import org.htmlparser.Parser;
import org.htmlparser.filters.AndFilter;
import org.htmlparser.filters.HasAttributeFilter;
import org.htmlparser.filters.TagNameFilter;
import org.htmlparser.util.NodeList;
import org.htmlparser.util.ParserException;
import org.xml.sax.SAXException;
import org.xml.sax.helpers.DefaultHandler;

public class StockTargetSummaryInfoStream extends AbstractURLFetchStream {

	@Override
	protected URL createUrl() throws MalformedURLException {
		URL url = new URL("http://finance.yahoo.com/q/ao?s=" + this.getTicker());
		return url;
	}
	
	@Override
	public InputStream populateStream() throws MalformedURLException, IOException {

		InputStream inputStream = super.populateStream();
		
		URL url = createUrl();
		HttpURLConnection connection = (HttpURLConnection)url.openConnection();
		
		Parser parser = null;
		try {
			parser = new Parser(connection);
			
			NodeFilter filter =
			    new AndFilter (
			        new TagNameFilter ("table"),
			        new HasAttributeFilter ("id", "yfncsumtab")
			        );
			
			NodeList list = new NodeList();
			NodeFilter tableFilter = new TagNameFilter ("table");
			list = parser.parse(filter);
//			while(parser.elements().hasMoreNodes()) {
//				parser.elements().nextNode().collectInto(list, tableFilter);
//			}
			
			
//			Pattern pattern = Pattern.compile("<tr><td class=\"yfnc_tablehead1\">.*?Mean Recommendation \\(this.*?</tr>");
			Pattern pattern = Pattern.compile("<tr><td class=\"yfnc_tablehead1\">.*?Mean Target.*?</tr>");

	        Matcher matcher = pattern.matcher(list.toHtml());

	            boolean found = false;
	            while (matcher.find()) {
	            	System.out.format("I found the text \"%s\" starting at " +
	                   "index %d and ending at index %d.%n",
	                    matcher.group(), matcher.start(), matcher.end());
	            	getRecommendationPrice(matcher.group());
	                found = true;
	            }
	            if(!found){
	            	System.out.format("No match found.%n");
	            }

			
			return new ByteArrayInputStream(list.toHtml().getBytes());
			
		} catch (ParserException e) {
			throw new IOException("Exception caused by Parser");
		}
	}
	
	private String getRecommendationPrice(String innerhtml){
		//<tr><td class="yfnc_tablehead1">Mean Recommendation (this week):</td><td class="yfnc_tabledata1">2.6</td></tr>
		try {
			Parser parser = new Parser(innerhtml);
			NodeFilter filter =
			    new AndFilter (
			        new TagNameFilter ("td"),
			        new HasAttributeFilter ("class", "yfnc_tabledata1")
			        );
			
			NodeList list = new NodeList();
			list = parser.parse(filter);
			assert(list.size()<2);
			
			System.out.println(list.elementAt(0).getFirstChild().toPlainTextString());
		} catch (ParserException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return null;
	}

	private void parseStream(InputStream is) {
		SAXParserFactory parserFactory = SAXParserFactory.newInstance();
		try {
			javax.xml.parsers.SAXParser parser = parserFactory.newSAXParser();
			DefaultHandler dh = new StockTargetSummaryYhooHandler();
			parser.parse(is, dh);
		} catch (ParserConfigurationException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (SAXException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}
}
