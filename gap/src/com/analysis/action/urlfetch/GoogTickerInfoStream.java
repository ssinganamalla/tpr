package com.analysis.action.urlfetch;

import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.URL;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import org.htmlparser.NodeFilter;
import org.htmlparser.Parser;
import org.htmlparser.filters.AndFilter;
import org.htmlparser.filters.HasAttributeFilter;
import org.htmlparser.filters.TagNameFilter;
import org.htmlparser.util.NodeList;
import org.htmlparser.util.ParserException;

public class GoogTickerInfoStream extends AbstractURLFetchStream {

	@Override
	protected URL createUrl() throws MalformedURLException {
		URL url = new URL("http://www.google.com/finance?q=" + this.getTicker());
		return url;
	}
	
	@Override
	public InputStream populateStream() throws MalformedURLException, IOException {

		InputStream inputStream = super.populateStream();
		
		/*GoogTickerInfoPopulator infoPopulator = new GoogTickerInfoPopulator(this.getTicker());
		infoPopulator.populateTickerInfo(inputStream);
		HashMap<String,List<String>> map = infoPopulator.getTickerInfoMap();
		List<String> list = map.get(this.getTicker());
		System.out.print(this.getTicker()+",");
		for (int i = 0; i < list.size(); i++) {
			System.out.print(list.get(i));
			if(i<list.size()-1) {
				System.out.print(",");
			}			
		}
		System.out.println();*/
	
		return inputStream;
	}


}
