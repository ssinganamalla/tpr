package com.analysis.action.urlfetch;

import java.io.BufferedInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.StringReader;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.URL;

public abstract class AbstractURLFetchStream {

	private String ticker;
	
	public InputStream populateStream() throws MalformedURLException, IOException{
		URL url = createUrl();
		HttpURLConnection connection = (HttpURLConnection)url.openConnection();
		BufferedInputStream inputStream = new BufferedInputStream(connection.getInputStream());
		return inputStream;
	}
	
	protected abstract URL createUrl() throws MalformedURLException;

	public void setTicker(String ticker) {
		this.ticker = ticker;
	}

	/**
	 * If the URL is from google, then ticker could of the form "NYSE:FSLR" or "FSLR"
	 * If the url is from yahoo, then the ticker could be of the form "FSLR" only;
	 * @return
	 */
	public String getTicker() {
		return ticker;
	}
}
