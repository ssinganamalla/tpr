package com.analysis.servlets;

import java.net.MalformedURLException;
import java.net.URL;

import javax.servlet.http.HttpServletRequest;

@Deprecated
public class GetQuoteServlet extends AbstractInfoServlet {
	protected URL getUrl(HttpServletRequest req) throws MalformedURLException {
		//stockTickerSymbol in the formal GE (DOES NOT INCLUDE NYSE:GE)
    	String stockTickerSymbol = req.getParameter("ticker");
        URL url = new URL("http://www.google.com/finance/info?q=" + stockTickerSymbol);
        return url;
    }
}
