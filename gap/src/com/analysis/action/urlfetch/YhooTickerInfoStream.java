package com.analysis.action.urlfetch;

import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.URL;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import org.htmlparser.NodeFilter;
import org.htmlparser.Parser;
import org.htmlparser.filters.AndFilter;
import org.htmlparser.filters.HasAttributeFilter;
import org.htmlparser.filters.TagNameFilter;
import org.htmlparser.util.NodeList;
import org.htmlparser.util.ParserException;

public class YhooTickerInfoStream extends AbstractURLFetchStream {

	@Override
	protected URL createUrl() throws MalformedURLException {
		URL url = new URL("http://finance.yahoo.com/q/in?s=" + this.getTicker() + "+Industry");
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
			
			NodeList list = new NodeList();
			NodeFilter filter =
			    new AndFilter (
			        new TagNameFilter ("table"),
			        new HasAttributeFilter ("id", "yfncsumtab")
			        );
			
			list = parser.parse(filter);
			//Pattern pattern = Pattern.compile("<tr><td class=\"yfnc_tablehead1\">.*?Mean Target.*?</tr>");
			Pattern pattern = Pattern.compile("Sector:.*?<a .*?>(.*?)</a>");

	        Matcher matcher = pattern.matcher(list.toHtml());

	            boolean found = false;
	            while (matcher.find()) {
	            	System.out.format("I found the text \"%s\" starting at " +
	                   "index %d and ending at index %d.%n",
	                    matcher.group(1), matcher.start(1), matcher.end(1));
	                found = true;
	            }
	            if(!found){
	            	System.out.format("No match found.%n");
	            }

	            pattern = Pattern.compile("Industry:.*?<a .*?>(.*?)</a>");
		        matcher = pattern.matcher(list.toHtml());

		        found = false;
		            while (matcher.find()) {
		            	System.out.format("Industry \"%s\" starting at " +
		                   "index %d and ending at index %d.%n",
		                    matcher.group(1), matcher.start(1), matcher.end(1));
		                found = true;
		            }
		            if(!found){
		            	System.out.format("No match found.%n");
		            }
			
		       
		            pattern = Pattern.compile("Industry:.*?<a .*?>(.*?)</a>");
			        matcher = pattern.matcher(list.toHtml());

			        found = false;
			            while (matcher.find()) {
			            	System.out.format("Industry \"%s\" starting at " +
			                   "index %d and ending at index %d.%n",
			                    matcher.group(1), matcher.start(1), matcher.end(1));
			                found = true;
			            }
			            if(!found){
			            	System.out.format("No match found.%n");
			            }
			        pattern = Pattern.compile("yfnc_tabledata1.*><a href=\"/q/pr\\?s=(.*?)\"");
			        matcher = pattern.matcher(list.toHtml());

			        found = false;
			            while (matcher.find()) {
			            	System.out.format("related tickers \"%s\" starting at " +
			                   "index %d and ending at index %d.%n",
			                    matcher.group(1), matcher.start(1), matcher.end(1));
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

}
