package com.analysis.action.urlfetch;

import java.net.MalformedURLException;
import java.net.URL;

public class TickerMatcherInfoStream extends AbstractURLFetchStream {

	@Override
	protected URL createUrl() throws MalformedURLException {
		URL url = new URL("http://www.google.com/finance/match?matchtype=matchall&q=" + getTicker());
		return url;
	}

}
