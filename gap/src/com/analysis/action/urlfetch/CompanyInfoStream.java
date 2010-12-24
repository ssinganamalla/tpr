package com.analysis.action.urlfetch;

import java.net.MalformedURLException;
import java.net.URL;

public class CompanyInfoStream extends AbstractURLFetchStream {

	@Override
	protected URL createUrl() throws MalformedURLException {
		URL url = new URL("http://www.google.com/finance?fstype=bi&q=" + this.getTicker());
		return url;
	}

}
